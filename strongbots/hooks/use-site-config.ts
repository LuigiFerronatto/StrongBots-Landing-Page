"use client"

import { useState, useEffect } from "react"
import { siteConfig as defaultConfig } from "@/config/site-config"

export function useSiteConfig() {
  const [config, setConfig] = useState(defaultConfig)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem("siteConfig")
      if (savedConfig) {
        setConfig(JSON.parse(savedConfig))
      }
    } catch (error) {
      console.error("Erro ao carregar configurações do localStorage:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { config, isLoading }
}

