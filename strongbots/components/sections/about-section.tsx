"use client"

import type React from "react"

import { Layers, Zap, BarChart4, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { FadeInWhenVisible, ScaleInWhenVisible } from "../ui/animations"

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-violet-50 -z-10"></div>

      {/* Animated background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="relative mb-12 md:mb-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-0.5 w-16 md:w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          </div>
          <FadeInWhenVisible>
            <div className="relative bg-gradient-to-r from-background via-background/95 to-background p-4 md:p-6 rounded-lg shadow-sm max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center mb-4 md:mb-6 gradient-text-animated font-montserrat">
                Por que nos escolher
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-center text-muted-foreground mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed font-nunito">
                Somos especialistas em{" "}
                <span className="font-medium text-foreground font-montserrat text-highlight">IA conversacional</span>{" "}
                com mais de 5 anos de experiência. Diferente de outros, não vendemos plataformas genéricas. Entregamos{" "}
                <span className="font-medium text-foreground font-montserrat text-highlight">
                  estratégias personalizadas
                </span>{" "}
                e soluções que já geraram{" "}
                <span className="font-medium text-foreground font-montserrat text-highlight">
                  ROI comprovado de 300%
                </span>{" "}
                para nossos clientes.
              </p>
              <div className="flex justify-center">
                <div className="h-1 w-12 md:w-16 bg-gradient-to-r from-primary/30 to-primary rounded-full"></div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-8">
          <ScaleInWhenVisible delay={0.1}>
            <FeatureCard
              icon={<Layers className="h-8 w-8 md:h-10 md:w-10 text-primary" />}
              title="Liberdade tecnológica"
              description="Você não fica preso a uma única plataforma. Implementamos a solução ideal para seu caso específico, garantindo flexibilidade total."
            />
          </ScaleInWhenVisible>

          <ScaleInWhenVisible delay={0.3}>
            <FeatureCard
              icon={<Zap className="h-8 w-8 md:h-10 md:w-10 text-secondary" />}
              title="Expertise comprovada"
              description="Nossa equipe certificada domina as tecnologias de IA mais avançadas do mercado, aplicando-as de forma estratégica e prática."
            />
          </ScaleInWhenVisible>

          <ScaleInWhenVisible delay={0.5}>
            <FeatureCard
              icon={<BarChart4 className="h-8 w-8 md:h-10 md:w-10 text-accent" />}
              title="Resultados garantidos"
              description="Nossos projetos entregam ROI mensurável. Se não atingirmos as metas acordadas, continuamos trabalhando sem custo adicional."
            />
          </ScaleInWhenVisible>
        </div>

        {/* Estatísticas */}
        <div className="mt-16 md:mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <StatCard number="5+" label="Anos de experiência" />
            <StatCard number="50+" label="Clientes satisfeitos" />
            <StatCard number="300%" label="ROI médio" />
            <StatCard number="24/7" label="Suporte dedicado" />
          </div>
        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition-all border border-violet-100 h-full card-3d"
    >
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full bg-violet-50 p-4 md:p-5 mb-4 md:mb-6 glow-effect">{icon}</div>
        <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 font-montserrat gradient-text">{title}</h3>
        <p className="text-muted-foreground font-nunito text-sm md:text-base">{description}</p>
      </div>
    </motion.div>
  )
}

interface StatCardProps {
  number: string
  label: string
}

function StatCard({ number, label }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-lg shadow-md border border-violet-100 text-center hover-lift"
    >
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-violet-100 mb-4">
        <Sparkles className="h-5 w-5 text-violet-600" />
      </div>
      <h4 className="text-3xl md:text-4xl font-bold mb-1 gradient-text">{number}</h4>
      <p className="text-sm text-gray-600">{label}</p>
    </motion.div>
  )
}

