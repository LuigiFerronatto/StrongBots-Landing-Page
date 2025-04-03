"use client"

import type React from "react"
// Remova a importação do CSS global daqui, pois já está no layout principal
import { ThemeProvider } from "@/components/theme-provider"
// Adicione a importação do Toaster
import { Toaster } from "@/components/ui/toaster"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        {/* Adicionar fontes locais */}
        <style jsx global>{`
          @font-face {
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local('Montserrat Regular'), local('Montserrat-Regular'), 
                 url('/fonts/montserrat-regular.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: local('Montserrat Medium'), local('Montserrat-Medium'), 
                 url('/fonts/montserrat-medium.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 600;
            font-display: swap;
            src: local('Montserrat SemiBold'), local('Montserrat-SemiBold'), 
                 url('/fonts/montserrat-semibold.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: local('Montserrat Bold'), local('Montserrat-Bold'), 
                 url('/fonts/montserrat-bold.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Nunito';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local('Nunito Regular'), local('Nunito-Regular'), 
                 url('/fonts/nunito-regular.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Nunito';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: local('Nunito Medium'), local('Nunito-Medium'), 
                 url('/fonts/nunito-medium.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Nunito';
            font-style: normal;
            font-weight: 600;
            font-display: swap;
            src: local('Nunito SemiBold'), local('Nunito-SemiBold'), 
                 url('/fonts/nunito-semibold.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Nunito';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: local('Nunito Bold'), local('Nunito-Bold'), 
                 url('/fonts/nunito-bold.woff2') format('woff2');
          }
          
          :root {
            --font-montserrat: 'Montserrat', system-ui, sans-serif;
            --font-nunito: 'Nunito', system-ui, sans-serif;
          }
        `}</style>
      </head>
      <body className="font-sans bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

