# Next AI PlantUML

A Next.js-based UML Diagram Generator that leverages AI to create PlantUML diagrams from natural language descriptions. Create, modify, and enhance diagrams through AI-powered interactions with an interactive live preview.

## Features

- 🤖 **LLM-Powered Diagram Creation**: Use natural language to generate PlantUML diagrams with OpenAI's GPT models
- 📝 **Interactive Editor**: Edit PlantUML code directly with real-time preview
- 🔍 **Zoom & Pan**: Navigate large diagrams with intuitive controls
- 🎨 **Live Preview**: See your diagrams rendered instantly as you type
- 🌓 **Dark Mode**: Automatic dark mode support
- ⚡ **Fast**: Built with Next.js 15 and React 19

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

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

Edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
- [OpenAI API](https://openai.com/)
- [PlantUML](https://plantuml.com/)

## License

MIT
