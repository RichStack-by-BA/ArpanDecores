"use client"

import { useState } from "react"
import { ChevronDown ,PlusIcon,MinusIcon, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItem {
  id: string
  title: string
  content: string // HTML string
}

interface AccordionProps {
  items: AccordionItem[]
  type?: "single" | "multiple"
}

export default function Accordion({ items, type = "single" }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      type === "single"
        ? prev.includes(id) ? [] : [id]
        : prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="w-full border-t-[1px] border-b-[1px]  divide-y">
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)

        return (
          <div key={item.id}>
            <button
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-center justify-between py-4 px-3 font-medium hover:underline transition"
            >
              {item.title}
              <PlusIcon className={cn(
                  "h-5 w-5 transition-transform",
                  isOpen ? "hidden" : "block"
                )} />
              <MinusIcon className={cn(
                  "h-5 w-5 transition-transform",
                  isOpen ? "block" : "hidden"
                )} />
            </button>

            {/* HTML content injected */}
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 text-sm px-3",
                isOpen ? "max-h-[500px] overflow-auto py-3" : "max-h-0"
              )}
            >
              <div
                dangerouslySetInnerHTML={{ __html: item.content }}
                className="prose prose-sm max-w-none"
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
