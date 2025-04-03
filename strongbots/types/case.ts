export interface Case {
  id: number
  clientKey: string
  industryKey: string
  challenge: string
  solution: string
  results: string
  image: string
  metrics: {
    value: string
    label: string
    icon: "conversion" | "cost" | "time"
  }[]
}

export interface CaseCardProps {
  caseItem: Case
  width: number
}

