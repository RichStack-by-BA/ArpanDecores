"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Star, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/misc/Badge"
import homeContent from "@/constants/homeContent.json"

export default function HeroSection() {
    const { hero } = homeContent
    const router = useRouter()

    return (
        <section className="relative overflow-hidden bg-secondary/[0.04] pt-12 pb-16 md:pt-20 md:pb-24 wood-texture">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
            <div className="container-custom relative z-10 grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="space-y-6">
                    <div className="eyebrow flex items-center gap-3"><span className="h-px w-8 bg-accent" />{hero.badge}</div>
                    <h1 className="heading-xl max-w-xl">
                        {hero.title} <span className="text-primary">{hero.highlight}</span>
                    </h1>
                    <p className="body-lg max-w-md text-foreground/70">{hero.description}</p>
                    <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                        {hero.buttons.map((btn, i) => (
                            <Button
                                key={i}
                                size="lg"
                                className="group"

                                variant={btn.variant === "outline" ? "outline" : undefined}
                                onClick={() => {
                                    if (btn.url) router.push(btn.url)
                                }}
                            >
                                {btn.label}
                                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
