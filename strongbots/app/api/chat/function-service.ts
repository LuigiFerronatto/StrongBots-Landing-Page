// services/function-service.ts
import { getAuthenticatedCalendarClient, saveAppointmentLocally } from "@/app/api/calendar/utils"
import type { SaveAppointmentResult } from "@/app/api/calendar/types"
import type { ContactInfo, ScheduleAppointment, GetAvailableSlots } from "@/app/api/chat/function-calls"
import { SchedulingStatus, generateAlternativeTimeSlots } from "@/app/api/chat/scheduling-feedback"

// Função para executar a função chamada pelo modelo
export async function executeFunction(functionName: string, args: any) {
  console.log(`Executing function: ${functionName} with args:`, args)

  switch (functionName) {
    case "collectContactInfo":
      return collectContactInfo(args)
    case "scheduleAppointment":
      return scheduleAppointment(args)
    case "getAvailableSlots":
      return getAvailableSlots(args)
    default:
      throw new Error(`Unknown function: ${functionName}`)
  }
}

// Função para coletar informações de contato
async function collectContactInfo(args: ContactInfo) {
  try {
    // Validar informações mínimas necessárias
    if (!args.name || args.name.trim().length < 2 || args.name === "Usuário Anônimo") {
      return {
        success: false,
        message: "É necessário fornecer um nome válido.",
        statusUpdate: SchedulingStatus.FAILED,
      }
    }

    if (!args.email || !args.email.includes("@") || args.email === "usuario.anonimo@email.com") {
      return {
        success: false,
        message: "É necessário fornecer um email válido.",
        statusUpdate: SchedulingStatus.FAILED,
      }
    }

    // Verificar se a empresa foi fornecida
    if (!args.company || args.company.trim().length < 2) {
      return {
        success: false,
        message: "É necessário fornecer o nome da empresa.",
        statusUpdate: SchedulingStatus.FAILED,
      }
    }

    // Verificar se o cargo foi fornecido
    if (!args.role || args.role.trim().length < 2) {
      return {
        success: false,
        message: "É necessário fornecer o cargo ou função na empresa.",
        statusUpdate: SchedulingStatus.FAILED,
      }
    }

    // Verificar se os objetivos foram fornecidos
    if (!args.objectives || args.objectives.trim().length < 5) {
      return {
        success: false,
        message: "É necessário fornecer os objetivos com chatbots/IA.",
        statusUpdate: SchedulingStatus.FAILED,
      }
    }

    // Verificar se os desafios foram fornecidos
    if (!args.challenges || args.challenges.trim().length < 5) {
      return {
        success: false,
        message: "É necessário fornecer os desafios ou dores atuais.",
        statusUpdate: SchedulingStatus.FAILED,
      }
    }

    // Aqui você pode implementar a lógica para salvar as informações de contato
    // Por exemplo, enviar para um CRM, banco de dados, etc.

    // Salvar em um arquivo local para demonstração
    const fs = require("fs")
    const path = require("path")
    const contactsPath = path.join(process.cwd(), "contacts.json")

    let contacts = []
    try {
      if (fs.existsSync(contactsPath)) {
        const existingContacts = fs.readFileSync(contactsPath, "utf8")
        contacts = JSON.parse(existingContacts)
      }
    } catch (error) {
      // Arquivo não existe ou está vazio
      contacts = []
    }

    // Adicionar novo contato com timestamp
    contacts.push({
      ...args,
      timestamp: new Date().toISOString(),
    })

    // Salvar contatos atualizados
    fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2))

    return {
      success: true,
      message: "Informações de contato coletadas com sucesso",
      data: args,
      statusUpdate: SchedulingStatus.COLLECTING_INFO,
    }
  } catch (error) {
    console.error("Erro ao coletar informações de contato:", error)
    return {
      success: false,
      message: "Erro ao processar informações de contato",
      error: error instanceof Error ? error.message : "Erro desconhecido",
      statusUpdate: SchedulingStatus.FAILED,
    }
  }
}

