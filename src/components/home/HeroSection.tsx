"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowDown, ArrowRight, Leaf, Gem, Gift, Users } from "lucide-react"
import { Button } from "@/components/ui/Button"
import homeContent from "@/constants/homeContent.json"

const highlights = [
    { icon: Gem, value: "50+", label: "Unique Designs" },
    { icon: Users, value: "1000+", label: "Happy Customers" },
    { icon: Leaf, value: "Premium", label: "Quality Materials" },
    { icon: Gift, value: "Custom", label: "Made for You" },
]

export default function HeroSection() {
    const { hero } = homeContent
    const router = useRouter()

    return (
        <section className="relative overflow-hidden bg-[#f4eee6] px-4 pb-0 pt-5 md:px-7 md:pt-7">
            <div className="mx-auto max-w-[1440px] overflow-hidden rounded-t-xl border border-[#eadfd2] bg-[#f8f4ef] shadow-[0_18px_50px_rgba(77,51,28,0.12)]">
                <div className="relative grid min-h-[650px] lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="relative z-10 flex flex-col justify-center px-7 py-14 sm:px-12 md:px-16 lg:py-20">
                        <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-[#a16a31]">CNC Technology <span className="px-2">+</span> Artisan Craftsmanship</p>
                        <h1 className="max-w-[590px] font-heading text-5xl font-normal leading-[0.94] tracking-[-0.045em] text-[#171514] sm:text-6xl md:text-7xl lg:text-[76px]">
                            Artful<br />Creations<br /><em className="text-[#a85c27]">for Your Space</em>
                        </h1>
                        <p className="mt-8 max-w-[390px] text-base leading-7 text-[#302b27] md:text-lg">{hero.description}</p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            {hero.buttons.map((btn, i) => (
                                <Button key={i} size="lg" variant={btn.variant === "outline" ? "outline" : undefined} className={btn.variant === "outline" ? "h-12 border-[#a16a31] bg-transparent px-8 text-[#965722] hover:bg-[#a16a31] hover:text-white" : "h-12 bg-[#a16a31] px-8 text-white hover:bg-[#87501f]"} onClick={() => btn.url && router.push(btn.url)}>
                                    {btn.label} <ArrowRight data-icon="inline-end" />
                                </Button>
                            ))}
                        </div>
                        <div className="mt-7 flex size-12 items-center justify-center rounded-full border border-[#b7804a] text-[#a16a31]"><ArrowDown /></div>
                        <p className="mt-2 pl-1 text-[10px] uppercase tracking-[0.2em] text-[#756b63]">Scroll<br />to explore</p>
                    </div>
                    <div className="relative min-h-[430px] overflow-hidden lg:min-h-full">
                        <Image src="/images/hero-main.jpg" alt="Warmly styled artisan home decor interior" fill className="object-cover" priority />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f4ef]/80 via-transparent to-transparent lg:w-1/3" />
                        <div className="absolute bottom-10 left-7 rounded-2xl border border-white/70 bg-white/90 p-2 shadow-xl backdrop-blur-sm md:left-10">
                            <div className="h-20 w-32 overflow-hidden rounded-xl"><Image src="/images/ms1.webp" alt="Artisan wall decor detail" width={160} height={100} className="size-full object-cover" /></div>
                            <div className="flex items-center justify-between gap-4 px-2 pt-2"><span className="text-[9px] uppercase tracking-wider text-[#8a8077]">01 / 04<br /><b className="text-xs tracking-normal text-[#27211d]">WALL ART</b></span><span className="flex size-7 items-center justify-center rounded-full border border-[#b7804a] text-[#a16a31]"><ArrowRight /></span></div>
                        </div>
                        <p className="absolute right-8 top-32 max-w-28 text-center font-heading text-2xl italic leading-tight text-white drop-shadow-lg md:right-14 md:top-40">More than decor.<br />A story in every piece.</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 border-t border-[#e7dbce] bg-[#fbf8f4] sm:grid-cols-4">
                    {highlights.map(({ icon: Icon, value, label }) => <div key={label} className="flex items-center gap-3 border-b border-[#e7dbce] px-5 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 md:px-8"><span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f0e6d9] text-[#a16a31]"><Icon /></span><span><strong className="block font-heading text-lg font-medium text-[#1f1a17]">{value}</strong><small className="text-xs text-[#6d6259]">{label}</small></span></div>)}
                </div>
            </div>
        </section>
    )
}
