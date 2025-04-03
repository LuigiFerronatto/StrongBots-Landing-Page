"use client"

import { useState, useEffect } from "react"
import { siteConfig as defaultConfig } from "@/config/site-config"

export function useSiteConfig() {
  const [config, setConfig] = useState(defaultConfig)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Definir um timeout para garantir que não fique travado indefinidamente
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Timeout de 3 segundos como fallback

    try {
      const storedConfig = localStorage.getItem("siteConfig")
      if (storedConfig) {
        setConfig(JSON.parse(storedConfig))
      }
      setIsLoading(false)
      clearTimeout(timeoutId) // Limpar o timeout se tudo correr bem
    } catch (error) {
      console.error("Erro ao carregar configurações do localStorage:", error)
      setIsLoading(false) // Garantir que o loading termine mesmo com erro
      clearTimeout(timeoutId) // Limpar o timeout se ocorrer um erro
    }

    return () => clearTimeout(timeoutId) // Limpar o timeout se o componente for desmontado
  }, [])

  return { config, isLoading }
}



