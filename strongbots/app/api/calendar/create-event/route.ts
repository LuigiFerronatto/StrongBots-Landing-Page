//api/calendar/create-event/route.ts

import { type NextRequest, NextResponse } from "next/server"
import { getAuthenticatedCalendarClient, saveAppointmentLocally } from "../utils"

// Configuração do calendário
const CALENDAR_ID = "luigiferronatto1@gmail.com"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { date, time, name, email, company, role, message } = body

    if (!date || !time || !name || !email) {
      return NextResponse.json({ error: "Dados incompletos para criar o evento" }, { status: 400 })
    }

    // Converter string para data
    const eventDate = new Date(date)

    // Extrair horas e minutos do horário
    const [hours, minutes] = time.split(":").map(Number)

    // Definir horário de início
    const startTime = new Date(eventDate)
    startTime.setHours(hours, minutes, 0, 0)

    // Definir horário de término (30 minutos depois)
    const endTime = new Date(startTime)
    endTime.setMinutes(endTime.getMinutes() + 30)

    // Dados do evento para uso no fallback
    const eventData = {
      date,
      time,
      name,
      email,
      company,
      role,
      message,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    }

    try {
      // Obter cliente autenticado (com renovação automática de token)
      const calendar = await getAuthenticatedCalendarClient()

      const event = {
        summary: `Consultoria Strongbots - ${name}`,
        description: `
          Nome: ${name}
          Email: ${email}
          Empresa: ${company}
          Cargo: ${role}
          
          Mensagem:
          ${message || "Nenhuma mensagem adicional."}
        `,
        start: {
          dateTime: startTime.toISOString(),
          timeZone: "America/Sao_Paulo",
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: "America/Sao_Paulo",
        },
        attendees: [{ email }],
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 24 * 60 }, // 1 dia antes
            { method: "popup", minutes: 30 }, // 30 minutos antes
          ],
        },
      }

      const response = await calendar.events.insert({
        calendarId: CALENDAR_ID,
        requestBody: event,
        sendUpdates: "all", // Envia emails para os participantes
      })

      return NextResponse.json({
        success: true,
        eventId: response.data.id,
        eventLink: response.data.htmlLink,
      })
    } catch (error) {
      console.error("Erro ao criar evento no Google Calendar:", error)

      // Salvar o agendamento localmente para processamento posterior
      const savedLocally = await saveAppointmentLocally(eventData)

      // Fallback: Retornar sucesso simulado se não conseguir criar o evento
      return NextResponse.json({
        success: true,
        fallback: true,
        message: "Evento registrado localmente. Será sincronizado posteriormente.",
        savedLocally,
      })
    }
  } catch (error) {
    console.error("Erro ao processar solicitação:", error)
    return NextResponse.json({ error: "Erro ao criar evento no calendário" }, { status: 500 })
  }
}


