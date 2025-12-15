# Next AI PlantUML

A Next.js-based UML Diagram Generator that leverages AI to create PlantUML diagrams from natural language descriptions. Create, modify, and enhance diagrams through AI-powered interactions with an interactive live preview.

## Features

- 🤖 **Multi-Provider AI Support**: Use Ollama (local), OpenAI, Anthropic, Google AI, AWS Bedrock, Azure OpenAI, OpenRouter, DeepSeek, or SiliconFlow
- 📝 **Interactive Editor**: Edit PlantUML code directly with real-time preview
- 🔍 **Zoom & Pan**: Navigate large diagrams with intuitive controls
- 🎨 **Live Preview**: See your diagrams rendered instantly as you type
- 🌓 **Dark Mode**: Automatic dark mode support
- ⚡ **Fast**: Built with Next.js 15 and React 19

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- One of the supported AI providers (Ollama runs locally by default)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/warm3snow/next-ai-plantuml.git
cd next-ai-plantuml
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure your AI provider (see Provider Setup below).

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Provider Setup

### Ollama (Local AI - Default)

No API key needed! Just install and run Ollama locally:

1. Install Ollama from [ollama.ai](https://ollama.ai)
2. Pull a model: `ollama pull llama3.2`
3. That's it! The app will use `http://localhost:11434` by default

### OpenAI

Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys):

```env
AI_PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key_here
```

### Anthropic Claude

Get your API key from [Anthropic Console](https://console.anthropic.com/):

```env
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### Google AI (Gemini)

Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey):

```env
AI_PROVIDER=google
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

### AWS Bedrock

Configure your AWS credentials:

```env
AI_PROVIDER=bedrock
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
```

### Azure OpenAI

Get your credentials from Azure Portal:

```env
AI_PROVIDER=azure
AZURE_OPENAI_API_KEY=your_azure_api_key
AZURE_OPENAI_RESOURCE_NAME=your_resource_name
AZURE_OPENAI_API_VERSION=2024-02-15-preview
```

### OpenRouter

Get your API key from [OpenRouter](https://openrouter.ai/keys):

```env
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=your_openrouter_api_key
```

### DeepSeek

Get your API key from [DeepSeek Platform](https://platform.deepseek.com/):

```env
AI_PROVIDER=deepseek
DEEPSEEK_API_KEY=your_deepseek_api_key
```

### SiliconFlow

Get your API key from [SiliconFlow](https://siliconflow.cn/):

```env
AI_PROVIDER=siliconflow
SILICONFLOW_API_KEY=your_siliconflow_api_key
```

## Usage

1. **Natural Language Input**: Describe the diagram you want to create in plain English
   - Example: "Create a sequence diagram showing how a user logs into a web application"
   - Example: "Design a class diagram for a simple e-commerce system with products and orders"

2. **AI Generation**: Click "Generate Diagram with AI" or press Cmd/Ctrl + Enter

3. **Edit & Refine**: Modify the generated PlantUML code directly if needed

4. **View & Navigate**: Use zoom, pan, and reset controls to explore your diagram

## Supported Diagram Types

- Sequence Diagrams
- Class Diagrams
- Use Case Diagrams
- Activity Diagrams
- Component Diagrams
- State Diagrams
- Object Diagrams
- Deployment Diagrams
- Timing Diagrams

## Technologies

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel AI SDK](https://sdk.vercel.ai/)
- [PlantUML](https://plantuml.com/)

## License

MIT
