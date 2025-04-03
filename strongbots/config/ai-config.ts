// config/ai-config.ts
import { generateSystemPrompt } from "./bot-prompt"

/**
 * AI Configuration
 * Settings for the AI integration
 */
export const aiConfig = {
  // API Configuration
  api: {
    endpoint:
      process.env.OPENAI_ENDPOINT ||
      "https://dev-openai-take.openai.azure.com/openai/deployments/gpt-4/chat/completions",
    apiKey: process.env.OPENAI_API_KEY || "",
    model: process.env.OPENAI_MODEL || "gpt-4-0613",
    apiVersion: process.env.OPENAI_API_VERSION || "2023-03-15-preview",
    temperature: 0.8,
    maxTokens: 1000,
    topP: 1,
    frequencyPenalty: 2,
    presencePenalty: 0,
  },

  // System prompt that defines the bot's personality and knowledge
  // Usar a função importada para gerar o prompt
  systemPrompt: generateSystemPrompt(),

  // Fallback messages when AI is not available
  fallbacks: [
    "Desculpe, estou com dificuldades para me conectar no momento. Você pode tentar novamente mais tarde?",
    "Parece que estou tendo problemas técnicos. Que tal falar diretamente com um de nossos especialistas?",
    "Ops! Algo deu errado. Você pode tentar reformular sua pergunta ou entrar em contato pelo WhatsApp?",
  ],

  // Debug settings
  debug: {
    enabled: true,
    logRequests: true,
    logResponses: true,
  },
}

