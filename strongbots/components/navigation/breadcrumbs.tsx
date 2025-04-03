import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
  isCurrent?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`py-2 ${className}`}>
      <ol className="flex flex-wrap items-center text-sm">
        <li className="flex items-center">
          <Link href="/" className="text-gray-500 hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" aria-hidden="true" />
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.isCurrent ? (
              <span className="text-primary font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <>
                <Link href={item.href} className="text-gray-500 hover:text-primary">
                  {item.label}
                </Link>
                {index < items.length - 1 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" aria-hidden="true" />}
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

