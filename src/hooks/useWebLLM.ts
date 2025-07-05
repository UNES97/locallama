import { useState, useCallback, useRef } from 'react';
import * as webllm from '@mlc-ai/web-llm';
import { Message } from '../types/chat';

export const useWebLLM = () => {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [currentModel, setCurrentModel] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const engineRef = useRef<webllm.MLCEngine | null>(null);

  const loadModel = useCallback(async (modelName: string) => {
    try {
      setIsModelLoading(true);
      setError(null);
      setLoadingProgress(0);

      const engine = new webllm.MLCEngine();
      engineRef.current = engine;

      engine.setInitProgressCallback((progress) => {
        setLoadingProgress(Math.round(progress.progress * 100));
      });

      await engine.reload(modelName);
      setCurrentModel(modelName);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load model');
      console.error('Model loading error:', err);
    } finally {
      setIsModelLoading(false);
    }
  }, []);

  const generateResponse = useCallback(async (messages: Message[]): Promise<string> => {
    if (!engineRef.current) {
      throw new Error('Model not loaded');
    }

    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    const response = await engineRef.current.chat.completions.create({
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 1024,
    });

    return response.choices[0]?.message?.content || '';
  }, []);

  const unloadModel = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.unload();
      engineRef.current = null;
    }
    setCurrentModel(null);
    setLoadingProgress(0);
  }, []);

  return {
    isModelLoading,
    currentModel,
    loadingProgress,
    error,
    loadModel,
    generateResponse,
    unloadModel
  };
};