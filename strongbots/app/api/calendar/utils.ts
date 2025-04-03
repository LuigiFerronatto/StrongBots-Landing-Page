import { google } from "googleapis"
import { readFileSync, writeFileSync } from "fs"
import path from "path"


const SCOPES = ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.events"]


export async function getAuthenticatedCalendarClient() {
  try {
    // Carregar credenciais do arquivo
    const credentialsPath = path.join(process.cwd(), "credentials.json")
    const credentials = JSON.parse(readFileSync(credentialsPath, "utf8"))


    const { client_id, client_secret } = credentials.web


    // Criar cliente OAuth2
    const oauth2Client = new google.auth.OAuth2(client_id, client_secret, credentials.web.redirect_uris[0])


    // Carregar tokens do arquivo
    const tokensPath = path.join(process.cwd(), "tokens.json")
    const tokens = JSON.parse(readFileSync(tokensPath, "utf8"))


    oauth2Client.setCredentials(tokens)


    // Verificar se o token precisa ser renovado
    if (tokens.expiry_date <= Date.now()) {
      console.log("Token expirado, renovando...")
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
    }


    const calendar = google.calendar({ version: "v3", auth: oauth2Client })
    return calendar
  } catch (error) {
    console.error("Erro ao autenticar com o Google Calendar:", error)
    throw error
  }
}


export async function saveAppointmentLocally(eventData: any) {
  try {
    const appointmentsPath = path.join(process.cwd(), "pending-appointments.json")
    let pendingAppointments = []


    try {
      const fileContent = readFileSync(appointmentsPath, "utf8")
      pendingAppointments = JSON.parse(fileContent)
    } catch (error) {
      // Arquivo não existe ou está vazio
      console.log("Arquivo de agendamentos pendentes não encontrado, criando um novo.")
    }


    pendingAppointments.push(eventData)
    writeFileSync(appointmentsPath, JSON.stringify(pendingAppointments, null, 2))


    return true
  } catch (error) {
    console.error("Erro ao salvar agendamento localmente:", error)
    return false
  }
}





