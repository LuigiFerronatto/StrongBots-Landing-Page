// Types for calendar utilities
// api/calendar/types.ts
export interface SaveAppointmentResult {
    success: boolean
    id?: string
    message: string
    error?: string
  }
  
  export interface AuthStatus {
    authenticated: boolean
    needsRefresh?: boolean
    expiryDate?: string
    message: string
    error?: string
  }
  
    export interface AppointmentDetails {
        id: string
        title: string
        startTime: string
        endTime: string
        guests: string[]
        serviceType: string
        eventLink?: string
    }  