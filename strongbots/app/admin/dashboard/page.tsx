"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AdminDashboard() {
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  // Corrigir a tipagem para aceitar string ou null
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [refreshResult, setRefreshResult] = useState<any>(null)

  useEffect(() => {
    fetchStatus()

    // Atualizar status a cada 5 minutos
    const interval = setInterval(fetchStatus, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const fetchStatus = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/status")
      if (!response.ok) {
        throw new Error(`Erro ao buscar status: ${response.status}`)
      }
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error("Erro ao buscar status:", error)
      setError(error instanceof Error ? error.message : "Erro desconhecido")
    } finally {
      setLoading(false)
    }
  }

  const refreshToken = async () => {
    setRefreshing(true)
    setRefreshResult(null)
    try {
      const response = await fetch("/api/refresh-token")
      const data = await response.json()
      setRefreshResult(data)
      if (data.success) {
        // Atualizar status após renovação bem-sucedida
        await fetchStatus()
      }
    } catch (error) {
      console.error("Erro ao renovar token:", error)
      setRefreshResult({
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      })
    } finally {
      setRefreshing(false)
    }
  }

  const formatDate = (timestamp: number | string | undefined) => {
    if (!timestamp) return "N/A"
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Painel de Administração</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Status do Sistema
              <Button variant="outline" size="sm" onClick={fetchStatus} disabled={loading}>
                {loading ? "Atualizando..." : "Atualizar"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Carregando...</p>
            ) : error ? (
              <Alert variant="destructive">
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : status ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">Status:</div>
                  <div>{status.status}</div>

                  <div className="font-medium">Access Token:</div>
                  <div className={status.tokenStatus.hasAccessToken ? "text-green-600" : "text-red-600"}>
                    {status.tokenStatus.hasAccessToken ? "Presente" : "Ausente"}
                  </div>

                  <div className="font-medium">Refresh Token:</div>
                  <div className={status.tokenStatus.hasRefreshToken ? "text-green-600" : "text-red-600"}>
                    {status.tokenStatus.hasRefreshToken ? "Presente" : "Ausente"}
                  </div>

                  <div className="font-medium">Status do Token:</div>
                  <div className={status.tokenStatus.isExpired ? "text-red-600" : "text-green-600"}>
                    {status.tokenStatus.isExpired ? "Expirado" : "Válido"}
                  </div>

                  <div className="font-medium">Expira em:</div>
                  <div>{status.tokenStatus.expiresIn}</div>

                  <div className="font-medium">Data de Expiração:</div>
                  <div>{formatDate(status.tokenStatus.expiryDate)}</div>

                  <div className="font-medium">Hora Atual:</div>
                  <div>{formatDate(status.tokenStatus.currentTime)}</div>

                  <div className="font-medium">Agendamentos Pendentes:</div>
                  <div>{status.pendingAppointments}</div>

                  <div className="font-medium">Última Atualização:</div>
                  <div>{formatDate(status.timestamp)}</div>
                </div>

                <Button onClick={refreshToken} disabled={refreshing} className="w-full">
                  {refreshing ? "Renovando Token..." : "Renovar Token Manualmente"}
                </Button>

                {refreshResult && (
                  <Alert variant={refreshResult.success ? "default" : "destructive"}>
                    <AlertTitle>{refreshResult.success ? "Sucesso" : "Erro"}</AlertTitle>
                    <AlertDescription>
                      {refreshResult.success
                        ? `Token renovado com sucesso. Nova expiração: ${formatDate(refreshResult.newExpiryDate)}`
                        : refreshResult.error}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ) : (
              <p>Erro ao carregar status</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Sobre a Renovação de Tokens</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  O sistema renova automaticamente o token de acesso quando ele está próximo de expirar. O token atual
                  expira em aproximadamente 1 hora após ser emitido, mas o sistema o renova automaticamente quando
                  faltam menos de 60 minutos para expirar.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Agendamentos</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Quando um usuário agenda uma reunião, o sistema cria um evento no Google Calendar usando o token de
                  acesso. Se o token estiver expirado, o sistema tentará renová-lo automaticamente antes de criar o
                  evento.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Solução de Problemas</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Se o sistema de agendamento não estiver funcionando, você pode tentar:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                  <li>Renovar o token manualmente usando o botão acima</li>
                  <li>Verificar se o arquivo tokens.json existe e contém tokens válidos</li>
                  <li>Reautenticar com o Google acessando /admin/google-auth</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}



