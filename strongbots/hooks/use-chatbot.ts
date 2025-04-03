"use client"

import { create } from "zustand"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useEffect } from "react"

interface ChatbotState {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const useChatbotStore = create<ChatbotState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}))

export function useChatbot() {
  const { isOpen, setIsOpen } = useChatbotStore()
  const isMobile = useMediaQuery("(max-width: 767px)")

  // Controla o overflow do body quando o chatbot está aberto em dispositivos móveis
  useEffect(() => {
    if (isMobile) {
      if (isOpen) {
        document.body.classList.add("overflow-hidden")
      } else {
        document.body.classList.remove("overflow-hidden")
      }
    }

    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isOpen, isMobile])

  return { isOpen, setIsOpen }
}

