// api/calendar/route.ts

import { type NextRequest, NextResponse } from "next/server"
import { getAuthenticatedCalendarClient } from "./utils"
import { readFileSync } from "fs"
import path from "path"
import { google } from "googleapis"

// Configuração do calendário
const CALENDAR_ID = "luigiferronatto1@gmail.com"

// Horários de trabalho (9h às 17h)
const WORK_HOURS_START = 9
const WORK_HOURS_END = 17
const APPOINTMENT_DURATION = 30 // duração da consulta em minutos

// Função para autenticar com o Google usando OAuth2
const getGoogleAuth = async () => {
  try {
    // Carregar credenciais do arquivo
    const credentialsPath = path.join(process.cwd(), "credentials.json")
    const credentials = JSON.parse(readFileSync(credentialsPath, "utf8"))

    const { client_id, client_secret } = credentials.web

    // Criar cliente OAuth2
    const oauth2Client = new google.auth.OAuth2(client_id, client_secret, credentials.web.redirect_uris[0])

    // Usar token de acesso armazenado nas variáveis de ambiente
    // Nota: Em produção, você precisará implementar um fluxo completo de OAuth2
    // com refresh tokens e armazenamento seguro de tokens
    const token = process.env.GOOGLE_ACCESS_TOKEN

    if (!token) {
      throw new Error("Token de acesso não encontrado. Execute o fluxo de autenticação OAuth2.")
    }

    oauth2Client.setCredentials({ access_token: token })

    return oauth2Client
  } catch (error) {
    console.error("Erro ao autenticar com o Google:", error)

    // Fallback para autenticação sem credenciais (apenas para consultas públicas)
    return null
  }
}

// Função alternativa para obter horários ocupados usando iCal
const getBusyTimesFromICal = async (startDate: Date, endDate: Date) => {
  try {
    // URL do iCal (formato secreto)
    const icalUrl =
      "https://calendar.google.com/calendar/ical/luigiferronatto1%40gmail.com/private-454f64eaf00a6dece7cef111c99ee7c7/basic.ics"

    // Fazer requisição para obter o arquivo iCal
    const response = await fetch(icalUrl)

    if (!response.ok) {
      throw new Error(`Falha ao obter arquivo iCal: ${response.status}`)
    }

    const icalData = await response.text()

    // Extrair eventos do arquivo iCal
    // Nota: Esta é uma implementação simplificada. Em produção, use uma biblioteca como ical.js
    const events = icalData
      .split("BEGIN:VEVENT")
      .slice(1) // Pular o cabeçalho
      .map((eventStr) => {
        const dtstart = eventStr.match(/DTSTART(?:;TZID=[^:]+)?:(.*)/)?.[1]
        const dtend = eventStr.match(/DTEND(?:;TZID=[^:]+)?:(.*)/)?.[1]

        if (!dtstart || !dtend) return null

        // Converter formato iCal para Date
        const parseICalDate = (dateStr: string) => {
          // Formato: 20230101T120000Z ou 20230101T120000
          const year = Number.parseInt(dateStr.substring(0, 4))
          const month = Number.parseInt(dateStr.substring(4, 6)) - 1 // Meses em JS são 0-11
          const day = Number.parseInt(dateStr.substring(6, 8))
          const hour = Number.parseInt(dateStr.substring(9, 11))
          const minute = Number.parseInt(dateStr.substring(11, 13))
          const second = Number.parseInt(dateStr.substring(13, 15))

          return new Date(Date.UTC(year, month, day, hour, minute, second))
        }

        return {
          start: parseICalDate(dtstart),
          end: parseICalDate(dtend),
        }
      })
      .filter((event) => event !== null)

    // Filtrar eventos que estão no intervalo de datas solicitado
    return events.filter((event) => {
      if (!event) return false

      return (
        (event.start >= startDate && event.start <= endDate) ||
        (event.end >= startDate && event.end <= endDate) ||
        (event.start <= startDate && event.end >= endDate)
      )
    })
  } catch (error) {
    console.error("Erro ao obter eventos do iCal:", error)
    return []
  }
}

// Função para obter horários ocupados
const getBusyTimes = async (startDate: Date, endDate: Date) => {
  try {
    // Obter cliente autenticado (com renovação automática de token)
    const calendar = await getAuthenticatedCalendarClient()

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        timeZone: "America/Sao_Paulo",
        items: [{ id: CALENDAR_ID }],
      },
    })

    return response.data.calendars?.[CALENDAR_ID]?.busy || []
  } catch (error) {
    console.error("Erro ao buscar horários ocupados:", error)

    // Fallback para iCal se a autenticação falhar
    return await getBusyTimesFromICal(startDate, endDate)
  }
}

// Função para gerar slots de horário disponíveis
const generateTimeSlots = (date: Date) => {
  const slots = []
  const startHour = WORK_HOURS_START
  const endHour = WORK_HOURS_END

  // Definir a data para o início do horário de trabalho
  const startTime = new Date(date)
  startTime.setHours(startHour, 0, 0, 0)

  // Definir a data para o fim do horário de trabalho
  const endTime = new Date(date)
  endTime.setHours(endHour, 0, 0, 0)

  // Gerar slots de 30 minutos
  const currentTime = new Date(startTime)
  while (currentTime < endTime) {
    slots.push(new Date(currentTime))
    currentTime.setMinutes(currentTime.getMinutes() + APPOINTMENT_DURATION)
  }

  return slots
}

// Função para verificar se um slot está disponível
const isSlotAvailable = (slot: Date, busyTimes: any[]) => {
  const slotEnd = new Date(slot)
  slotEnd.setMinutes(slot.getMinutes() + APPOINTMENT_DURATION)

  return !busyTimes.some((busy) => {
    const busyStart = new Date(busy.start)
    const busyEnd = new Date(busy.end)

    // Verifica se há sobreposição
    return (
      (slot >= busyStart && slot < busyEnd) || // Início do slot durante período ocupado
      (slotEnd > busyStart && slotEnd <= busyEnd) || // Fim do slot durante período ocupado
      (slot <= busyStart && slotEnd >= busyEnd) // Slot engloba período ocupado
    )
  })
}

// Função para formatar horário
const formatTime = (date: Date) => {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

export async function GET(request: NextRequest) {
  try {
    // Obter data da query
    const searchParams = request.nextUrl.searchParams
    const dateParam = searchParams.get("date")

    if (!dateParam) {
      return NextResponse.json({ error: "Data não fornecida" }, { status: 400 })
    }

    // Converter string para data
    const date = new Date(dateParam)

    // Definir início e fim do dia
    const startDate = new Date(date)
    startDate.setHours(0, 0, 0, 0)

    const endDate = new Date(date)
    endDate.setHours(23, 59, 59, 999)

    // Obter horários ocupados
    const busyTimes = await getBusyTimes(startDate, endDate)

    // Gerar todos os slots de horário para o dia
    const allSlots = generateTimeSlots(date)

    // Filtrar slots disponíveis
    const availableSlots = allSlots.filter((slot) => isSlotAvailable(slot, busyTimes)).map((slot) => formatTime(slot))

    // Limitar a 6 horários disponíveis
    const limitedSlots = availableSlots.slice(0, 9)

    return NextResponse.json({ availableSlots: limitedSlots })
  } catch (error) {
    console.error("Erro ao processar solicitação:", error)
    return NextResponse.json({ error: "Erro ao buscar horários disponíveis" }, { status: 500 })
  }
}



