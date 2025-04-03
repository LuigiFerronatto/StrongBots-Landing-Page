"use client"

import { ArrowRight, CheckCircle, Sparkles, ChevronDown } from "lucide-react"
import { useChatbot } from "@/hooks/use-chatbot"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Display, Text, Highlight, GradientText } from "@/components/design-system/typography"

export default function HeroSection() {
  const { setIsOpen } = useChatbot()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Typing animation
  const phrases = [
    "transformar vendas.",
    "automatizar processos.",
    "melhorar atendimento.",
    "aumentar conversões.",
    "reduzir custos.",
  ]

  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [text, setText] = useState("")
  const [delta, setDelta] = useState(100)

  useEffect(() => {
    const ticker = setInterval(() => {
      const i = currentPhrase % phrases.length
      const fullPhrase = phrases[i]

      if (isDeleting) {
        setText(fullPhrase.substring(0, text.length - 1))
      } else {
        setText(fullPhrase.substring(0, text.length + 1))
      }

      if (!isDeleting && text === fullPhrase) {
        setIsDeleting(true)
        setDelta(150)
      } else if (isDeleting && text === "") {
        setIsDeleting(false)
        setCurrentPhrase(currentPhrase + 1)
        setDelta(100)
      }
    }, delta)

    return () => clearInterval(ticker)
  }, [currentPhrase, delta, isDeleting, text, phrases])

  return (
    <section id="hero" className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-24 bg-pattern-modern">
      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full mb-6 md:mb-8 hover-lift"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="h-4 w-4 text-primary-600 mr-2" />
              <span className="text-sm font-medium text-primary-600">Consultoria Premium em IA</span>
            </motion.div>

            <Display size="large" className="mb-6 md:mb-8 leading-tight">
              <Highlight>Bots inteligentes.</Highlight>
              <br />
              <GradientText animated>Resultados reais.</GradientText>
            </Display>

            <Text variant="lead" className="text-neutral-600 mb-3 md:mb-4 max-w-xl mx-auto md:mx-0">
              Transformamos seu negócio com IA conversacional para
            </Text>

            <div className="h-10 mb-8 md:mb-10">
              <span className="text-xl md:text-2xl text-primary-600 font-semibold typing-effect">{text}</span>
              <span className="text-primary-600 animate-pulse">|</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8 md:mb-10">
              <Button
                size="xl"
                variant="primary"
                className="w-full sm:w-auto shadow-lg transition-all duration-300 hover:translate-y-[-2px] btn-glow"
                onClick={() => setIsOpen(true)}
              >
                <span className="relative z-10">Comece sua transformação digital</span>
              </Button>

              <Button
                variant="outline"
                size="xl"
                className="w-full sm:w-auto transition-all duration-300 hover:translate-y-[-2px] group"
                onClick={() => {
                  window.location.href = "/contact"
                }}
              >
                Fale conosco
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-5 md:gap-6 justify-center md:justify-start">
              <motion.div className="flex items-center hover-lift" whileHover={{ scale: 1.05 }}>
                <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                <span className="text-sm text-neutral-700 font-medium">Soluções Sob Medida</span>
              </motion.div>
              <motion.div className="flex items-center hover-lift" whileHover={{ scale: 1.05 }}>
                <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                <span className="text-sm text-neutral-700 font-medium">Consultoria Especializada</span>
              </motion.div>
              <motion.div className="flex items-center hover-lift" whileHover={{ scale: 1.05 }}>
                <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                <span className="text-sm text-neutral-700 font-medium">Garantia de Resultados</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="hidden md:block relative"
          >
            <div className="relative h-[500px] w-full">
              {/* Glow effect behind the image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-200 to-secondary-100 rounded-full filter blur-3xl opacity-50 transform -translate-y-4 translate-x-4"></div>

              <img
                src="/hero.png"
                alt="AI Chatbot Illustration"
                className="object-contain w-full h-full relative z-10 float"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6, ease: "easeInOut" }}
              className="absolute top-20 left-0 glass-card p-4 rounded-xl shadow-xl max-w-[200px] z-10 hover-lift"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 pulse">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">73% Aumento</p>
                  <p className="text-xs text-neutral-500">na taxa de conversão</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 right-0 glass-card p-4 rounded-xl shadow-xl max-w-[200px] z-10 hover-lift"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 pulse">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">42% Redução</p>
                  <p className="text-xs text-neutral-500">em custos operacionais</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-sm text-neutral-500 mb-2">Conheça mais</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            <ChevronDown className="h-6 w-6 text-primary-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}



