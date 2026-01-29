"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

function toTitleCase(str: string) {
  return str
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function DynamicBreadcrumbs() {
  const pathname = usePathname()
  if (!pathname) return null

  const pathSegments = pathname.split("/").filter(Boolean)

  const crumbs = pathSegments.map((seg, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/")
    return { label: toTitleCase(seg), href }
  })

  return (
    <div >
      <nav className="flex items-center text-sm mb-8">
        <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
          Home
        </Link>

        {crumbs.map((item, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <div key={i} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />

              {isLast ? (
                <span className="text-foreground font-medium">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
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
