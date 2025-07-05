import React from 'react';
import { ChevronDown, Download, Zap, Cpu } from 'lucide-react';
import { AVAILABLE_MODELS } from '../config/models';
import { ModelConfig } from '../types/chat';

interface ModelSelectorProps {
  currentModel: string | null;
  onModelSelect: (modelName: string) => void;
  isLoading: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Llama': return '🦙';
    case 'Phi': return '🔬';
    case 'Gemma': return '💎';
    case 'Qwen': return '🚀';
    case 'Mistral': return '🌪️';
    default: return '🤖';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Llama': return 'bg-orange-50 border-orange-200 text-orange-800';
    case 'Phi': return 'bg-blue-50 border-blue-200 text-blue-800';
    case 'Gemma': return 'bg-purple-50 border-purple-200 text-purple-800';
    case 'Qwen': return 'bg-green-50 border-green-200 text-green-800';
    case 'Mistral': return 'bg-red-50 border-red-200 text-red-800';
    default: return 'bg-gray-50 border-gray-200 text-gray-800';
  }
};

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  currentModel,
  onModelSelect,
  isLoading,
  isOpen,
  onToggle
}) => {
  const selectedModel = AVAILABLE_MODELS.find(m => m.name === currentModel);
  
  // Group models by category
  const modelsByCategory = AVAILABLE_MODELS.reduce((acc, model) => {
    if (!acc[model.category]) {
      acc[model.category] = [];
    }
    acc[model.category].push(model);
    return acc;
  }, {} as Record<string, ModelConfig[]>);

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        disabled={isLoading}
        className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[200px]"
      >
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-blue-600" />
          <div className="text-left">
            <div className="text-sm font-medium">
              {selectedModel?.displayName || 'Select Model'}
            </div>
            {selectedModel && (
              <div className="text-xs text-gray-500">
                {getCategoryIcon(selectedModel.category)} {selectedModel.category} • {selectedModel.size}
              </div>
            )}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
          <div className="p-2">
            {Object.entries(modelsByCategory).map(([category, models]) => (
              <div key={category} className="mb-4 last:mb-0">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100 mb-2">
                  {getCategoryIcon(category)} {category} Models
                </div>
                <div className="space-y-1">
                  {models.map((model) => (
                    <button
                      key={model.name}
                      onClick={() => {
                        onModelSelect(model.name);
                        onToggle();
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentModel === model.name
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{model.displayName}</span>
                            <span className={`px-2 py-0.5 text-xs rounded-full border ${getCategoryColor(model.category)}`}>
                              {model.category}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mb-1">{model.description}</div>
                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            <div className="flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              {model.size}
                            </div>
                            <div className="flex items-center gap-1">
                              <Cpu className="w-3 h-3" />
                              Edge AI
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>All models run locally on your device</span>
            </div>
            <div className="text-gray-500">
              Larger models provide better quality but require more memory and longer download times.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};