process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

import { NextResponse } from "next/server"
import { siteConfig } from "@/config/site-config"
import type { FunctionCall, ScheduleResponse } from "./function-calls"
import { processFunctionCall } from "./utils"
import {
  SchedulingStatus,
  getUserFriendlyErrorMessage,
  formatAppointmentConfirmation,
  getSchedulingFallbackMessage,
} from "./scheduling-feedback"

// Add a function to create a status message response
function createStatusResponse(status: string): NextResponse {
  return NextResponse.json({
    content: status,
    role: "assistant",
    isStatusUpdate: true,
  })
}

// Fix the handleSchedulingError function and error handling

// Add a function to handle scheduling-related errors
function handleSchedulingError(error: unknown, context = "scheduling"): NextResponse {
  console.error(`Error in ${context}:`, error)

  const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
  const userFriendlyMessage = getUserFriendlyErrorMessage(errorMessage, context)

  return NextResponse.json({
    content: userFriendlyMessage,
    role: "assistant",
    error: true,
  })
}

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

// Definição das funções disponíveis para o modelo
const availableFunctions = [
  {
    name: "collectContactInfo",
    description: "Coleta informações de contato do usuário para agendamento ou contato posterior",
    parameters: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Nome completo do usuário",
        },
        email: {
          type: "string",
          format: "email",
          description: "Endereço de email do usuário",
        },
        phone: {
          type: "string",
          description: "Número de telefone do usuário (opcional)",
        },
        company: {
          type: "string",
          description: "Nome da empresa do usuário",
        },
        role: {
          type: "string",
          description: "Cargo ou função do usuário na empresa",
        },
        objectives: {
          type: "string",
          description: "Objetivos principais com chatbots/IA",
        },
        challenges: {
          type: "string",
          description: "Dores ou desafios atuais que espera resolver",
        },
        message: {
          type: "string",
          description: "Mensagem ou comentário adicional do usuário (opcional)",
        },
      },
      required: ["name", "email", "company"],
    },
  },
  {
    name: "getAvailableSlots",
    description: "Busca horários disponíveis para agendamento em uma data específica",
    parameters: {
      type: "object",
      properties: {
        data: {
          type: "string",
          format: "date",
          description: "Data para verificar disponibilidade no formato YYYY-MM-DD",
        },
      },
      required: ["data"],
    },
  },
  {
    name: "scheduleAppointment",
    description: "Agenda uma consulta ou reunião no Google Calendar",
    parameters: {
      type: "object",
      properties: {
        titulo: {
          type: "string",
          description: "Título da consulta ou reunião",
        },
        data_hora_inicio: {
          type: "string",
          format: "date-time",
          description: "Data e hora de início da consulta (formato ISO 8601)",
        },
        data_hora_fim: {
          type: "string",
          format: "date-time",
          description: "Data e hora de término da consulta (formato ISO 8601)",
        },
        convidados: {
          type: "array",
          items: {
            type: "string",
            format: "email",
          },
          description: "Lista de e-mails dos participantes convidados",
        },
        descricao: {
          type: "string",
          description: "Descrição do objetivo da consulta ou reunião",
        },
        tipo_servico: {
          type: "string",
          description: "Tipo de serviço ou consulta desejada",
          enum: [
            "Consultoria inicial gratuita",
            "Análise de necessidades",
            "Demonstração de soluções",
            "Planejamento estratégico",
          ],
        },
      },
      required: ["titulo", "data_hora_inicio", "data_hora_fim", "convidados", "tipo_servico"],
    },
  },
]

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

    // Adicionar data atual para referências relativas
    const currentDate = new Date()
    const formattedCurrentDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`

    // Modificar a parte onde adicionamos o prompt do sistema
    const systemPromptWithDate = `${siteConfig.chatbot.systemPrompt}

