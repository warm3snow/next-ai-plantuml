# Next AI PlantUML
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE) · 版权 © 2025-present warm3snow

语言：中文 | [English](README.md)

一个基于 Next.js 的 UML 图生成器，支持用自然语言创建与修改 PlantUML 图，并提供实时预览与交互式编辑。

## 特性

- 🤖 **多模型支持**：Ollama（默认）、OpenAI、Anthropic、Google AI、AWS Bedrock、Azure OpenAI、OpenRouter、DeepSeek、SiliconFlow
- 📝 **交互式编辑器**：实时预览，直接修改 PlantUML 代码
- 🔍 **缩放与平移**：拖拽平移，滚轮缩放，内置控制按钮
- 🎨 **实时预览**：修改即可实时渲染
- 🌓 **深浅色模式**：自动适配
- ⚡ **性能**：基于 Next.js 15 与 React 19

![Next AI PlantUML UI](docs/next-ai-plantuml-demo.png)

## 快速开始

### 依赖
- Node.js 18.0+
- 至少一个支持的 AI Provider（默认使用本地 Ollama）

### 安装
```bash
git clone https://github.com/warm3snow/next-ai-plantuml.git
cd next-ai-plantuml
npm install
cp .env.example .env
```

在 `.env` 中配置 Provider（见下文）。然后启动：
```bash
npm run dev
```
浏览器打开 http://localhost:3000。

## Provider 配置（精简版）

支持的 Provider：Ollama（默认）、OpenAI、Anthropic、Google AI、AWS Bedrock、Azure OpenAI、OpenRouter、DeepSeek、SiliconFlow。

`.env` 示例（新格式）：
```env
# 示例：本地 Ollama 默认
PROVIDER=ollama
MODEL=llama3.2
BASE_URL=http://localhost:11434

# 切换其他 Provider：
# PROVIDER=openai
# API_KEY=your_api_key_here
```

旧变量（AI_PROVIDER、AI_MODEL、OPENAI_API_KEY 等）仍可用，但推荐使用新格式。

## 使用方法

1) **自然语言描述**：在聊天输入框描述想要的图。  
2) **生成 / 修改**：点击 “Send” 或 Enter。  
3) **查看与导航**：使用缩放、平移、重置控件查看大图。  
4) **下载**：点击 “Download” 按钮将当前图保存为 SVG。

## 支持的图类型
- 序列图、类图、用例图、活动图、组件图、状态图、对象图、部署图、时序图

## 技术栈
- Next.js 15 / React 19 / TypeScript / Tailwind CSS / Vercel AI SDK / PlantUML

## 许可证

MIT License · 版权 (c) warm3snow

## Star 趋势

![Star History Chart](https://api.star-history.com/svg?repos=warm3snow/next-ai-plantuml&type=Date)

> 如果觉得这个项目对你有帮助，请点个 ⭐ Star —— 您的 Star 是我持续更新的动力！

