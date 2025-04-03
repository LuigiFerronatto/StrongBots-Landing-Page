// strongbots/types/function-calls.ts

// Tipos para as function calls do chatbot

// Tipo para a função de coleta de informações de contato
export interface ContactInfo {
    name: string
    email: string
    phone?: string
    company?: string
    role?: string
    objectives?: string
    challenges?: string
    message?: string
  }
  
  // Tipo para a função de agendamento
  export interface ScheduleAppointment {
    titulo: string
    data_hora_inicio: string // Formato ISO 8601
    data_hora_fim: string // Formato ISO 8601
    convidados: string[] // Array de emails
    descricao?: string
    tipo_servico: string
  }
  
  // Tipo para a função de busca de horários disponíveis
  export interface GetAvailableSlots {
    data: string // Formato YYYY-MM-DD
  }
  
  // Tipo para a resposta de agendamento
  export interface ScheduleResponse {
    success: boolean
    message: string
    appointmentId?: string
    appointmentDetails?: {
      titulo: string
      data_hora_inicio: string
      data_hora_fim: string
      convidados: string[]
      tipo_servico: string
      eventLink?: string
    }
    fallback?: boolean
  }
  
  // Tipo para a resposta de horários disponíveis
  export interface AvailableSlotsResponse {
    success: boolean
    data: string
    availableSlots: string[]
    message: string
    fallback?: boolean
  }
  
  // Tipo para as funções disponíveis
  export type FunctionName = "collectContactInfo" | "scheduleAppointment" | "getAvailableSlots"
  
  // Tipo para os parâmetros das funções
  export type FunctionParameters = ContactInfo | ScheduleAppointment | GetAvailableSlots
  
  // Tipo para as respostas das funções
  export type FunctionResponse = ContactInfo | ScheduleResponse | AvailableSlotsResponse
  
  // Tipo para a chamada de função
  export interface FunctionCall {
    name: string
    arguments: string
  }
  
  // Tipo para a mensagem de função
  export interface FunctionMessage {
    role: "function"
    name: FunctionName
    content: string // JSON string
  }
  
  export interface FunctionResult {
    success: boolean
    message: string
    result?: any
    error?: string
    name?: string
  }
  
  
  
  