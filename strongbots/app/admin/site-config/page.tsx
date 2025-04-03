"use client"

import { useState, useEffect } from "react"
import { siteConfig as defaultSiteConfig } from "@/config/site-config"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Info, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { LoadingScreen } from "@/components/ui/loading-screen"

export default function SiteConfigPage() {
  const [config, setConfig] = useState(defaultSiteConfig)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Carregar configurações do localStorage ao montar o componente
  useEffect(() => {
    const loadConfig = () => {
      try {
        const savedConfig = localStorage.getItem("siteConfig")
        if (savedConfig) {
          setConfig(JSON.parse(savedConfig))
        }
      } catch (error) {
        console.error("Erro ao carregar configurações do localStorage:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Simular um pequeno atraso para mostrar o loading
    setTimeout(() => {
      loadConfig()
    }, 500)
  }, [])

  const handleSectionToggle = (section: string, value: boolean) => {
    setConfig((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: value,
      },
    }))
    setIsSaved(false)
  }

  const handleContactChange = (field: string, value: string) => {
    setConfig((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
      },
    }))
    setIsSaved(false)
  }

  const handleSocialChange = (platform: string, value: string) => {
    setConfig((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        [platform]: value,
      },
    }))
    setIsSaved(false)
  }

  const handleChatbotChange = (field: string, value: any) => {
    setConfig((prev) => ({
      ...prev,
      chatbot: {
        ...prev.chatbot,
        [field]: value,
      },
    }))
    setIsSaved(false)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Salvar no localStorage
      localStorage.setItem("siteConfig", JSON.stringify(config))

      // Simular uma chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSaved(true)
      toast({
        title: "Sucesso",
        description: "Configurações salvas localmente. Recarregue a página para ver as alterações.",
      })
    } catch (error) {
      console.error("Erro ao salvar configurações:", error)
      toast({
        title: "Erro",
        description: "Não foi possível salvar as configurações",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <LoadingScreen message="Carregando configurações" fullScreen={false} className="min-h-[400px]" />
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Configurações do Site</h1>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Seções Visíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {Object.entries(config.sections).map(([section, isVisible]) => (
                <div key={section} className="flex items-center justify-between">
                  <Label htmlFor={`section-${section}`} className="capitalize">
                    {section}
                  </Label>
                  <Switch
                    id={`section-${section}`}
                    checked={isVisible as boolean}
                    onCheckedChange={(checked) => handleSectionToggle(section, checked)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  value={config.contact.email}
                  onChange={(e) => handleContactChange("email", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-phone">Telefone</Label>
                <Input
                  id="contact-phone"
                  value={config.contact.phone}
                  onChange={(e) => handleContactChange("phone", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-whatsapp">WhatsApp (apenas números)</Label>
                <Input
                  id="contact-whatsapp"
                  value={config.contact.whatsapp}
                  onChange={(e) => handleContactChange("whatsapp", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Redes Sociais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {Object.entries(config.social).map(([platform, url]) => (
                <div key={platform} className="grid gap-2">
                  <Label htmlFor={`social-${platform}`} className="capitalize">
                    {platform}
                  </Label>
                  <Input
                    id={`social-${platform}`}
                    value={url as string}
                    onChange={(e) => handleSocialChange(platform, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurações do Chatbot</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general">
              <TabsList className="mb-4">
                <TabsTrigger value="general">Geral</TabsTrigger>
                <TabsTrigger value="prompt">Prompt do Sistema</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="chatbot-enabled">Ativar Chatbot</Label>
                    <Switch
                      id="chatbot-enabled"
                      checked={config.chatbot.enabled}
                      onCheckedChange={(checked) => handleChatbotChange("enabled", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="chatbot-autoOpen">Abrir Automaticamente</Label>
                    <Switch
                      id="chatbot-autoOpen"
                      checked={config.chatbot.autoOpen}
                      onCheckedChange={(checked) => handleChatbotChange("autoOpen", checked)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="chatbot-welcomeMessage">Mensagem de Boas-vindas</Label>
                    <Textarea
                      id="chatbot-welcomeMessage"
                      value={config.chatbot.welcomeMessage}
                      onChange={(e) => handleChatbotChange("welcomeMessage", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="prompt">
                <div className="grid gap-4">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-blue-800 text-sm flex items-start mb-4">
                    <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Sobre o Prompt do Sistema:</p>
                      <p>
                        O prompt do sistema é gerenciado no arquivo bot-prompt.ts. Para editar o prompt, você precisa
                        modificar esse arquivo diretamente.
                      </p>
                      <p className="mt-2">
                        Isso garante que o prompt seja consistente em toda a aplicação e evita duplicações.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            {isSaved && (
              <span className="text-green-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                Configurações salvas localmente
              </span>
            )}
          </div>
          <Button onClick={handleSave} size="lg" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar Configurações"
            )}
          </Button>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-amber-800 text-sm">
          <p className="font-medium">Nota:</p>
          <p>
            Esta é uma interface de demonstração que salva as configurações apenas no localStorage do navegador. Em um
            ambiente de produção, você precisaria implementar uma solução de armazenamento persistente como um banco de
            dados ou um serviço de armazenamento em nuvem.
          </p>
          <p className="mt-2">
            As alterações feitas aqui afetarão apenas a visualização atual do site e serão perdidas ao limpar o cache do
            navegador.
          </p>
        </div>
      </div>
    </div>
  )
}



