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

The application now supports a simplified configuration format. You can use either:
- **New format** (recommended): `PROVIDER` and `API_KEY`
- **Legacy format** (still supported): Provider-specific variables like `AI_PROVIDER` and `OPENAI_API_KEY`

### Ollama (Local AI - Default)

No API key needed! Just install and run Ollama locally:

1. Install Ollama from [ollama.ai](https://ollama.ai)
2. Pull a model: `ollama pull llama3.2`
3. That's it! The app will use `http://localhost:11434` by default

**Note:** Requires Ollama with OpenAI API compatibility (available in versions from Feb 2024 onwards).

### OpenAI

Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys):

```env
PROVIDER=openai
API_KEY=your_api_key_here
```

### Anthropic Claude

Get your API key from [Anthropic Console](https://console.anthropic.com/):

```env
PROVIDER=anthropic
API_KEY=your_api_key_here
```

### Google AI (Gemini)

Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey):

```env
PROVIDER=google
API_KEY=your_api_key_here
```

### AWS Bedrock

Configure your AWS credentials:

```env
PROVIDER=bedrock
REGION=us-east-1
ACCESS_KEY_ID=your_access_key_id
SECRET_ACCESS_KEY=your_secret_access_key
```

### Azure OpenAI

Get your credentials from Azure Portal:

```env
PROVIDER=azure
API_KEY=your_api_key_here
RESOURCE_NAME=your_resource_name
API_VERSION=2024-02-15-preview
```

### OpenRouter

Get your API key from [OpenRouter](https://openrouter.ai/keys):

```env
PROVIDER=openrouter
API_KEY=your_api_key_here
```

### DeepSeek

Get your API key from [DeepSeek Platform](https://platform.deepseek.com/):

```env
PROVIDER=deepseek
API_KEY=your_api_key_here
```

### SiliconFlow

Get your API key from [SiliconFlow](https://siliconflow.cn/):

```env
PROVIDER=siliconflow
API_KEY=your_api_key_here
```

### Legacy Configuration

The following legacy environment variables are still supported for backward compatibility:
- `AI_PROVIDER` (use `PROVIDER` instead)
- `AI_MODEL` (use `MODEL` instead)
- `OLLAMA_BASE_URL` (use `BASE_URL` instead)
- `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GOOGLE_AI_API_KEY`, etc. (use `API_KEY` instead)
- `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` (use `REGION`, `ACCESS_KEY_ID`, `SECRET_ACCESS_KEY` instead)
- `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_RESOURCE_NAME`, `AZURE_OPENAI_API_VERSION` (use `API_KEY`, `RESOURCE_NAME`, `API_VERSION` instead)

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
