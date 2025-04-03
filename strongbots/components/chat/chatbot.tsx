"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send, X, Loader2, Bot, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useChatbot } from "@/hooks/use-chatbot"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useHasMounted } from "@/hooks/use-has-mounted"
import Image from "next/image"
import { Card } from "@/components/ui/card"

// Adicione a importação do siteConfig no topo do arquivo
import { siteConfig } from "@/config/site-config"

// Interface para as mensagens
interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

// Modifique o componente Chatbot para verificar se está habilitado
export default function Chatbot() {
  const { isOpen, setIsOpen } = useChatbot()
  const mounted = useHasMounted()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Estado para gerenciar as mensagens, input e loading
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: siteConfig.chatbot.welcomeMessage,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(true)

  // Scroll para o final das mensagens
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Foco no input quando o chatbot abre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  // Ajusta a altura do textarea automaticamente
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`
    }
  }, [input])

  const toggleChatbot = useCallback(() => {
    setIsOpen(!isOpen)
  }, [setIsOpen, isOpen])

  // Função para enviar mensagem para a API
  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    // Esconde sugestões após a primeira mensagem
    setShowSuggestions(false)

    // Adiciona a mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      // Formata as mensagens para enviar para a API
      const messagesToSend = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      // Adiciona a mensagem do usuário
      messagesToSend.push({
        role: "user",
        content,
      })

      // Implementação de fallback para quando a API falhar
      let assistantResponse

      try {
        // Tenta fazer a requisição para a API
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages: messagesToSend }),
          // Adiciona um timeout para a requisição
          signal: AbortSignal.timeout(10000), // 10 segundos de timeout
        })

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()
        assistantResponse = data.content
      } catch (apiError) {
        console.error("Error fetching from API:", apiError)
        // Se a API falhar, use respostas de fallback baseadas em palavras-chave
        assistantResponse = generateFallbackResponse(content)
        // Lança o erro novamente para ser capturado pelo catch externo
        throw apiError
      }

      // Adiciona a resposta do assistente
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: assistantResponse || "Desculpe, não consegui processar sua solicitação.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err)

      // Não exibe o erro para o usuário se já estamos usando uma resposta de fallback
      if (!(err instanceof Error && err.message.includes("API request failed"))) {
        setError(
          "Estamos com um probleminha técnico. Que tal tentar novamente em alguns instantes ou falar diretamente com nossa equipe pelo WhatsApp?",
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Adicione esta função de fallback logo após a função sendMessage

  // Função para gerar respostas de fallback baseadas em palavras-chave
  const generateFallbackResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase()

    // Respostas para perguntas comuns
    if (
      lowerCaseMessage.includes("preço") ||
      lowerCaseMessage.includes("custo") ||
      lowerCaseMessage.includes("valor")
    ) {
      return "Nossos preços são personalizados de acordo com as necessidades específicas do seu negócio. Podemos conversar sobre seu caso particular e apresentar uma proposta sob medida. Gostaria de falar com um de nossos especialistas?"
    }

    if (
      lowerCaseMessage.includes("tempo") ||
      lowerCaseMessage.includes("prazo") ||
      lowerCaseMessage.includes("implementar")
    ) {
      return "Geralmente conseguimos entregar as primeiras soluções em 2-4 semanas, dependendo da complexidade do projeto. Cada caso é único, e podemos discutir um cronograma personalizado para o seu negócio em uma consultoria gratuita."
    }

    if (
      lowerCaseMessage.includes("resultado") ||
      lowerCaseMessage.includes("benefício") ||
      lowerCaseMessage.includes("retorno")
    ) {
      return "Nossos clientes costumam ver resultados significativos já nos primeiros 90 dias: aumento médio de 73% nas conversões, redução de 42% nos custos operacionais e melhoria na satisfação do cliente. Cada setor tem seus próprios indicadores de sucesso, que podemos discutir em detalhes."
    }

    if (
      lowerCaseMessage.includes("contato") ||
      lowerCaseMessage.includes("falar") ||
      lowerCaseMessage.includes("especialista")
    ) {
      return "Você pode falar com nossa equipe pelo WhatsApp (botão no canto da tela) ou agendar uma consultoria gratuita pelo site. Nossos especialistas estão prontos para entender suas necessidades e propor a melhor solução."
    }

    // Resposta padrão para outras perguntas
    return "Estou com uma pequena dificuldade técnica no momento, mas não quero deixar você sem resposta. Para uma consultoria personalizada e gratuita, recomendo falar diretamente com um de nossos especialistas. Posso ajudar com mais alguma informação sobre nossas soluções de IA conversacional?"
  }

  // Handler para mudança no input
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  // Handler para tecla Enter (enviar com Enter, nova linha com Shift+Enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (input.trim() && !isLoading) {
        sendMessage(input)
      }
    }
  }

  // Handler para envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      sendMessage(input)
    }
  }

  // Sugestões comuns para usuários
  const suggestions = [
    "Quanto custa implementar IA?",
    "Quais resultados posso esperar?",
    "Quanto tempo para implementar?",
    "Como funciona o processo?",
  ]

  // Não renderizar nada durante a hidratação para evitar erros
  if (!mounted) {
    return null
  }

  // Se o chatbot estiver desabilitado na configuração, não renderize nada
  if (!siteConfig.chatbot.enabled) {
    return null
  }

  return (
    <>
      {/* Chatbot toggle button */}
      <div className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
                <Button
                  onClick={toggleChatbot}
                  size="lg"
                  aria-label="Abrir assistente de chat"
                  aria-expanded={isOpen}
                  className="rounded-full h-16 w-16 bg-primary-700 hover:bg-primary-800 text-white shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:outline-none"
                >
                  <MessageSquare className="h-6 w-6" />
                </Button>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.3 }}
                  className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
                >
                  1
                </motion.span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chatbot window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 right-0 z-50 w-full md:max-w-md md:bottom-8 md:right-8"
          >
            <Card className="border border-primary-200 md:rounded-2xl shadow-xl overflow-hidden flex flex-col h-[100vh] md:h-[600px] md:max-h-[80vh] max-h-screen">
              {/* Header */}
              <div className="bg-primary-700 p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
                <div className="flex items-center">
                  <div className="bg-white/10 p-2 rounded-full mr-3">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-medium">Strongbots</h3>
                    <p className="text-white/70 text-xs">Especialista em IA Conversacional</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleChatbot}
                  className="text-white hover:text-white/80 hover:bg-white/10 rounded-full h-8 w-8 p-0"
                  aria-label="Fechar chat"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Empty state with illustration */}
              {messages.length === 1 && (
                <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
                  <div className="relative w-48 h-48 mb-6">
                    <Image
                      src="/chatbot-user.png"
                      alt="Usuário interagindo com chatbot"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">Desbloqueie o potencial da sua empresa</h3>
                  <p className="text-center text-neutral-600 mb-6">
                    Nossos clientes aumentam receitas em até 40% com nossas soluções. Como posso ajudar você hoje?
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {suggestions.map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="secondary"
                        size="sm"
                        className="rounded-full text-sm py-1 h-auto"
                        onClick={() => sendMessage(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages.length > 1 && (
                <div className="flex-1 overflow-y-auto p-4 pb-safe bg-gray-50 pt-2 overflow-x-hidden">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                          <Bot className="h-4 w-4 text-primary-700" />
                        </div>
                      )}

                      <div
                        className={`relative px-4 py-3 rounded-lg max-w-[75%] ${
                          message.role === "user"
                            ? "bg-primary-700 text-white rounded-tr-none after:content-[''] after:absolute after:right-[-8px] after:top-[8px] after:border-[8px] after:border-transparent after:border-l-primary-700 break-words overflow-hidden"
                            : "bg-white border border-gray-200 rounded-tl-none shadow-sm before:content-[''] before:absolute before:left-[-8px] before:top-[8px] before:border-[8px] before:border-transparent before:border-r-white before:border-r-white before:z-10 before:border-t-transparent before:border-b-transparent before:border-l-transparent before:shadow-sm"
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm md:text-base overflow-wrap-anywhere hyphens-auto">
                          {message.content}
                        </p>
                        <span className="text-xs opacity-70 block mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>

                      {message.role === "user" && (
                        <div className="h-8 w-8 rounded-full bg-primary-700 flex items-center justify-center ml-2 flex-shrink-0 mt-1">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isLoading && (
                    <div className="mb-4 flex justify-start">
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                        <Bot className="h-4 w-4 text-primary-700" />
                      </div>
                      <div className="px-4 py-3 rounded-lg max-w-[75%] bg-white border border-gray-200 rounded-tl-none shadow-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce"></div>
                          <div
                            className="w-2 h-2 rounded-full bg-primary-500 animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-primary-500 animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="mb-4 flex justify-start">
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                        <Bot className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="px-4 py-3 rounded-lg max-w-[75%] bg-red-50 border border-red-200 rounded-tl-none">
                        <p className="text-red-600 text-sm">{error}</p>
                      </div>
                    </div>
                  )}

                  {/* Suggestions after messages */}
                  {messages.length > 1 && showSuggestions && (
                    <div className="mt-4 mb-2">
                      <p className="text-xs text-gray-500 mb-2">Perguntas sugeridas:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestions.slice(0, 3).map((suggestion) => (
                          <Button
                            key={suggestion}
                            variant="secondary"
                            size="xs"
                            className="rounded-full text-xs py-1 h-auto"
                            onClick={() => sendMessage(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="p-4 pt-3 pb-safe border-t border-gray-200 bg-white sticky bottom-0 z-10 shadow-md"
              >
                <div className="relative flex items-center">
                  <div className="relative flex-1 min-w-0">
                    <Textarea
                      ref={inputRef}
                      placeholder="Digite sua mensagem aqui..."
                      value={input}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      className="pr-12 pl-5 py-3 min-h-[56px] max-h-[120px] text-base border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 rounded-full shadow-sm transition-all resize-none overflow-auto"
                      disabled={isLoading}
                      rows={1}
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                      aria-label="Enviar mensagem"
                    >
                      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>

                <div className="mt-2 text-xs text-gray-500 text-center">
                  <span>Enter para enviar • Shift+Enter para nova linha</span>
                </div>

                {/* Contact link */}
                <div className="mt-2 text-center">
                  <Button
                    variant="link"
                    size="sm"
                    className="text-xs text-primary-600 font-normal hover:text-primary-700 transition-colors"
                    onClick={() => window.open("https://wa.me/5531984353375", "_blank")}
                  >
                    Prefere falar com um humano? Fale conosco diretamente
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </form>

              {/* Floating close button for mobile */}
              {isMobile && (
                <div className="fixed top-4 right-4 z-50">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={toggleChatbot}
                    className="rounded-full h-10 w-10 flex items-center justify-center shadow-lg"
                    aria-label="Fechar chat"
                  >
                    <X className="h-5 w-5 text-white" />
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

