"use client"

import type React from "react"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heading, Text } from "@/components/design-system/typography"
// Adicione a importação do siteConfig no topo do arquivo
import { siteConfig } from "@/config/site-config"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-100 py-16 md:py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl text-primary-500 tracking-wider">
                  <span className="font-bold">strong</span>
                  <span className="font-thin">bots</span>
                </span>
              </div>
            </Link>
            <Text className="text-neutral-600 mb-6">
              Construímos soluções conversacionais com IA para transformar vendas, atendimento e automações.
            </Text>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook size={16} />} href={siteConfig.social.facebook} label="Facebook" />
              <SocialIcon icon={<Instagram size={16} />} href={siteConfig.social.instagram} label="Instagram" />
              <SocialIcon icon={<Twitter size={16} />} href={siteConfig.social.twitter} label="Twitter" />
              <SocialIcon icon={<Linkedin size={16} />} href={siteConfig.social.linkedin} label="LinkedIn" />
            </div>
          </div>

          <div>
            <Heading level={4} className="text-lg font-semibold mb-6">
              Links Rápidos
            </Heading>
            <ul className="space-y-3">
              <FooterLink href="#services">Soluções</FooterLink>
              <FooterLink href="#process">Nossa Metodologia</FooterLink>
              <FooterLink href="#cases">Cases</FooterLink>
              <FooterLink href="#testimonials">Depoimentos</FooterLink>
              <FooterLink href="/about">Sobre Nós</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
            </ul>
          </div>

          <div>
            <Heading level={4} className="text-lg font-semibold mb-6">
              Contato
            </Heading>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-neutral-600 hover:text-primary-500 transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                  className="text-neutral-600 hover:text-primary-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-neutral-600">Brasil</span>
              </li>
            </ul>
          </div>

          <div>
            <Heading level={4} className="text-lg font-semibold mb-6">
              Inscreva-se
            </Heading>
            <Text className="text-neutral-600 mb-4">
              Mantenha-se atualizado com as últimas novidades em consultoria de IA e insights do setor.
            </Text>
            <form className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Seu endereço de e-mail"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  required
                  aria-label="Email para newsletter"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                className="w-full font-medium py-3 px-4 rounded-xl transition-colors group"
              >
                Inscrever-se
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <Text className="text-sm text-neutral-500 mb-4 md:mb-0 text-center md:text-left">
            © {currentYear} Strongbots AI Consulting. Todos os direitos reservados.
          </Text>
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            <Link href="/privacy-policy" className="text-sm text-neutral-500 hover:text-primary-500 transition-colors">
              Política de Privacidade
            </Link>
            <Link
              href="/terms-of-service"
              className="text-sm text-neutral-500 hover:text-primary-500 transition-colors"
            >
              Termos de Serviço
            </Link>
            <Link href="/cookies" className="text-sm text-neutral-500 hover:text-primary-500 transition-colors">
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

interface FooterLinkProps {
  href: string
  children: React.ReactNode
}

function FooterLink({ href, children }: FooterLinkProps) {
  // Verificar se é uma rota e se está desativada
  if (href.startsWith("/")) {
    // Extrair o nome da rota (por exemplo, "/contato" -> "contato", "/about" -> "about")
    const routeName = href.split("/")[1] || "" // Pega o primeiro segmento após a barra

    // Verificar se a rota existe no siteConfig e está desativada
    if (routeName && siteConfig.routes[routeName as keyof typeof siteConfig.routes] === false) {
      return null
    }

    // Se o link começar com '/' (rota interna), use o componente Link
    return (
      <li>
        <Link href={href} className="text-neutral-600 hover:text-primary-500 transition-colors">
          {children}
        </Link>
      </li>
    )
  }

  // Se for uma seção e estiver desativada no siteConfig, não renderize o link
  if (href.startsWith("#")) {
    const sectionId = href.substring(1) // Remove o # do início
    if (siteConfig.sections[sectionId as keyof typeof siteConfig.sections] === false) {
      return null
    }
  }

  // Para links externos ou âncoras, continue usando a tag <a>
  return (
    <li>
      <a href={href} className="text-neutral-600 hover:text-primary-500 transition-colors">
        {children}
      </a>
    </li>
  )
}

interface SocialIconProps {
  icon: React.ReactNode
  href: string
  label: string
}

function SocialIcon({ icon, href, label }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-neutral-600 hover:text-primary-500 hover:bg-primary-50 transition-colors"
    >
      {icon}
    </a>
  )
}



