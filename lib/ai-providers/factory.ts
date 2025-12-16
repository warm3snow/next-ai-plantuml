import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';
import { createAzure } from '@ai-sdk/azure';
import { AIProviderConfig, DEFAULT_MODELS, DEFAULT_BASE_URLS } from './types';

/**
 * Creates an AI language model based on the provider configuration
 */
export function createAIModel(config: AIProviderConfig) {
  const model = config.model || DEFAULT_MODELS[config.provider];

  switch (config.provider) {
    case 'ollama': {
      // Use OpenAI compatibility mode for Ollama
      // Ollama exposes OpenAI-compatible API at /v1 endpoint
      const baseURL = config.baseURL || DEFAULT_BASE_URLS.ollama;
      const ollama = createOpenAI({
        baseURL: `${baseURL}/v1`,
        apiKey: 'ollama', // Ollama doesn't require a real API key, but the client needs one
      });
      return ollama(model);
    }

    case 'openai': {
      if (!config.apiKey) {
        throw new Error('OpenAI API key is required');
      }
      const openai = createOpenAI({ apiKey: config.apiKey });
      return openai(model);
    }

    case 'anthropic': {
      if (!config.apiKey) {
        throw new Error('Anthropic API key is required');
      }
      const anthropic = createAnthropic({ apiKey: config.apiKey });
      return anthropic(model);
    }

    case 'google': {
      if (!config.apiKey) {
        throw new Error('Google AI API key is required');
      }
      const google = createGoogleGenerativeAI({ apiKey: config.apiKey });
      return google(model);
    }

    case 'bedrock': {
      if (!config.accessKeyId || !config.secretAccessKey) {
        throw new Error('AWS credentials are required for Bedrock');
      }
      const bedrock = createAmazonBedrock({
        region: config.region || 'us-east-1',
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      });
      return bedrock(model);
    }

    case 'azure': {
      if (!config.apiKey || !config.resourceName) {
        throw new Error('Azure OpenAI API key and resource name are required');
      }
      const azure = createAzure({
        apiKey: config.apiKey,
        resourceName: config.resourceName,
        apiVersion: config.apiVersion,
      });
      return azure(model);
    }

    case 'openrouter': {
      if (!config.apiKey) {
        throw new Error('OpenRouter API key is required');
      }
      const openrouter = createOpenAI({
        apiKey: config.apiKey,
        baseURL: DEFAULT_BASE_URLS.openrouter,
      });
      return openrouter(model);
    }

    case 'deepseek': {
      if (!config.apiKey) {
        throw new Error('DeepSeek API key is required');
      }
      const deepseek = createOpenAI({
        apiKey: config.apiKey,
        baseURL: DEFAULT_BASE_URLS.deepseek,
      });
      return deepseek(model);
    }

    case 'siliconflow': {
      if (!config.apiKey) {
        throw new Error('SiliconFlow API key is required');
      }
      const siliconflow = createOpenAI({
        apiKey: config.apiKey,
        baseURL: DEFAULT_BASE_URLS.siliconflow,
      });
      return siliconflow(model);
    }

    default:
      throw new Error(`Unsupported provider: ${config.provider}`);
  }
}

/**
 * Gets the provider configuration from environment variables
 */
export function getProviderConfigFromEnv(): AIProviderConfig {
  // Support both new (PROVIDER) and legacy (AI_PROVIDER) variable names
  const provider = (process.env.PROVIDER || process.env.AI_PROVIDER || 'ollama') as AIProviderConfig['provider'];
  
  const config: AIProviderConfig = {
    provider,
    // Support both new (MODEL) and legacy (AI_MODEL) variable names
    model: process.env.MODEL || process.env.AI_MODEL,
  };

  // Add provider-specific configuration
  switch (provider) {
    case 'ollama':
      config.baseURL = process.env.BASE_URL || process.env.OLLAMA_BASE_URL;
      break;

    case 'openai':
      // Support both new (API_KEY) and legacy (OPENAI_API_KEY) variable names
      config.apiKey = process.env.API_KEY || process.env.OPENAI_API_KEY;
      break;

    case 'anthropic':
      // Support both new (API_KEY) and legacy (ANTHROPIC_API_KEY) variable names
      config.apiKey = process.env.API_KEY || process.env.ANTHROPIC_API_KEY;
      break;

    case 'google':
      // Support both new (API_KEY) and legacy (GOOGLE_AI_API_KEY) variable names
      config.apiKey = process.env.API_KEY || process.env.GOOGLE_AI_API_KEY;
      break;

    case 'bedrock':
      config.region = process.env.REGION || process.env.AWS_REGION;
      config.accessKeyId = process.env.ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
      config.secretAccessKey = process.env.SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;
      break;

    case 'azure':
      // Support both new (API_KEY) and legacy (AZURE_OPENAI_API_KEY) variable names
      config.apiKey = process.env.API_KEY || process.env.AZURE_OPENAI_API_KEY;
      config.resourceName = process.env.RESOURCE_NAME || process.env.AZURE_OPENAI_RESOURCE_NAME;
      config.apiVersion = process.env.API_VERSION || process.env.AZURE_OPENAI_API_VERSION;
      break;

    case 'openrouter':
      // Support both new (API_KEY) and legacy (OPENROUTER_API_KEY) variable names
      config.apiKey = process.env.API_KEY || process.env.OPENROUTER_API_KEY;
      break;

    case 'deepseek':
      // Support both new (API_KEY) and legacy (DEEPSEEK_API_KEY) variable names
      config.apiKey = process.env.API_KEY || process.env.DEEPSEEK_API_KEY;
      break;

    case 'siliconflow':
      // Support both new (API_KEY) and legacy (SILICONFLOW_API_KEY) variable names
      config.apiKey = process.env.API_KEY || process.env.SILICONFLOW_API_KEY;
      break;
  }

  return config;
}
