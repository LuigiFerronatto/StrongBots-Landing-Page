"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone, X } from "lucide-react"
import { useHasMounted } from "@/hooks/use-has-mounted"
import { siteConfig } from "@/config/site-config"

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const mounted = useHasMounted()

  useEffect(() => {
    if (!mounted) return

    const timer = setTimeout(() => {
      if (!isClosed) {
        setIsVisible(true)

        // Show tooltip after 1 second
        const tooltipTimer = setTimeout(() => {
          setIsTooltipVisible(true)

          // Hide tooltip after 5 seconds
          const hideTooltipTimer = setTimeout(() => {
            setIsTooltipVisible(false)
          }, 5000)

          return () => clearTimeout(hideTooltipTimer)
        }, 1000)

        return () => clearTimeout(tooltipTimer)
      }
    }, 3000) // Show the button after 3 seconds

    return () => clearTimeout(timer)
  }, [isClosed, mounted])

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsTooltipVisible(false)
    setIsVisible(false)
    setIsClosed(true)
  }

  const handleClick = () => {
    window.open(`https://wa.me/${siteConfig.contact.whatsapp}`, "_blank")
  }

  if (!mounted) return null

  return (
    <div className="fixed bottom-6 left-6 z-40 md:bottom-8 md:left-8">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative"
          >
            {/* Tooltip */}
            <AnimatePresence>
              {isTooltipVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  className="absolute bottom-full left-0 mb-4 bg-card rounded-lg p-3 md:p-4 shadow-lg border border-border w-56 md:w-64"
                >
                  <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                  >
                    <X size={14} />
                  </button>
                  <p className="text-sm">Precisa de ajuda? Converse agora com um dos nossos especialistas!</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                onClick={handleClick}
                size="lg"
                className="rounded-full h-12 w-12 md:h-16 md:w-16 bg-green-600 hover:bg-green-700 shadow-lg"
              >
                <Phone className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

