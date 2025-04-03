"use client"
// components/ui/loading-screen.tsx
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

interface LoadingScreenProps {
  className?: string
  fullScreen?: boolean
  message?: string
  showLogo?: boolean
}

export function LoadingScreen({
  className,
  fullScreen = true,
  message = "Carregando experiência",
  showLogo = true,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState("")
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const phraseTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Frases divertidas para exibir durante o carregamento
  const funnyPhrases = [
    "Estamos perguntando para a IA se já pode carregar... hahah",
    "Convencendo os bots a trabalhar em um domingo...",
    "Somos a StrongBots",
    "Bots Fortes, Resultados Inteligentes",
    "Bots Inteligentes, Resultados Fortes",
    "Aplicando viés de confirmação para garantir que você vai gostar do que vai ver...",
    "Ativando o efeito Dunning-Kruger: quanto menos sabemos, mais confiantes estamos!",
    "Superando o viés de ancoragem... seu orçamento inicial era só uma sugestão, né?",
    "Calculando a quantidade exata de café necessária para programar esta página...",
    "Ensinando nossos bots a dizer 'por favor' e 'obrigado'...",
    "Verificando se a IA não está planejando dominar o mundo...",
    "Convertendo café em código...",
    "Pedindo para o ChatGPT escrever piadas sobre programação...",
    "Aplicando o viés de disponibilidade: se você lembrou da gente, já valeu a pena!",
    "Ativando o efeito halo: se nossa tela de carregamento é bonita, nossos bots devem ser ótimos!",
    "Nossos bots estão fazendo flexões para ficarem mais fortes...",
    "Carregando pixels com muito carinho...",
    "Alimentando os hamsters que fazem nossos servidores funcionarem...",
    "Procurando o botão de 'Carregar Mais Rápido'...",
    "Aplicando machine learning para adivinhar o que você quer antes mesmo de você saber...",
  ]

  // Simular progresso de carregamento
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 10
        return next > 100 ? 100 : next
      })
    }, 400)

    return () => clearInterval(timer)
  }, [])

  // Animação dos pontos
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return ""
        return prev + "."
      })
    }, 400)

    return () => clearInterval(interval)
  }, [])

  // Alternar entre frases divertidas
  useEffect(() => {
    phraseTimerRef.current = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % funnyPhrases.length)
    }, 3000)

    return () => {
      if (phraseTimerRef.current) {
        clearInterval(phraseTimerRef.current)
      }
    }
  }, [funnyPhrases.length])

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-violet-50",
        fullScreen ? "fixed inset-0 z-50" : "w-full h-full min-h-[200px] rounded-xl",
        className,
      )}
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {showLogo && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 relative"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl text-primary-500 tracking-wider">
              <span className="font-bold">strong</span>
              <span className="font-thin">bots</span>
            </span>
          </div>
          <motion.div
            className="absolute -top-2 -right-6"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <Sparkles className="h-6 w-6 text-primary-400" />
          </motion.div>
        </motion.div>
      )}

      {/* Frases divertidas com animação */}
      <div className="h-20 mb-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhraseIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center px-4 max-w-md"
          >
            <p className="text-lg md:text-xl font-medium text-primary-700">{funnyPhrases[currentPhraseIndex]}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Barra de progresso com animação */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        className="w-full max-w-xs h-2 bg-primary-200 rounded-full overflow-hidden mb-4"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 rounded-full relative"
          style={{ width: `${progress}%` }}
        >
          <motion.div
            className="absolute top-0 right-0 h-full w-20 bg-white/30"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <p className="text-primary-700 font-medium">
          {message}
          <span className="inline-block w-8">{dots}</span>
        </p>
        <p className="text-xs text-primary-400 mt-1">{Math.round(progress)}%</p>
      </motion.div>

      {/* Personagem animado */}
      <motion.div
        className="absolute bottom-10 right-10 md:right-20"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <div className="relative">
          <motion.div
            className="w-16 h-16 md:w-24 md:h-24 bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl md:text-4xl font-bold"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            B
          </motion.div>
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-accent-500 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            AI
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}



