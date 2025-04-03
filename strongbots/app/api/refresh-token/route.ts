import { NextResponse } from "next/server"
import { google } from "googleapis"
import { readFileSync, writeFileSync } from "fs"
import path from "path"


export async function GET() {
  try {
    console.log("Iniciando renovação manual de token...")


    // Carregar tokens existentes
    const tokensPath = path.join(process.cwd(), "tokens.json")
    console.log("Lendo arquivo de tokens:", tokensPath)


    let tokens
    try {
      tokens = JSON.parse(readFileSync(tokensPath, "utf8"))
      console.log(
        "Tokens lidos:",
        JSON.stringify({
          hasAccessToken: !!tokens.access_token,
          hasRefreshToken: !!tokens.refresh_token,
          expiryDate: tokens.expiry_date,
        }),
      )
    } catch (error) {
      console.error("Erro ao ler tokens:", error)
      return NextResponse.json(
        {
          success: false,
          error: "Arquivo de tokens não encontrado ou inválido",
        },
        { status: 500 },
      )
    }


    if (!tokens.refresh_token) {
      console.error("Refresh token não encontrado")
      return NextResponse.json(
        {
          success: false,
          error: "Refresh token não encontrado",
        },
        { status: 400 },
      )
    }


    // Carregar credenciais
    const credentialsPath = path.join(process.cwd(), "credentials.json")
    console.log("Lendo arquivo de credenciais:", credentialsPath)


    let credentials
    try {
      credentials = JSON.parse(readFileSync(credentialsPath, "utf8"))
    } catch (error) {
      console.error("Erro ao ler credenciais:", error)
      return NextResponse.json(
        {
          success: false,
          error: "Arquivo de credenciais não encontrado ou inválido",
        },
        { status: 500 },
      )
    }


    // Configurar cliente OAuth2
    console.log("Configurando cliente OAuth2...")
    const oauth2Client = new google.auth.OAuth2(
      credentials.web.client_id,
      credentials.web.client_secret,
      credentials.web.redirect_uris[0],
    )


    // Configurar refresh token
    oauth2Client.setCredentials({
      refresh_token: tokens.refresh_token,
    })


    // Renovar token
    console.log("Renovando token...")
    try {
      const { credentials: newCredentials } = await oauth2Client.refreshAccessToken()
      console.log("Token renovado com sucesso!")


      // Salvar novos tokens
      const updatedTokens = {
        ...tokens,
        access_token: newCredentials.access_token,
        expiry_date: newCredentials.expiry_date,
      }


      writeFileSync(tokensPath, JSON.stringify(updatedTokens))
      console.log("Tokens atualizados salvos com sucesso!")


      // Verificar se expiry_date existe antes de usá-lo
      const expiryDate = newCredentials.expiry_date
      const expiresIn = expiryDate ? Math.floor((expiryDate - Date.now()) / 1000 / 60) + " minutos" : "desconhecido"


      return NextResponse.json({
        success: true,
        message: "Token renovado com sucesso",
        newExpiryDate: expiryDate,
        expiresIn: expiresIn,
      })
    } catch (error) {
      console.error("Erro ao renovar token:", error)
      return NextResponse.json(
        {
          success: false,
          error: "Falha ao renovar token: " + (error instanceof Error ? error.message : "Erro desconhecido"),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Erro ao renovar token:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Falha ao renovar token: " + (error instanceof Error ? error.message : "Erro desconhecido"),
      },
      { status: 500 },
    )
  }
}





