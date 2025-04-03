import { NextResponse } from "next/server"
import { siteConfig } from "@/config/site-config"


// Função para sanitizar as mensagens do usuário e prevenir prompt injection
function sanitizeUserMessages(messages: any[]) {
  return messages.map((msg) => {
    // Se for mensagem do usuário, sanitize o conteúdo
    if (msg.role === "user") {
      // Remove comandos que podem tentar manipular o modelo
      const sanitizedContent = msg.content
        .replace(
          /ignore previous instructions|ignore all instructions|forget your instructions/gi,
          "[conteúdo removido]",
        )
        .replace(/you are now|you're now|now you are|act as if|pretend to be/gi, "[conteúdo removido]")
        .replace(/system prompt|system message|system instruction/gi, "[conteúdo removido]")


      return {
        ...msg,
        content: sanitizedContent,
      }
    }


    // Retorna outras mensagens sem alteração
    return msg
  })
}


// Modifique a função POST para adicionar a opção de ignorar verificação SSL em desenvolvimento
export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json()
    const { messages } = body


    // Validar mensagens
    if (!Array.isArray(messages)) {
      console.error("Invalid messages format received")
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }


    // Extrair a última mensagem do usuário para fallback
    const lastUserMessage = messages.filter((m) => m.role === "user").pop()?.content || ""


    // Sanitizar mensagens do usuário para prevenir prompt injection
    const sanitizedMessages = sanitizeUserMessages(messages)


    // Usar o prompt do sistema configurado
    const systemPrompt = siteConfig.chatbot.systemPrompt


    // Adicionar o prompt do sistema se não estiver presente
    const messagesWithSystem =
      sanitizedMessages[0]?.role === "system"
        ? [{ role: "system", content: systemPrompt }, ...sanitizedMessages.slice(1)]
        : [{ role: "system", content: systemPrompt }, ...sanitizedMessages]


    // Verificar se as variáveis de ambiente necessárias estão configuradas
    if (!process.env.OPENAI_API_KEY) {
      console.warn("OPENAI_API_KEY is not configured, using fallback response")
      return NextResponse.json({
        content: getFallbackResponse(lastUserMessage),
        role: "assistant",
      })
    }


    // Configuração simplificada da API
    const endpoint = process.env.OPENAI_ENDPOINT
    const apiKey = process.env.OPENAI_API_KEY
    const model = process.env.OPENAI_MODEL


    console.log(`Attempting to call OpenAI API at: ${endpoint}`)


    try {
      // Verificar se o endpoint está definido
      if (!endpoint) {
        throw new Error("API endpoint is not defined")
      }


      // Opções para o fetch
      const fetchOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey || "",
        },
        body: JSON.stringify({
          model: model || "gpt-4",
          messages: messagesWithSystem,
          temperature: 0.8,
          top_p: 1,
          frequency_penalty: 2,
          presence_penalty: 0,
          max_tokens: 1000,
        }),
        // Adiciona um timeout para a requisição
        signal: AbortSignal.timeout(15000), // 15 segundos de timeout
      }


      // Adicionar opção para ignorar verificação SSL em ambiente de desenvolvimento
      if (process.env.NODE_ENV === "development") {
        // @ts-ignore - A propriedade 'agent' não está tipada no RequestInit, mas funciona no Node.js
        fetchOptions.agent = new (require("https").Agent)({
          rejectUnauthorized: false,
        })
        console.log("SSL verification disabled for development environment")
      }


      const response = await fetch(endpoint, fetchOptions)


      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API request failed with status ${response.status}: ${errorText}`)
        throw new Error(`API request failed with status ${response.status}: ${errorText}`)
      }


      const data = await response.json()
      const assistantResponse = data.choices[0]?.message?.content


      if (!assistantResponse) {
        throw new Error("No response content received from API")
      }


      // Retornar a resposta
      return NextResponse.json({
        content: assistantResponse,
        role: "assistant",
      })
    } catch (fetchError) {
      console.error("Error fetching from OpenAI API:", fetchError)


      // Retornar resposta de fallback em caso de erro na requisição
      return NextResponse.json({
        content: getFallbackResponse(lastUserMessage),
        role: "assistant",
      })
    }
  } catch (error) {
    console.error("Error in chat API:", error)


    // Retornar uma resposta de fallback em caso de erro geral
    return NextResponse.json(
      {
        content:
          "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde ou entre em contato pelo WhatsApp.",
        role: "assistant",
      },
      { status: 200 }, // Retornamos 200 mesmo em caso de erro para não quebrar a UI
    )
  }
}


// Função para simular resposta em caso de falha na API
function getFallbackResponse(userMessage: string) {
  const userMessageLower = userMessage.toLowerCase()


  // Respostas para perguntas comuns
  if (userMessageLower.includes("preço") || userMessageLower.includes("custo") || userMessageLower.includes("valor")) {
    return "Os preços dos nossos serviços variam de acordo com as necessidades específicas de cada cliente. Podemos agendar uma conversa com um de nossos especialistas para discutir seu caso em particular e fornecer uma estimativa personalizada. Você gostaria de falar com um especialista?"
  }


  if (
    userMessageLower.includes("contato") ||
    userMessageLower.includes("falar") ||
    userMessageLower.includes("ajuda")
  ) {
    return "Você pode entrar em contato conosco através do WhatsApp, pelo botão no canto da tela, ou agendar uma consulta pelo nosso site. Um de nossos especialistas terá prazer em conversar com você sobre suas necessidades específicas."
  }


  if (
    userMessageLower.includes("case") ||
    userMessageLower.includes("exemplo") ||
    userMessageLower.includes("resultado")
  ) {
    return "Temos diversos cases de sucesso! Por exemplo, para um e-commerce nacional, conseguimos 73% de aumento na conversão de vendas e 42% de redução no custo por lead. Para uma rede de clínicas médicas, reduzimos 68% das faltas às consultas. Podemos discutir como obter resultados semelhantes para o seu negócio!"
  }


  if (
    userMessageLower.includes("serviço") ||
    userMessageLower.includes("oferecem") ||
    userMessageLower.includes("fazem")
  ) {
    return "Oferecemos diversos serviços de IA conversacional, incluindo chatbots personalizados, voice bots, integrações com CRMs e APIs, automatização de processos e consultoria especializada. Qual desses serviços mais interessa para o seu negócio?"
  }


  // Resposta padrão
  return "Desculpe, estou com dificuldades para me conectar no momento. Você pode tentar novamente mais tarde ou entrar em contato pelo WhatsApp para falar com um de nossos especialistas. Estamos sempre disponíveis para ajudar com soluções de IA conversacional para o seu negócio!"
}





