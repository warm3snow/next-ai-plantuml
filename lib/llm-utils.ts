/**
 * Utility functions for processing LLM responses
 */

/**
 * Removes <think></think> tags from DeepSeek model responses
 * @param text The raw LLM response text
 * @returns Cleaned text with think tags removed
 */
export function removeThinkTags(text: string): string {
  if (text.includes('<think>') && text.includes('</think>')) {
    return text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
  }
  return text;
}

/**
 * Removes markdown code block formatting from PlantUML code
 * @param code The raw code response
 * @returns Cleaned PlantUML code
 */
export function removeMarkdownCodeBlocks(code: string): string {
  let cleaned = code.trim();
  if (cleaned.startsWith('```plantuml')) {
    cleaned = cleaned.replace(/```plantuml\n?/, '').replace(/```$/, '').trim();
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/```\n?/, '').replace(/```$/, '').trim();
  }
  return cleaned;
}
