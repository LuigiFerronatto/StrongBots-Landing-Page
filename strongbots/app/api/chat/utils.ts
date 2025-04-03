import type { FunctionCall } from "@/types/function-calls"
import { executeFunction } from "@/services/function-service"

// Função para processar a chamada de função
export async function processFunctionCall(functionCall: FunctionCall) {
  try {
    // Parsear os argumentos da função
    const args = JSON.parse(functionCall.arguments)

    // Pré-processamento de argumentos específicos para cada função
    if (functionCall.name === "getAvailableSlots") {
      // Se a data for uma expressão como "amanhã", converter para YYYY-MM-DD
      if (args.data && typeof args.data === "string") {
        // Verificar se já está no formato YYYY-MM-DD
        if (!args.data.match(/^\d{4}-\d{2}-\d{2}$/)) {
          args.data = parseDateExpression(args.data)
          console.log(`Data convertida para: ${args.data}`)
        }
      }
    } else if (functionCall.name === "scheduleAppointment") {
      console.log("Processando agendamento com argumentos:", JSON.stringify(args, null, 2))

      // Se data_hora_inicio ou data_hora_fim não estiverem no formato ISO 8601,
      // tentar converter a partir de data e hora separadas
      if (args.date && args.time && !args.data_hora_inicio) {
        // Se a data for uma expressão como "amanhã", converter para YYYY-MM-DD
        if (!args.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
          args.date = parseDateExpression(args.date)
          console.log(`Data convertida para: ${args.date}`)
        }

        args.data_hora_inicio = convertToISO8601(args.date, args.time)

        // Calcular data_hora_fim (30 minutos depois por padrão)
        const endTime = new Date(args.data_hora_inicio)
        endTime.setMinutes(endTime.getMinutes() + 30)
        args.data_hora_fim = endTime.toISOString()

        // Remover os campos originais para evitar confusão
        delete args.date
        delete args.time
      }

      // Garantir que convidados seja um array
      if (args.email && !args.convidados) {
        args.convidados = [args.email]
      } else if (typeof args.convidados === "string") {
        args.convidados = [args.convidados]
      }

      // Garantir que o tipo de serviço esteja definido
      if (args.service && !args.tipo_servico) {
        args.tipo_servico = args.service
        delete args.service
      } else if (!args.tipo_servico) {
        // Definir um tipo de serviço padrão se não for fornecido
        args.tipo_servico = "Consultoria inicial gratuita"
      }

      // Garantir que o título esteja definido
      if (!args.titulo) {
        if (args.contactInfo && args.contactInfo.name) {
          args.titulo = `Consulta com ${args.contactInfo.name}`
        } else if (args.name) {
          args.titulo = `Consulta com ${args.name}`
        } else {
          args.titulo = "Consulta Strongbots"
        }
      }

      // Converter contactInfo para convidados se necessário
      if (args.contactInfo && !args.convidados) {
        if (args.contactInfo.email) {
          args.convidados = [args.contactInfo.email]
        }

        // Usar o nome do contato para o título se não estiver definido
        if (args.contactInfo.name && !args.titulo) {
          args.titulo = `Consulta com ${args.contactInfo.name}`
        }

        // Adicionar informações de contato à descrição
        if (!args.descricao) {
          args.descricao = `
Nome: ${args.contactInfo.name || "Não informado"}
Email: ${args.contactInfo.email || "Não informado"}
Telefone: ${args.contactInfo.phone || "Não informado"}
Empresa: ${args.contactInfo.company || "Não informada"}
Mensagem: ${args.contactInfo.message || "Nenhuma mensagem adicional"}
          `.trim()
        }
      }

      // Verificar se temos informações suficientes
      if (
        !args.convidados ||
        args.convidados.length === 0 ||
        !args.convidados[0] ||
        !args.convidados[0].includes("@")
      ) {
        console.log("Email inválido ou não fornecido")
        if (args.email && args.email.includes("@")) {
          args.convidados = [args.email]
        } else {
          console.log("Não foi possível determinar um email válido para o agendamento")
        }
      }

      // Verificar se o título está completo
      if (args.titulo === "Consulta com" || !args.titulo) {
        if (args.name) {
          args.titulo = `Consulta com ${args.name}`
        } else if (args.contactInfo && args.contactInfo.name) {
          args.titulo = `Consulta com ${args.contactInfo.name}`
        } else {
          args.titulo = "Consulta Strongbots - Agendamento"
        }
      }

      // Adicionar nome da empresa ao título se disponível
      if (args.company && !args.titulo.includes(args.company)) {
        args.titulo += ` - ${args.company}`
      } else if (args.contactInfo && args.contactInfo.company && !args.titulo.includes(args.contactInfo.company)) {
        args.titulo += ` - ${args.contactInfo.company}`
      }

      console.log("Argumentos processados para agendamento:", JSON.stringify(args, null, 2))
    } else if (functionCall.name === "collectContactInfo") {
      console.log("Processando coleta de informações de contato:", JSON.stringify(args, null, 2))

      // Validar informações mínimas necessárias
      if (!args.name || args.name.trim().length < 2) {
        console.log("Nome inválido ou muito curto")
        return {
          success: false,
          error: "É necessário fornecer um nome válido.",
          name: functionCall.name,
        }
      }

      if (!args.email || !args.email.includes("@")) {
        console.log("Email inválido")
        return {
          success: false,
          error: "É necessário fornecer um email válido.",
          name: functionCall.name,
        }
      }

      // Verificar se temos informações suficientes para agendar automaticamente
      if (args.name && args.email && args.company && (args.message || args.objectives)) {
        console.log("Informações suficientes para agendar automaticamente detectadas")
        // Estas informações serão usadas pelo modelo para chamar scheduleAppointment na próxima iteração
      } else {
        console.log("Informações incompletas para agendamento automático")
      }
    }

    // Executar a função com os argumentos processados
    const functionResult = await executeFunction(functionCall.name, args)
    console.log(`Resultado da função ${functionCall.name}:`, JSON.stringify(functionResult, null, 2))

    return {
      success: true,
      result: functionResult,
      name: functionCall.name,
    }
  } catch (error) {
    console.error(`Error executing function ${functionCall.name}:`, error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      name: functionCall.name,
    }
  }
}

