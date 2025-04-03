import { type NextRequest, NextResponse } from "next/server"
import { siteConfig } from "@/config/site-config"

// GET - Obter a configuração atual
export async function GET() {
  try {
    return NextResponse.json({ config: siteConfig }, { status: 200 })
  } catch (error) {
    console.error("Erro ao obter configurações:", error)
    return NextResponse.json({ error: "Erro ao obter configurações" }, { status: 500 })
  }
}

// POST - Simular atualização da configuração
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { config } = body

    if (!config) {
      return NextResponse.json({ error: "Configuração não fornecida" }, { status: 400 })
    }

    // Validar a estrutura da configuração
    if (!validateConfig(config)) {
      return NextResponse.json({ error: "Estrutura de configuração inválida" }, { status: 400 })
    }

    // Em um ambiente serverless, não podemos modificar arquivos
    // Retornamos sucesso, mas as alterações serão armazenadas apenas no cliente
    return NextResponse.json(
      {
        message: "Configuração processada com sucesso",
        config: config,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Erro ao processar configuração:", error)
    return NextResponse.json({ error: "Erro ao processar configuração" }, { status: 500 })
  }
}

// Função para validar a estrutura da configuração
function validateConfig(config: any): boolean {
  // Verificar se as propriedades essenciais existem
  if (!config.sections || !config.contact || !config.social || !config.chatbot) {
    return false
  }

  // Verificar se as seções necessárias existem
  const requiredSections = ["hero", "about", "services", "process", "cases", "testimonials", "cta"]
  for (const section of requiredSections) {
    if (typeof config.sections[section] !== "boolean") {
      return false
    }
  }

  // Verificar configurações de contato
  if (!config.contact.email || !config.contact.phone || !config.contact.whatsapp) {
    return false
  }

  // Verificar configurações de redes sociais
  if (!config.social.facebook || !config.social.instagram || !config.social.twitter || !config.social.linkedin) {
    return false
  }

  // Verificar configurações do chatbot
  if (
    typeof config.chatbot.enabled !== "boolean" ||
    typeof config.chatbot.autoOpen !== "boolean" ||
    !config.chatbot.welcomeMessage
  ) {
    return false
  }

  return true
}

