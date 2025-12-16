import { generateText } from 'ai';
import { NextResponse } from 'next/server';
import { createAIModel, getProviderConfigFromEnv, DEFAULT_MODELS } from '@/lib/ai-providers';
import { removeThinkTags, removeMarkdownCodeBlocks } from '@/lib/llm-utils';

const PLANTUML_SYSTEM_PROMPT = `You are an expert in creating PlantUML diagrams. Generate valid PlantUML code based on the user's natural language description. 

Rules:
1. Always start with @startuml and end with @enduml
2. Generate only the PlantUML code, no explanations or markdown
3. Support various diagram types: class, sequence, use case, activity, component, state, object, deployment, timing
4. Use proper PlantUML syntax and best practices
5. Make diagrams clear, well-organized, and visually appealing
6. Add appropriate styling when beneficial

Output only the PlantUML code.`;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Get provider configuration from environment
    const providerConfig = getProviderConfigFromEnv();
    const modelName = providerConfig.model || DEFAULT_MODELS[providerConfig.provider];
    const isOpenAICompatProvider = ['openai', 'azure', 'ollama', 'openrouter', 'deepseek', 'siliconflow'].includes(
      providerConfig.provider
    );
    const modelTriggersDeveloperRole =
      isOpenAICompatProvider &&
      !(modelName.startsWith('gpt-3') || modelName.startsWith('gpt-4') || modelName.startsWith('chatgpt-4o') || modelName.startsWith('gpt-5-chat'));
    const systemRole: 'system' | 'user' = modelTriggersDeveloperRole ? 'user' : 'system';
    const model = createAIModel(providerConfig);

    const { text } = await generateText({
      model: model as any,
      messages: [
        { role: systemRole, content: PLANTUML_SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      maxOutputTokens: 2000,
    });

    // Remove <think></think> tags for DeepSeek models and clean markdown
    let cleanedCode = removeThinkTags(text.trim());
    cleanedCode = removeMarkdownCodeBlocks(cleanedCode);

    return NextResponse.json({ plantUMLCode: cleanedCode });
  } catch (error) {
    console.error('Error generating diagram:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate diagram' },
      { status: 500 }
    );
  }
}
