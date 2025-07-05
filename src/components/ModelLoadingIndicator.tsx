import React from 'react';
import { Download, Brain } from 'lucide-react';

interface ModelLoadingIndicatorProps {
  progress: number;
  isLoading: boolean;
}

export const ModelLoadingIndicator: React.FC<ModelLoadingIndicatorProps> = ({
  progress,
  isLoading
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Brain className="w-12 h-12 text-blue-600 animate-pulse" />
              <Download className="w-6 h-6 text-blue-800 absolute -bottom-1 -right-1 animate-bounce" />
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Loading AI Model
          </h3>
          
          <p className="text-sm text-gray-600 mb-6">
            Downloading and initializing the model for local inference...
          </p>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <p className="text-xs text-gray-500">
            This may take a few moments...
          </p>
        </div>
      </div>
    </div>
  );
};