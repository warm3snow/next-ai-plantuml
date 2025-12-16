'use client';

import { useState, useRef, useEffect } from 'react';
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
  const [previewHeight, setPreviewHeight] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDiagramUpdate = (newCode: string) => {
    setPlantUMLCode(newCode);
  };

  useEffect(() => {
    const updateHeight = () => {
      if (previewRef.current) {
        const height = previewRef.current.offsetHeight;
        setPreviewHeight(height);
      }
    };

    // Update height on mount and when content changes
    updateHeight();

    // Use ResizeObserver to track size changes
    const resizeObserver = new ResizeObserver(updateHeight);
    if (previewRef.current) {
      resizeObserver.observe(previewRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []); // Empty dependency array - observer handles all updates

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel - Diagram Preview */}
      <div ref={previewRef} className="lg:sticky lg:top-8 self-start">
        <DiagramPreview plantUMLCode={plantUMLCode} />
      </div>

      {/* Right Panel - AI Chat */}
      <div className="lg:sticky lg:top-8 self-start">
        <ChatInterface
          currentDiagram={plantUMLCode}
          onDiagramUpdate={handleDiagramUpdate}
          targetHeight={previewHeight}
        />
      </div>
    </div>
  );
}
