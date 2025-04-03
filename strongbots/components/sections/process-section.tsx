"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Lightbulb, MessageSquare, Code, BarChart4, GitBranch } from "lucide-react"
import { FadeInWhenVisible } from "@/components/ui/animations"
import { useHasMounted } from "@/hooks/use-has-mounted"

export default function ProcessSection() {
  const mounted = useHasMounted()

  if (!mounted) {
    return <section id="process" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50" />
  }

  return (
    <section id="process" className="section-alt">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <FadeInWhenVisible>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4">
              <GitBranch className="mr-2 h-4 w-4 inline-block" />
              Metodologia
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
              Nosso Método Comprovado
            </h2>
            <p className="text-lg text-gray-600">
              Seguimos uma abordagem estruturada para entregar soluções de IA que geram resultados reais para os
              negócios. Nossa metodologia garante que entendamos suas necessidades e entreguemos soluções que excedam as
              expectativas.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <FadeInWhenVisible delay={0.1}>
            <ProcessCard
              icon={<Lightbulb />}
              step="01"
              title="Descoberta e Estratégia"
              description="Começamos entendendo os objetivos, desafios e oportunidades do seu negócio para desenvolver uma estratégia de IA personalizada."
              color="from-primary-500 to-primary-400"
            />
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <ProcessCard
              icon={<MessageSquare />}
              step="02"
              title="Design da Solução"
              description="Nossos especialistas projetam uma solução de IA personalizada que atende às suas necessidades específicas e se integra aos seus sistemas existentes."
              color="from-secondary-600 to-secondary-500"
            />
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.3}>
            <ProcessCard
              icon={<Code />}
              step="03"
              title="Implementação"
              description="Desenvolvemos e implantamos sua solução de IA com foco em qualidade, segurança e integração perfeita."
              color="from-accent-500 to-accent-400"
            />
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.4}>
            <ProcessCard
              icon={<BarChart4 />}
              step="04"
              title="Otimização e Crescimento"
              description="Monitoramos, otimizamos e aprimoramos continuamente sua solução de IA para garantir que ela entregue o máximo valor."
              color="from-success-500 to-success-400"
            />
          </FadeInWhenVisible>
        </div>

        {/* Process timeline for mobile */}
        <div className="mt-16 lg:hidden">
          <div className="relative border-l-2 border-primary-200 pl-8 ml-4 space-y-12">
            <TimelineItem
              number="01"
              title="Descoberta e Estratégia"
              description="Entendemos seus objetivos e desafios para criar uma estratégia personalizada."
            />
            <TimelineItem
              number="02"
              title="Design da Solução"
              description="Projetamos uma solução que se integra perfeitamente aos seus sistemas."
            />
            <TimelineItem
              number="03"
              title="Implementação"
              description="Desenvolvemos e implantamos com foco em qualidade e segurança."
            />
            <TimelineItem
              number="04"
              title="Otimização"
              description="Monitoramos e aprimoramos continuamente para maximizar resultados."
            />
          </div>
        </div>
      </div>
    </section>
  )
}

interface ProcessCardProps {
  icon: React.ReactNode
  step: string
  title: string
  description: string
  color: string
}

function ProcessCard({ icon, step, title, description, color }: ProcessCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
      className="card-feature h-full"
    >
      <div className="p-6 md:p-8 flex flex-col h-full relative">
        {/* Step number in top right */}
        <div className="absolute top-4 right-4 text-5xl font-bold opacity-15 text-gray-400 select-none">{step}</div>

        {/* Icon with gradient */}
        <div
          className={`w-14 h-14 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110 mb-6`}
        >
          <div className="text-white w-6 h-6">{icon}</div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>

        {/* Decorative line */}
        <div className={`mt-6 h-1 w-16 rounded-full bg-gradient-to-r ${color}`}></div>
      </div>
    </motion.div>
  )
}

interface TimelineItemProps {
  number: string
  title: string
  description: string
}

function TimelineItem({ number, title, description }: TimelineItemProps) {
  return (
    <div className="relative">
      {/* Circle marker */}
      <div className="absolute -left-12 mt-1.5 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold">
        {number}
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

