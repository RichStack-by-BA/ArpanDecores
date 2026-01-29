import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CuratedCollectionProps {
    title: string
    description: string
    image: string
    href: string
    className?: string
}

export default function CuratedCollection({ title, description, image, href, className }: CuratedCollectionProps) {
    return (
        <Link href={href} className={cn("group relative overflow-hidden rounded-md shadow-soft", className)}>
            <div className="aspect-[4/5] relative">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-heading font-bold text-2xl mb-2">{title}</h3>
                    <p className="text-white/90 mb-4 max-w-xs">{description}</p>
                    <div className="flex items-center font-medium text-primary">
                        Explore Collection
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </Link>
    )
}
