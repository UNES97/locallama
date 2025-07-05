export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ModelConfig {
  name: string;
  displayName: string;
  description: string;
  size: string;
  category: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isModelLoading: boolean;
  currentModel: string | null;
  error: string | null;
}