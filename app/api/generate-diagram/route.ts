import { generateText } from 'ai';
import { NextResponse } from 'next/server';
import { createAIModel, getProviderConfigFromEnv } from '@/lib/ai-providers';

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
    const model = createAIModel(providerConfig);

    const { text } = await generateText({
      model: model as any,
      messages: [
        { role: 'system', content: PLANTUML_SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      maxOutputTokens: 2000,
    });

    let cleanedCode = text.trim();

    // Remove <think></think> tags for DeepSeek models
    if (cleanedCode.includes('<think>') && cleanedCode.includes('</think>')) {
      cleanedCode = cleanedCode.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    }

    // Clean up the response - remove markdown code blocks if present
    if (cleanedCode.startsWith('```plantuml')) {
      cleanedCode = cleanedCode.replace(/```plantuml\n?/, '').replace(/```$/, '').trim();
    } else if (cleanedCode.startsWith('```')) {
      cleanedCode = cleanedCode.replace(/```\n?/, '').replace(/```$/, '').trim();
    }

    return NextResponse.json({ plantUMLCode: cleanedCode });
  } catch (error) {
    console.error('Error generating diagram:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate diagram' },
      { status: 500 }
    );
  }
}
