import React from 'react';
import { Brain, Settings, Info } from 'lucide-react';

interface HeaderProps {
  onShowInfo: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Edge AI Chat</h1>
            <p className="text-sm text-gray-500">Local AI inference on your device</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
        </div>
      </div>
    </header>
  );
};