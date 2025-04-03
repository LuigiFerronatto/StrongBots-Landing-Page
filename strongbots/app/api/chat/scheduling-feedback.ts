// Utility for providing user feedback during the scheduling process

// Status messages for different stages of the scheduling process
export const SchedulingStatus = {
  CHECKING_AVAILABILITY: "Verificando horários disponíveis...",
  COLLECTING_INFO: "Coletando suas informações...",
  PROCESSING: "Processando seu agendamento...",
  SCHEDULING: "Agendando sua consulta...",
  CONFIRMING: "Confirmando os detalhes do agendamento...",
  COMPLETED: "Agendamento concluído com sucesso!",
  FAILED: "Não foi possível completar o agendamento.",
  CONFLICT: "O horário selecionado não está disponível.",
  TIMEOUT: "O processo está demorando mais que o esperado.",
}

// User-friendly error messages
export function getUserFriendlyErrorMessage(error: string | undefined, context = "scheduling"): string {
  if (!error) return "Ocorreu um erro inesperado. Por favor, tente novamente."

  // Timeout errors
  if (error.includes("timeout") || error.includes("timed out")) {
    return "Estamos enfrentando uma lentidão temporária. Suas informações foram salvas. Por favor, tente novamente em alguns instantes ou entre em contato pelo WhatsApp."
  }

  // Availability errors
  if (error.includes("não está disponível") || error.includes("already booked")) {
    return "O horário selecionado já foi reservado. Por favor, escolha outro horário disponível."
  }

  // Validation errors
  if (error.includes("necessário fornecer")) {
    return "Algumas informações necessárias estão faltando. Por favor, verifique se preencheu todos os campos corretamente."
  }

  // API errors
  if (error.includes("API") || error.includes("request failed")) {
    return "Estamos com dificuldades técnicas temporárias. Por favor, tente novamente em alguns instantes ou entre em contato pelo WhatsApp."
  }

  // Default error message
  return "Ocorreu um problema durante o agendamento. Por favor, tente novamente ou entre em contato pelo WhatsApp para assistência."
}

// Fix the parameter type in generateAlternativeTimeSlots function
export function generateAlternativeTimeSlots(requestedTime: string, availableSlots: string[]): string[] {
  if (!availableSlots || availableSlots.length === 0) return []

  // Parse the requested time
  const [requestedHour, requestedMinute] = requestedTime.split(":").map(Number)

  // Sort available slots by proximity to requested time
  return availableSlots
    .filter((slot: string) => slot !== requestedTime) // Add type annotation
    .sort((a: string, b: string) => {
      // Add type annotations
      const [hourA, minuteA] = a.split(":").map(Number)
      const [hourB, minuteB] = b.split(":").map(Number)

      const diffA = Math.abs(hourA * 60 + minuteA - (requestedHour * 60 + requestedMinute))
      const diffB = Math.abs(hourB * 60 + minuteB - (requestedHour * 60 + requestedMinute))

      return diffA - diffB
    })
    .slice(0, 3) // Get the 3 closest times
}

// Format appointment details for user confirmation
export function formatAppointmentConfirmation(appointmentDetails: any): string {
  if (!appointmentDetails) return "Seu agendamento foi confirmado, mas os detalhes não estão disponíveis."

  try {
    const startTime = new Date(appointmentDetails.data_hora_inicio)
    const formattedDate = startTime.toLocaleDateString("pt-BR")
    const formattedTime = startTime.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })

    return `✅ **Agendamento confirmado!**

Sua consulta foi agendada com sucesso para o dia *${formattedDate}* às *${formattedTime}*.

**Detalhes:**
- Tipo: ${appointmentDetails.tipo_servico || "Consultoria inicial gratuita"}
- Participantes: ${appointmentDetails.convidados?.join(", ") || "Não especificado"}

Você receberá uma confirmação por email com todos os detalhes. Obrigado por escolher a Strongbots! 🤖

Caso precise reagendar, é só me avisar! 📅`
  } catch (error) {
    console.error("Error formatting appointment confirmation:", error)
    return "Seu agendamento foi confirmado. Você receberá um email com os detalhes em breve."
  }
}

// Generate fallback message when scheduling fails
export function getSchedulingFallbackMessage(): string {
  return `Estamos enfrentando dificuldades técnicas no momento. Você pode:

1. Tentar novamente em alguns instantes
2. Entrar em contato pelo WhatsApp: [Fale conosco](https://wa.me/5511999999999)
3. Enviar um email para: [contato@strongbots.com.br](mailto:contato@strongbots.com.br)

Pedimos desculpas pelo inconveniente. Sua consulta é muito importante para nós! 🤖`
}



