import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { siteConfig } from "@/config/site-config"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const { pathname } = request.nextUrl

  // Verificar se a rota está desativada
  const routeSegment = pathname.split("/")[1] // Pega o primeiro segmento da URL

  // Se a rota existir na configuração e estiver desativada, redirecionar para a página inicial
  if (
    routeSegment &&
    Object.keys(siteConfig.routes).includes(routeSegment) &&
    !siteConfig.routes[routeSegment as keyof typeof siteConfig.routes]
  ) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Adicionar cabeçalhos de cache para recursos estáticos
  if (
    request.nextUrl.pathname.startsWith("/images/") ||
    request.nextUrl.pathname.endsWith(".png") ||
    request.nextUrl.pathname.endsWith(".png") ||
    request.nextUrl.pathname.endsWith(".svg")
  ) {
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable")
  }

  // Adicionar cabeçalhos de segurança
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}



