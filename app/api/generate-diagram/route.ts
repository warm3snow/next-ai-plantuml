import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `You are an expert in creating PlantUML diagrams. Generate valid PlantUML code based on the user's natural language description. 

Rules:
1. Always start with @startuml and end with @enduml
2. Generate only the PlantUML code, no explanations or markdown
3. Support various diagram types: class, sequence, use case, activity, component, state, object, deployment, timing
4. Use proper PlantUML syntax and best practices
5. Make diagrams clear, well-organized, and visually appealing
6. Add appropriate styling when beneficial

Output only the PlantUML code.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const plantUMLCode = response.choices[0]?.message?.content?.trim() || '';

    // Clean up the response - remove markdown code blocks if present
    let cleanedCode = plantUMLCode;
    if (cleanedCode.startsWith('```plantuml')) {
      cleanedCode = cleanedCode.replace(/```plantuml\n?/, '').replace(/```$/, '').trim();
    } else if (cleanedCode.startsWith('```')) {
      cleanedCode = cleanedCode.replace(/```\n?/, '').replace(/```$/, '').trim();
    }

    return NextResponse.json({ plantUMLCode: cleanedCode });
  } catch (error) {
    console.error('Error generating diagram:', error);
    return NextResponse.json(
      { error: 'Failed to generate diagram' },
      { status: 500 }
    );
  }
}
