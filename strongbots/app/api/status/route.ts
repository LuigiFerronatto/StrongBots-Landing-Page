import { NextResponse } from "next/server"
import { readFileSync } from "fs"
import path from "path"

export async function GET() {
  try {
    console.log("Verificando status do sistema...")

    // Verificar status do token
    let tokenStatus = {
      hasAccessToken: false,
      hasRefreshToken: false,
      isExpired: true,
      expiresIn: "expirado",
      expiryDate: null,
      currentTime: Date.now(),
    }

    try {
      const tokensPath = path.join(process.cwd(), "tokens.json")
      console.log("Lendo arquivo de tokens:", tokensPath)

      const tokens = JSON.parse(readFileSync(tokensPath, "utf8"))
      console.log(
        "Tokens lidos:",
        JSON.stringify({
          hasAccessToken: !!tokens.access_token,
          hasRefreshToken: !!tokens.refresh_token,
          expiryDate: tokens.expiry_date,
        }),
      )

      const now = Date.now()
      const expiryDate = tokens.expiry_date
      const isExpired = !expiryDate || now >= expiryDate

      let expiresIn = "expirado"
      if (!isExpired && expiryDate) {
        const diffMinutes = Math.floor((expiryDate - now) / 1000 / 60)
        if (diffMinutes > 60) {
          const diffHours = Math.floor(diffMinutes / 60)
          expiresIn = `${diffHours} horas e ${diffMinutes % 60} minutos`
        } else {
          expiresIn = `${diffMinutes} minutos`
        }
      }

      tokenStatus = {
        hasAccessToken: !!tokens.access_token,
        hasRefreshToken: !!tokens.refresh_token,
        isExpired,
        expiresIn,
        expiryDate,
        currentTime: now,
      }
    } catch (error) {
      console.error("Erro ao verificar status do token:", error)
    }

    // Verificar agendamentos pendentes
    let pendingAppointments = 0
    try {
      const pendingPath = path.join(process.cwd(), "pending-appointments.json")
      if (require("fs").existsSync(pendingPath)) {
        const pendingData = JSON.parse(readFileSync(pendingPath, "utf8"))
        pendingAppointments = Array.isArray(pendingData) ? pendingData.length : 0
      }
    } catch (error) {
      console.error("Erro ao verificar agendamentos pendentes:", error)
    }

    return NextResponse.json({
      status: "online",
      tokenStatus,
      pendingAppointments,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Erro ao verificar status do sistema:", error)
    return NextResponse.json(
      {
        status: "error",
        error: "Erro ao verificar status do sistema",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}



