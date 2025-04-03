"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import ChatMessage from "./ChatMessage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface Message {
  content: string
  role: "user" | "assistant"
  function_call?: any
  function_result?: any
  isStatusUpdate?: boolean
  error?: boolean
  timeout?: boolean
  conflict?: boolean
  appointmentDetails?: any
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content:
        "Olá! Sou o assistente da Strongbots, pronto para transformar seu negócio com IA. Como posso ajudar você hoje?",
      role: "assistant",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, statusMessage])

  // Function to handle status updates
  const updateStatus = (status: string) => {
    setStatusMessage(status)
  }

  // Function to clear status message after a delay
  const clearStatusAfterDelay = (delay = 2000) => {
    setTimeout(() => {
      setStatusMessage(null)
    }, delay)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { content: input, role: "user" as const }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setStatusMessage(null)
    setRetryCount(0)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch response")
      }

      const data = await response.json()
      console.log("Response from API:", data)

      // Check if this is a status update
      if (data.isStatusUpdate) {
        updateStatus(data.content)
        return
      }

      // Clear any status message
      setStatusMessage(null)

      // Verificar se a resposta contém conteúdo
      if (data && typeof data.content === "string") {
        // Check if this is an error message
        if (data.error) {
          setMessages((prev) => [
            ...prev,
            {
              content: data.content,
              role: "assistant",
              error: true,
              timeout: data.timeout,
              conflict: data.conflict,
            },
          ])
        } else {
          setMessages((prev) => [
            ...prev,
            {
              content: data.content,
              role: "assistant",
              appointmentDetails: data.appointmentDetails,
              conflict: data.conflict,
            },
          ])
        }
      } else {
        // Fallback para caso de resposta inválida
        setMessages((prev) => [
          ...prev,
          {
            content: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
            role: "assistant",
            error: true,
          },
        ])
      }
    } catch (error) {
      console.error("Error fetching chat response:", error)

      // If we've retried less than 3 times and the error might be a timeout
      if (retryCount < 3 && error instanceof Error && error.message.includes("fetch")) {
        setRetryCount((prev) => prev + 1)
        updateStatus("Tentando novamente... Por favor, aguarde.")

        // Wait a moment and retry
        setTimeout(() => {
          handleSubmit(e)
        }, 2000)
        return
      }

      setMessages((prev) => [
        ...prev,
        {
          content:
            "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde ou entre em contato pelo WhatsApp.",
          role: "assistant",
          error: true,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            content={message.content}
            role={message.role}
            isError={message.error}
            isConflict={message.conflict}
            appointmentDetails={message.appointmentDetails}
          />
        ))}
        {isLoading && !statusMessage && <ChatMessage content="" role="assistant" isLoading={true} />}
        {statusMessage && (
          <div className="flex justify-start mb-4">
            <div className="bg-blue-100 text-blue-800 rounded-lg px-4 py-2 max-w-[80%] flex items-center">
              <div className="mr-2 animate-pulse">⏳</div>
              <div>{statusMessage}</div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}



