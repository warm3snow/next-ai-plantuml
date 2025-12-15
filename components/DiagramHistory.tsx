'use client';

import { useState } from 'react';

interface DiagramVersion {
  id: string;
  code: string;
  timestamp: number;
  label: string;
}

interface DiagramHistoryProps {
  history: DiagramVersion[];
  onRestore: (code: string) => void;
  onClear: () => void;
}

export default function DiagramHistory({ history, onRestore, onClear }: DiagramHistoryProps) {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [previewCode, setPreviewCode] = useState<string>('');

  const handlePreview = (version: DiagramVersion) => {
    setSelectedVersion(version.id);
    setPreviewCode(version.code);
  };

  const handleRestore = (version: DiagramVersion) => {
    if (confirm(`Restore version from ${new Date(version.timestamp).toLocaleString()}?`)) {
      onRestore(version.code);
      setSelectedVersion(null);
      setPreviewCode('');
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          📜 Version History
        </h2>
        {history.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Clear all history?')) {
                onClear();
                setSelectedVersion(null);
                setPreviewCode('');
              }
            }}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Clear history
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex items-center justify-center py-8 text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <p className="text-sm">No history yet</p>
            <p className="text-xs mt-1">Versions are saved before AI modifications</p>
          </div>
        </div>
      ) : (
        <div className="space-y-2 max-h-[500px] overflow-y-auto">
          {history.map((version, index) => (
            <div
              key={version.id}
              className={`border rounded-lg p-3 transition-colors ${
                selectedVersion === version.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {version.label}
                    </span>
                    {index === 0 && (
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-0.5 rounded">
                        Latest
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatTimestamp(version.timestamp)}
                  </p>
                  {selectedVersion === version.id && previewCode && (
                    <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
                      <pre className="text-xs text-gray-700 dark:text-gray-300 overflow-x-auto max-h-32 overflow-y-auto">
                        {previewCode.length > 200 ? previewCode.substring(0, 200) + '...' : previewCode}
                      </pre>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2 ml-2">
                  <button
                    onClick={() => handlePreview(version)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    {selectedVersion === version.id ? 'Hide' : 'Preview'}
                  </button>
                  <button
                    onClick={() => handleRestore(version)}
                    className="text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                  >
                    Restore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-800 dark:text-blue-200">
          💡 <strong>Tip:</strong> A new version is automatically saved before each AI modification
        </p>
      </div>
    </div>
  );
}
