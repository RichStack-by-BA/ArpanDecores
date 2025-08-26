import Link from "next/link"
import { ChevronRight } from "lucide-react"

type Crumb = { label: string; href: string }
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (!items?.length) return null

  return (
    <div className="container-custom">
      <nav className="flex items-center text-sm mb-8">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <div key={i} className="flex items-center">
              {i > 0 && <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />}
              {isLast ? (
                <span className="text-foreground font-medium">{item.label}</span>
              ) : (
                <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                  {item.label}
                </Link>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
