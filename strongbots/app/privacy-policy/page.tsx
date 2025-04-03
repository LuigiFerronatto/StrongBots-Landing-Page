"use client"

import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function PrivacyPolicy() {
  const { t, language } = useLanguage()

  const privacyContent = {
    pt: {
      title: "Política de Privacidade",
      lastUpdated: "Última atualização: 30 de março de 2025",
      introduction: {
        title: "1. Introdução",
        content:
          "A Strongbots está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações pessoais quando você usa nosso site, aplicativos e serviços de consultoria em IA (coletivamente, os 'Serviços'). Ao usar nossos Serviços, você concorda com a coleta e uso de informações de acordo com esta política.",
      },
      collection: {
        title: "2. Informações que Coletamos",
        content: "Podemos coletar vários tipos de informações, incluindo:",
        items: [
          "Informações de identificação pessoal (como nome, endereço de e-mail, número de telefone)",
          "Informações de uso e interação com nossos Serviços",
          "Informações do dispositivo e navegador",
          "Informações de localização",
          "Informações que você nos fornece voluntariamente",
        ],
      },
      use: {
        title: "3. Como Usamos Suas Informações",
        content: "Usamos as informações coletadas para:",
        items: [
          "Fornecer, manter e melhorar nossos Serviços",
          "Processar transações e enviar notificações relacionadas",
          "Responder a comentários, perguntas e solicitações",
          "Enviar informações técnicas, atualizações e mensagens administrativas",
          "Comunicar sobre promoções, eventos e outras notícias sobre nossos Serviços",
          "Monitorar e analisar tendências, uso e atividades",
          "Detectar, prevenir e resolver problemas técnicos e de segurança",
        ],
      },
      sharing: {
        title: "4. Compartilhamento de Informações",
        content:
          "Não vendemos suas informações pessoais a terceiros. Podemos compartilhar suas informações nas seguintes circunstâncias:",
        items: [
          "Com prestadores de serviços que trabalham em nosso nome",
          "Para cumprir obrigações legais",
          "Para proteger e defender nossos direitos e propriedade",
          "Com sua permissão ou sob sua direção",
        ],
      },
      cookies: {
        title: "5. Cookies e Tecnologias de Rastreamento",
        content:
          "Usamos cookies e tecnologias de rastreamento similares para coletar informações sobre suas atividades em nossos Serviços. Você pode controlar o uso de cookies no nível do navegador, mas desabilitar cookies pode limitar seu uso de certos recursos ou funções em nosso site.",
      },
      security: {
        title: "6. Segurança de Dados",
        content:
          "Implementamos medidas de segurança projetadas para proteger suas informações pessoais contra acesso não autorizado e uso indevido. No entanto, nenhum sistema é completamente seguro, e não podemos garantir a segurança absoluta de suas informações.",
      },
      rights: {
        title: "7. Seus Direitos",
        content:
          "Dependendo da sua localização, você pode ter certos direitos relacionados às suas informações pessoais, incluindo:",
        items: [
          "Acessar as informações pessoais que temos sobre você",
          "Corrigir informações imprecisas ou incompletas",
          "Excluir suas informações pessoais",
          "Restringir ou opor-se ao processamento de suas informações",
          "Solicitar a transferência de suas informações",
          "Retirar o consentimento a qualquer momento",
        ],
      },
      children: {
        title: "8. Privacidade de Crianças",
        content:
          "Nossos Serviços não são direcionados a pessoas com menos de 18 anos, e não coletamos intencionalmente informações pessoais de crianças. Se você é pai ou responsável e acredita que seu filho nos forneceu informações pessoais, entre em contato conosco para que possamos tomar as medidas apropriadas.",
      },
      international: {
        title: "9. Transferências Internacionais de Dados",
        content:
          "Suas informações podem ser transferidas e processadas em países diferentes do seu país de residência. Esses países podem ter leis de proteção de dados diferentes das leis do seu país.",
      },
      changes: {
        title: "10. Alterações nesta Política de Privacidade",
        content:
          "Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página e atualizando a data de 'última atualização'.",
      },
      contact: {
        title: "11. Entre em Contato Conosco",
        content:
          "Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco em privacy@strongbots.com.",
      },
      backToHome: "Voltar para a página inicial",
    },
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: March 30, 2025",
      introduction: {
        title: "1. Introduction",
        content:
          "Strongbots is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our website, applications, and AI consulting services (collectively, the 'Services'). By using our Services, you agree to the collection and use of information in accordance with this policy.",
      },
      collection: {
        title: "2. Information We Collect",
        content: "We may collect several types of information, including:",
        items: [
          "Personal identification information (such as name, email address, phone number)",
          "Usage and interaction information with our Services",
          "Device and browser information",
          "Location information",
          "Information you voluntarily provide to us",
        ],
      },
      use: {
        title: "3. How We Use Your Information",
        content: "We use the information we collect to:",
        items: [
          "Provide, maintain, and improve our Services",
          "Process transactions and send related notifications",
          "Respond to comments, questions, and requests",
          "Send technical notices, updates, and administrative messages",
          "Communicate about promotions, events, and other news about our Services",
          "Monitor and analyze trends, usage, and activities",
          "Detect, prevent, and address technical and security issues",
        ],
      },
      sharing: {
        title: "4. Information Sharing",
        content:
          "We do not sell your personal information to third parties. We may share your information in the following circumstances:",
        items: [
          "With service providers who work on our behalf",
          "To comply with legal obligations",
          "To protect and defend our rights and property",
          "With your permission or at your direction",
        ],
      },
      cookies: {
        title: "5. Cookies and Tracking Technologies",
        content:
          "We use cookies and similar tracking technologies to collect information about your activities on our Services. You can control the use of cookies at the browser level, but disabling cookies may limit your use of certain features or functions on our website.",
      },
      security: {
        title: "6. Data Security",
        content:
          "We implement security measures designed to protect your personal information from unauthorized access and misuse. However, no system is completely secure, and we cannot guarantee the absolute security of your information.",
      },
      rights: {
        title: "7. Your Rights",
        content:
          "Depending on your location, you may have certain rights regarding your personal information, including:",
        items: [
          "Access the personal information we hold about you",
          "Correct inaccurate or incomplete information",
          "Delete your personal information",
          "Restrict or object to the processing of your information",
          "Request the transfer of your information",
          "Withdraw consent at any time",
        ],
      },
      children: {
        title: "8. Children's Privacy",
        content:
          "Our Services are not directed to individuals under 18 years of age, and we do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can take appropriate steps.",
      },
      international: {
        title: "9. International Data Transfers",
        content:
          "Your information may be transferred to and processed in countries other than the country you live in. These countries may have data protection laws that are different from the laws of your country.",
      },
      changes: {
        title: "10. Changes to This Privacy Policy",
        content:
          "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'last updated' date.",
      },
      contact: {
        title: "11. Contact Us",
        content: "If you have questions about this Privacy Policy, please contact us at privacy@strongbots.com.",
      },
      backToHome: "Back to home page",
    },
    es: {
      title: "Política de Privacidad",
      lastUpdated: "Última actualización: 30 de marzo de 2025",
      introduction: {
        title: "1. Introducción",
        content:
          "Strongbots está comprometido a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información personal cuando utiliza nuestro sitio web, aplicaciones y servicios de consultoría de IA (colectivamente, los 'Servicios'). Al utilizar nuestros Servicios, acepta la recopilación y el uso de información de acuerdo con esta política.",
      },
      collection: {
        title: "2. Información que Recopilamos",
        content: "Podemos recopilar varios tipos de información, incluyendo:",
        items: [
          "Información de identificación personal (como nombre, dirección de correo electrónico, número de teléfono)",
          "Información de uso e interacción con nuestros Servicios",
          "Información del dispositivo y navegador",
          "Información de ubicación",
          "Información que nos proporciona voluntariamente",
        ],
      },
      use: {
        title: "3. Cómo Usamos Su Información",
        content: "Usamos la información que recopilamos para:",
        items: [
          "Proporcionar, mantener y mejorar nuestros Servicios",
          "Procesar transacciones y enviar notificaciones relacionadas",
          "Responder a comentarios, preguntas y solicitudes",
          "Enviar avisos técnicos, actualizaciones y mensajes administrativos",
          "Comunicar sobre promociones, eventos y otras noticias sobre nuestros Servicios",
          "Monitorear y analizar tendencias, uso y actividades",
          "Detectar, prevenir y abordar problemas técnicos y de seguridad",
        ],
      },
      sharing: {
        title: "4. Compartir Información",
        content:
          "No vendemos su información personal a terceros. Podemos compartir su información en las siguientes circunstancias:",
        items: [
          "Con proveedores de servicios que trabajan en nuestro nombre",
          "Para cumplir con obligaciones legales",
          "Para proteger y defender nuestros derechos y propiedad",
          "Con su permiso o bajo su dirección",
        ],
      },
      cookies: {
        title: "5. Cookies y Tecnologías de Seguimiento",
        content:
          "Utilizamos cookies y tecnologías de seguimiento similares para recopilar información sobre sus actividades en nuestros Servicios. Puede controlar el uso de cookies a nivel del navegador, pero deshabilitar las cookies puede limitar su uso de ciertas características o funciones en nuestro sitio web.",
      },
      security: {
        title: "6. Seguridad de Datos",
        content:
          "Implementamos medidas de seguridad diseñadas para proteger su información personal contra acceso no autorizado y uso indebido. Sin embargo, ningún sistema es completamente seguro, y no podemos garantizar la seguridad absoluta de su información.",
      },
      rights: {
        title: "7. Sus Derechos",
        content:
          "Dependiendo de su ubicación, puede tener ciertos derechos con respecto a su información personal, incluyendo:",
        items: [
          "Acceder a la información personal que tenemos sobre usted",
          "Corregir información inexacta o incompleta",
          "Eliminar su información personal",
          "Restringir u oponerse al procesamiento de su información",
          "Solicitar la transferencia de su información",
          "Retirar el consentimiento en cualquier momento",
        ],
      },
      children: {
        title: "8. Privacidad de los Niños",
        content:
          "Nuestros Servicios no están dirigidos a personas menores de 18 años, y no recopilamos conscientemente información personal de niños. Si usted es un padre o tutor y cree que su hijo nos ha proporcionado información personal, contáctenos para que podamos tomar las medidas adecuadas.",
      },
      international: {
        title: "9. Transferencias Internacionales de Datos",
        content:
          "Su información puede ser transferida y procesada en países distintos al país en el que reside. Estos países pueden tener leyes de protección de datos diferentes a las leyes de su país.",
      },
      changes: {
        title: "10. Cambios en esta Política de Privacidad",
        content:
          "Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página y actualizando la fecha de 'última actualización'.",
      },
      contact: {
        title: "11. Contáctenos",
        content: "Si tiene preguntas sobre esta Política de Privacidad, contáctenos en privacy@strongbots.com.",
      },
      backToHome: "Volver a la página principal",
    },
  }

  const content = privacyContent[language as keyof typeof privacyContent] || privacyContent.en

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
              <h2 className="text-xl font-semibold mb-3">{content.collection.title}</h2>
              <p className="text-muted-foreground mb-2">{content.collection.content}</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                {content.collection.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{content.use.title}</h2>
              <p className="text-muted-foreground mb-2">{content.use.content}</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                {content.use.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{content.sharing.title}</h2>
              <p className="text-muted-foreground mb-2">{content.sharing.content}</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                {content.sharing.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{content.cookies.title}</h2>
              <p className="text-muted-foreground">{content.cookies.content}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{content.security.title}</h2>
              <p className="text-muted-foreground">{content.security.content}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{content.rights.title}</h2>
              <p className="text-muted-foreground mb-2">{content.rights.content}</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                {content.rights.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{content.children.title}</h2>
              <p className="text-muted-foreground">{content.children.content}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{content.international.title}</h2>
              <p className="text-muted-foreground">{content.international.content}</p>
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

