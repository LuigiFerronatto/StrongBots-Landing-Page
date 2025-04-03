"use client"

import { useState, useEffect } from "react"

export function useAvailableSlots(date: Date | undefined) {
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!date) return

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/calendar?date=${date.toISOString()}`)

        if (!response.ok) {
          throw new Error("Falha ao buscar horários disponíveis")
        }

        const data = await response.json()
        setAvailableSlots(data.availableSlots || [])
      } catch (err) {
        console.error("Erro ao buscar horários disponíveis:", err)
        setError("Não foi possível carregar os horários disponíveis. Tente novamente mais tarde.")
        setAvailableSlots([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchAvailableSlots()
  }, [date])

  return { availableSlots, isLoading, error }
}

