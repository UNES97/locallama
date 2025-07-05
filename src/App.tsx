import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { ModelSelector } from './components/ModelSelector';
import { ModelLoadingIndicator } from './components/ModelLoadingIndicator';
import { MessageBubble } from './components/MessageBubble';
import { ChatInput } from './components/ChatInput';
import { EmptyState } from './components/EmptyState';
import { useWebLLM } from './hooks/useWebLLM';
import { Message } from './types/chat';
import { DEFAULT_MODEL } from './config/models';
import { AlertCircle, Trash2 } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    isModelLoading,
    currentModel,
    loadingProgress,
    error,
    loadModel,
    generateResponse,
    unloadModel
  } = useWebLLM();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLoadModel = async (modelName?: string) => {
    await loadModel(modelName || DEFAULT_MODEL);
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsGenerating(true);

    try {
      const response = await generateResponse([...messages, userMessage]);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Generation error:', err);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error while generating a response. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header/>
      
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <ModelSelector
            currentModel={currentModel}
            onModelSelect={handleLoadModel}
            isLoading={isModelLoading}
            isOpen={isModelSelectorOpen}
            onToggle={() => setIsModelSelectorOpen(!isModelSelectorOpen)}
          />
          
          {hasMessages && (
            <button
              onClick={handleClearChat}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Clear Chat
            </button>
          )}
        </div>

        {error && (
          <div className="mx-4 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-800">Error</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {!currentModel || !hasMessages ? (
          <EmptyState
            hasModel={!!currentModel}
            onLoadModel={() => handleLoadModel()}
          />
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isLatest={message.id === messages[messages.length - 1]?.id}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        <div className="p-4 bg-white border-t border-gray-200">
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isGenerating}
            disabled={!currentModel}
          />
        </div>
      </div>

      <ModelLoadingIndicator
        progress={loadingProgress}
        isLoading={isModelLoading}
      />
    </div>
  );
}

export default App;