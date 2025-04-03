"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SimpleCalendar } from "@/components/ui/simple-calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Loader2, ArrowLeft, CalendarIcon, Clock, Send, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAvailableDates } from "@/hooks/use-available-dates"
import { useAvailableSlots } from "@/hooks/use-available-slots"
import { useToast } from "@/components/ui/use-toast"

interface SchedulingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SchedulingModal({ open, onOpenChange }: SchedulingModalProps) {
  const [step, setStep] = useState(1)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
  })

  const { toast } = useToast()
  const { availableDates, isLoading: isLoadingDates, error: datesError } = useAvailableDates()
  const { availableSlots, isLoading: isLoadingSlots, error: slotsError } = useAvailableSlots(date)

  // Reset modal state when closed
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(1)
        setDate(undefined)
        setTime(undefined)
        setSuccess(false)
      }, 300)
    }
  }, [open])

  // Focus no input quando o modal abre no passo 2
  useEffect(() => {
    if (open && step === 2) {
      const nameInput = document.getElementById("name")
      if (nameInput) {
        setTimeout(() => {
          nameInput.focus()
        }, 300)
      }
    }
  }, [open, step])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Criar evento no Google Calendar
      const response = await fetch("/api/calendar/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date?.toISOString(),
          time,
          name: formData.name,
          email: formData.email,
          company: formData.company,
          role: formData.role,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        throw new Error("Falha ao criar evento no calendário")
      }

      const data = await response.json()

      setSuccess(true)
      toast({
        title: "Agendamento confirmado!",
        description: `Sua consulta foi agendada para ${formatDate(date)} às ${time}. Você receberá um email de confirmação em breve.`,
      })
    } catch (error) {
      console.error("Erro ao agendar consulta:", error)
      toast({
        title: "Erro no agendamento",
        description: "Não foi possível confirmar seu agendamento. Por favor, tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const resetModal = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      role: "",
      message: "",
    })
    onOpenChange(false)
  }

  const handleDateSelect = useCallback((newDate: Date | undefined) => {
    setDate(newDate)
    setTime(undefined) // Reset time when date changes
    if (newDate) {
      setStep(2)
    }
  }, [])

  const handleTimeSelect = useCallback((newTime: string) => {
    setTime(newTime)
  }, [])

  // Format date for display
  const formatDate = (date: Date | undefined): string => {
    if (!date) return ""

    const day = date.getDate().toString().padStart(2, "0")

    // Portuguese month names
    const monthNames = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ]
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()

    return `${day} de ${month}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] max-h-[90vh] overflow-y-auto p-0 rounded-xl">
        {/* Progress indicator */}
        {!success && (
          <div className="w-full h-1 bg-secondary-100">
            <div
              className="h-full animated-bg transition-all duration-300"
              style={{ width: step === 1 ? "50%" : "100%" }}
            ></div>
          </div>
        )}

        {!success ? (
          <>
            <DialogHeader className="p-4 pb-0">
              <DialogTitle className="text-xl gradient-text">
                {step === 1 ? "Reserve sua consultoria gratuita" : "Complete seu agendamento"}
              </DialogTitle>
              <DialogDescription className="font-nunito mt-1 text-sm">
                {step === 1
                  ? "Selecione uma data disponível em nossa agenda."
                  : "Estamos quase lá! Preencha seus dados."}
              </DialogDescription>
            </DialogHeader>

            {step === 1 ? (
              <div className="grid gap-4 p-4 pt-3">
                {isLoadingDates ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2">Carregando datas disponíveis...</span>
                  </div>
                ) : datesError ? (
                  <div className="bg-red-50 p-4 rounded-lg text-red-800 flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Erro ao carregar datas</p>
                      <p className="text-sm">{datesError}</p>
                      <Button variant="outline" size="sm" className="mt-2" onClick={() => window.location.reload()}>
                        Tentar novamente
                      </Button>
                    </div>
                  </div>
                ) : (
                  <SimpleCalendar selected={date} onSelect={handleDateSelect} availableDates={availableDates} />
                )}

                <DialogFooter className="flex flex-col-reverse sm:flex-row justify-between gap-2 border-t-0 mt-1 pt-0">
                  <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="w-full sm:w-auto btn-secondary border-none text-sm py-2"
                  >
                    Cancelar
                  </Button>
                </DialogFooter>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4 p-4 pt-3">
                <div className="grid gap-3">
                  <div className="rounded-lg border bg-white shadow-sm overflow-hidden transition-all duration-300 animate-in fade-in-0">
                    <div className="flex items-center p-3 border-b bg-secondary-50">
                      <Clock className="mr-2 h-4 w-4 text-primary-500" />
                      <span className="font-medium text-foreground text-sm">Horários para {formatDate(date)}</span>
                    </div>
                    <div className="p-3">
                      {isLoadingSlots ? (
                        <div className="flex items-center justify-center p-4">
                          <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
                          <span className="text-sm">Carregando horários...</span>
                        </div>
                      ) : slotsError ? (
                        <div className="bg-red-50 p-3 rounded-lg text-red-800 text-sm">
                          <p>{slotsError}</p>
                        </div>
                      ) : availableSlots.length === 0 ? (
                        <div className="bg-amber-50 p-3 rounded-lg text-amber-800 text-sm">
                          <p>Não há horários disponíveis para esta data. Por favor, selecione outra data.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-2">
                          {availableSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => handleTimeSelect(slot)}
                              className={cn(
                                "font-nunito py-2 rounded-lg transition-all duration-200 text-sm",
                                time === slot
                                  ? "bg-primary-500 text-white shadow-sm"
                                  : "bg-secondary-50 text-foreground hover:bg-secondary-100",
                              )}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {time && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Nome completo
                        </Label>
                        <Input
                          id="name"
                          placeholder="Seu nome"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="h-9 rounded-lg font-nunito text-sm"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email profissional
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="h-9 rounded-lg font-nunito text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="grid gap-2">
                          <Label htmlFor="company" className="text-sm font-medium">
                            Empresa
                          </Label>
                          <Input
                            id="company"
                            placeholder="Nome da empresa"
                            required
                            value={formData.company}
                            onChange={handleInputChange}
                            className="h-9 rounded-lg font-nunito text-sm"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="role" className="text-sm font-medium">
                            Cargo
                          </Label>
                          <Select defaultValue="default" onValueChange={handleRoleChange}>
                            <SelectTrigger className="h-9 rounded-lg font-nunito text-sm">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="default" disabled>
                                Selecione seu cargo
                              </SelectItem>
                              <SelectItem value="ceo">CEO / Diretor</SelectItem>
                              <SelectItem value="manager">Gerente</SelectItem>
                              <SelectItem value="tech">Líder Técnico</SelectItem>
                              <SelectItem value="marketing">Marketing</SelectItem>
                              <SelectItem value="sales">Vendas</SelectItem>
                              <SelectItem value="other">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="message" className="text-sm font-medium">
                          O que você espera desta consultoria?
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Conte-nos sobre seus objetivos..."
                          className="resize-none min-h-20 rounded-lg font-nunito text-sm"
                          value={formData.message}
                          onChange={handleInputChange}
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="rounded-lg bg-secondary-50 border border-secondary-100 p-3 text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full animated-bg flex items-center justify-center flex-shrink-0">
                      <CalendarIcon className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-xs">Consultoria agendada para:</p>
                      <p className="text-muted-foreground text-xs">
                        <span className="font-medium text-foreground">{formatDate(date)}</span>
                        {time && (
                          <>
                            {" "}
                            às <span className="font-medium text-foreground">{time}</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <p className="text-primary-500 font-medium text-xs">
                    {time ? "Confirme seus dados para garantir sua vaga" : "Selecione um horário disponível"}
                  </p>
                </div>

                <DialogFooter className="flex flex-col-reverse sm:flex-row justify-between gap-2 border-t-0 mt-1 pt-0">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="w-full sm:w-auto btn-secondary border-none text-sm py-2"
                  >
                    <ArrowLeft className="mr-1 h-3 w-3" />
                    Voltar
                  </Button>
                  {time && (
                    <Button
                      type="submit"
                      className="w-full sm:w-auto btn-primary text-sm py-2"
                      disabled={loading || !formData.name || !formData.email || !formData.company || !formData.role}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        <>
                          <Send className="mr-1 h-3 w-3" />
                          Confirmar
                        </>
                      )}
                    </Button>
                  )}
                </DialogFooter>
              </form>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center p-5 text-center">
            <div className="w-16 h-16 rounded-full animated-bg flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2 gradient-text">Agendamento confirmado!</h2>
            <p className="text-muted-foreground mb-4 font-nunito text-sm">
              Sua consultoria exclusiva está agendada para{" "}
              <span className="font-semibold text-foreground">{formatDate(date)}</span> às{" "}
              <span className="font-semibold text-foreground">{time}</span>.
            </p>
            <p className="text-xs text-muted-foreground mb-4 font-nunito">
              Enviamos um email de confirmação com os detalhes.
            </p>

            <div className="rounded-lg bg-secondary-50 border border-secondary-100 p-4 mb-4 text-left w-full">
              <p className="font-semibold text-primary-500 mb-3 text-sm">Próximos passos:</p>
              <ul className="text-xs text-muted-foreground space-y-2 font-nunito">
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-primary-100 flex-shrink-0 mr-2 mt-0.5 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  </div>
                  Verifique seu email para o link da reunião
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-primary-100 flex-shrink-0 mr-2 mt-0.5 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  </div>
                  Prepare suas dúvidas para a consultoria
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-primary-100 flex-shrink-0 mr-2 mt-0.5 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  </div>
                  Adicione o evento ao seu calendário
                </li>
              </ul>
            </div>

            <Button onClick={resetModal} className="btn-primary w-full text-sm py-2">
              Concluir
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

