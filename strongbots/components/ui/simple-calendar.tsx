"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, CalendarIcon, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SimpleCalendarProps {
  className?: string
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  availableDates?: Date[]
  showTimeSelect?: boolean
  availableTimes?: string[]
  selectedTime?: string
  onTimeChange?: (time: string) => void
}

export function SimpleCalendar({
  className,
  selected,
  onSelect,
  availableDates = [],
  showTimeSelect = false,
  availableTimes = [],
  selectedTime,
  onTimeChange,
}: SimpleCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

  // Função para verificar se uma data está disponível
  const isDateAvailable = (date: Date): boolean => {
    if (availableDates.length === 0) return true // Se não houver datas específicas, todas estão disponíveis

    return availableDates.some(
      (availableDate) =>
        availableDate.getDate() === date.getDate() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getFullYear() === date.getFullYear(),
    )
  }

  // Função para verificar se uma data está selecionada
  const isDateSelected = (date: Date): boolean => {
    if (!selected) return false

    return (
      date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() &&
      date.getFullYear() === selected.getFullYear()
    )
  }

  // Função para verificar se uma data é hoje
  const isToday = (date: Date): boolean => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  // Função para verificar se uma data deve ser desabilitada
  const isDateDisabled = (date: Date): boolean => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return (
      date < today || // Datas passadas
      !isDateAvailable(date) // Datas não disponíveis
    )
  }

  // Função para obter o nome do mês
  const getMonthName = (month: number): string => {
    const monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ]
    return monthNames[month]
  }

  // Função para obter o nome do dia da semana
  const getDayName = (day: number): string => {
    const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
    return dayNames[day]
  }

  // Função para obter os dias do mês atual
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Função para obter o primeiro dia da semana do mês
  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay()
  }

  // Função para ir para o mês anterior
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  // Função para ir para o próximo mês
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Renderizar os dias do mês
  const renderDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const days = []

    // Adicionar dias vazios para o início do mês
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>)
    }

    // Adicionar os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const disabled = isDateDisabled(date)
      const isSelectedDate = isDateSelected(date)
      const isTodayDate = isToday(date)
      const isAvailable = isDateAvailable(date)

      days.push(
        <Button
          key={day}
          type="button"
          variant={isSelectedDate ? "primary" : "ghost"}
          disabled={disabled}
          onClick={() => !disabled && onSelect?.(date)}
          className={cn(
            "w-10 h-10 rounded-md flex items-center justify-center text-sm transition-colors p-0",
            disabled ? "text-muted-foreground opacity-50 cursor-not-allowed" : "hover:bg-muted",
            isSelectedDate ? "bg-primary-700 text-white hover:bg-primary-800" : "",
            isTodayDate && !isSelectedDate ? "bg-primary-100 text-primary-700 font-medium" : "",
            isAvailable && !isSelectedDate && !isTodayDate ? "border-2 border-primary-100" : "",
          )}
        >
          {day}
        </Button>,
      )
    }

    return days
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="rounded-lg border border-border p-3 bg-white">
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="flex items-center text-sm font-medium text-foreground">
            <CalendarIcon className="mr-2 h-4 w-4 text-primary-700" />
            Selecione uma data disponível
          </div>
        </div>

        <div className="space-y-4">
          {/* Cabeçalho do calendário */}
          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={prevMonth}
              className="h-8 w-8 p-0 opacity-50 hover:opacity-100 flex items-center justify-center"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="text-sm font-medium">
              {getMonthName(currentMonth.getMonth())} {currentMonth.getFullYear()}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={nextMonth}
              className="h-8 w-8 p-0 opacity-50 hover:opacity-100 flex items-center justify-center"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Dias da semana */}
          <div className="grid grid-cols-7 gap-1">
            {[0, 1, 2, 3, 4, 5, 6].map((day) => (
              <div key={day} className="text-center text-muted-foreground text-xs font-medium">
                {getDayName(day)}
              </div>
            ))}
          </div>

          {/* Dias do mês */}
          <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
        </div>
      </div>

      {/* Seleção de horário */}
      {showTimeSelect && availableTimes.length > 0 && (
        <div className="rounded-lg border border-border p-3 bg-white">
          <div className="flex items-center text-sm font-medium text-foreground mb-3 px-1">
            <Clock className="mr-2 h-4 w-4 text-primary-700" />
            Selecione um horário
          </div>
          <div className="grid grid-cols-3 gap-2">
            {availableTimes.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "primary" : "secondary"}
                size="sm"
                onClick={() => onTimeChange?.(time)}
                className={cn("flex items-center justify-center px-3 py-2 text-sm rounded-md transition-colors")}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