// Função para converter datas para ISO 8601
export function convertToISO8601(date: string, time: string): string {
  // Assumindo que date está no formato YYYY-MM-DD e time no formato HH:MM
  const [year, month, day] = date.split("-").map(Number)
  const [hour, minute] = time.split(":").map(Number)

  // Criar objeto Date
  const dateObj = new Date(year, month - 1, day, hour, minute)

  // Retornar string ISO 8601
  return dateObj.toISOString()
}

// Função para converter expressões de data em datas reais
export function parseDateExpression(expression: string): string {
  console.log(`Convertendo expressão de data: "${expression}"`)

  // Obter a data atual
  const today = new Date()
  console.log(`Data atual: ${today.toISOString()}`)

  const resultDate = new Date(today)

  // Converter para minúsculas para facilitar a comparação
  const lowerExpression = expression.toLowerCase().trim()

  if (lowerExpression === "hoje") {
    console.log("Expressão identificada: hoje")
    // Já está configurado como hoje
  } else if (lowerExpression === "amanhã" || lowerExpression === "amanha") {
    console.log("Expressão identificada: amanhã")
    resultDate.setDate(today.getDate() + 1)
  } else if (lowerExpression.includes("próxima") || lowerExpression.includes("proxima")) {
    console.log("Expressão identificada: próxima semana")
    // Mapear dias da semana
    const weekdays: Record<string, number> = {
      domingo: 0,
      segunda: 1,
      "segunda-feira": 1,
      terça: 2,
      terca: 2,
      "terça-feira": 2,
      "terca-feira": 2,
      quarta: 3,
      "quarta-feira": 3,
      quinta: 4,
      "quinta-feira": 4,
      sexta: 5,
      "sexta-feira": 5,
      sábado: 6,
      sabado: 6,
    }

    // Encontrar o dia da semana mencionado
    let targetDay = -1
    for (const [day, value] of Object.entries(weekdays)) {
      if (lowerExpression.includes(day)) {
        targetDay = value
        console.log(`Dia da semana identificado: ${day} (${value})`)
        break
      }
    }

    if (targetDay >= 0) {
      const currentDay = today.getDay()
      let daysToAdd = targetDay - currentDay

      // Se o dia já passou esta semana, ir para a próxima
      if (daysToAdd <= 0) {
        daysToAdd += 7
      }

      resultDate.setDate(today.getDate() + daysToAdd)
      console.log(`Dias a adicionar: ${daysToAdd}, Nova data: ${resultDate.toISOString()}`)
    }
  } else if (lowerExpression.includes("semana que vem") || lowerExpression.includes("próxima semana")) {
    console.log("Expressão identificada: semana que vem")
    // Adicionar 7 dias
    resultDate.setDate(today.getDate() + 7)
  } else if (lowerExpression.includes("mês que vem") || lowerExpression.includes("próximo mês")) {
    console.log("Expressão identificada: mês que vem")
    // Adicionar 1 mês
    resultDate.setMonth(today.getMonth() + 1)
  } else {
    // Tentar interpretar como uma data no formato YYYY-MM-DD
    const dateMatch = expression.match(/(\d{4})-(\d{2})-(\d{2})/)
    if (dateMatch) {
      console.log("Data já está no formato YYYY-MM-DD")
      return expression // Já está no formato correto
    }

    // Tentar interpretar como uma data no formato DD/MM/YYYY
    const brDateMatch = expression.match(/(\d{2})\/(\d{2})\/(\d{4})/)
    if (brDateMatch) {
      const [_, day, month, year] = brDateMatch
      console.log(`Data no formato DD/MM/YYYY convertida para YYYY-MM-DD: ${year}-${month}-${day}`)
      return `${year}-${month}-${day}`
    }

    // Tentar interpretar como uma data no formato DD/MM
    const shortDateMatch = expression.match(/(\d{2})\/(\d{2})/)
    if (shortDateMatch) {
      const [_, day, month] = shortDateMatch
      const year = today.getFullYear()
      console.log(`Data no formato DD/MM convertida para YYYY-MM-DD: ${year}-${month}-${day}`)
      return `${year}-${month}-${day}`
    }

    // Se não conseguir interpretar, retornar a data atual
    console.warn(`Não foi possível interpretar a expressão de data: ${expression}. Usando data atual.`)
  }

  // Formatar a data resultante como YYYY-MM-DD
  const year = resultDate.getFullYear()
  const month = String(resultDate.getMonth() + 1).padStart(2, "0")
  const day = String(resultDate.getDate()).padStart(2, "0")

  const formattedDate = `${year}-${month}-${day}`
  console.log(`Data formatada final: ${formattedDate}`)

  return formattedDate
}



