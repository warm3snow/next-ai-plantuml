/**
 * Supported AI providers for diagram generation
 */
export type AIProvider = 
  | 'ollama'
  | 'openai'
  | 'anthropic'
  | 'google'
  | 'bedrock'
  | 'azure'
  | 'openrouter'
  | 'deepseek'
  | 'siliconflow';

/**
 * Configuration for AI provider
 */
export interface AIProviderConfig {
  provider: AIProvider;
  apiKey?: string;
  baseURL?: string;
  model?: string;
  region?: string; // For AWS Bedrock
  accessKeyId?: string; // For AWS Bedrock
  secretAccessKey?: string; // For AWS Bedrock
  resourceName?: string; // For Azure OpenAI
  apiVersion?: string; // For Azure OpenAI
}

/**
 * Default models for each provider
 */
export const DEFAULT_MODELS: Record<AIProvider, string> = {
  ollama: 'llama3.2',
  openai: 'gpt-4o-mini',
  anthropic: 'claude-3-5-sonnet-20241022',
  google: 'gemini-1.5-flash',
  bedrock: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
  azure: 'gpt-4o-mini',
  openrouter: 'meta-llama/llama-3.2-3b-instruct:free',
  deepseek: 'deepseek-chat',
  siliconflow: 'deepseek-ai/DeepSeek-V3',
};

/**
 * Base URLs for providers that support custom endpoints
 */
export const DEFAULT_BASE_URLS: Partial<Record<AIProvider, string>> = {
  ollama: 'http://localhost:11434',
  openrouter: 'https://openrouter.ai/api/v1',
  deepseek: 'https://api.deepseek.com',
  siliconflow: 'https://api.siliconflow.cn/v1',
};