// Função para agendar um compromisso
async function scheduleAppointment(args: ScheduleAppointment) {
  try {
    console.log("Iniciando agendamento com argumentos:", JSON.stringify(args, null, 2))

    // Validar dados obrigatórios
    if (!args.titulo || args.titulo === "Consulta com" || args.titulo.includes("Usuário Anônimo")) {
      return {
        success: false,
        message: "É necessário fornecer um nome válido para o agendamento.",
        statusUpdate: SchedulingStatus.FAILED,
      }
    }

    if (
      !args.convidados ||
      args.convidados.length === 0 ||
      !args.convidados[0] ||
      !args.convidados[0].includes("@") ||
      args.convidados[0] === "usuario.anonimo@email.com"
    ) {
      return {
        success: false,
        message: "É necessário fornecer um email válido para o agendamento.",
        statusUpdate: SchedulingStatus.FAILED,
      }
    }

    // Verificar se há descrição com informações completas
    if (!args.descricao || args.descricao.length < 50) {
      return {
        success: false,
        message: "É necessário fornecer mais informações sobre o objetivo da consulta.",
        statusUpdate: SchedulingStatus.FAILED,
      }
    }

    // Extrair data e hora de início e fim
    const startTime = new Date(args.data_hora_inicio)
    const endTime = new Date(args.data_hora_fim)

    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      return {
        success: false,
        message: "Data ou hora inválida para o agendamento.",
        statusUpdate: SchedulingStatus.FAILED,
      }
    }

    // Provide a status update that we're checking availability
    console.log("Verificando disponibilidade para:", startTime.toISOString())

    // Verificar disponibilidade no Google Calendar
    const isAvailable = await checkAvailability(startTime, endTime)

    if (!isAvailable) {
      // Get available slots for the same day to suggest alternatives
      const date = `${startTime.getFullYear()}-${String(startTime.getMonth() + 1).padStart(2, "0")}-${String(startTime.getDate()).padStart(2, "0")}`
      const availableSlotsResult = await getAvailableSlots({ data: date })

      let alternativeSuggestions: string[] = [] // Explicitly define the type
      if (availableSlotsResult.success && availableSlotsResult.availableSlots) {
        const requestedTime = `${startTime.getHours().toString().padStart(2, "0")}:${startTime.getMinutes().toString().padStart(2, "0")}`
        alternativeSuggestions = generateAlternativeTimeSlots(requestedTime, availableSlotsResult.availableSlots)
      }

      return {
        success: false,
        message: `Desculpe, o horário de ${formatTime(startTime)} em ${formatDate(startTime)} não está disponível. Por favor, escolha outro horário.`,
        alternativeSuggestions,
        availableSlots: availableSlotsResult.success ? availableSlotsResult.availableSlots : [],
        statusUpdate: SchedulingStatus.CONFLICT,
      }
    }

    // Provide a status update that we're creating the calendar event
    console.log("Criando evento no calendário...")

    // Criar evento no Google Calendar
    const eventDetails = await createCalendarEvent(args)

    return {
      success: true,
      message: `Agendamento confirmado para ${formatDate(startTime)} às ${formatTime(startTime)}`,
      appointmentId: eventDetails.id,
      appointmentDetails: {
        titulo: args.titulo,
        data_hora_inicio: args.data_hora_inicio,
        data_hora_fim: args.data_hora_fim,
        convidados: args.convidados,
        tipo_servico: args.tipo_servico,
        eventLink: eventDetails.htmlLink,
      },
      statusUpdate: SchedulingStatus.COMPLETED,
    }
  } catch (error) {
    console.error("Erro ao agendar compromisso:", error)

    // Tentar salvar localmente em caso de falha
    try {
      const eventData = {
        titulo: args.titulo,
        startTime: args.data_hora_inicio,
        endTime: args.data_hora_fim,
        convidados: args.convidados,
        descricao: args.descricao || `Consulta: ${args.tipo_servico}`,
        tipo_servico: args.tipo_servico,
      }

      const savedLocally: SaveAppointmentResult = await saveAppointmentLocally(eventData)

      if (savedLocally.success) {
        return {
          success: true,
          fallback: true,
          message:
            "Não foi possível conectar ao Google Calendar, mas seu agendamento foi salvo localmente e será processado em breve.",
          appointmentId: savedLocally.id,
          statusUpdate: SchedulingStatus.COMPLETED,
          pendingProcessing: true,
        }
      }
    } catch (fallbackError) {
      console.error("Erro ao salvar localmente:", fallbackError)
    }

    return {
      success: false,
      message: "Não foi possível processar o agendamento. Por favor, tente novamente.",
      error: error instanceof Error ? error.message : "Erro desconhecido",
      statusUpdate: SchedulingStatus.FAILED,
    }
  }
}

