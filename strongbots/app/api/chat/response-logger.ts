// Utilitário para registrar e depurar respostas da API

export function logResponse(stage: string, data: any) {
    try {
      console.log(`[${stage}] Logging response:`, typeof data === "object" ? JSON.stringify(data, null, 2) : data)
  
      // Verificar se é uma resposta de agendamento
      if (stage.includes("schedule") || stage.includes("appointment")) {
        console.log("[APPOINTMENT] Detected appointment response")
  
        // Verificar se há detalhes do agendamento
        if (data && data.appointmentDetails) {
          console.log("[APPOINTMENT] Details found:", JSON.stringify(data.appointmentDetails, null, 2))
        } else if (data && data.result && data.result.appointmentDetails) {
          console.log("[APPOINTMENT] Details found in result:", JSON.stringify(data.result.appointmentDetails, null, 2))
        } else {
          console.log("[APPOINTMENT] No appointment details found in response")
        }
      }
  
      return true
    } catch (error) {
      console.error(`Error logging ${stage} response:`, error)
      return false
    }
  }
  
  export function createAppointmentResponse(appointmentDetails: any): string {
    try {
      if (!appointmentDetails) {
        return "✅ **Agendamento confirmado!** Você receberá uma confirmação por email com todos os detalhes."
      }
  
      const startTime = appointmentDetails.data_hora_inicio || appointmentDetails.startTime
  
      if (!startTime) {
        return "✅ **Agendamento confirmado!** Você receberá uma confirmação por email com todos os detalhes."
      }
  
      const appointmentDate = new Date(startTime)
      const formattedDate = appointmentDate.toLocaleDateString("pt-BR")
      const formattedTime = appointmentDate.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
  
      return `✅ **Agendamento confirmado!**
  
  Sua consulta foi agendada com sucesso para o dia *${formattedDate}* às *${formattedTime}*. 
  
  Você receberá uma confirmação por email com todos os detalhes. Obrigado por escolher a Strongbots! 🤖`
    } catch (error) {
      console.error("Error creating appointment response:", error)
      return "✅ **Agendamento confirmado!** Você receberá uma confirmação por email com todos os detalhes."
    }
  }
  
  
  
  