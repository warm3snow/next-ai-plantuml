import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const PLANTUML_CHAT_SYSTEM_PROMPT = `You are an expert in creating and modifying PlantUML diagrams. You help users refine their diagrams through conversational interactions.

When the user asks to modify a diagram:
1. Understand the current diagram context
2. Apply the requested changes
3. Generate the updated PlantUML code
4. Always return ONLY the complete, updated PlantUML code
5. Start with @startuml and end with @enduml
6. Do not include explanations or markdown - just the PlantUML code

When the user asks questions about the diagram:
1. Provide helpful explanations
2. Suggest improvements if appropriate
3. Keep responses concise and actionable

Remember: When generating or modifying code, output ONLY the PlantUML code without any markdown formatting or explanations.`;

export async function POST(req: Request) {
  try {
    const { messages, currentDiagram } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
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

    // Prepare messages with context
    const contextualMessages = [
      { role: 'system' as const, content: PLANTUML_CHAT_SYSTEM_PROMPT },
    ];

    // Add current diagram context if available
    if (currentDiagram) {
      contextualMessages.push({
        role: 'system' as const,
        content: `Current diagram code:\n${currentDiagram}`,
      });
    }

    // Add conversation history
    contextualMessages.push(...messages);

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: contextualMessages,
      temperature: 0.7,
      max_tokens: 2000,
    });

    const assistantMessage = response.choices[0]?.message?.content?.trim() || '';

    // Check if the response contains PlantUML code
    let plantUMLCode = null;
    let cleanedMessage = assistantMessage;

    // Try to extract PlantUML code from the response
    if (assistantMessage.includes('@startuml') && assistantMessage.includes('@enduml')) {
      // Extract the PlantUML code
      const startIndex = assistantMessage.indexOf('@startuml');
      const endIndex = assistantMessage.indexOf('@enduml') + '@enduml'.length;
      plantUMLCode = assistantMessage.substring(startIndex, endIndex);

      // Clean up markdown if present
      if (plantUMLCode.includes('```')) {
        plantUMLCode = plantUMLCode.replace(/```plantuml\n?/g, '').replace(/```/g, '').trim();
      }

      // If the entire response is just the code, set cleanedMessage to null
      if (assistantMessage.trim() === plantUMLCode.trim() || 
          assistantMessage.replace(/```plantuml\n?/g, '').replace(/```/g, '').trim() === plantUMLCode.trim()) {
        cleanedMessage = '';
      } else {
        // Remove the code block from the message
        cleanedMessage = assistantMessage.replace(plantUMLCode, '').trim();
        if (cleanedMessage.includes('```')) {
          cleanedMessage = cleanedMessage.replace(/```plantuml\n?/g, '').replace(/```/g, '').trim();
        }
      }
    }

    return NextResponse.json({
      message: cleanedMessage,
      plantUMLCode: plantUMLCode,
    });
  } catch (error) {
    console.error('Error in chat:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
