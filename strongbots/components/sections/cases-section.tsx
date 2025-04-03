"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight, BarChart, Users, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeInWhenVisible } from "@/components/ui/animations"
import type { Case, CaseCardProps } from "@/types/case"
import { useMediaQuery } from "@/hooks/use-media-query"
import Link from "next/link"

export default function CasesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isHovering, setIsHovering] = useState(false)

  const cases: Case[] = [
    {
      id: 1,
      clientKey: "E-commerce Líder",
      industryKey: "Varejo",
      challenge: "Inefficient customer service and lead loss due to delayed first contact.",
      solution: "AI chatbot for immediate lead qualification and capture, with strategic transition to human support.",
      results: "Significant increase in conversion rate and reduced customer acquisition cost.",
      image: "/case-ecommerce.jpg",
      metrics: [
        { value: "73%", label: "increase in sales conversion", icon: "conversion" },
        { value: "42%", label: "reduction in cost per lead", icon: "cost" },
        { value: "24/7", label: "uninterrupted customer service", icon: "time" },
      ],
    },
    {
      id: 2,
      clientKey: "Rede de Clínicas Médicas",
      industryKey: "Saúde",
      challenge: "Appointment management difficulties and high no-show rates.",
      solution: "Multi-channel bot for scheduling, confirmations, and reminders with clinic system integration.",
      results: "Dramatic reduction in missed appointments and optimized professional schedules.",
      image: "/case-healthcare.jpg",
      metrics: [
        { value: "68%", label: "reduction in missed appointments", icon: "conversion" },
        { value: "38%", label: "increase in schedule utilization", icon: "cost" },
        { value: "91%", label: "patient satisfaction rate", icon: "time" },
      ],
    },
    {
      id: 3,
      clientKey: "Instituição Financeira",
      industryKey: "Finanças",
      challenge: "Complex onboarding process with high abandonment rate.",
      solution: "AI-guided conversational journey to simplify the account opening process.",
      results: "Increased onboarding completion rate and reduced process time.",
      image: "/case-finance.jpg",
      metrics: [
        { value: "85%", label: "registration process completion", icon: "conversion" },
        { value: "67%", label: "reduction in onboarding time", icon: "cost" },
        { value: "3x", label: "more accounts opened daily", icon: "time" },
      ],
    },
  ]

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  // Auto-play carousel when not hovering
  useEffect(() => {
    if (isHovering) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === cases.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [cases.length, isHovering])

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === cases.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? cases.length - 1 : prev - 1))
  }

  return (
    <section id="cases" className="section-padding bg-gradient-to-b from-white to-violet-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      <div className="container-custom relative z-10">
        <FadeInWhenVisible>
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-violet-100 rounded-full mb-4">
              <Star className="h-4 w-4 text-violet-600 mr-2" />
              <span className="text-sm font-medium text-violet-600">Cases de Sucesso</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 gradient-text-animated">
              Histórias de Sucesso
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Veja como transformamos empresas com soluções de IA conversacional inteligentes. Nossos cases demonstram o
              impacto real dos nossos serviços de consultoria.
            </p>
          </div>
        </FadeInWhenVisible>

        <div
          className="relative"
          ref={containerRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="overflow-hidden rounded-xl">
            {isMobile ? (
              // Mobile view - stacked cards
              <div className="space-y-6">
                {cases.map((caseItem, index) => (
                  <div
                    key={caseItem.id}
                    className={`transition-opacity duration-500 ${
                      index === activeIndex ? "opacity-100" : "opacity-0 hidden"
                    }`}
                  >
                    <CaseCard caseItem={caseItem} width={width} />
                  </div>
                ))}
              </div>
            ) : (
              // Desktop view - horizontal slider
              <motion.div
                animate={{ x: -activeIndex * width }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex"
              >
                {cases.map((caseItem) => (
                  <CaseCard key={caseItem.id} caseItem={caseItem} width={width} />
                ))}
              </motion.div>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 rounded-full z-10 bg-white/80 backdrop-blur-sm shadow-md border-none hover:bg-white hover:scale-110 transition-all"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5 text-violet-600" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 rounded-full z-10 bg-white/80 backdrop-blur-sm shadow-md border-none hover:bg-white hover:scale-110 transition-all"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5 text-violet-600" />
          </Button>

          <div className="flex justify-center mt-6 md:mt-8 gap-2">
            {cases.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-violet-600 w-6" : "bg-violet-200 hover:bg-violet-300"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-12 md:mt-16 text-center">
          <Button
            variant="primary"
            size="lg"
            className="rounded-xl shadow-lg transition-all duration-300 hover:translate-y-[-2px] btn-glow group"
            asChild
          >
            <Link href="/cases">
              Ver todos os cases de sucesso
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function CaseCard({ caseItem, width }: CaseCardProps) {
  return (
    <Card className="shadow-xl overflow-hidden border-animated" style={{ width: width || "100%", flexShrink: 0 }}>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Left column - Case details */}
          <div className="p-6 sm:p-8 md:p-10 md:w-3/5">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-primary/10 text-primary border-none font-medium px-3 py-1">
                {caseItem.industryKey}
              </Badge>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 gradient-text">{caseItem.clientKey}</h3>

            <div className="space-y-6 md:space-y-8">
              <div>
                <h4 className="font-semibold text-base md:text-lg mb-3 flex items-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-primary text-xs font-bold">1</span>
                  </span>
                  <span className="text-highlight">Desafio</span>
                </h4>
                <p className="text-sm md:text-base text-muted-foreground ml-11">{caseItem.challenge}</p>
              </div>

              <div>
                <h4 className="font-semibold text-base md:text-lg mb-3 flex items-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-primary text-xs font-bold">2</span>
                  </span>
                  <span className="text-highlight">Nossa Solução</span>
                </h4>
                <p className="text-sm md:text-base text-muted-foreground ml-11">{caseItem.solution}</p>
              </div>

              <div>
                <h4 className="font-semibold text-base md:text-lg mb-3 flex items-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-primary text-xs font-bold">3</span>
                  </span>
                  <span className="text-highlight">Resultados</span>
                </h4>
                <p className="text-sm md:text-base text-muted-foreground ml-11">{caseItem.results}</p>
              </div>
            </div>

            <Button
              variant="link"
              className="mt-6 md:mt-8 p-0 h-auto text-primary-500 font-medium flex items-center group"
            >
              Ver Case Completo
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Right column - Image and Metrics */}
          <div className="bg-gradient-to-br from-violet-50 to-indigo-50 md:w-2/5 flex flex-col">
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
              <img
                src={caseItem.image || "/placeholder.svg"}
                alt={caseItem.clientKey}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-violet-800">
                Case Study
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-grow">
              <h4 className="font-semibold text-base md:text-lg mb-6 text-center gradient-text">Impacto Mensurável</h4>

              <div className="space-y-5 md:space-y-6">
                {caseItem.metrics.map((metric, index) => (
                  <div key={index} className="flex items-center hover:translate-x-1 transition-transform">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center shadow-md flex-shrink-0 border border-violet-100">
                      {metric.icon === "conversion" && <BarChart className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
                      {metric.icon === "cost" && <Users className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
                      {metric.icon === "time" && <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl md:text-3xl font-bold gradient-text">{metric.value}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{metric.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

