"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, MessageSquare, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useChatbot } from "@/hooks/use-chatbot"
import { useHasMounted } from "@/hooks/use-has-mounted"
import { usePathname } from "next/navigation" // Adicionar esta importação
// Adicione a importação do siteConfig no topo do arquivo
import { siteConfig } from "@/config/site-config"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { setIsOpen: setChatbotOpen } = useChatbot()
  const mounted = useHasMounted()
  const [activeSection, setActiveSection] = useState("hero")
  const pathname = usePathname() // Obter o pathname atual
  const isCasesPage = pathname.includes("/cases") // Verificar se estamos na página de cases

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Atualizar seção ativa apenas na página inicial
      if (pathname === "/") {
        const sections = ["hero", "about", "services", "process", "cases", "testimonials"]
        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section)
              break
            }
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [mounted, pathname])

  // Fechar menu mobile ao clicar fora
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("nav") && !target.closest("button")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isOpen])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isScrolled ? "bg-white/95 backdrop-blur-md py-2 md:py-3 shadow-lg" : "bg-transparent py-4 md:py-6",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative z-10"
            >
              <Link href="/" className="flex items-center">
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl text-primary-500 tracking-wider">
                    <span className="font-bold">strong</span>
                    <span className="font-thin">bots</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <NavLink href="/#hero" isActive={!isCasesPage && activeSection === "hero"}>
              Início
            </NavLink>
            <NavLink href="/#about" isActive={!isCasesPage && activeSection === "about"}>
              Por Que Nós
            </NavLink>
            <NavLink href="/#services" isActive={!isCasesPage && activeSection === "services"}>
              Soluções
            </NavLink>
            <NavLink href="/#process" isActive={!isCasesPage && activeSection === "process"}>
              Metodologia
            </NavLink>
            <NavLink href={isCasesPage ? "/#cases" : "#cases"} isActive={isCasesPage || activeSection === "cases"}>
              Cases
            </NavLink>
            <NavLink href="/#testimonials" isActive={!isCasesPage && activeSection === "testimonials"}>
              Depoimentos
            </NavLink>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-4">
              <Button
                onClick={() => setChatbotOpen(true)}
                variant="primary"
                className="px-5 py-2 rounded-xl shadow-md text-sm md:text-base btn-glow"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Fale com Especialista</span>
                <span className="sm:hidden">Fale Conosco</span>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => setChatbotOpen(true)}
              className="bg-primary-500 hover:bg-primary-600 text-white rounded-xl shadow-md mr-2"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="hover:bg-primary-50"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-lg"
          >
            <div className="container mx-auto py-4 flex flex-col space-y-4">
              <MobileNavLink
                href="/#hero"
                onClick={() => setIsOpen(false)}
                isActive={!isCasesPage && activeSection === "hero"}
              >
                Home
              </MobileNavLink>
              <MobileNavLink
                href="/#about"
                onClick={() => setIsOpen(false)}
                isActive={!isCasesPage && activeSection === "about"}
              >
                Sobre
              </MobileNavLink>
              <MobileNavLink
                href="/#services"
                onClick={() => setIsOpen(false)}
                isActive={!isCasesPage && activeSection === "services"}
              >
                Soluções
              </MobileNavLink>
              <MobileNavLink
                href="/#process"
                onClick={() => setIsOpen(false)}
                isActive={!isCasesPage && activeSection === "process"}
              >
                Metodologia
              </MobileNavLink>
              <MobileNavLink
                href={isCasesPage ? "/#cases" : "#cases"}
                onClick={() => setIsOpen(false)}
                isActive={isCasesPage || activeSection === "cases"}
              >
                Cases
              </MobileNavLink>
              <MobileNavLink
                href="/#testimonials"
                onClick={() => setIsOpen(false)}
                isActive={!isCasesPage && activeSection === "testimonials"}
              >
                Depoimentos
              </MobileNavLink>
              <div className="h-px w-full bg-primary-100 my-2"></div>
              <Button
                onClick={() => {
                  setChatbotOpen(true)
                  setIsOpen(false)
                }}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-xl shadow-md btn-glow"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Fale com Especialista
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
  onClick?: () => void
  isActive?: boolean
}

// Vamos garantir que os links do menu respeitem as configurações do site

// Modifique a função NavLink para verificar se a seção está ativa
function NavLink({ href, children, isActive = false }: NavLinkProps) {
  // Extrair o ID da seção do href (por exemplo, "/#cases" -> "cases" ou "#cases" -> "cases")
  const sectionId = href.includes("#") ? href.split("#").pop() : undefined

  // Se for uma seção e estiver desativada no siteConfig, não renderize o link
  if (sectionId && siteConfig.sections[sectionId as keyof typeof siteConfig.sections] === false) {
    return null
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <a
        href={href}
        className={cn(
          "inline-flex items-center px-3 py-2 rounded-xl text-sm lg:text-base font-medium transition-colors duration-200 relative group",
          isActive
            ? "text-primary-500 bg-primary-50"
            : "text-neutral-700 hover:text-primary-500 hover:bg-primary-50/50",
        )}
      >
        {children}
        {isActive && (
          <motion.span
            layoutId="activeIndicator"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 mx-3"
          />
        )}
      </a>
    </motion.div>
  )
}

// Faça o mesmo para o MobileNavLink
function MobileNavLink({ href, children, onClick, isActive = false }: NavLinkProps) {
  // Extrair o ID da seção do href (por exemplo, "/#cases" -> "cases" ou "#cases" -> "cases")
  const sectionId = href.includes("#") ? href.split("#").pop() : undefined

  // Se for uma seção e estiver desativada no siteConfig, não renderize o link
  if (sectionId && siteConfig.sections[sectionId as keyof typeof siteConfig.sections] === false) {
    return null
  }

  return (
    <motion.a
      href={href}
      className={cn(
        "block py-3 px-4 text-base lg:text-lg font-medium transition-colors duration-200 rounded-xl",
        isActive ? "text-primary-500 bg-primary-50" : "text-neutral-700 hover:text-primary-500 hover:bg-primary-50",
      )}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center justify-between">
        {children}
        {isActive && <ChevronDown className="h-4 w-4 text-primary-500" />}
      </div>
    </motion.a>
  )
}

