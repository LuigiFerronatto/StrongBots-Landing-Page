import { type NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"
import { readFileSync, writeFileSync } from "fs"
import path from "path"

export async function GET(request: NextRequest) {
  try {
    // Carregar credenciais do arquivo
    const credentialsPath = path.join(process.cwd(), "credentials.json")
    const credentials = JSON.parse(readFileSync(credentialsPath, "utf8"))

    const { client_id, client_secret } = credentials.web

    // Criar cliente OAuth2
    const oauth2Client = new google.auth.OAuth2(client_id, client_secret, credentials.web.redirect_uris[0])

    // Gerar URL de autorização
    const scopes = ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.events"]

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      prompt: "consent",
    })

    return NextResponse.json({ authUrl })
  } catch (error) {
    console.error("Erro ao gerar URL de autorização:", error)
    return NextResponse.json({ error: "Erro ao gerar URL de autorização" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({ error: "Código de autorização não fornecido" }, { status: 400 })
    }

    // Carregar credenciais do arquivo
    const credentialsPath = path.join(process.cwd(), "credentials.json")
    const credentials = JSON.parse(readFileSync(credentialsPath, "utf8"))

    const { client_id, client_secret } = credentials.web

    // Criar cliente OAuth2
    const oauth2Client = new google.auth.OAuth2(client_id, client_secret, credentials.web.redirect_uris[0])

    // Trocar código por token
    const { tokens } = await oauth2Client.getToken(code)

    // Salvar tokens em um arquivo (em produção, use um armazenamento seguro)
    const tokensPath = path.join(process.cwd(), "tokens.json")
    writeFileSync(tokensPath, JSON.stringify(tokens))

    return NextResponse.json({
      success: true,
      message: "Token obtido e salvo com sucesso",
      access_token: tokens.access_token,
      expires_in: tokens.expiry_date,
    })
  } catch (error) {
    console.error("Erro ao obter token:", error)
    return NextResponse.json({ error: "Erro ao obter token de acesso" }, { status: 500 })
  }
}

