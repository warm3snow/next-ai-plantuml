'use client';

import { useState, useEffect, useRef } from 'react';
import plantumlEncoder from 'plantuml-encoder';

interface DiagramPreviewProps {
  plantUMLCode: string;
}

export default function DiagramPreview({ plantUMLCode }: DiagramPreviewProps) {
  const [svgContent, setSvgContent] = useState('');
  const [zoom, setZoom] = useState(100);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [animationType, setAnimationType] = useState<'flow' | 'pulse' | 'glow'>('flow');
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (plantUMLCode) {
      const fetchSvg = async () => {
        try {
          const encoded = plantumlEncoder.encode(plantUMLCode);
          // Using PlantUML server
          const url = `https://www.plantuml.com/plantuml/svg/${encoded}`;
          const response = await fetch(url);
          const svgText = await response.text();
          setSvgContent(svgText);
        } catch (error) {
          console.error('Error fetching PlantUML SVG:', error);
        }
      };
      fetchSvg();
    }
  }, [plantUMLCode]);

  // Apply animations to SVG connectors
  useEffect(() => {
    if (svgContainerRef.current && svgContent && animationsEnabled) {
      const svgElement = svgContainerRef.current.querySelector('svg');
      if (!svgElement) return;

      // Find all connector elements (paths, lines, polygons that represent arrows)
      const connectors = svgElement.querySelectorAll('path[d*="M"], line, polyline, polygon');
      
      connectors.forEach((connector) => {
        const element = connector as SVGElement;
        
        // Remove existing animation classes
        element.classList.remove('connector-flow', 'connector-pulse', 'connector-glow');
        
        // Add animation class based on type
        if (animationType === 'flow') {
          element.classList.add('connector-flow');
        } else if (animationType === 'pulse') {
          element.classList.add('connector-pulse');
        } else if (animationType === 'glow') {
          element.classList.add('connector-glow');
        }
      });
    } else if (svgContainerRef.current && !animationsEnabled) {
      // Remove all animations when disabled
      const svgElement = svgContainerRef.current.querySelector('svg');
      if (svgElement) {
        const connectors = svgElement.querySelectorAll('path[d*="M"], line, polyline, polygon');
        connectors.forEach((connector) => {
          const element = connector as SVGElement;
          element.classList.remove('connector-flow', 'connector-pulse', 'connector-glow');
        });
      }
    }
  }, [svgContent, animationsEnabled, animationType]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50));
  };

  const handleReset = () => {
    setZoom(100);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -5 : 5;
    setZoom((prev) => Math.max(50, Math.min(200, prev + delta)));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Diagram Preview
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            className="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700 dark:text-gray-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-16 text-center">
            {zoom}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
            title="Zoom In"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700 dark:text-gray-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
            title="Reset View"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700 dark:text-gray-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Animation Controls */}
      <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              ✨ Animated Connectors:
            </span>
            <button
              onClick={() => setAnimationsEnabled(!animationsEnabled)}
              className={`px-4 py-1.5 rounded-lg font-medium text-sm transition-colors ${
                animationsEnabled
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            >
              {animationsEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
          {animationsEnabled && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Type:</span>
              <select
                value={animationType}
                onChange={(e) => setAnimationType(e.target.value as 'flow' | 'pulse' | 'glow')}
                className="px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="flow">Flow</option>
                <option value="pulse">Pulse</option>
                <option value="glow">Glow</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div
        ref={svgContainerRef}
        className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-gray-200 dark:border-gray-700"
        style={{ height: '600px', cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {svgContent ? (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
            }}
          >
            <div
              className="max-w-none select-none"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'center',
              }}
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              Loading diagram...
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          💡 <strong>Tips:</strong> Drag to pan, scroll to zoom, or use the controls above. Toggle animated connectors for dynamic visualization!
        </p>
      </div>

      <style jsx>{`
        :global(.connector-flow) {
          stroke-dasharray: 10 5;
          animation: dash-flow 2s linear infinite;
        }

        :global(.connector-pulse) {
          animation: pulse-animation 1.5s ease-in-out infinite;
        }

        :global(.connector-glow) {
          filter: drop-shadow(0 0 3px currentColor);
          animation: glow-animation 2s ease-in-out infinite;
        }

        @keyframes dash-flow {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: 15;
          }
        }

        @keyframes pulse-animation {
          0%, 100% {
            opacity: 1;
            stroke-width: 1;
          }
          50% {
            opacity: 0.6;
            stroke-width: 2;
          }
        }

        @keyframes glow-animation {
          0%, 100% {
            filter: drop-shadow(0 0 2px currentColor);
          }
          50% {
            filter: drop-shadow(0 0 6px currentColor) drop-shadow(0 0 10px currentColor);
          }
        }
      `}</style>
    </div>
  );
}
