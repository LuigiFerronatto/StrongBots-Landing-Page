"use client"

import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function CookiesPolicy() {
  const { t, language } = useLanguage()

  const cookiesContent = {
    pt: {
      title: "Política de Cookies",
      lastUpdated: "Última atualização: 30 de março de 2025",
      introduction: {
        title: "1. Introdução",
        content:
          "Esta Política de Cookies explica como a Strongbots ('nós', 'nosso' ou 'nossa') usa cookies e tecnologias similares para reconhecê-lo quando você visita nosso site e usa nossos serviços. Esta política explica o que são essas tecnologias e por que as usamos, bem como seus direitos de controlar nosso uso delas.",
      },
      whatAreCookies: {
        title: "2. O que são Cookies",
        content:
          "Cookies são pequenos arquivos de dados que são colocados no seu computador ou dispositivo móvel quando você visita um site. Os cookies são amplamente utilizados pelos proprietários de sites para fazer seus sites funcionarem, ou funcionarem de maneira mais eficiente, bem como para fornecer informações de relatórios. Os cookies definidos pelo proprietário do site (neste caso, Strongbots) são chamados de cookies 'primários'. Os cookies definidos por partes que não sejam o proprietário do site são chamados de cookies 'de terceiros'. Os cookies de terceiros permitem que recursos ou funcionalidades de terceiros sejam fornecidos no ou através do site (por exemplo, publicidade, conteúdo interativo e análises).",
      },
      typesOfCookies: {
        title: "3. Tipos de Cookies que Usamos",
        content: "Nosso site usa os seguintes tipos de cookies:",
        items: [
          "Cookies Essenciais: Estes cookies são necessários para o funcionamento do site e não podem ser desativados em nossos sistemas. Eles geralmente são definidos apenas em resposta a ações feitas por você que equivalem a uma solicitação de serviços, como definir suas preferências de privacidade, fazer login ou preencher formulários.",
          "Cookies de Desempenho: Estes cookies nos permitem contar visitas e fontes de tráfego para que possamos medir e melhorar o desempenho do nosso site. Eles nos ajudam a saber quais páginas são as mais e menos populares e ver como os visitantes navegam pelo site.",
          "Cookies Funcionais: Estes cookies permitem que o site forneça funcionalidade e personalização aprimoradas. Eles podem ser definidos por nós ou por provedores terceiros cujos serviços adicionamos às nossas páginas.",
          "Cookies de Marketing: Estes cookies são usados para rastrear visitantes em sites. A intenção é exibir anúncios que sejam relevantes e envolventes para o usuário individual e, portanto, mais valiosos para editores e anunciantes terceiros.",
        ],
      },
      howWeUse: {
        title: "4. Como Usamos os Cookies",
        content: "Usamos cookies para vários propósitos, incluindo:",
        items: [
          "Entender e salvar as preferências do usuário para futuras visitas",
          "Acompanhar dados de análise sobre interações do site, como número de visitantes e páginas visitadas",
          "Rastrear anúncios baseados em interesses",
          "Monitorar a eficácia de nossas campanhas de marketing",
          "Melhorar nosso site e sua experiência",
        ],
      },
      managingCookies: {
        title: "5. Gerenciando Cookies",
        content:
          "A maioria dos navegadores da web permite algum controle da maioria dos cookies através das configurações do navegador. Além disso, você pode definir suas preferências de cookies em nosso site usando nossa ferramenta de consentimento de cookies. Observe que a desativação de certos cookies afetará a funcionalidade do nosso site e pode reduzir os recursos e funcionalidades que podemos oferecer.",
        browserSettings:
          "Para saber mais sobre como gerenciar cookies através das configurações do seu navegador, visite:",
        browsers: [
          "Chrome: chrome://settings/cookies",
          "Edge: edge://settings/cookies",
          "Firefox: about:preferences#privacy",
          "Safari: Preferências > Privacidade",
          "Opera: opera://settings/cookies",
        ],
      },
      thirdPartyCookies: {
        title: "6. Cookies de Terceiros",
        content:
          "Nosso site pode incluir conteúdo e serviços fornecidos por terceiros, como YouTube, Google Analytics ou redes sociais. Esses terceiros podem usar cookies, web beacons e tecnologias similares para coletar informações sobre seu uso do nosso site. Não temos controle sobre esses cookies de terceiros, e eles não estão sujeitos a esta Política de Cookies. Recomendamos que você verifique as políticas de privacidade e cookies desses terceiros para obter mais informações sobre seu uso de cookies e outras tecnologias.",
      },
      changes: {
        title: "7. Alterações nesta Política de Cookies",
        content:
          "Podemos atualizar esta Política de Cookies de tempos em tempos para refletir, por exemplo, mudanças nas tecnologias que usamos, ou por outros motivos operacionais, legais ou regulatórios. Incentivamos você a revisar periodicamente esta página para se manter informado sobre nosso uso de cookies e tecnologias relacionadas.",
      },
      contact: {
        title: "8. Entre em Contato Conosco",
        content:
          "Se você tiver dúvidas sobre nosso uso de cookies ou outras tecnologias, entre em contato conosco em cookies@strongbots.com.",
      },
      backToHome: "Voltar para a página inicial",
    },
    en: {
      title: "Cookie Policy",
      lastUpdated: "Last updated: March 30, 2025",
      introduction: {
        title: "1. Introduction",
        content:
          "This Cookie Policy explains how Strongbots ('we', 'our', or 'us') uses cookies and similar technologies to recognize you when you visit our website and use our services. This policy explains what these technologies are and why we use them, as well as your rights to control our use of them.",
      },
      whatAreCookies: {
        title: "2. What Are Cookies",
        content:
          "Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or work more efficiently, as well as to provide reporting information. Cookies set by the website owner (in this case, Strongbots) are called 'first-party cookies'. Cookies set by parties other than the website owner are called 'third-party cookies'. Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).",
      },
      typesOfCookies: {
        title: "3. Types of Cookies We Use",
        content: "Our website uses the following types of cookies:",
        items: [
          "Essential Cookies: These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.",
          "Performance Cookies: These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.",
          "Functional Cookies: These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.",
          "Marketing Cookies: These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third-party advertisers.",
        ],
      },
      howWeUse: {
        title: "4. How We Use Cookies",
        content: "We use cookies for several purposes, including:",
        items: [
          "Understanding and saving user preferences for future visits",
          "Tracking analytics data about site interactions, such as number of visitors and pages visited",
          "Tracking interest-based advertisements",
          "Monitoring the effectiveness of our marketing campaigns",
          "Improving our website and your experience",
        ],
      },
      managingCookies: {
        title: "5. Managing Cookies",
        content:
          "Most web browsers allow some control of most cookies through the browser settings. Additionally, you can set your cookie preferences on our website using our cookie consent tool. Please note that disabling certain cookies will affect the functionality of our website and may reduce the features and functionality that we can offer you.",
        browserSettings: "To find out more about managing cookies through your browser settings, visit:",
        browsers: [
          "Chrome: chrome://settings/cookies",
          "Edge: edge://settings/cookies",
          "Firefox: about:preferences#privacy",
          "Safari: Preferences > Privacy",
          "Opera: opera://settings/cookies",
        ],
      },
      thirdPartyCookies: {
        title: "6. Third-Party Cookies",
        content:
          "Our website may include content and services provided by third parties, such as YouTube, Google Analytics, or social media networks. These third parties may use cookies, web beacons, and similar technologies to collect information about your use of our website. We do not have control over these third-party cookies, and they are not subject to this Cookie Policy. We recommend that you check the privacy and cookie policies of these third parties for more information about their use of cookies and other technologies.",
      },
      changes: {
        title: "7. Changes to This Cookie Policy",
        content:
          "We may update this Cookie Policy from time to time to reflect, for example, changes to the technologies we use, or for other operational, legal, or regulatory reasons. We encourage you to periodically review this page to stay informed about our use of cookies and related technologies.",
      },
      contact: {
        title: "8. Contact Us",
        content:
          "If you have any questions about our use of cookies or other technologies, please contact us at cookies@strongbots.com.",
      },
      backToHome: "Back to home page",
    },
    es: {
      title: "Política de Cookies",
      lastUpdated: "Última actualización: 30 de marzo de 2025",
      introduction: {
        title: "1. Introducción",
        content:
          "Esta Política de Cookies explica cómo Strongbots ('nosotros', 'nuestro' o 'nos') utiliza cookies y tecnologías similares para reconocerlo cuando visita nuestro sitio web y utiliza nuestros servicios. Esta política explica qué son estas tecnologías y por qué las utilizamos, así como sus derechos para controlar nuestro uso de ellas.",
      },
      whatAreCookies: {
        title: "2. Qué Son las Cookies",
        content:
          "Las cookies son pequeños archivos de datos que se colocan en su computadora o dispositivo móvil cuando visita un sitio web. Las cookies son ampliamente utilizadas por los propietarios de sitios web para hacer que sus sitios funcionen, o funcionen de manera más eficiente, así como para proporcionar información de informes. Las cookies establecidas por el propietario del sitio web (en este caso, Strongbots) se denominan 'cookies de primera parte'. Las cookies establecidas por partes distintas al propietario del sitio web se denominan 'cookies de terceros'. Las cookies de terceros permiten que características o funcionalidades de terceros se proporcionen en o a través del sitio web (por ejemplo, publicidad, contenido interactivo y análisis).",
      },
      typesOfCookies: {
        title: "3. Tipos de Cookies que Utilizamos",
        content: "Nuestro sitio web utiliza los siguientes tipos de cookies:",
        items: [
          "Cookies Esenciales: Estas cookies son necesarias para que el sitio web funcione y no se pueden desactivar en nuestros sistemas. Generalmente solo se establecen en respuesta a acciones realizadas por usted que equivalen a una solicitud de servicios, como establecer sus preferencias de privacidad, iniciar sesión o completar formularios.",
          "Cookies de Rendimiento: Estas cookies nos permiten contar visitas y fuentes de tráfico para que podamos medir y mejorar el rendimiento de nuestro sitio. Nos ayudan a saber qué páginas son las más y menos populares y ver cómo los visitantes se mueven por el sitio.",
          "Cookies Funcionales: Estas cookies permiten que el sitio web proporcione funcionalidad y personalización mejoradas. Pueden ser establecidas por nosotros o por proveedores externos cuyos servicios hemos añadido a nuestras páginas.",
          "Cookies de Marketing: Estas cookies se utilizan para rastrear a los visitantes en los sitios web. La intención es mostrar anuncios que sean relevantes y atractivos para el usuario individual y, por lo tanto, más valiosos para los editores y anunciantes externos.",
        ],
      },
      howWeUse: {
        title: "4. Cómo Utilizamos las Cookies",
        content: "Utilizamos cookies para varios propósitos, incluyendo:",
        items: [
          "Entender y guardar las preferencias del usuario para futuras visitas",
          "Rastrear datos analíticos sobre las interacciones del sitio, como el número de visitantes y las páginas visitadas",
          "Rastrear anuncios basados en intereses",
          "Monitorear la efectividad de nuestras campañas de marketing",
          "Mejorar nuestro sitio web y su experiencia",
        ],
      },
      managingCookies: {
        title: "5. Gestión de Cookies",
        content:
          "La mayoría de los navegadores web permiten cierto control de la mayoría de las cookies a través de la configuración del navegador. Además, puede establecer sus preferencias de cookies en nuestro sitio web utilizando nuestra herramienta de consentimiento de cookies. Tenga en cuenta que deshabilitar ciertas cookies afectará la funcionalidad de nuestro sitio web y puede reducir las características y funcionalidades que podemos ofrecerle.",
        browserSettings:
          "Para obtener más información sobre cómo gestionar las cookies a través de la configuración de su navegador, visite:",
        browsers: [
          "Chrome: chrome://settings/cookies",
          "Edge: edge://settings/cookies",
          "Firefox: about:preferences#privacy",
          "Safari: Preferencias > Privacidad",
          "Opera: opera://settings/cookies",
        ],
      },
      thirdPartyCookies: {
        title: "6. Cookies de Terceros",
        content:
          "Nuestro sitio web puede incluir contenido y servicios proporcionados por terceros, como YouTube, Google Analytics o redes sociales. Estos terceros pueden utilizar cookies, balizas web y tecnologías similares para recopilar información sobre su uso de nuestro sitio web. No tenemos control sobre estas cookies de terceros, y no están sujetas a esta Política de Cookies. Le recomendamos que consulte las políticas de privacidad y cookies de estos terceros para obtener más información sobre su uso de cookies y otras tecnologías.",
      },
      changes: {
        title: "7. Cambios en esta Política de Cookies",
        content:
          "Podemos actualizar esta Política de Cookies de vez en cuando para reflejar, por ejemplo, cambios en las tecnologías que utilizamos, o por otras razones operativas, legales o regulatorias. Le animamos a revisar periódicamente esta página para mantenerse informado sobre nuestro uso de cookies y tecnologías relacionadas.",
      },
      contact: {
        title: "8. Contáctenos",
        content:
          "Si tiene alguna pregunta sobre nuestro uso de cookies u otras tecnologías, contáctenos en cookies@strongbots.com.",
      },
      backToHome: "Volver a la página principal",
    },
  }

  const content = cookiesContent[language as keyof typeof cookiesContent] || cookiesContent.en

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
              <h2 className="text-xl font-semibold mb-3">{content.whatAreCookies.title}</h2>
              <p className="text-muted-foreground">{content.whatAreCookies.content}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{content.typesOfCookies.title}</h2>
              <p className="text-muted-foreground mb-2">{content.typesOfCookies.content}</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                {content.typesOfCookies.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{content.howWeUse.title}</h2>
              <p className="text-muted-foreground mb-2">{content.howWeUse.content}</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                {content.howWeUse.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{content.managingCookies.title}</h2>
              <p className="text-muted-foreground mb-4">{content.managingCookies.content}</p>
              <p className="text-muted-foreground font-medium mb-2">{content.managingCookies.browserSettings}</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                {content.managingCookies.browsers.map((browser, index) => (
                  <li key={index}>{browser}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{content.thirdPartyCookies.title}</h2>
              <p className="text-muted-foreground">{content.thirdPartyCookies.content}</p>
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

