import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, BarChart, Users, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Adicionar a importação do MainLayout
import MainLayout from "@/components/layouts/main-layout"

export const metadata: Metadata = {
  title: "Todos os Cases de Sucesso | StrongBots",
  description: "Conheça os resultados reais que nossos clientes alcançaram com nossas soluções de IA conversacional.",
}

// Dados dos cases de sucesso
const successCases = [
  {
    id: 1,
    clientKey: "E-commerce Líder",
    industryKey: "Varejo",
    challenge: "Ineficiência no atendimento ao cliente e perda de leads devido ao atraso no primeiro contato.",
    solution:
      "Chatbot com IA para qualificação e captura imediata de leads, com transição estratégica para suporte humano.",
    results: "Aumento significativo na taxa de conversão e redução no custo de aquisição de clientes.",
    image: "/case-ecommerce.png",
    metrics: [
      { value: "73%", label: "aumento na conversão de vendas", icon: "conversion" },
      { value: "42%", label: "redução no custo por lead", icon: "cost" },
      { value: "24/7", label: "atendimento ininterrupto", icon: "time" },
    ],
  },
  {
    id: 2,
    clientKey: "Rede de Clínicas Médicas",
    industryKey: "Saúde",
    challenge: "Dificuldades no gerenciamento de consultas e altas taxas de não comparecimento.",
    solution: "Bot multicanal para agendamento, confirmações e lembretes com integração ao sistema da clínica.",
    results: "Redução drástica nas consultas perdidas e otimização das agendas dos profissionais.",
    image: "/case-healthcare.png",
    metrics: [
      { value: "68%", label: "redução nas faltas às consultas", icon: "conversion" },
      { value: "38%", label: "aumento na ocupação de agenda", icon: "cost" },
      { value: "91%", label: "taxa de satisfação dos pacientes", icon: "time" },
    ],
  },
  {
    id: 3,
    clientKey: "Instituição Financeira",
    industryKey: "Finanças",
    challenge: "Processo de onboarding complexo com alta taxa de abandono.",
    solution: "Jornada conversacional guiada por IA para simplificar o processo de abertura de conta.",
    results: "Aumento na taxa de conclusão do onboarding e redução no tempo do processo.",
    image: "/case-finance.png",
    metrics: [
      { value: "85%", label: "conclusão do processo de cadastro", icon: "conversion" },
      { value: "67%", label: "redução no tempo de onboarding", icon: "cost" },
      { value: "3x", label: "mais contas abertas diariamente", icon: "time" },
    ],
  },
  {
    id: 4,
    clientKey: "Varejista Multinacional",
    industryKey: "Varejo",
    challenge: "Dificuldade em escalar o suporte ao cliente durante períodos de pico de vendas.",
    solution:
      "Assistente virtual inteligente com capacidade de entender intenções complexas e resolver problemas comuns.",
    results: "Redução significativa no tempo de espera e aumento na satisfação do cliente.",
    image: "/placeholder.svg?height=400&width=600",
    metrics: [
      { value: "82%", label: "de resolução no primeiro contato", icon: "conversion" },
      { value: "45%", label: "redução no tempo de espera", icon: "time" },
      { value: "4.8/5", label: "avaliação média de satisfação", icon: "cost" },
    ],
  },
  {
    id: 5,
    clientKey: "Empresa de Telecomunicações",
    industryKey: "Telecomunicações",
    challenge: "Alto volume de chamadas para suporte técnico básico e consultas de faturamento.",
    solution: "Sistema de IA conversacional com capacidade de diagnóstico técnico e acesso a informações de conta.",
    results: "Redução nas chamadas para o call center e melhor experiência do cliente.",
    image: "/placeholder.svg?height=400&width=600",
    metrics: [
      { value: "63%", label: "redução em chamadas de suporte", icon: "conversion" },
      { value: "28%", label: "aumento na resolução self-service", icon: "cost" },
      { value: "52%", label: "redução no custo de atendimento", icon: "time" },
    ],
  },
  {
    id: 6,
    clientKey: "Empresa de Logística",
    industryKey: "Logística",
    challenge: "Dificuldade em fornecer atualizações de rastreamento em tempo real e gerenciar consultas de entrega.",
    solution: "Assistente virtual integrado aos sistemas de rastreamento com notificações proativas.",
    results: "Melhor visibilidade das entregas e redução nas consultas de status.",
    image: "/placeholder.svg?height=400&width=600",
    metrics: [
      { value: "78%", label: "redução em consultas de status", icon: "conversion" },
      { value: "34%", label: "aumento na satisfação do cliente", icon: "cost" },
      { value: "23%", label: "redução em entregas perdidas", icon: "time" },
    ],
  },
]

export default function AllCasesPage() {
  return (
    <MainLayout>
      <main className="pt-24 pb-16 bg-pattern-modern">
        {/* Header section */}
        <section className="container mx-auto px-4 mb-12">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <Link href="/" className="flex items-center text-primary-500 hover:text-primary-600 transition-colors mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a página inicial
            </Link>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
              Cases de Sucesso
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Conheça histórias reais de empresas que transformaram seus negócios com nossas soluções de IA
              conversacional. Cada case representa um desafio único que foi superado com estratégia, tecnologia e
              resultados mensuráveis.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge className="bg-primary-100 text-primary-700 hover:bg-primary-200 cursor-pointer">Todos</Badge>
              <Badge variant="outline" className="hover:bg-primary-50 cursor-pointer">
                Varejo
              </Badge>
              <Badge variant="outline" className="hover:bg-primary-50 cursor-pointer">
                Saúde
              </Badge>
              <Badge variant="outline" className="hover:bg-primary-50 cursor-pointer">
                Finanças
              </Badge>
              <Badge variant="outline" className="hover:bg-primary-50 cursor-pointer">
                Telecomunicações
              </Badge>
              <Badge variant="outline" className="hover:bg-primary-50 cursor-pointer">
                Logística
              </Badge>
            </div>
          </div>
        </section>

        {/* Cases grid */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successCases.map((caseItem) => (
              <CaseCard key={caseItem.id} caseItem={caseItem} />
            ))}
          </div>
        </section>

        {/* CTA section */}
        <section className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para criar seu próprio case de sucesso?</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
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
        </section>
      </main>
    </MainLayout>
  )
}

function CaseCard({ caseItem }: { caseItem: (typeof successCases)[0] }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={caseItem.image || "/placeholder.svg"}
          alt={caseItem.clientKey}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <Badge className="absolute bottom-4 left-4 bg-white/90 text-primary-700">{caseItem.industryKey}</Badge>
      </div>

      <CardContent className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-3 text-gray-800">{caseItem.clientKey}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{caseItem.challenge}</p>

        <div className="space-y-3 mb-4">
          {caseItem.metrics.slice(0, 2).map((metric, index) => (
            <div key={index} className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3 flex-shrink-0">
                {metric.icon === "conversion" && <BarChart className="h-5 w-5 text-primary-600" />}
                {metric.icon === "cost" && <Users className="h-5 w-5 text-primary-600" />}
                {metric.icon === "time" && <Clock className="h-5 w-5 text-primary-600" />}
              </div>
              <div>
                <p className="text-lg font-bold text-primary-600">{metric.value}</p>
                <p className="text-xs text-gray-500">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-auto" asChild>
          <Link href={`/cases/${caseItem.id}`}>
            Ver case completo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

