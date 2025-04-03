"use client"

import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function TermsOfService() {
  const { t, language } = useLanguage()

  const termsContent = {
    pt: {
      title: "Termos de Serviço",
      lastUpdated: "Última atualização: 30 de março de 2025",
      introduction: {
        title: "1. Introdução",
        content:
          "Bem-vindo aos Termos de Serviço da Strongbots. Este documento é um contrato legal entre você e a Strongbots que rege seu uso de nossos serviços, incluindo nosso site, aplicativos, produtos e serviços de consultoria em IA. Ao acessar ou usar nossos serviços, você concorda com estes termos. Se você não concordar com estes termos, por favor, não use nossos serviços.",
      },
      acceptance: {
        title: "2. Aceitação dos Termos",
        content:
          "Ao acessar ou usar os serviços da Strongbots, você confirma que leu, entendeu e concorda com estes Termos de Serviço. Se você estiver usando nossos serviços em nome de uma organização, você confirma que tem autoridade para vincular essa organização a estes termos.",
      },
      eligibility: {
        title: "3. Elegibilidade do Usuário",
        content:
          "Você deve ter pelo menos 18 anos de idade para usar nossos serviços. Se você estiver usando nossos serviços em nome de uma organização, você garante que tem autoridade legal para vincular essa organização a estes termos.",
      },
      accounts: {
        title: "4. Contas de Usuário",
        content:
          "Alguns de nossos serviços podem exigir que você crie uma conta. Você é responsável por manter a confidencialidade de suas credenciais de conta e por todas as atividades que ocorrem sob sua conta. Você concorda em notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta.",
      },
      intellectualProperty: {
        title: "5. Propriedade Intelectual",
        content:
          "Todo o conteúdo, software, código, design e materiais disponibilizados através de nossos serviços são de propriedade da Strongbots ou de nossos licenciadores e são protegidos por leis de propriedade intelectual. Você não pode copiar, modificar, distribuir, vender ou alugar qualquer parte de nossos serviços sem nossa permissão expressa por escrito.",
      },
      prohibitedActivities: {
        title: "6. Atividades Proibidas",
        content:
          "Você concorda em não usar nossos serviços para qualquer finalidade ilegal ou proibida por estes termos. Você não pode interferir ou tentar interferir com o funcionamento adequado de nossos serviços, incluindo, mas não se limitando a, enviar vírus, sobrecarregar, inundar ou bombardear nossos serviços.",
      },
      liability: {
        title: "7. Limitação de Responsabilidade",
        content:
          "Na extensão máxima permitida por lei, a Strongbots não será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, ou qualquer perda de lucros ou receitas, seja incorrida direta ou indiretamente, ou qualquer perda de dados, uso, boa vontade ou outras perdas intangíveis, resultantes de seu acesso ou uso ou incapacidade de acessar ou usar os serviços.",
      },
      governingLaw: {
        title: "8. Lei Aplicável",
        content:
          "Estes termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar suas disposições sobre conflitos de leis.",
      },
      changes: {
        title: "9. Alterações nos Termos",
        content:
          "Reservamo-nos o direito de modificar estes termos a qualquer momento. Se fizermos alterações, publicaremos os termos atualizados em nosso site e atualizaremos a data de 'última atualização' no topo destes termos. Seu uso continuado de nossos serviços após tais alterações constitui sua aceitação dos novos termos.",
      },
      contact: {
        title: "10. Informações de Contato",
        content:
          "Se você tiver alguma dúvida sobre estes Termos de Serviço, entre em contato conosco em contact@strongbots.com.",
      },
      backToHome: "Voltar para a página inicial",
    },
    en: {
      title: "Terms of Service",
      lastUpdated: "Last updated: March 30, 2025",
      introduction: {
        title: "1. Introduction",
        content:
          "Welcome to Strongbots' Terms of Service. This document is a legal agreement between you and Strongbots that governs your use of our services, including our website, applications, products, and AI consulting services. By accessing or using our services, you agree to these terms. If you do not agree to these terms, please do not use our services.",
      },
      acceptance: {
        title: "2. Acceptance of Terms",
        content:
          "By accessing or using Strongbots' services, you confirm that you have read, understood, and agree to these Terms of Service. If you are using our services on behalf of an organization, you confirm that you have the authority to bind that organization to these terms.",
      },
      eligibility: {
        title: "3. User Eligibility",
        content:
          "You must be at least 18 years old to use our services. If you are using our services on behalf of an organization, you warrant that you have legal authority to bind that organization to these terms.",
      },
      accounts: {
        title: "4. User Accounts",
        content:
          "Some of our services may require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.",
      },
      intellectualProperty: {
        title: "5. Intellectual Property",
        content:
          "All content, software, code, design, and materials made available through our services are owned by Strongbots or our licensors and are protected by intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our services without our express written permission.",
      },
      prohibitedActivities: {
        title: "6. Prohibited Activities",
        content:
          "You agree not to use our services for any illegal or prohibited purpose by these terms. You may not interfere with or attempt to interfere with the proper working of our services, including but not limited to sending viruses, overloading, flooding, or spamming our services.",
      },
      liability: {
        title: "7. Limitation of Liability",
        content:
          "To the maximum extent permitted by law, Strongbots will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.",
      },
      governingLaw: {
        title: "8. Governing Law",
        content:
          "These terms will be governed by and construed in accordance with the laws of Brazil, without regard to its conflict of law provisions.",
      },
      changes: {
        title: "9. Changes to Terms",
        content:
          "We reserve the right to modify these terms at any time. If we make changes, we will post the updated terms on our website and update the 'last updated' date at the top of these terms. Your continued use of our services after such changes constitutes your acceptance of the new terms.",
      },
      contact: {
        title: "10. Contact Information",
        content: "If you have any questions about these Terms of Service, please contact us at contact@strongbots.com.",
      },
      backToHome: "Back to home page",
    },
    es: {
      title: "Términos de Servicio",
      lastUpdated: "Última actualización: 30 de marzo de 2025",
      introduction: {
        title: "1. Introducción",
        content:
          "Bienvenido a los Términos de Servicio de Strongbots. Este documento es un acuerdo legal entre usted y Strongbots que rige su uso de nuestros servicios, incluido nuestro sitio web, aplicaciones, productos y servicios de consultoría de IA. Al acceder o utilizar nuestros servicios, acepta estos términos. Si no está de acuerdo con estos términos, no utilice nuestros servicios.",
      },
      acceptance: {
        title: "2. Aceptación de Términos",
        content:
          "Al acceder o utilizar los servicios de Strongbots, confirma que ha leído, entendido y acepta estos Términos de Servicio. Si está utilizando nuestros servicios en nombre de una organización, confirma que tiene la autoridad para vincular a esa organización a estos términos.",
      },
      eligibility: {
        title: "3. Elegibilidad del Usuario",
        content:
          "Debe tener al menos 18 años para utilizar nuestros servicios. Si está utilizando nuestros servicios en nombre de una organización, garantiza que tiene autoridad legal para vincular a esa organización a estos términos.",
      },
      accounts: {
        title: "4. Cuentas de Usuario",
        content:
          "Algunos de nuestros servicios pueden requerir que cree una cuenta. Usted es responsable de mantener la confidencialidad de las credenciales de su cuenta y de todas las actividades que ocurran bajo su cuenta. Acepta notificarnos inmediatamente sobre cualquier uso no autorizado de su cuenta.",
      },
      intellectualProperty: {
        title: "5. Propiedad Intelectual",
        content:
          "Todo el contenido, software, código, diseño y materiales disponibles a través de nuestros servicios son propiedad de Strongbots o de nuestros licenciantes y están protegidos por leyes de propiedad intelectual. No puede copiar, modificar, distribuir, vender o alquilar ninguna parte de nuestros servicios sin nuestro permiso expreso por escrito.",
      },
      prohibitedActivities: {
        title: "6. Actividades Prohibidas",
        content:
          "Acepta no utilizar nuestros servicios para ningún propósito ilegal o prohibido por estos términos. No puede interferir o intentar interferir con el funcionamiento adecuado de nuestros servicios, incluyendo, pero no limitado a, enviar virus, sobrecargar, inundar o enviar spam a nuestros servicios.",
      },
      liability: {
        title: "7. Limitación de Responsabilidad",
        content:
          "En la máxima medida permitida por la ley, Strongbots no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, ni por pérdida de ganancias o ingresos, ya sea incurrida directa o indirectamente, ni por pérdida de datos, uso, buena voluntad u otras pérdidas intangibles, resultantes de su acceso o uso o incapacidad para acceder o usar los servicios.",
      },
      governingLaw: {
        title: "8. Ley Aplicable",
        content:
          "Estos términos se regirán e interpretarán de acuerdo con las leyes de Brasil, sin tener en cuenta sus disposiciones sobre conflictos de leyes.",
      },
      changes: {
        title: "9. Cambios en los Términos",
        content:
          "Nos reservamos el derecho de modificar estos términos en cualquier momento. Si hacemos cambios, publicaremos los términos actualizados en nuestro sitio web y actualizaremos la fecha de 'última actualización' en la parte superior de estos términos. Su uso continuado de nuestros servicios después de dichos cambios constituye su aceptación de los nuevos términos.",
      },
      contact: {
        title: "10. Información de Contacto",
        content: "Si tiene alguna pregunta sobre estos Términos de Servicio, contáctenos en contact@strongbots.com.",
      },
      backToHome: "Volver a la página principal",
    },
  }

  const content = termsContent[language as keyof typeof termsContent] || termsContent.en

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-8 md:p-12"
        >
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-primary hover:text-primary-dark transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {content.backToHome}
            </Link>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">{content.title}</h1>
          <p className="text-sm text-muted-foreground mb-8 text-center">{content.lastUpdated}</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">{content.introduction.title}</h2>
              <p className="text-muted-foreground">{content.introduction.content}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{content.acceptance.title}</h2>
              <p className="text-muted-foreground">{content.acceptance.content}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{content.eligibility.title}</h2>
              <p className="text-muted-foreground">{content.eligibility.content}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{content.accounts.title}</h2>
              <p className="text-muted-foreground">{content.accounts.content}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{content.intellectualProperty.title}</h2>
              <p className="text-muted-foreground">{content.intellectualProperty.content}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{content.prohibitedActivities.title}</h2>
              <p className="text-muted-foreground">{content.prohibitedActivities.content}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{content.liability.title}</h2>
              <p className="text-muted-foreground">{content.liability.content}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{content.governingLaw.title}</h2>
              <p className="text-muted-foreground">{content.governingLaw.content}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{content.changes.title}</h2>
              <p className="text-muted-foreground">{content.changes.content}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{content.contact.title}</h2>
              <p className="text-muted-foreground">{content.contact.content}</p>
            </section>
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {content.backToHome}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