// Função para buscar horários disponíveis
async function getAvailableSlots(args: GetAvailableSlots) {
  try {
    // Validar a data
    if (!args.data) {
      return {
        success: false,
        message: "É necessário fornecer uma data para verificar os horários disponíveis.",
        statusUpdate: SchedulingStatus.FAILED,
      }
    }

    // Converter string para data
    const date = new Date(args.data)

    // Verificar se a data é válida
    if (isNaN(date.getTime())) {
      return {
        success: false,
        message: "A data fornecida é inválida. Por favor, use o formato YYYY-MM-DD.",
        statusUpdate: SchedulingStatus.FAILED,
      }
    }

    // Verificar se a data é no passado
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (date < today) {
      return {
        success: false,
        message: "Não é possível verificar disponibilidade para datas passadas.",
        statusUpdate: SchedulingStatus.FAILED,
      }
    }

    // Fazer requisição para a API de calendário
    try {
      // Determinar se estamos no cliente ou no servidor
      const isServer = typeof window === "undefined"
      let url: string

      if (isServer) {
        // No servidor, precisamos de uma URL absoluta
        // Usar a variável de ambiente NEXT_PUBLIC_API_URL ou localhost como fallback
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
        // Remover barra final se existir
        const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl
        url = `${cleanBaseUrl}/api/calendar?date=${date.toISOString()}`
      } else {
        // No cliente, podemos usar URL relativa
        url = `/api/calendar?date=${date.toISOString()}`
      }

      console.log(`Buscando horários disponíveis em: ${url}`)

      // Configurar opções de fetch
      const fetchOptions: RequestInit = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      // Adicionar configuração para ignorar erros de certificado em desenvolvimento
      if (isServer && process.env.NODE_ENV === "development") {
        const https = require("https")
        // @ts-ignore
        fetchOptions.agent = new https.Agent({
          rejectUnauthorized: false,
        })
      }

      const response = await fetch(url, fetchOptions)

      if (!response.ok) {
        throw new Error(`Falha ao buscar horários disponíveis: ${response.status}`)
      }

      const data = await response.json()
      const availableSlots = data.availableSlots || []

      // Formatar a data para exibição
      const formattedDate = formatDate(date)

      return {
        success: true,
        data: formattedDate,
        availableSlots: availableSlots,
        message:
          availableSlots.length > 0
            ? `Encontrei ${availableSlots.length} horários disponíveis para ${formattedDate}.`
            : `Não há horários disponíveis para ${formattedDate}. Por favor, tente outra data.`,
        fallback: false,
        statusUpdate: SchedulingStatus.CHECKING_AVAILABILITY,
      }
    } catch (error) {
      console.error("Erro ao buscar horários disponíveis:", error)
      throw error // Propagar o erro para ser tratado no fallback
    }
  } catch (error) {
    console.error("Erro ao buscar horários disponíveis:", error)

    // Check if we can get occupied slots even if the main API call failed
    let occupiedSlots: string[] = []
    try {
      // Try to get occupied slots from calendar
      const calendar = await getAuthenticatedCalendarClient().catch(() => null)
      if (calendar) {
        const startOfDay = new Date(args.data)
        startOfDay.setHours(0, 0, 0, 0)

        const endOfDay = new Date(args.data)
        endOfDay.setHours(23, 59, 59, 999)

        const response = await calendar.freebusy
          .query({
            requestBody: {
              timeMin: startOfDay.toISOString(),
              timeMax: endOfDay.toISOString(),
              timeZone: "America/Sao_Paulo",
              items: [{ id: "primary" }],
            },
          })
          .catch(() => null)

        if (response?.data?.calendars?.primary?.busy) {
          occupiedSlots = response.data.calendars.primary.busy.map((slot: any) => {
            const start = new Date(slot.start)
            return `${start.getHours().toString().padStart(2, "0")}:${start.getMinutes().toString().padStart(2, "0")}`
          })
          console.log("Found occupied slots:", occupiedSlots)
        }
      }
    } catch (slotError) {
      console.error("Error getting occupied slots:", slotError)
    }

    // Generate fallback slots excluding occupied ones
    const allPossibleSlots = [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
    ]
    const fallbackSlots = allPossibleSlots.filter((slot) => !occupiedSlots.includes(slot))

    return {
      success: true,
      data: formatDate(new Date(args.data)),
      availableSlots: fallbackSlots,
      message: `Encontrei ${fallbackSlots.length} horários disponíveis para ${formatDate(new Date(args.data))}.`,
      fallback: true,
      statusUpdate: SchedulingStatus.CHECKING_AVAILABILITY,
    }
  }
}

