"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, Send, Clock, ArrowRight, CheckCircle, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MainLayout from "@/components/layouts/main-layout"
import { siteConfig } from "@/config/site-config"
import { FadeInWhenVisible } from "@/components/ui/animations"
import { LoadingScreen } from "@/components/ui/loading-screen"

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen message="Carregando formulário de contato" />
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio para o servidor
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      })
    }, 5000)
  }

  return (
    <MainLayout>
      <div className="pt-24 pb-16 bg-pattern-modern">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
            <Link href="/" className="flex items-center text-primary-500 hover:text-primary-600 transition-colors mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a página inicial
            </Link>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
              Entre em Contato
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Estamos prontos para ajudar a transformar seu negócio com soluções de IA conversacional personalizadas
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulário de contato */}
            <div className="lg:col-span-2">
              <FadeInWhenVisible>
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Envie sua mensagem</h2>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-green-800 mb-2">Mensagem enviada com sucesso!</h3>
                      <p className="text-green-700 mb-4">
                        Obrigado por entrar em contato. Nossa equipe responderá em breve.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome completo</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Seu nome"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="company">Empresa</Label>
                          <Input
                            id="company"
                            name="company"
                            placeholder="Nome da sua empresa"
                            value={formData.company}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Assunto</Label>
                          <Select onValueChange={handleSelectChange} value={formData.subject}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um assunto" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="consultoria">Consultoria</SelectItem>
                              <SelectItem value="orcamento">Orçamento</SelectItem>
                              <SelectItem value="parceria">Parceria</SelectItem>
                              <SelectItem value="suporte">Suporte</SelectItem>
                              <SelectItem value="outro">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Mensagem</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Como podemos ajudar você?"
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Enviar mensagem
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </FadeInWhenVisible>
            </div>

            {/* Informações de contato */}
            <div className="space-y-6">
              <FadeInWhenVisible delay={0.2}>
                <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl shadow-lg p-6 md:p-8 text-white">
                  <h2 className="text-xl font-bold mb-6">Informações de contato</h2>

                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <Mail className="h-6 w-6 mr-4 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a
                          href={`mailto:${siteConfig.contact.email}`}
                          className="text-white/80 hover:text-white transition-colors"
                        >
                          {siteConfig.contact.email}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Phone className="h-6 w-6 mr-4 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Telefone</p>
                        <a
                          href={`tel:${siteConfig.contact.phone}`}
                          className="text-white/80 hover:text-white transition-colors"
                        >
                          {siteConfig.contact.phone}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <MapPin className="h-6 w-6 mr-4 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Localização</p>
                        <p className="text-white/80">São Paulo, Brasil</p>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-8 pt-6 border-t border-white/20">
                    <Button
                      variant="accent"
                      size="lg"
                      className="w-full"
                      onClick={() => window.open(`https://wa.me/${siteConfig.contact.whatsapp}`, "_blank")}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Fale pelo WhatsApp
                    </Button>
                  </div>
                </div>
              </FadeInWhenVisible>

              <FadeInWhenVisible delay={0.3}>
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                  <div className="flex items-center mb-4">
                    <Clock className="h-5 w-5 text-primary-600 mr-3" />
                    <h3 className="text-lg font-bold text-gray-800">Horário de atendimento</h3>
                  </div>

                  <ul className="space-y-2 text-gray-600">
                    <li className="flex justify-between">
                      <span>Segunda - Sexta:</span>
                      <span className="font-medium">9:00 - 18:00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sábado:</span>
                      <span className="font-medium">10:00 - 14:00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Domingo:</span>
                      <span className="font-medium">Fechado</span>
                    </li>
                  </ul>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Perguntas Frequentes</h2>
            <p className="text-gray-600">Encontre respostas para as perguntas mais comuns sobre nossos serviços</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <FadeInWhenVisible>
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold mb-3 text-gray-800">Quanto custa implementar um chatbot?</h3>
                <p className="text-gray-600">
                  Os preços variam de acordo com a complexidade do projeto e as necessidades específicas do seu negócio.
                  Oferecemos soluções personalizadas com diferentes opções de investimento. Entre em contato para uma
                  avaliação gratuita.
                </p>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.1}>
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold mb-3 text-gray-800">Quanto tempo leva para implementar?</h3>
                <p className="text-gray-600">
                  O tempo de implementação varia de acordo com a complexidade do projeto. Projetos simples podem ser
                  implementados em algumas semanas, enquanto projetos mais complexos podem levar alguns meses.
                </p>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold mb-3 text-gray-800">Vocês oferecem suporte após a implementação?</h3>
                <p className="text-gray-600">
                  Sim, oferecemos suporte contínuo após a implementação. Nosso objetivo é garantir que sua solução de IA
                  conversacional continue funcionando perfeitamente e gerando resultados.
                </p>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.3}>
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold mb-3 text-gray-800">Quais tecnologias vocês utilizam?</h3>
                <p className="text-gray-600">
                  Utilizamos as tecnologias mais avançadas de IA, incluindo processamento de linguagem natural (NLP),
                  aprendizado de máquina e integração com diversas plataformas. Nossa abordagem é agnóstica em termos de
                  tecnologia, escolhendo a melhor solução para cada caso.
                </p>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para transformar seu negócio?</h2>
            <p className=" mb-8 max-w-2xl mx-auto">
              Agende uma consultoria gratuita com nossos especialistas e descubra como a IA conversacional pode
              impulsionar seus resultados.
            </p>
            <Button
              size="lg"
              variant="accent"
              className="rounded-full px-8 shadow-lg hover:scale-105 transition-transform"
            >
              Agendar consultoria gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}



