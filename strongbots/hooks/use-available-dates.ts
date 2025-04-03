"use client"

import { useState, useEffect } from "react"

export function useAvailableDates() {
  const [availableDates, setAvailableDates] = useState<Date[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAvailableDates = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Gerar próximos 14 dias (excluindo finais de semana)
        const dates: Date[] = []
        const today = new Date()
        const currentDate = new Date(today)

        // Avançar para o próximo dia útil se hoje for fim de semana
        if (currentDate.getDay() === 0) {
          // Domingo
          currentDate.setDate(currentDate.getDate() + 1)
        } else if (currentDate.getDay() === 6) {
          // Sábado
          currentDate.setDate(currentDate.getDate() + 2)
        }

        // Verificar os próximos 14 dias úteis
        let daysChecked = 0
        while (dates.length < 5 && daysChecked < 14) {
          // Pular para o próximo dia
          if (daysChecked > 0) {
            currentDate.setDate(currentDate.getDate() + 1)
          }

          daysChecked++

          // Verificar se é dia útil (segunda a sexta)
          const dayOfWeek = currentDate.getDay()
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            // Verificar se há horários disponíveis para este dia
            try {
              const response = await fetch(`/api/calendar?date=${currentDate.toISOString()}`)

              if (response.ok) {
                const data = await response.json()
                if (data.availableSlots && data.availableSlots.length > 0) {
                  dates.push(new Date(currentDate))
                }
              }
            } catch (err) {
              console.error(`Erro ao verificar disponibilidade para ${currentDate.toISOString()}:`, err)
            }
          }
        }

        setAvailableDates(dates)
      } catch (err) {
        console.error("Erro ao buscar datas disponíveis:", err)
        setError("Não foi possível carregar as datas disponíveis. Tente novamente mais tarde.")

        // Fallback: usar próximos 5 dias úteis
        const fallbackDates: Date[] = []
        const today = new Date()
        const currentDate = new Date(today)

        while (fallbackDates.length < 5) {
          // Pular para o próximo dia
          if (fallbackDates.length > 0) {
            currentDate.setDate(currentDate.getDate() + 1)
          }

          // Verificar se é dia útil (segunda a sexta)
          const dayOfWeek = currentDate.getDay()
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            fallbackDates.push(new Date(currentDate))
          }
        }

        setAvailableDates(fallbackDates)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAvailableDates()
  }, [])

  return { availableDates, isLoading, error }
}