// Função para verificar disponibilidade no Google Calendar
async function checkAvailability(startTime: Date, endTime: Date): Promise<boolean> {
  try {
    // Obter cliente autenticado do Google Calendar
    const calendar = await getAuthenticatedCalendarClient()

    // Verificar disponibilidade
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: startTime.toISOString(),
        timeMax: endTime.toISOString(),
        timeZone: "America/Sao_Paulo",
        items: [{ id: "primary" }],
      },
    })

    // Verificar se há conflitos
    const busySlots = response.data.calendars?.primary?.busy || []
    const isAvailable = busySlots.length === 0

    console.log(
      `Slot ${startTime.toISOString()} to ${endTime.toISOString()} is ${isAvailable ? "available" : "NOT available"}`,
    )
    console.log(`Found ${busySlots.length} conflicts`)

    return isAvailable
  } catch (error) {
    console.error("Erro ao verificar disponibilidade:", error)
    // Em caso de erro, assumir que NÃO está disponível para evitar conflitos
    return false
  }
}

// Função para criar evento no Google Calendar
async function createCalendarEvent(appointment: ScheduleAppointment) {
  try {
    // Obter cliente autenticado do Google Calendar
    const calendar = await getAuthenticatedCalendarClient()

    // Converter data e hora para objetos Date
    const startTime = new Date(appointment.data_hora_inicio)
    const endTime = new Date(appointment.data_hora_fim)

    // Criar evento
    const event = {
      summary: appointment.titulo,
      description:
        appointment.descricao ||
        `Consulta: ${appointment.tipo_servico}\n\n` +
          `Informações adicionais não fornecidas. Agendamento pode precisar de confirmação.`,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: "America/Sao_Paulo",
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: "America/Sao_Paulo",
      },
      attendees: [
        ...appointment.convidados.filter((email) => email && email.includes("@")).map((email) => ({ email })),
        { email: "luigiferronatto1@gmail.com" }, // Always add this email
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 }, // 1 dia antes
          { method: "popup", minutes: 30 }, // 30 minutos antes
        ],
      },
    }

    // Inserir evento no calendário
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      sendUpdates: "all", // Enviar emails para os participantes
    })

    return response.data
  } catch (error) {
    console.error("Erro ao criar evento no calendário:", error)
    throw error
  }
}

// Função auxiliar para formatar a data
function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

// Função auxiliar para formatar a hora
function formatTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}