# Data Atual
Hoje é ${formattedCurrentDate}. Use esta data como referência para todas as expressões de data relativas como "hoje", "amanhã", "próxima semana", etc.
`

    // Substituir a linha que define messagesWithSystem com esta versão atualizada
    const messagesWithSystem =
      sanitizedMessages[0]?.role === "system"
        ? [{ role: "system", content: systemPromptWithDate }, ...sanitizedMessages.slice(1)]
        : [{ role: "system", content: systemPromptWithDate }, ...sanitizedMessages]

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
          functions: availableFunctions,
          function_call: "auto", // Permite que o modelo decida quando chamar uma função
          temperature: 0.7,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          max_tokens: 1000,
        }),
        // Adiciona um timeout para a requisição
        signal: AbortSignal.timeout(15000), // 15 segundos de timeout
      }

      const response = await fetch(endpoint, fetchOptions)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API request failed with status ${response.status}: ${errorText}`)
        throw new Error(`API request failed with status ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      const assistantMessage = data.choices[0]?.message

      // Verificar se o assistente está chamando uma função
      if (assistantMessage.function_call) {
        const functionCall = assistantMessage.function_call as FunctionCall
        console.log(`Function call detected: ${functionCall.name}`)

        // Send an immediate status update for scheduling-related functions
        if (functionCall.name === "scheduleAppointment") {
          // Send a status update to the client
          createStatusResponse(SchedulingStatus.SCHEDULING)
        } else if (functionCall.name === "getAvailableSlots") {
          createStatusResponse(SchedulingStatus.CHECKING_AVAILABILITY)
        } else if (functionCall.name === "collectContactInfo") {
          createStatusResponse(SchedulingStatus.COLLECTING_INFO)
        }

        // Usar a nova função processFunctionCall para processar a chamada de função
        const functionCallResult = await processFunctionCall(functionCall)

        // If there's a status update, send it to the client
        if (functionCallResult.statusUpdate) {
          createStatusResponse(functionCallResult.statusUpdate)
        }

        if (functionCallResult.success) {
          // Adicionar a resposta da função às mensagens
          const functionResponseMessages = [
            ...messagesWithSystem,
            {
              role: "assistant",
              content: null,
              function_call: {
                name: functionCall.name,
                arguments: functionCall.arguments,
              },
            },
            {
              role: "function",
              name: functionCall.name,
              content: JSON.stringify(functionCallResult.result),
            },
          ]

          // Fazer nova requisição para a API com a resposta da função
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

          try {
            // Send a status update that we're processing the function result
            if (functionCall.name === "scheduleAppointment") {
              createStatusResponse(SchedulingStatus.CONFIRMING)
            }

            const functionResponse = await fetch(endpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "api-key": apiKey || "",
              },
              body: JSON.stringify({
                model: model || "gpt-4",
                messages: functionResponseMessages,
                functions: availableFunctions,
                function_call: "auto",
                temperature: 0.7,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                max_tokens: 1000,
              }),
              signal: controller.signal,
            })

            clearTimeout(timeoutId)

            if (!functionResponse.ok) {
              throw new Error(`API request failed with status ${functionResponse.status}`)
            }

            const functionData = await functionResponse.json()
            const functionAssistantMessage = functionData.choices[0]?.message

            // Verificar se o assistente está chamando outra função após receber o resultado da primeira
            if (functionAssistantMessage.function_call) {
              const secondFunctionCall = functionAssistantMessage.function_call as FunctionCall
              console.log(`Second function call detected: ${secondFunctionCall.name}`)

              // Send a status update for the second function call
              if (secondFunctionCall.name === "scheduleAppointment") {
                createStatusResponse(SchedulingStatus.SCHEDULING)
              }

              const secondFunctionResult = await processFunctionCall(secondFunctionCall)
              console.log(`Second function result:`, JSON.stringify(secondFunctionResult, null, 2))

              // If there's a status update from the second function, send it to the client
              if (secondFunctionResult.statusUpdate) {
                createStatusResponse(secondFunctionResult.statusUpdate)
              }

              if (secondFunctionResult.success && secondFunctionResult.result) {
                // Adicionar a resposta da segunda função às mensagens
                const secondFunctionMessages = [
                  ...functionResponseMessages,
                  {
                    role: "assistant",
                    content: null,
                    function_call: {
                      name: secondFunctionCall.name,
                      arguments: secondFunctionCall.arguments,
                    },
                  },
                  {
                    role: "function",
                    name: secondFunctionCall.name,
                    content: JSON.stringify(secondFunctionResult.result),
                  },
                ]

                console.log("Preparing to make final API call with second function result")

                try {
                  // Send a status update that we're finalizing the appointment
                  if (secondFunctionCall.name === "scheduleAppointment") {
                    createStatusResponse(SchedulingStatus.CONFIRMING)
                  }

                  // Fazer nova requisição para a API com a resposta da segunda função
                  console.log("Making final API call...")

                  const controller = new AbortController()
                  const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

                  try {
                    const finalResponse = await fetch(endpoint, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "api-key": apiKey || "",
                      },
                      body: JSON.stringify({
                        model: model || "gpt-4",
                        messages: secondFunctionMessages,
                        functions: availableFunctions,
                        function_call: "auto",
                        temperature: 0.7,
                        top_p: 1,
                        frequency_penalty: 0,
                        presence_penalty: 0,
                        max_tokens: 1000,
                      }),
                      signal: controller.signal,
                    })

                    clearTimeout(timeoutId)

                    console.log(`Final API response status: ${finalResponse.status}`)

                    if (!finalResponse.ok) {
                      const errorText = await finalResponse.text()
                      console.error(`Final API request failed with status ${finalResponse.status}: ${errorText}`)

                      // Se a requisição final falhar, gerar uma resposta de sucesso com base no resultado da função
                      if (secondFunctionCall.name === "scheduleAppointment" && secondFunctionResult.result) {
                        console.log("Generating fallback response for scheduleAppointment")
                        // Verificar se o resultado é do tipo ScheduleResponse e tem appointmentDetails
                        const scheduleResult = secondFunctionResult.result as ScheduleResponse

                        if (scheduleResult.success && scheduleResult.appointmentDetails) {
                          console.log("Found appointmentDetails, generating formatted response")

                          // Use the formatting utility to create a nice confirmation message
                          const confirmationMessage = formatAppointmentConfirmation(scheduleResult.appointmentDetails)

                          console.log(`Returning success response with formatted confirmation`)
                          return NextResponse.json({
                            content: confirmationMessage,
                            role: "assistant",
                            appointmentDetails: scheduleResult.appointmentDetails,
                          })
                        } else if (!scheduleResult.success) {
                          // Handle scheduling conflicts
                          console.log("Scheduling conflict detected, suggesting alternatives")

                          let message = `Desculpe, o horário solicitado não está disponível. `

                          // If we have alternative suggestions, include them
                          if (
                            scheduleResult.alternativeSuggestions &&
                            scheduleResult.alternativeSuggestions.length > 0
                          ) {
                            message += `\n\nPor favor, considere os seguintes horários alternativos:\n\n`
                            scheduleResult.alternativeSuggestions.forEach((slot) => {
                              message += `- ${slot}\n`
                            })
                          } else if (scheduleResult.availableSlots && scheduleResult.availableSlots.length > 0) {
                            message += `\n\nTemos os seguintes horários disponíveis:\n\n`
                            scheduleResult.availableSlots.forEach((slot) => {
                              message += `- ${slot}\n`
                            })
                          }

                          message += `\n\nPor favor, escolha um horário alternativo que seja conveniente para você. 📅`

                          return NextResponse.json({
                            content: message,
                            role: "assistant",
                            conflict: true,
                          })
                        } else {
                          console.log("No appointmentDetails found in scheduleResult:", scheduleResult)
                        }
                      }

                      throw new Error(`Final API request failed with status ${finalResponse.status}: ${errorText}`)
                    }

                    console.log("Final API call successful, parsing response...")
                    const finalData = await finalResponse.json()
                    console.log("Final API response data:", JSON.stringify(finalData, null, 2))

                    const finalAssistantMessage = finalData.choices[0]?.message
                    console.log("Final assistant message:", JSON.stringify(finalAssistantMessage, null, 2))

                    // Verificar se a resposta final contém conteúdo
                    if (
                      (!finalAssistantMessage.content || finalAssistantMessage.content.trim() === "") &&
                      secondFunctionCall.name === "scheduleAppointment" &&
                      secondFunctionResult.result
                    ) {
                      console.log("Final message has no content, generating formatted response")
                      // Verificar se o resultado é do tipo ScheduleResponse e tem appointmentDetails
                      const scheduleResult = secondFunctionResult.result as ScheduleResponse

                      if (scheduleResult.success && scheduleResult.appointmentDetails) {
                        console.log("Found appointmentDetails, generating formatted response")

                        // Use the formatting utility to create a nice confirmation message
                        const confirmationMessage = formatAppointmentConfirmation(scheduleResult.appointmentDetails)

                        console.log(`Returning success response with formatted confirmation`)
                        return NextResponse.json({
                          content: confirmationMessage,
                          role: "assistant",
                          appointmentDetails: scheduleResult.appointmentDetails,
                        })
                      } else if (!scheduleResult.success) {
                        // Handle scheduling conflicts
                        console.log("Scheduling conflict detected, suggesting alternatives")

                        let message = `Desculpe, o horário solicitado não está disponível. `

                        // If we have alternative suggestions, include them
                        if (scheduleResult.alternativeSuggestions && scheduleResult.alternativeSuggestions.length > 0) {
                          message += `\n\nPor favor, considere os seguintes horários alternativos:\n\n`
                          scheduleResult.alternativeSuggestions.forEach((slot) => {
                            message += `- ${slot}\n`
                          })
                        } else if (scheduleResult.availableSlots && scheduleResult.availableSlots.length > 0) {
                          message += `\n\nTemos os seguintes horários disponíveis:\n\n`
                          scheduleResult.availableSlots.forEach((slot) => {
                            message += `- ${slot}\n`
                          })
                        }

                        message += `\n\nPor favor, escolha um horário alternativo que seja conveniente para você. 📅`

                        return NextResponse.json({
                          content: message,
                          role: "assistant",
                          conflict: true,
                        })
                      } else {
                        console.log("No appointmentDetails found in scheduleResult:", scheduleResult)
                      }
                    }

                    // CORREÇÃO AQUI: Simplificar o retorno da resposta final
                    if (finalAssistantMessage && finalAssistantMessage.content) {
                      console.log("Returning simplified final message")
                      return NextResponse.json({
                        content: finalAssistantMessage.content,
                        role: "assistant",
                      })
                    } else if (secondFunctionCall.name === "scheduleAppointment" && secondFunctionResult.result) {
                      // Fallback para agendamento
                      const scheduleResult = secondFunctionResult.result as ScheduleResponse
                      if (scheduleResult.success && scheduleResult.appointmentDetails) {
                        // Use the formatting utility to create a nice confirmation message
                        const confirmationMessage = formatAppointmentConfirmation(scheduleResult.appointmentDetails)

                        return NextResponse.json({
                          content: confirmationMessage,
                          role: "assistant",
                          appointmentDetails: scheduleResult.appointmentDetails,
                        })
                      } else if (!scheduleResult.success) {
                        // Handle scheduling conflicts
                        console.log("Scheduling conflict detected, suggesting alternatives")

                        let message = `Desculpe, o horário solicitado não está disponível. `

                        // If we have alternative suggestions, include them
                        if (scheduleResult.alternativeSuggestions && scheduleResult.alternativeSuggestions.length > 0) {
                          message += `\n\nPor favor, considere os seguintes horários alternativos:\n\n`
                          scheduleResult.alternativeSuggestions.forEach((slot) => {
                            message += `- ${slot}\n`
                          })
                        } else if (scheduleResult.availableSlots && scheduleResult.availableSlots.length > 0) {
                          message += `\n\nTemos os seguintes horários disponíveis:\n\n`
                          scheduleResult.availableSlots.forEach((slot) => {
                            message += `- ${slot}\n`
                          })
                        }

                        message += `\n\nPor favor, escolha um horário alternativo que seja conveniente para você. 📅`

                        return NextResponse.json({
                          content: message,
                          role: "assistant",
                          conflict: true,
                        })
                      }
                    }

                    // Fallback genérico
                    return NextResponse.json({
                      content: "Sua solicitação foi processada com sucesso. Obrigado por escolher a Strongbots!",
                      role: "assistant",
                    })
                  } catch (error: unknown) {
                    clearTimeout(timeoutId)

                    // Handle abort errors specifically
                    if (error instanceof Error && error.name === "AbortError") {
                      console.log("Request was aborted due to timeout")
                      // Return a friendly timeout message
                      return NextResponse.json({
                        content:
                          "Estamos enfrentando uma lentidão temporária. Suas informações foram salvas. Você pode tentar novamente em alguns instantes ou entrar em contato pelo WhatsApp para confirmar seu agendamento.",
                        role: "assistant",
                        error: true,
                        timeout: true,
                      })
                    }

                    console.error("Error during final API call:", error)

                    // Tentar gerar uma resposta de fallback para o agendamento
                    if (secondFunctionCall.name === "scheduleAppointment" && secondFunctionResult.result) {
                      console.log("Generating fallback response after API error")
                      const scheduleResult = secondFunctionResult.result as ScheduleResponse

                      if (scheduleResult.success && scheduleResult.appointmentDetails) {
                        console.log("Found appointmentDetails, generating formatted response")

                        // Use the formatting utility to create a nice confirmation message
                        const confirmationMessage = formatAppointmentConfirmation(scheduleResult.appointmentDetails)

                        console.log(`Returning success response with formatted confirmation`)
                        return NextResponse.json({
                          content: confirmationMessage,
                          role: "assistant",
                          appointmentDetails: scheduleResult.appointmentDetails,
                        })
                      } else if (!scheduleResult.success) {
                        // Handle scheduling conflicts
                        return NextResponse.json({
                          content: `Desculpe, o horário solicitado não está disponível. Por favor, escolha outro horário.`,
                          role: "assistant",
                          conflict: true,
                        })
                      }
                    }

                    // Fallback genérico com opções de contato
                    return NextResponse.json({
                      content: getSchedulingFallbackMessage(),
                      role: "assistant",
                      error: true,
                    })
                  }
                } catch (finalApiError) {
                  console.error("Error during final API call:", finalApiError)

                  // Tentar gerar uma resposta de fallback para o agendamento
                  if (secondFunctionCall.name === "scheduleAppointment" && secondFunctionResult.result) {
                    console.log("Generating fallback response after API error")
                    const scheduleResult = secondFunctionResult.result as ScheduleResponse

                    if (scheduleResult.success && scheduleResult.appointmentDetails) {
                      console.log("Found appointmentDetails, generating formatted response")

                      // Use the formatting utility to create a nice confirmation message
                      const confirmationMessage = formatAppointmentConfirmation(scheduleResult.appointmentDetails)

                      return NextResponse.json({
                        content: confirmationMessage,
                        role: "assistant",
                        appointmentDetails: scheduleResult.appointmentDetails,
                      })
                    } else if (!scheduleResult.success) {
                      // Handle scheduling conflicts
                      return NextResponse.json({
                        content: `Desculpe, o horário solicitado não está disponível. Por favor, escolha outro horário.`,
                        role: "assistant",
                        conflict: true,
                      })
                    }
                  }

                  // Fallback genérico com opções de contato
                  return NextResponse.json({
                    content: getSchedulingFallbackMessage(),
                    role: "assistant",
                    error: true,
                  })
                }
              } else {
                // If there was an error executing the second function
                console.error("Error executing second function:", secondFunctionResult.error)

                // Check if the error is recoverable (like a timeout)
                if (secondFunctionResult.recoverable) {
                  // For scheduling errors, provide a more helpful message
                  if (secondFunctionCall.name === "scheduleAppointment") {
                    return NextResponse.json({
                      content: `Desculpe, estamos enfrentando uma lentidão temporária no sistema de agendamento. Suas informações foram salvas e você pode tentar novamente em alguns instantes ou entrar em contato pelo WhatsApp para confirmar seu agendamento. 📱`,
                      role: "assistant",
                      error: true,
                      recoverable: true,
                    })
                  }
                }

                // If there's a user-friendly message, use it
                if (secondFunctionResult.userMessage) {
                  return NextResponse.json({
                    content: secondFunctionResult.userMessage,
                    role: "assistant",
                    error: true,
                  })
                }

                return NextResponse.json({
                  content: `Desculpe, ocorreu um erro ao processar sua solicitação: ${secondFunctionResult.error}`,
                  role: "assistant",
                  error: true,
                })
              }
            }

            // Retornar a resposta do assistente após processar a função
            return NextResponse.json({
              content: functionAssistantMessage.content || "Sua solicitação foi processada com sucesso.",
              role: "assistant",
            })
          } catch (error: unknown) {
            clearTimeout(timeoutId)

            // Handle abort errors specifically
            if (error instanceof Error && error.name === "AbortError") {
              console.log("Request was aborted due to timeout")
              // Return a friendly timeout message
              return NextResponse.json({
                content:
                  "Estamos enfrentando uma lentidão temporária. Suas informações foram salvas. Você pode tentar novamente em alguns instantes ou entrar em contato pelo WhatsApp para confirmar seu agendamento.",
                role: "assistant",
                error: true,
                timeout: true,
              })
            }

            // Se houve erro na execução da função, retornar mensagem de erro
            console.error("Error executing function:", functionCallResult.error)

            // If there's a user-friendly message, use it
            if (functionCallResult.userMessage) {
              return NextResponse.json({
                content: functionCallResult.userMessage,
                role: "assistant",
                error: true,
              })
            }

            // Retornar a chamada de função para o cliente processar ou uma mensagem de erro
            return NextResponse.json({
              content: `Desculpe, ocorreu um erro ao processar sua solicitação: ${functionCallResult.error}`,
              role: "assistant",
              error: true,
            })
          }
        } else {
          // Se houve erro na execução da função, retornar mensagem de erro
          console.error("Error executing function:", functionCallResult.error)

          // If there's a user-friendly message, use it
          if (functionCallResult.userMessage) {
            return NextResponse.json({
              content: functionCallResult.userMessage,
              role: "assistant",
              error: true,
            })
          }

          // Retornar a chamada de função para o cliente processar ou uma mensagem de erro
          return NextResponse.json({
            content: `Desculpe, ocorreu um erro ao processar sua solicitação: ${functionCallResult.error}`,
            role: "assistant",
            error: true,
          })
        }
      }

      // Se não houver chamada de função, retornar a resposta normal
      return NextResponse.json({
        content: assistantMessage.content || "Não foi possível processar sua solicitação.",
        role: "assistant",
      })
    } catch (error) {
      console.error("Error fetching from OpenAI API:", error)

      // Retornar resposta de fallback em caso de erro na requisição
      return NextResponse.json({
        content: getFallbackResponse(lastUserMessage),
        role: "assistant",
        error: true,
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
        error: true,
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

  if (
    userMessageLower.includes("agenda") ||
    userMessageLower.includes("agendar") ||
    userMessageLower.includes("marcar") ||
    userMessageLower.includes("consulta") ||
    userMessageLower.includes("reunião")
  ) {
    return "Posso ajudar você a agendar uma consulta com nossos especialistas. Para isso, precisarei de algumas informações como seu nome, email e a data/horário de preferência. Você gostaria de agendar uma consulta agora?"
  }

  // Resposta padrão
  return "Desculpe, estou com dificuldades para me conectar no momento. Você pode tentar novamente mais tarde ou entrar em contato pelo WhatsApp para falar com um de nossos especialistas. Estamos sempre disponíveis para ajudar com soluções de IA conversacional para o seu negócio!"
}



