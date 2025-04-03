import { NextResponse } from "next/server"
import { readFileSync, writeFileSync } from "fs"
import path from "path"
import { getAuthenticatedCalendarClient } from "../calendar/utils"

// Configuração do calendário
const CALENDAR_ID = "luigiferronatto1@gmail.com"

export async function GET() {
  try {
    // Verificar se há agendamentos pendentes
    const appointmentsPath = path.join(process.cwd(), "pending-appointments.json")
    let pendingAppointments = []

    try {
      pendingAppointments = JSON.parse(readFileSync(appointmentsPath, "utf8"))
    } catch (error) {
      // Arquivo não existe ou está vazio
      return NextResponse.json({
        success: true,
        message: "Nenhum agendamento pendente para processar",
      })
    }

    if (pendingAppointments.length === 0) {
      return NextResponse.json({
        success: true,
        message: "Nenhum agendamento pendente para processar",
      })
    }

    // Obter cliente autenticado
    const calendar = await getAuthenticatedCalendarClient()

    // Processar cada agendamento pendente
    const results = []
    const processedAppointments = []
    const remainingAppointments = []

    for (const appointment of pendingAppointments) {
      try {
        // Criar evento no Google Calendar
        const event = {
          summary: `Consultoria Strongbots - ${appointment.name}`,
          description: `
            Nome: ${appointment.name}
            Email: ${appointment.email}
            Empresa: ${appointment.company || "Não informado"}
            Cargo: ${appointment.role || "Não informado"}
            
            Mensagem:
            ${appointment.message || "Nenhuma mensagem adicional."}
            
            (Nota: Este evento foi criado a partir de um agendamento pendente)
          `,
          start: {
            dateTime: appointment.startTime,
            timeZone: "America/Sao_Paulo",
          },
          end: {
            dateTime: appointment.endTime,
            timeZone: "America/Sao_Paulo",
          },
          attendees: [{ email: appointment.email }],
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

        results.push({
          id: response.data.id,
          name: appointment.name,
          email: appointment.email,
          status: "success",
        })

        processedAppointments.push({
          ...appointment,
          status: "processed",
          processedAt: new Date().toISOString(),
          eventId: response.data.id,
        })
      } catch (error) {
        console.error("Erro ao processar agendamento pendente:", error)

        results.push({
          name: appointment.name,
          email: appointment.email,
          status: "error",
          error: error instanceof Error ? error.message : "Erro desconhecido",
        })

        // Manter na lista de pendentes
        remainingAppointments.push(appointment)
      }
    }

    // Atualizar arquivo de agendamentos pendentes
    writeFileSync(appointmentsPath, JSON.stringify(remainingAppointments, null, 2))

    // Salvar histórico de agendamentos processados
    const processedPath = path.join(process.cwd(), "processed-appointments.json")
    let processedHistory = []

    try {
      processedHistory = JSON.parse(readFileSync(processedPath, "utf8"))
    } catch (error) {
      // Arquivo não existe ou está vazio
      processedHistory = []
    }

    processedHistory = [...processedHistory, ...processedAppointments]
    writeFileSync(processedPath, JSON.stringify(processedHistory, null, 2))

    return NextResponse.json({
      success: true,
      processed: results.filter((r) => r.status === "success").length,
      failed: results.filter((r) => r.status === "error").length,
      remaining: remainingAppointments.length,
      results,
    })
  } catch (error) {
    console.error("Erro ao processar agendamentos pendentes:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao processar agendamentos pendentes",
      },
      { status: 500 },
    )
  }
}



