"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react"
import { useChatbot } from "@/hooks/use-chatbot"
import { FadeInWhenVisible } from "@/components/ui/animations"
import { useState } from "react"
import SchedulingModal from "@/components/modals/scheduling-modal"
import Image from "next/image"

export default function CtaSection() {
  const { setIsOpen } = useChatbot()
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false)

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern -z-10"></div>

      {/* Animated background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-5">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-violet-100 hover-lift">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center">
              <FadeInWhenVisible>
                <div className="inline-flex items-center px-4 py-2 bg-accent/20 rounded-full mb-6">
                  <Sparkles className="h-4 w-4 text-accent-700 mr-2" />
                  <span className="text-sm font-medium text-accent-700">Consultoria Premium</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-4">Junte-se às empresas que já estão no futuro</h2>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                  Agende uma consultoria gratuita com nossos especialistas e descubra como a IA conversacional pode
                  transformar seu negócio.
                </p>

                <div className="bg-violet-50 p-5 rounded-xl mb-6 border-l-4 border-violet-500">
                  <p className="text-base text-violet-700 font-medium italic">
                    "93% das empresas que implementaram nossas soluções de IA superaram seus concorrentes em
                    crescimento."
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-violet-600 mr-3 mt-0.5" />
                    <p className="text-gray-600">Consultoria inicial gratuita de 30 minutos</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-violet-600 mr-3 mt-0.5" />
                    <p className="text-gray-600">Análise personalizada do seu negócio</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-violet-600 mr-3 mt-0.5" />
                    <p className="text-gray-600">Estratégia de implementação de IA sob medida</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="accent"
                      className="rounded-full px-8 shadow-lg hover:scale-105 transition-transform"
                      onClick={() => setIsSchedulingOpen(true)}
                    >
                      Agendar consultoria gratuita
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-6 rounded-lg group"
                      onClick={() => window.open("/contact", "_blank")}
                    >
                      Ver casos de sucesso
                      <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </div>
              </FadeInWhenVisible>
            </div>

            <div className="relative h-64 md:h-auto order-first md:order-last overflow-hidden">
              <Image
                src="/cta-image.png"
                alt="AI Consulting"
                className="object-cover w-full h-full absolute inset-0 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-primary/10"></div>

              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="glass-effect p-6 md:p-8 rounded-xl shadow-xl max-w-xs text-center border border-white/30">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">Vagas limitadas</h3>
                  <p className="text-sm md:text-base text-white/90">
                    Trabalhamos com um número limitado de clientes por mês para garantir qualidade e atenção
                    personalizada.
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-white font-bold text-lg">Apenas 5 vagas disponíveis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scheduling Modal */}
      <SchedulingModal open={isSchedulingOpen} onOpenChange={setIsSchedulingOpen} />
    </section>
  )
}

