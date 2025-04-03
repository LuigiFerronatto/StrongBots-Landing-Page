"use client"
import Link from "next/link"
import { ArrowLeft, BarChart, Users, Clock, Star, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Adicionar a importação do MainLayout
import MainLayout from "@/components/layouts/main-layout"

// Adicione a importação no topo do arquivo
import { LoadingScreen } from "@/components/ui/loading-screen"
import { useState, useEffect } from "react"

interface CasePageProps {
  params: {
    id: string
  }
}

export default function CaseDetailPageClient({ params }: CasePageProps) {
  // Em um cenário real, você buscaria os dados do case com base no ID
  const caseId = params.id

  // Adicione um estado de loading
  const [isLoading, setIsLoading] = useState(true)

  // Adicione um useEffect para simular o carregamento dos dados do case
  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Dados simulados para o case
  const caseData = {
    id: 1,
    clientKey: "E-commerce Líder",
    industryKey: "Varejo",
    challenge: "Ineficiência no atendimento ao cliente e perda de leads devido ao atraso no primeiro contato.",
    solution:
      "Chatbot com IA para qualificação e captura imediata de leads, com transição estratégica para suporte humano.",
    results: "Aumento significativo na taxa de conversão e redução no custo de aquisição de clientes.",
    image: "/case-ecommerce.jpg",
    metrics: [
      { value: "73%", label: "aumento na conversão de vendas", icon: "conversion" },
      { value: "42%", label: "redução no custo por lead", icon: "cost" },
      { value: "24/7", label: "atendimento ininterrupto", icon: "time" },
    ],
    fullDescription: {
      background:
        "Uma das maiores plataformas de e-commerce do Brasil, com mais de 5 milhões de visitantes mensais e um catálogo de mais de 50.000 produtos, enfrentava desafios significativos no processo de conversão de visitantes em clientes.",
      challenges: [
        "Tempo de resposta lento para novos leads, resultando em perda de oportunidades",
        "Equipe de vendas sobrecarregada com consultas básicas e leads não qualificados",
        "Dificuldade em fornecer suporte 24/7 para clientes em diferentes fusos horários",
        "Altas taxas de abandono de carrinho devido à falta de assistência imediata",
      ],
      solution:
        "Implementamos um chatbot avançado com IA que foi integrado ao site e às plataformas de mídia social da empresa. O sistema foi treinado com dados históricos de vendas e suporte para identificar padrões de comportamento do cliente e qualificar leads com precisão.",
      solutionDetails: [
        "Integração com CRM e sistemas de e-commerce existentes",
        "Qualificação automatizada de leads com base em intenção de compra",
        "Transferência inteligente para equipe humana apenas para leads qualificados",
        "Assistência proativa para clientes com carrinhos abandonados",
        "Análise de sentimento para identificar clientes insatisfeitos",
      ],
      implementation:
        "O projeto foi implementado em três fases ao longo de 8 semanas, começando com um piloto em uma categoria de produtos específica antes de expandir para todo o site. A equipe de vendas recebeu treinamento sobre como trabalhar efetivamente com o sistema de IA.",
      results:
        "Nos primeiros 90 dias após a implementação completa, o cliente observou resultados transformadores que superaram todas as expectativas iniciais.",
      testimonial:
        "A solução da StrongBots revolucionou nossa abordagem de vendas online. Não apenas aumentamos nossas conversões significativamente, mas também melhoramos a experiência do cliente e reduzimos nossos custos operacionais. A IA realmente entende as necessidades dos nossos clientes e fornece assistência personalizada que antes seria impossível em nossa escala de operação.",
      testimonialAuthor: "Diretor de E-commerce",
    },
  }

  // Antes do return principal, adicione:
  if (isLoading) {
    return <LoadingScreen message="Carregando case de sucesso" />
  }

  return (
    <MainLayout>
      <main className="pt-24 pb-16 bg-pattern-modern">
        {/* Header with image */}
        <div className="relative h-[300px] md:h-[400px] mb-8">
          <div className="absolute inset-0">
            <img
              src={caseData.image || "/placeholder.svg"}
              alt={caseData.clientKey}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
          </div>

          <div className="container mx-auto px-4 relative h-full flex flex-col justify-end pb-8">
            <Link href="/cases" className="flex items-center text-white hover:text-primary-200 transition-colors mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para todos os cases
            </Link>

            <Badge className="mb-4 bg-primary-500 text-white">{caseData.industryKey}</Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{caseData.clientKey}</h1>

            <p className="text-white/90 text-lg max-w-3xl">
              Como ajudamos um e-commerce líder a aumentar suas conversões em 73% com IA conversacional
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Sidebar with metrics */}
            <div className="md:col-span-1 order-2 md:order-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6 text-gray-800">Resultados</h3>

                <div className="space-y-6 mb-6">
                  {caseData.metrics.map((metric, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4 flex-shrink-0">
                        {metric.icon === "conversion" && <BarChart className="h-6 w-6 text-primary-600" />}
                        {metric.icon === "cost" && <Users className="h-6 w-6 text-primary-600" />}
                        {metric.icon === "time" && <Clock className="h-6 w-6 text-primary-600" />}
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary-600">{metric.value}</p>
                        <p className="text-sm text-gray-500">{metric.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-center mb-4">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  </div>

                  <Button variant="primary" className="w-full">
                    Quero resultados similares
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="md:col-span-2 order-1 md:order-2">
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Contexto</h2>
                <p className="text-gray-600 mb-6">{caseData.fullDescription.background}</p>

                <h2 className="text-2xl font-bold mb-4 text-gray-800">Desafios</h2>
                <ul className="space-y-3 mb-6">
                  {caseData.fullDescription.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{challenge}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="text-2xl font-bold mb-4 text-gray-800">Nossa Solução</h2>
                <p className="text-gray-600 mb-6">{caseData.fullDescription.solution}</p>

                <div className="bg-primary-50 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold mb-4 text-primary-700">Componentes da Solução</h3>
                  <ul className="space-y-3">
                    {caseData.fullDescription.solutionDetails.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <h2 className="text-2xl font-bold mb-4 text-gray-800">Implementação</h2>
                <p className="text-gray-600 mb-6">{caseData.fullDescription.implementation}</p>

                <h2 className="text-2xl font-bold mb-4 text-gray-800">Resultados</h2>
                <p className="text-gray-600 mb-6">{caseData.fullDescription.results}</p>

                <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-primary-500">
                  <p className="text-gray-700 italic mb-4">"{caseData.fullDescription.testimonial}"</p>
                  <p className="text-primary-600 font-medium">— {caseData.fullDescription.testimonialAuthor}</p>
                </div>
              </div>

              {/* Related cases */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-800">Cases Relacionados</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                    <div className="h-40 relative">
                      <img
                        src="/case-finance.jpg"
                        alt="Instituição Financeira"
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute bottom-3 left-3 bg-white/90 text-primary-700">Finanças</Badge>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold mb-2">Instituição Financeira</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Simplificação do processo de onboarding com IA conversacional
                      </p>
                      <Link
                        href="/cases/3"
                        className="text-primary-600 text-sm font-medium flex items-center hover:text-primary-700"
                      >
                        Ver case
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                    <div className="h-40 relative">
                      <img
                        src="/case-healthcare.jpg"
                        alt="Rede de Clínicas Médicas"
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute bottom-3 left-3 bg-white/90 text-primary-700">Saúde</Badge>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold mb-2">Rede de Clínicas Médicas</h4>
                      <p className="text-sm text-gray-600 mb-3">Redução de 68% nas faltas às consultas com IA</p>
                      <Link
                        href="/cases/2"
                        className="text-primary-600 text-sm font-medium flex items-center hover:text-primary-700"
                      >
                        Ver case
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para criar seu próprio case de sucesso?</h2>
            <p className=" mb-8 max-w-2xl mx-auto">
              Agende uma consultoria gratuita com nossos especialistas e descubra como a IA conversacional pode
              transformar seu negócio.
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
        </div>
      </main>
    </MainLayout>
  )
}



