// api/calendar/utils.ts
import { google } from "googleapis"
import { readFileSync, writeFileSync, existsSync } from "fs"
import path from "path"
import crypto from "crypto"
import type { SaveAppointmentResult, AuthStatus } from "./types"

const SCOPES = ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.events"]

export async function getAuthenticatedCalendarClient() {
  try {
    // Carregar credenciais do arquivo
    const credentialsPath = path.join(process.cwd(), "credentials.json")
    if (!existsSync(credentialsPath)) {
      throw new Error("Arquivo de credenciais não encontrado. Configure as credenciais do Google Calendar.")
    }

    const credentials = JSON.parse(readFileSync(credentialsPath, "utf8"))
    const { client_id, client_secret } = credentials.web

    // Criar cliente OAuth2
    const oauth2Client = new google.auth.OAuth2(client_id, client_secret, credentials.web.redirect_uris[0])

    // Carregar tokens do arquivo
    const tokensPath = path.join(process.cwd(), "tokens.json")
    if (!existsSync(tokensPath)) {
      throw new Error("Arquivo de tokens não encontrado. Execute o fluxo de autenticação OAuth2.")
    }

    const tokens = JSON.parse(readFileSync(tokensPath, "utf8"))
    oauth2Client.setCredentials(tokens)

    // Verificar se o token precisa ser renovado
    if (tokens.expiry_date && tokens.expiry_date <= Date.now()) {
      console.log("Token expirado, renovando...")

      if (!tokens.refresh_token) {
        throw new Error("Refresh token não encontrado. Execute o fluxo de autenticação OAuth2 novamente.")
      }

      try {
        const { credentials: newCredentials } = await oauth2Client.refreshAccessToken()

        // Atualizar tokens
        const updatedTokens = {
          ...tokens,
          access_token: newCredentials.access_token,
          expiry_date: newCredentials.expiry_date,
        }

        // Salvar tokens atualizados
        writeFileSync(tokensPath, JSON.stringify(updatedTokens))
        oauth2Client.setCredentials(updatedTokens)
        console.log("Token renovado e salvo com sucesso!")
      } catch (refreshError) {
        console.error("Erro ao renovar token:", refreshError)
        throw new Error("Falha ao renovar token de acesso. Execute o fluxo de autenticação OAuth2 novamente.")
      }
    }

    const calendar = google.calendar({ version: "v3", auth: oauth2Client })
    return calendar
  } catch (error) {
    console.error("Erro ao autenticar com o Google Calendar:", error)
    throw error
  }
}

export async function saveAppointmentLocally(eventData: any): Promise<SaveAppointmentResult> {
  try {
    const appointmentsPath = path.join(process.cwd(), "pending-appointments.json")
    let pendingAppointments = []

    try {
      if (existsSync(appointmentsPath)) {
        const fileContent = readFileSync(appointmentsPath, "utf8")
        pendingAppointments = JSON.parse(fileContent)
      }
    } catch (error) {
      // Arquivo não existe ou está vazio
      console.log("Arquivo de agendamentos pendentes não encontrado, criando um novo.")
    }

    // Gerar ID único para o agendamento
    const id = crypto.randomUUID()

    // Adicionar timestamp e status para rastreamento
    const appointmentWithMetadata = {
      ...eventData,
      id,
      created_at: new Date().toISOString(),
      status: "pending",
    }

    pendingAppointments.push(appointmentWithMetadata)
    writeFileSync(appointmentsPath, JSON.stringify(pendingAppointments, null, 2))

    return {
      success: true,
      id,
      message: "Agendamento salvo localmente com sucesso",
    }
  } catch (error) {
    console.error("Erro ao salvar agendamento localmente:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
      message: "Falha ao salvar agendamento localmente",
    }
  }
}

// Função para verificar o status da autenticação
export async function checkAuthStatus(): Promise<AuthStatus> {
  try {
    const tokensPath = path.join(process.cwd(), "tokens.json")

    if (!existsSync(tokensPath)) {
      return {
        authenticated: false,
        message: "Tokens não encontrados. Execute o fluxo de autenticação OAuth2.",
      }
    }

    const tokens = JSON.parse(readFileSync(tokensPath, "utf8"))

    if (!tokens.access_token) {
      return {
        authenticated: false,
        message: "Access token não encontrado. Execute o fluxo de autenticação OAuth2.",
      }
    }

    if (tokens.expiry_date && tokens.expiry_date <= Date.now()) {
      if (!tokens.refresh_token) {
        return {
          authenticated: false,
          message: "Token expirado e refresh token não encontrado. Execute o fluxo de autenticação OAuth2 novamente.",
        }
      }

      return {
        authenticated: true,
        needsRefresh: true,
        expiryDate: new Date(tokens.expiry_date).toISOString(),
        message: "Token expirado, mas pode ser renovado automaticamente.",
      }
    }

    return {
      authenticated: true,
      expiryDate: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : "Desconhecido",
      message: "Autenticação válida.",
    }
  } catch (error) {
    console.error("Erro ao verificar status de autenticação:", error)
    return {
      authenticated: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
      message: "Erro ao verificar status de autenticação.",
    }
  }
}



