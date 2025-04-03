"use client"

import { useEffect, useState } from "react"
import { useAnimation } from "framer-motion"
import { useHasMounted } from "@/hooks/use-has-mounted"

// Importar o hook de configuração
import { useSiteConfig } from "@/hooks/use-site-config"

// Layout components
import MainLayout from "@/components/layouts/main-layout"

// Page sections
import HeroSection from "@/components/sections/hero-section"
import ServicesSection from "@/components/sections/services-section"
import ProcessSection from "@/components/sections/process-section"
import CasesSection from "@/components/sections/cases-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import CtaSection from "@/components/sections/cta-section"
import AboutSection from "@/components/about-section"

// Loading screen component
import { LoadingScreen } from "@/components/ui/loading-screen"

export default function Home() {
  const controls = useAnimation()
  const mounted = useHasMounted()
  const { config, isLoading } = useSiteConfig()
  const [pageReady, setPageReady] = useState(false)

  useEffect(() => {
    if (mounted) {
      controls.start("visible")

      // Preload critical images
      const preloadImages = [
        "/hero.png",
        "/logo.svg",
        "/pattern.png",
        "/case-ecommerce.png",
        "/case-healthcare.png",
        "/case-finance.png",
        "/testimonial-1.png",
        "/testimonial-2.png",
        "/testimonial-3.png",
        "/cta-image.png",
        "/chatbot-user.png",
      ]

      const imagePromises = preloadImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = src
          img.crossOrigin = "anonymous"
          img.onload = resolve
          img.onerror = reject
        })
      })

      // Simular um tempo mínimo de carregamento para evitar flash
      const minLoadTime = new Promise((resolve) => setTimeout(resolve, 1500))

      // Quando todas as imagens estiverem carregadas e o tempo mínimo passar
      Promise.all([...imagePromises, minLoadTime])
        .then(() => {
          setPageReady(true)
        })
        .catch((error) => {
          console.error("Erro ao carregar imagens:", error)
          // Mesmo com erro, mostrar a página após um tempo
          setTimeout(() => setPageReady(true), 2000)
        })
    }
  }, [controls, mounted])

  // Mostrar tela de carregamento enquanto as imagens e configurações estão sendo carregadas
  if (isLoading || !mounted || !pageReady) {
    return <LoadingScreen />
  }

  return (
    <MainLayout>
      {config.sections.hero && <HeroSection />}
      {config.sections.about && <AboutSection />}
      {config.sections.services && <ServicesSection />}
      {config.sections.process && <ProcessSection />}
      {config.sections.cases && <CasesSection />}
      {config.sections.testimonials && <TestimonialsSection />}
      {config.sections.cta && <CtaSection />}
    </MainLayout>
  )
}



