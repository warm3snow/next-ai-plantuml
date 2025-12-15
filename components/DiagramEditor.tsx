'use client';

import { useState } from 'react';
import DiagramPreview from './DiagramPreview';

const DEFAULT_PLANTUML = `@startuml
!theme plain
title Welcome to Next AI PlantUML

actor User
participant "AI Engine" as AI
participant "PlantUML" as UML

User -> AI: Natural language prompt
AI -> AI: Generate PlantUML code
AI -> UML: PlantUML syntax
UML -> User: Rendered diagram

note right of User
  Try entering a description like:
  "Create a class diagram for a 
  simple e-commerce system"
end note

@enduml`;

export default function DiagramEditor() {
  const [prompt, setPrompt] = useState('');
  const [plantUMLCode, setPlantUMLCode] = useState(DEFAULT_PLANTUML);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('/api/generate-diagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate diagram');
      }

      const data = await response.json();
      setPlantUMLCode(data.plantUMLCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel - Input */}
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Natural Language Input
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="prompt"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Describe your diagram
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Example: Create a sequence diagram showing how a user logs into a web application with authentication server"
                className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Press Cmd/Ctrl + Enter to generate
              </p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating...
                </>
              ) : (
                '🤖 Generate Diagram with AI'
              )}
            </button>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* PlantUML Code Editor */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            PlantUML Code
          </h2>
          <textarea
            value={plantUMLCode}
            onChange={(e) => setPlantUMLCode(e.target.value)}
            className="w-full h-96 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none"
            spellCheck={false}
          />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Edit the PlantUML code directly to refine your diagram
          </p>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="lg:sticky lg:top-8 h-fit">
        <DiagramPreview plantUMLCode={plantUMLCode} />
      </div>
    </div>
  );
}
