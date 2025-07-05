import React from 'react';
import { Brain, Smartphone, Zap, Download, Cpu, Shield } from 'lucide-react';

interface EmptyStateProps {
  hasModel: boolean;
  onLoadModel: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ hasModel, onLoadModel }) => {
  if (!hasModel) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-lg">       
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Choose Your AI Model
          </h2>
          
          <p className="text-gray-600 mb-8 text-lg">
            Select from our collection of powerful AI models that run entirely on your device. 
            From ultra-fast lightweight models to powerful reasoning engines.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Lightning Fast</h3>
              <p className="text-sm text-gray-600">Optimized models for instant responses</p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">100% Private</h3>
              <p className="text-sm text-gray-600">Your data never leaves your device</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <Cpu className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Edge Computing</h3>
              <p className="text-sm text-gray-600">Advanced AI without the cloud</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Models range from 0.4GB to 5.4GB • Choose based on your device capabilities
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Brain className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Chat
        </h2>
        
        <p className="text-gray-600 mb-6">
          Your AI is running locally on your device. Ask questions, get help, or just have a conversation!
        </p>
        
        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Running on your device</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Private and secure</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>No internet required</span>
          </div>
        </div>
      </div>
    </div>
  );
};