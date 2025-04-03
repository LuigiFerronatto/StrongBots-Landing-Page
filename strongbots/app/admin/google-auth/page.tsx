"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function GoogleAuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [authUrl, setAuthUrl] = useState("")
  const [authCode, setAuthCode] = useState("")
  const [tokenInfo, setTokenInfo] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Obter URL de autorização ao carregar a página
  useEffect(() => {
    const getAuthUrl = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/auth/google")

        if (!response.ok) {
          throw new Error("Falha ao obter URL de autorização")
        }

        const data = await response.json()
        setAuthUrl(data.authUrl)
      } catch (err) {
        console.error("Erro:", err)
        setError("Não foi possível obter a URL de autorização. Verifique os logs do servidor.")
      } finally {
        setIsLoading(false)
      }
    }

    getAuthUrl()
  }, [])

  // Função para extrair o código de autorização da URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")

    if (code) {
      setAuthCode(code)
      exchangeCodeForToken(code)
    }
  }, [])

  // Função para trocar o código por um token
  const exchangeCodeForToken = async (code: string) => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      if (!response.ok) {
        throw new Error("Falha ao obter token")
      }

      const data = await response.json()
      setTokenInfo(data)

      toast({
        title: "Autenticação bem-sucedida",
        description: "Token de acesso obtido com sucesso.",
      })

      // Limpar o código da URL
      window.history.replaceState({}, document.title, window.location.pathname)
    } catch (err) {
      console.error("Erro:", err)
      setError("Não foi possível obter o token de acesso. Verifique os logs do servidor.")

      toast({
        title: "Erro na autenticação",
        description: "Não foi possível obter o token de acesso.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Função para iniciar o fluxo de autorização
  const startAuthFlow = () => {
    if (authUrl) {
      window.location.href = authUrl
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Autenticação com Google Calendar</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Status da Autenticação</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              <span>Carregando...</span>
            </div>
          ) : tokenInfo ? (
            <div className="bg-green-50 p-4 rounded-lg text-green-800 flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Autenticado com sucesso!</p>
                <p className="text-sm mt-1">
                  Token de acesso obtido. Expira em{" "}
                  {tokenInfo.expires_in ? new Date(tokenInfo.expires_in).toLocaleString() : "tempo desconhecido"}
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-lg text-red-800 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Erro na autenticação</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 p-4 rounded-lg text-amber-800">
              <p>Você ainda não está autenticado com o Google Calendar.</p>
              <p className="mt-1">Clique no botão abaixo para iniciar o processo de autenticação.</p>
            </div>
          )}

          {!tokenInfo && !isLoading && (
            <Button onClick={startAuthFlow} className="mt-4" disabled={!authUrl}>
              Autenticar com Google
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instruções</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Clique no botão "Autenticar com Google" acima.</li>
            <li>Você será redirecionado para a página de autenticação do Google.</li>
            <li>Faça login com a conta do Google associada ao calendário que deseja usar.</li>
            <li>Conceda as permissões solicitadas para acessar seu calendário.</li>
            <li>Você será redirecionado de volta para esta página.</li>
            <li>O token de acesso será obtido e salvo automaticamente.</li>
          </ol>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg text-blue-800">
            <p className="font-medium">Nota importante:</p>
            <p className="mt-1">
              Em um ambiente de produção, você deve implementar um sistema mais seguro para armazenar e gerenciar
              tokens, incluindo refresh tokens para renovação automática.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

