"use client"

import type React from "react"

import { MessageSquare, Mic, LinkIcon, Cog, Lightbulb, Users, Calendar, ArrowRight } from "lucide-react"
import { useState } from "react"
import { useChatbot } from "@/hooks/use-chatbot"
import SchedulingModal from "@/components/modals/scheduling-modal"
import { Section, GridLayout } from "@/components/design-system/layout"
import { Heading, Text, GradientText } from "@/components/design-system/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/design-system/card"
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from "@/components/design-system/animation"
import { motion } from "framer-motion"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <motion.div whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }} className="h-full">
      <Card variant="elevated" hover="glow" className="h-full overflow-visible">
        <CardContent className="p-6 md:p-8 flex flex-col h-full relative z-10">
          <div className="gradient-animated p-4 md:p-5 rounded-lg mb-6 md:mb-8 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0 shadow-lg">
            {icon}
          </div>
          <Heading level={3} className="text-lg md:text-xl mb-3 md:mb-4">
            <GradientText>{title}</GradientText>
          </Heading>
          <Text className="text-neutral-600 text-sm md:text-base">{description}</Text>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <Button variant="link" className="p-0 h-auto text-primary-700 font-medium flex items-center text-sm group">
              Saiba mais
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function ServicesSection() {
  const { setIsOpen } = useChatbot()
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false)

  return (
    <Section id="services" padding="lg" className="relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-5 -z-10"></div>

      <FadeInWhenVisible>
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full mb-4">
            <Lightbulb className="h-4 w-4 text-primary-600 mr-2" />
            <span className="text-sm font-medium text-primary-600">Nossas Soluções</span>
          </div>
          <Heading level={2} hasGradient hasAnimation className="mb-4 text-2xl md:text-3xl lg:text-4xl">
            Soluções que Transformam Negócios
          </Heading>
          <Text variant="lead" className="text-neutral-600 text-base md:text-lg">
            Descubra como nossas soluções exclusivas de IA já ajudaram mais de 50 empresas a aumentar receitas e reduzir
            custos operacionais em até 40%.
          </Text>
        </div>
      </FadeInWhenVisible>

      <StaggerContainer className="mb-16 md:mb-24">
        <GridLayout columns={{ sm: 1, md: 2, lg: 3 }} gap="lg" iconColor="text-white">
          <StaggerItem>
            <ServiceCard
              icon={<MessageSquare className="h-6 w-6 md:h-8 md:w-8" />}
              title="Chatbots Inteligentes"
              description="Automatize até 85% do seu atendimento com assistentes virtuais que realmente entendem seus clientes e resolvem problemas em tempo real."
            />
          </StaggerItem>

          <StaggerItem>
            <ServiceCard
              icon={<Mic className="h-6 w-6 md:h-8 md:w-8" />}
              title="Assistentes de Voz"
              description="Reduza em 60% o tempo de espera com interfaces de voz naturais que identificam intenções e oferecem respostas precisas instantaneamente."
            />
          </StaggerItem>

          <StaggerItem>
            <ServiceCard
              icon={<LinkIcon className="h-6 w-6 md:h-8 md:w-8" />}
              title="Integrações Avançadas"
              description="Conecte sua IA diretamente aos seus sistemas existentes, eliminando silos de informação e automatizando processos completos."
            />
          </StaggerItem>

          <StaggerItem>
            <ServiceCard
              icon={<Cog className="h-6 w-6 md:h-8 md:w-8" />}
              title="Automação Inteligente"
              description="Libere sua equipe de tarefas repetitivas e reduza erros em 90% com fluxos de trabalho automatizados que aprendem continuamente."
            />
          </StaggerItem>

          <StaggerItem>
            <ServiceCard
              icon={<Lightbulb className="h-6 w-6 md:h-8 md:w-8" />}
              title="Consultoria Estratégica"
              description="Obtenha um roteiro personalizado de IA com ROI projetado, baseado em casos de sucesso comprovados em seu setor específico."
            />
          </StaggerItem>

          <StaggerItem>
            <ServiceCard
              icon={<Users className="h-6 w-6 md:h-8 md:w-8" />}
              title="Capacitação Acelerada"
              description="Transforme sua equipe em especialistas em IA com nossos workshops práticos que já capacitaram mais de 500 profissionais."
            />
          </StaggerItem>
        </GridLayout>
      </StaggerContainer>

      <FadeInWhenVisible>
        <Card variant="elevated" hover="lift" className="overflow-visible watermark">
          <div className="grid md:grid-cols-2 gap-6 items-center p-6 sm:p-8 md:p-10 relative">
            {/* Floating image */}
            <div className="absolute -top-20 sm:-top-24 left-0 z-10 w-36 sm:w-48 md:w-72 lg:w-80 pointer-events-none float">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%201%20de%20abr.%20de%202025%2C%2018_47_48-2zue9GrgLYFFTxXdwQQGGBSxrz0uHh.png"
                alt="Profissional utilizando IA em dispositivo móvel"
                width={500}
                height={500}
                className="object-contain"
              />
            </div>

            {/* Space reserved for the image */}
            <div className="invisible md:visible md:h-48 lg:h-64 xl:h-80" />

            {/* Content (right side) */}
            <div className="z-20 md:col-start-2">
              <Heading level={3} hasGradient className="mb-3 md:mb-4 text-xl md:text-2xl">
                Não perca mais oportunidades
              </Heading>
              <Text className="text-neutral-600 mb-4 md:mb-6 text-sm md:text-base">
                Enquanto você lê isto, seus concorrentes já estão implementando IA. Nossos clientes conquistaram em
                média 32% mais leads e reduziram custos operacionais em 40% nos primeiros 90 dias.
              </Text>

              <div className="bg-primary-50 p-4 rounded-lg mb-6 border-l-4 border-primary-500">
                <p className="text-sm text-primary-700 font-medium">
                  "A implementação do chatbot da Strongbots aumentou nossas conversões em 73% no primeiro mês."
                </p>
                <p className="text-xs text-primary-600 mt-1">— Diretor de Marketing, E-commerce Nacional</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="group text-sm md:text-base btn-glow"
                  leftIcon={<Calendar className="h-4 w-4 md:h-5 md:w-5 group-hover:animate-pulse" />}
                  onClick={() => setIsSchedulingOpen(true)}
                >
                  Garanta sua consultoria gratuita
                </Button>
                <div className="flex items-center">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img src="/testimonial-1.jpg" alt="Cliente" className="object-cover w-full h-full" />
                  </div>
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm -ml-2">
                    <img src="/testimonial-2.jpg" alt="Cliente" className="object-cover w-full h-full" />
                  </div>
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm -ml-2">
                    <img src="/testimonial-3.jpg" alt="Cliente" className="object-cover w-full h-full" />
                  </div>
                  <Text variant="body-small" className="text-neutral-500 ml-2 text-xs md:text-sm">
                    +50 clientes satisfeitos
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </FadeInWhenVisible>

      {/* Scheduling Modal */}
      <SchedulingModal open={isSchedulingOpen} onOpenChange={setIsSchedulingOpen} />
    </Section>
  )
}

