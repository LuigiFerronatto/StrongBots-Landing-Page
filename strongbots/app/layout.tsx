// Certifique-se de que a importação do CSS global esteja no topo do arquivo
import "@/app/globals.css"
import type React from "react"
import ClientLayout from "./ClientLayout"

export const metadata = {
  title: "Strongbots",
  description:
    "Transform your business with intelligent AI solutions. We help businesses leverage the power of conversational AI to automate processes, enhance customer experiences, and drive growth.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}

