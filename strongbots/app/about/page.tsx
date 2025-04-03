"use client"

import Link from "next/link"
import { ArrowLeft, Users, Award, Target, Clock, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import MainLayout from "@/components/layouts/main-layout"

// Dados da equipe
const teamMembers = [
  {
    name: "Mariana Santos",
    role: "CEO & Fundadora",
    bio: "Especialista em IA com mais de 10 anos de experiência em empresas de tecnologia. Formada em Ciência da Computação pela USP com MBA em Negócios Digitais.",
    image: "/testimonial-1.png",
  },
  {
    name: "Carlos Mendes",
    role: "CTO",
    bio: "Engenheiro de Software com vasta experiência em desenvolvimento de soluções de IA. Liderou projetos de chatbots para grandes empresas do setor financeiro.",
    image: "/testimonial-2.png",
  },
  {
    name: "Juliana Costa",
    role: "Diretora de Operações",
    bio: "Especialista em gestão de projetos com certificação PMP. Responsável por garantir a entrega de soluções de alta qualidade dentro do prazo.",
    image: "/testimonial-3.png",
  },
  {
    name: "Roberto Alves",
    role: "Líder de Inovação",
    bio: "PhD em Inteligência Artificial com foco em processamento de linguagem natural. Responsável por manter a Strongbots na vanguarda tecnológica.",
    image: "/testimonial-2.png",
  },
]

// Valores da empresa
const companyValues = [
  {
    title: "Inovação Constante",
    description:
      "Buscamos continuamente novas tecnologias e abordagens para oferecer as melhores soluções aos nossos clientes.",
    icon: <Target className="h-6 w-6" />,
  },
  {
    title: "Excelência Técnica",
    description: "Mantemos os mais altos padrões de qualidade em todos os nossos desenvolvimentos e implementações.",
    icon: <Award className="h-6 w-6" />,
  },
  {
    title: "Foco em Resultados",
    description:
      "Nosso compromisso é entregar soluções que gerem impacto mensurável e ROI positivo para nossos clientes.",
    icon: <CheckCircle className="h-6 w-6" />,
  },
  {
    title: "Agilidade",
    description:
      "Trabalhamos com metodologias ágeis para entregar valor rapidamente e adaptar nossas soluções às necessidades em evolução.",
    icon: <Clock className="h-6 w-6" />,
  },
]

// Marcos históricos
const milestones = [
  {
    year: "2020",
    title: "Fundação da Strongbots",
    description: "Início das operações com foco em chatbots para pequenas empresas.",
  },
  {
    year: "2021",
    title: "Primeiro Grande Cliente",
    description: "Implementação de solução de IA para uma das maiores redes de varejo do Brasil.",
  },
  {
    year: "2022",
    title: "Expansão da Equipe",
    description: "Crescimento para 15 especialistas e abertura do escritório em São Paulo.",
  },
  {
    year: "2023",
    title: "Reconhecimento do Mercado",
    description: "Premiada como uma das startups mais inovadoras em IA no Brasil.",
  },
  {
    year: "2024",
    title: "Internacionalização",
    description: "Início das operações em Portugal e expansão para América Latina.",
  },
  {
    year: "2025",
    title: "Lançamento da Plataforma Proprietária",
    description: "Desenvolvimento de plataforma própria de IA conversacional com tecnologia de ponta.",
  },
]

export default function AboutPage() {
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
              Sobre a Strongbots
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Somos especialistas em IA conversacional, dedicados a transformar a maneira como empresas se comunicam com
              seus clientes
            </p>
          </div>

          {/* Mission and Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Nossa Missão</h2>
              <p className="text-gray-600">
                Transformar a comunicação empresarial através de soluções de IA conversacional que geram resultados
                mensuráveis, aumentando a eficiência operacional e melhorando a experiência do cliente.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Nossa Visão</h2>
              <p className="text-gray-600">
                Ser reconhecida como a principal referência em soluções de IA conversacional na América Latina,
                liderando a inovação no setor e estabelecendo novos padrões de excelência e resultados.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="container mx-auto px-4 mb-16">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Nossa História</h2>
                <p className="text-gray-600 mb-6">
                  A Strongbots nasceu da visão de um grupo de especialistas em tecnologia que identificaram uma lacuna
                  no mercado: soluções de IA conversacional que realmente entregassem resultados mensuráveis para as
                  empresas.
                </p>
                <p className="text-gray-600 mb-6">
                  Fundada em 2020, começamos com uma equipe pequena mas altamente especializada, focada em desenvolver
                  chatbots inteligentes para pequenas e médias empresas. Nosso diferencial desde o início foi a
                  abordagem consultiva e personalizada, entendendo profundamente as necessidades de cada cliente antes
                  de propor soluções.
                </p>
                <p className="text-gray-600">
                  Ao longo dos anos, expandimos nossa atuação para grandes corporações, desenvolvendo soluções cada vez
                  mais sofisticadas e mantendo nosso compromisso com a excelência técnica e resultados tangíveis. Hoje,
                  somos reconhecidos como líderes em IA conversacional, com cases de sucesso em diversos setores.
                </p>
              </div>

              <div className="relative h-64 md:h-auto order-first md:order-last">
                <img src="/cta-image.png" alt="Equipe Strongbots" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-primary/10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Nossos Valores</h2>
            <p className="text-gray-600">
              Os princípios que guiam nossas decisões e definem nossa cultura organizacional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyValues.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4 text-primary-600">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Nossa Trajetória</h2>
            <p className="text-gray-600">Os principais marcos na história da Strongbots</p>
          </div>

          <div className="relative border-l-2 border-primary-200 ml-4 md:ml-0 md:mx-auto md:max-w-3xl">
            {milestones.map((milestone, index) => (
              <div key={index} className="mb-10 ml-6 md:ml-0 md:grid md:grid-cols-2 md:gap-8">
                <div className={`md:text-right ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                  <div className="absolute -left-3 md:left-1/2 md:-ml-1.5 mt-1.5 w-6 h-6 rounded-full bg-primary-500 border-4 border-white"></div>
                  <h3 className="text-xl font-bold text-primary-600">{milestone.year}</h3>
                  <h4 className="font-semibold text-gray-800">{milestone.title}</h4>
                </div>
                <div className={index % 2 === 0 ? "md:order-2" : "md:order-1"}>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Nossa Equipe</h2>
            <p className="text-gray-600">Conheça os especialistas por trás das soluções de IA da Strongbots</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-gray-800">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Vamos transformar seu negócio juntos</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Entre em contato conosco para uma consultoria gratuita e descubra como podemos ajudar sua empresa a
              alcançar novos patamares com IA conversacional.
            </p>
            <Button
              size="lg"
              variant="accent"
              className="rounded-full px-8 shadow-lg hover:scale-105 transition-transform"
            >
              Fale com nossos especialistas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}



