"use client"

import { useEffect } from "react"
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

export default function Home() {
  const controls = useAnimation()
  const mounted = useHasMounted()
  const { config, isLoading } = useSiteConfig()

  useEffect(() => {
    if (mounted) {
      controls.start("visible")

      // Preload critical images
      const preloadImages = [
        "/hero.png",
        "/logo.svg",
        "/pattern.png",
        "/case-ecommerce.jpg",
        "/case-healthcare.jpg",
        "/case-finance.jpg",
        "/testimonial-1.jpg",
        "/testimonial-2.jpg",
        "/testimonial-3.jpg",
        "/cta-image.jpg",
        "/chatbot-user.png",
      ]

      preloadImages.forEach((src) => {
        const img = new Image()
        img.src = src
        img.crossOrigin = "anonymous"
      })
    }
  }, [controls, mounted])

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>
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

