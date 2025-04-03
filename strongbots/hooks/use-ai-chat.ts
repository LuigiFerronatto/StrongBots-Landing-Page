"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { AIServiceAdapter } from "@/lib/ai-service-adapter"
import { aiConfig } from "@/config/ai-config"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
}

interface UseAIChatOptions {
  initialMessages?: Message[]
  onResponse?: (response: any) => void
  onError?: (error: Error) => void
}

export function useAIChat(options: UseAIChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>(options.initialMessages || [])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Initialize AI service
  const aiService = new AIServiceAdapter({
    apiKey: aiConfig.api.apiKey,
    model: aiConfig.api.model,
    systemPrompt: aiConfig.systemPrompt,
    temperature: aiConfig.api.temperature,
    maxTokens: aiConfig.api.maxTokens,
  })

  // Add a message to the chat
  const addMessage = useCallback((message: Omit<Message, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setMessages((prev) => [...prev, { ...message, id }])
    return id
  }, [])

  // Send a message to the AI
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return

      // Add user message
      const userMessageId = addMessage({ role: "user", content })

      // Set loading state
      setIsLoading(true)
      setError(null)

      try {
        // Format messages for the AI service
        const formattedMessages = messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))

        // Add the new user message
        formattedMessages.push({ role: "user", content })

        // Send to AI service
        const response = await aiService.sendMessage(formattedMessages)

        // Process response
        const aiResponse = aiService.processResponse(response)

        // Add AI response to messages
        addMessage({ role: "assistant", content: aiResponse })

        // Call onResponse callback if provided
        if (options.onResponse) {
          options.onResponse(response)
        }

        return aiResponse
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error")
        setError(error)

        // Call onError callback if provided
        if (options.onError) {
          options.onError(error)
        }

        // Add fallback message
        const fallbacks = aiConfig.fallbacks
        const fallbackMessage = fallbacks[Math.floor(Math.random() * fallbacks.length)]
        addMessage({ role: "assistant", content: fallbackMessage })

        return fallbackMessage
      } finally {
        setIsLoading(false)
      }
    },
    [messages, addMessage, aiService, options],
  )

  // Handle input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }, [])

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (input.trim() && !isLoading) {
        sendMessage(input)
        setInput("")
      }
    },
    [input, isLoading, sendMessage],
  )

  return {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    sendMessage,
    isLoading,
    error,
  }
}

