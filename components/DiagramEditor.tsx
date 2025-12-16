'use client';

import { useState } from 'react';
import DiagramPreview from './DiagramPreview';
import ChatInterface from './ChatInterface';

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
  const [plantUMLCode, setPlantUMLCode] = useState(DEFAULT_PLANTUML);

  const handleDiagramUpdate = (newCode: string) => {
    setPlantUMLCode(newCode);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel - AI Chat */}
      <div className="lg:sticky lg:top-8 h-fit">
        <ChatInterface
          currentDiagram={plantUMLCode}
          onDiagramUpdate={handleDiagramUpdate}
        />
      </div>

      {/* Right Panel - Diagram Preview */}
      <div className="lg:sticky lg:top-8 h-fit">
        <DiagramPreview plantUMLCode={plantUMLCode} />
      </div>
    </div>
  );
}
