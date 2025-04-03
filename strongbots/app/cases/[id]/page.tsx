import type { Metadata } from "next"
import CaseDetailPageClient from "./CaseDetailPageClient"

interface CasePageProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: CasePageProps): Metadata {
  // Em um cenário real, você buscaria os dados do case com base no ID
  return {
    title: `Case de Sucesso: E-commerce Líder | StrongBots`,
    description: "Como ajudamos um e-commerce líder a aumentar suas conversões em 73% com IA conversacional.",
  }
}

export default function CaseDetailPage({ params }: CasePageProps) {
  return <CaseDetailPageClient params={params} />
}



