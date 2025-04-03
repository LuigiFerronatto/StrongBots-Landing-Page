import Link from "next/link"
import { ArrowLeft, Calendar, Clock, ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MainLayout from "@/components/layouts/main-layout"

// Dados simulados para os posts do blog
const blogPosts = [
  {
    id: 1,
    title: "Como a IA Conversacional está Transformando o Atendimento ao Cliente",
    excerpt:
      "Descubra como empresas estão reduzindo custos e melhorando a satisfação do cliente com chatbots inteligentes.",
    date: "12 de Abril, 2025",
    readTime: "8 min de leitura",
    image: "/placeholder.svg?height=400&width=600",
    category: "Atendimento ao Cliente",
    author: {
      name: "Ana Silva",
      role: "Especialista em IA",
      avatar: "/testimonial-1.jpg",
    },
  },
  {
    id: 2,
    title: "5 Estratégias para Implementar IA na sua Empresa com ROI Positivo",
    excerpt: "Aprenda como implementar soluções de IA que geram retorno financeiro mensurável desde o primeiro mês.",
    date: "5 de Abril, 2025",
    readTime: "6 min de leitura",
    image: "/placeholder.svg?height=400&width=600",
    category: "Estratégia",
    author: {
      name: "Carlos Mendes",
      role: "Consultor de Negócios",
      avatar: "/testimonial-2.jpg",
    },
  },
  {
    id: 3,
    title: "O Futuro dos Voice Bots: Tendências para 2025 e Além",
    excerpt:
      "Conheça as tecnologias emergentes que estão revolucionando a interação por voz e como se preparar para o futuro.",
    date: "28 de Março, 2025",
    readTime: "10 min de leitura",
    image: "/placeholder.svg?height=400&width=600",
    category: "Tendências",
    author: {
      name: "Roberto Alves",
      role: "CTO",
      avatar: "/testimonial-3.jpg",
    },
  },
  {
    id: 4,
    title: "Case Study: Como a Rede de Clínicas Médicas Reduziu 68% das Faltas com IA",
    excerpt: "Um estudo detalhado sobre como implementamos uma solução de IA que transformou a gestão de agendamentos.",
    date: "20 de Março, 2025",
    readTime: "12 min de leitura",
    image: "/case-healthcare.jpg",
    category: "Case Study",
    author: {
      name: "Juliana Costa",
      role: "Gerente de Projetos",
      avatar: "/testimonial-2.jpg",
    },
  },
  {
    id: 5,
    title: "Integrando Chatbots com CRMs: Um Guia Completo",
    excerpt:
      "Aprenda como conectar seu chatbot com sistemas de CRM para uma experiência de cliente verdadeiramente omnichannel.",
    date: "15 de Março, 2025",
    readTime: "9 min de leitura",
    image: "/placeholder.svg?height=400&width=600",
    category: "Integração",
    author: {
      name: "Marcos Oliveira",
      role: "Especialista em Integração",
      avatar: "/testimonial-3.jpg",
    },
  },
  {
    id: 6,
    title: "IA Generativa: Aplicações Práticas para Negócios em 2025",
    excerpt: "Descubra como empresas estão usando GPT-4 e outras IAs generativas para criar valor real e mensurável.",
    date: "8 de Março, 2025",
    readTime: "7 min de leitura",
    image: "/placeholder.svg?height=400&width=600",
    category: "IA Generativa",
    author: {
      name: "Ana Silva",
      role: "Especialista em IA",
      avatar: "/testimonial-1.jpg",
    },
  },
]

// Categorias populares
const popularCategories = [
  "Atendimento ao Cliente",
  "Estratégia",
  "Tendências",
  "Case Study",
  "Integração",
  "IA Generativa",
  "Voice Bots",
  "Automação",
  "ROI",
]

export default function BlogPage() {
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
              Blog Strongbots
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Insights, tendências e estratégias sobre IA conversacional para transformar seu negócio
            </p>

            <div className="relative w-full max-w-xl">
              <Input
                type="text"
                placeholder="Buscar artigos..."
                className="pl-10 pr-4 py-3 rounded-full border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Featured Post */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16 hover:shadow-xl transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <img
                  src="/case-ecommerce.jpg"
                  alt="Featured post"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Em Destaque
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>15 de Abril, 2025</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>15 min de leitura</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-4 hover:text-primary-600 transition-colors">
                  <Link href="/blog/como-aumentamos-vendas-em-73-porcento-com-ia">
                    Como Aumentamos as Vendas de um E-commerce em 73% com IA Conversacional
                  </Link>
                </h2>

                <p className="text-gray-600 mb-6">
                  Um estudo de caso detalhado sobre como implementamos uma solução de chatbot com IA que revolucionou o
                  processo de vendas de um dos maiores e-commerces do Brasil, gerando ROI positivo já no primeiro mês.
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center">
                    <img src="/testimonial-1.jpg" alt="Author" className="w-10 h-10 rounded-full mr-3 object-cover" />
                    <div>
                      <p className="font-medium text-gray-900">Mariana Santos</p>
                      <p className="text-sm text-gray-500">CEO, Strongbots</p>
                    </div>
                  </div>

                  <Button variant="link" className="text-primary-600 font-medium flex items-center group">
                    Ler mais
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blog Posts */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Artigos Recentes</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-48">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary-700">
                        {post.category}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                        <Link href={`/blog/${post.id}`}>{post.title}</Link>
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                          <img
                            src={post.author.avatar || "/placeholder.svg"}
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full mr-2 object-cover"
                          />
                          <div className="text-xs">
                            <p className="font-medium text-gray-900">{post.author.name}</p>
                            <p className="text-gray-500">{post.author.role}</p>
                          </div>
                        </div>

                        <Button
                          variant="link"
                          size="sm"
                          className="text-primary-600 p-0 h-auto text-xs font-medium flex items-center group"
                        >
                          Ler
                          <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <Button variant="outline" className="rounded-full px-6">
                  Carregar mais artigos
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Categories */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">Categorias Populares</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularCategories.map((category, index) => (
                      <Link
                        key={index}
                        href={`/blog/category/${category.toLowerCase().replace(/ /g, "-")}`}
                        className="bg-gray-100 hover:bg-primary-50 hover:text-primary-600 transition-colors px-3 py-1 rounded-full text-sm"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl shadow-md p-6 text-white">
                  <h3 className="text-lg font-bold mb-2">Inscreva-se na Newsletter</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Receba as últimas novidades e insights sobre IA conversacional diretamente no seu email.
                  </p>

                  <div className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Seu melhor email"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white/30"
                    />
                    <Button className="w-full bg-white text-primary-600 hover:bg-white/90">Inscrever-se</Button>
                  </div>

                  <p className="text-white/70 text-xs mt-3">
                    Prometemos não enviar spam. Você pode cancelar a qualquer momento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para transformar seu negócio com IA?</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
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


