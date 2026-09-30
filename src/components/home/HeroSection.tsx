"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowRight, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import homeContent from "@/constants/homeContent.json"

export default function HeroSection() {
    const { hero } = homeContent
    const router = useRouter()

    return (
        <section className="relative overflow-hidden bg-[#f5f0e9]">
            <div className="container-custom relative z-10 px-0 sm:px-6 lg:px-8">
                <div className="grid min-h-[680px] overflow-hidden rounded-none bg-[#f8f4ee] shadow-soft-lg sm:rounded-b-2xl lg:grid-cols-[0.92fr_1.08fr]">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="relative z-10 flex flex-col justify-center px-7 py-16 sm:px-12 lg:px-14 xl:px-16"
                    >
                        <div className="mb-7 flex items-center gap-3 text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-primary">
                            <span className="h-px w-7 bg-accent" />
                            {hero.badge}
                        </div>
                        <h1 className="max-w-xl font-heading text-[3.7rem] font-medium leading-[0.88] tracking-[-0.055em] text-[#181615] sm:text-6xl lg:text-[5.25rem]">
                            Artful<br />
                            Creations<br />
                            <span className="text-accent">for Your Space</span>
                        </h1>
                        <p className="mt-8 max-w-md text-base leading-7 text-foreground/75 sm:text-lg">
                            Handcrafted décor, personalized gifts and CNC-crafted pieces designed to make your space unmistakably yours.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            {hero.buttons.map((btn, i) => (
                                <Button
                                    key={i}
                                    size="lg"
                                    variant={btn.variant === "outline" ? "outline" : undefined}
                                    className={btn.variant === "outline" ? "h-12 rounded-md border-primary px-7 font-body text-sm text-primary hover:bg-primary hover:text-primary-foreground" : "h-12 rounded-md bg-primary px-7 font-body text-sm text-primary-foreground shadow-none hover:bg-primary/90"}
                                    onClick={() => {
                                        if (btn.url) router.push(btn.url)
                                    }}
                                >
                                    {btn.label}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            ))}
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-12 rounded-md border-primary px-7 font-body text-sm text-primary hover:bg-primary hover:text-primary-foreground sm:hidden"
                                onClick={() => router.push("/shop")}
                            >
                                Shop Now
                            </Button>
                        </div>
                        <div className="mt-10 hidden items-center gap-3 text-primary/70 sm:flex">
                            <span className="flex size-12 items-center justify-center rounded-full border border-primary/60"><ChevronDown className="h-5 w-5" /></span>
                            <span className="text-[0.6rem] uppercase leading-5 tracking-[0.24em]">Scroll<br />to explore</span>
                        </div>
                    </motion.div>

                    <div className="relative min-h-[430px] overflow-hidden lg:min-h-0">
                        <Image src={hero.image} alt="Handcrafted decor in a warm, modern interior" fill priority className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 55vw" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f4ee]/20 via-transparent to-black/10" />
                        <div className="absolute bottom-8 left-8 rounded-xl bg-[#f8f4ee]/95 p-3 shadow-lg backdrop-blur-sm sm:left-12">
                            <div className="relative h-20 w-32 overflow-hidden rounded-lg">
                                <Image src={hero.image} alt="Decor detail" fill className="object-cover" sizes="128px" />
                            </div>
                            <div className="flex items-center justify-between gap-5 px-1 pt-2 text-[0.6rem] uppercase tracking-[0.12em] text-foreground/65">
                                <span>01 / 04<br /><strong className="font-body text-foreground">Wall Art</strong></span>
                                <span className="flex size-7 items-center justify-center rounded-full border border-primary text-primary"><ArrowRight className="h-3.5 w-3.5" /></span>
                            </div>
                        </div>
                        <div className="absolute right-7 top-1/2 hidden -translate-y-1/2 font-heading text-2xl italic leading-tight text-[#8c4a22] md:block">
                            More<br />than Decor<br />A Story<br />in Every Piece
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
