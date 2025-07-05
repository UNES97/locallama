import { ModelConfig } from '../types/chat';

export const AVAILABLE_MODELS: ModelConfig[] = [
  // Llama Models
  {
    name: 'Llama-3.2-3B-Instruct-q4f32_1-MLC',
    displayName: 'Llama 3.2 3B',
    description: 'Fast and efficient 3B parameter model',
    size: '2.0GB',
    category: 'Llama'
  },
  {
    name: 'Llama-3.2-1B-Instruct-q4f32_1-MLC',
    displayName: 'Llama 3.2 1B',
    description: 'Ultra-fast 1B parameter model',
    size: '0.8GB',
    category: 'Llama'
  },
  {
    name: 'Llama-3.1-8B-Instruct-q4f32_1-MLC',
    displayName: 'Llama 3.1 8B',
    description: 'Powerful 8B parameter model with excellent reasoning',
    size: '4.8GB',
    category: 'Llama'
  },
  
  // Phi Models
  {
    name: 'Phi-3.5-mini-instruct-q4f32_1-MLC',
    displayName: 'Phi 3.5 Mini',
    description: 'Compact yet powerful model from Microsoft',
    size: '2.2GB',
    category: 'Phi'
  },
  {
    name: 'Phi-3-mini-4k-instruct-q4f32_1-MLC',
    displayName: 'Phi 3 Mini 4K',
    description: 'High-quality small model with 4K context',
    size: '2.4GB',
    category: 'Phi'
  },
  
  // Gemma Models
  {
    name: 'gemma-2-2b-it-q4f32_1-MLC',
    displayName: 'Gemma 2 2B',
    description: 'Google\'s efficient 2B parameter model',
    size: '1.6GB',
    category: 'Gemma'
  },
  {
    name: 'gemma-2-9b-it-q4f32_1-MLC',
    displayName: 'Gemma 2 9B',
    description: 'Google\'s powerful 9B parameter model',
    size: '5.4GB',
    category: 'Gemma'
  },
  
  // Qwen Models
  {
    name: 'Qwen2.5-0.5B-Instruct-q4f32_1-MLC',
    displayName: 'Qwen 2.5 0.5B',
    description: 'Ultra-lightweight model for basic tasks',
    size: '0.4GB',
    category: 'Qwen'
  },
  {
    name: 'Qwen2.5-1.5B-Instruct-q4f32_1-MLC',
    displayName: 'Qwen 2.5 1.5B',
    description: 'Balanced performance and efficiency',
    size: '1.0GB',
    category: 'Qwen'
  },
  {
    name: 'Qwen2.5-3B-Instruct-q4f32_1-MLC',
    displayName: 'Qwen 2.5 3B',
    description: 'Strong performance for complex tasks',
    size: '2.0GB',
    category: 'Qwen'
  },
  
  // Mistral Models
  {
    name: 'Mistral-7B-Instruct-v0.3-q4f32_1-MLC',
    displayName: 'Mistral 7B v0.3',
    description: 'High-quality 7B model with strong reasoning',
    size: '4.2GB',
    category: 'Mistral'
  }
];

export const DEFAULT_MODEL = AVAILABLE_MODELS[1].name; // Llama 3.2 1B as default