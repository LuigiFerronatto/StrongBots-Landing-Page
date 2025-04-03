// Importar a função generateSystemPrompt do arquivo bot-prompt.ts
import { generateSystemPrompt } from "./bot-prompt"

/**
 * Configuração central do site
 * Controla quais seções e recursos estão ativos
 */
export const siteConfig = {
  // Seções da página inicial
  sections: {
    hero: true,
    about: true,
    services: true,
    process: true,
    cases: false, // Desativado até termos cases reais
    testimonials: false, // Desativado até termos depoimentos reais
    cta: true,
  },

  // Rotas do site que podem ser ativadas/desativadas
  routes: {
    admin: true, // Painel administrativo
    about: true, // Página Sobre Nós
    contact: true, // Página de Contato
    blog: true, // Blog
    cases: true, // Página de Cases
    terms: true, // Termos de Serviço
    privacy: true, // Política de Privacidade
    cookies: true, // Política de Cookies
  },

  // Configurações de contato
  contact: {
    email: "contact@strongbots.com",
    phone: "+55 31 8435-3375",
    whatsapp: "5531984353375",
  },

  // Configurações de redes sociais
  social: {
    facebook: "https://facebook.com/strongbots",
    instagram: "https://instagram.com/strongbots",
    twitter: "https://twitter.com/strongbots",
    linkedin: "https://linkedin.com/company/strongbots",
  },

  // Configurações de SEO
  seo: {
    titleTemplate: "%s | Strongbots AI Consulting",
    defaultTitle: "Strongbots | AI Consulting Services",
    defaultDescription:
      "Transform your business with intelligent AI solutions. We help businesses leverage the power of conversational AI to automate processes, enhance customer experiences, and drive growth.",
  },

  // Configurações de chatbot
  chatbot: {
    enabled: true,
    autoOpen: false,
    welcomeMessage:
      "Olá! Sou o assistente da Strongbots, pronto para transformar seu negócio com IA. Como posso ajudar você hoje?",
    // Usar a função importada para gerar o prompt
    systemPrompt: generateSystemPrompt(),
  },

  admin: {
    links: [
      {title: "Dashboard", href: "/admin/dashboard", description: "Monitorar status do sistema e tokens"},
      {title: "Configurações", href: "/admin/settings"},
    ]
  }
}

// Tipos para facilitar o uso com TypeScript
export type SiteConfig = typeof siteConfig
