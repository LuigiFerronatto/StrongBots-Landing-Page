"use client"

import { lazy, Suspense, type ReactNode } from "react"
import Header from "@/components/navigation/header"
import Footer from "@/components/navigation/footer"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { OrganizationSchema } from "@/components/seo/schema-org"

// Lazy load componentes pesados
const Chatbot = lazy(() => import("@/components/chat/chatbot"))
const WhatsAppButton = lazy(() => import("@/components/ui/whatsapp-button"))

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col">
      <OrganizationSchema />
      <ScrollReveal />
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />

      {/* Carregamento preguiçoso com fallback */}
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
    </main>
  )
}

