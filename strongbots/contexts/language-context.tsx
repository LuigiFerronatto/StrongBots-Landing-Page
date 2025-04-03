"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface LanguageContextProps {
  language: string
  setLanguage: (language: string) => void
  t: (key: string) => string // Simplified translation function
}

const LanguageContext = createContext<LanguageContextProps>({
  language: "pt",
  setLanguage: () => {},
  t: (key: string) => key, // Default implementation returns the key itself
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("pt")

  // Simplified translation function (replace with actual translation logic)
  const t = (key: string) => {
    // In a real implementation, this would fetch translations based on the key and current language
    return key // Placeholder: returns the key itself
  }

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language")
    if (storedLanguage) {
      setLanguage(storedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}

