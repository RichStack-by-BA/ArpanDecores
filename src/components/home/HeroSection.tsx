"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import {
    ArrowDown,
    ArrowRight,
    Diamond,
    Gift,
    Leaf,
    Users,
} from "lucide-react"

import { Button } from "@/components/ui/Button"
import homeContent from "@/constants/homeContent.json"

const stats = [
    {
        icon: Diamond,
        value: "50+",
        label: "Unique Designs",
    },
    {
        icon: Users,
        value: "1000+",
        label: "Happy Customers",
    },
    {
        icon: Leaf,
        value: "Premium",
        label: "Quality Materials",
    },
    {
        icon: Gift,
        value: "Custom",
        label: "Made for You",
    },
]

export default function HeroSection() {
    const { hero } = homeContent
    const router = useRouter()

    return (
        <section className="relative isolate overflow-hidden bg-[#F7F3EC] text-[#292522]">

            {/* =====================================================
                BACKGROUND DECORATION
            ====================================================== */}

            <div
                className="
                    pointer-events-none absolute
                    -left-20 top-20
                    h-[500px] w-[300px]
                    opacity-[0.12]
                    text-[#B28A55]
                "
            >
                <img
                    src="/images/botanical-line-art.svg"
                    alt=""
                    className="h-full w-full object-contain"
                />
            </div>

            {/* subtle glow */}
            <div
                className="
                    pointer-events-none absolute
                    right-[25%] top-[-180px]
                    h-[420px] w-[420px]
                    rounded-full
                    bg-[#b763014a]/10
                    blur-3xl
                "
            />

            {/* =====================================================
                HERO CONTAINER
            ====================================================== */}

            <div className="container-custom relative z-10">

                <div
                    className="
                        grid min-h-[calc(100vh-76px)]
                        lg:grid-cols-[0.90fr_1.10fr]
                        items-center
                    "
                >

                    {/* =================================================
                        IMAGE
                    ================================================== */}

                    <div
                        className="
                            relative
                            order-1
                            h-[270px]
                            xs:h-[250px]
                            sm:h-[520px]
                            lg:order-2
                            lg:h-[715px]
                            lg:-mr-[8vw]
                        "
                    >

                        {/* Large organic image wrapper */}

                        <div
                            className="
                                absolute inset-0
                                overflow-hidden
                                rounded-bl-[48%]
                                rounded-tl-[62%]
                                md:rounded-tl-[22%]62%
                                rounded-tr-none
                                rounded-br-[8%]
                                lg:rounded-bl-[50%]
                                lg:rounded-tl-[28%]
                            "
                        >

                            <Image
                                src={hero.image || ""}
                                alt="Arpan Decores handcrafted interior decor"
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 60vw"
                                className="
                                    object-cover
                                    object-center
                                    transition-transform
                                    duration-1000
                                    hover:scale-[1.035]
                                "
                            />

                            {/* warm image overlay */}

                            <div
                                className="
                                    absolute inset-0
                                    bg-gradient-to-tr
                                    from-[#3A2415]/20
                                    via-transparent
                                    to-[#C49A63]/10
                                "
                            />

                            {/* subtle grain */}

                            <div
                                className="
                                    absolute inset-0
                                    opacity-[0.08]
                                    mix-blend-overlay
                                    bg-[url('/images/noise.png')]
                                "
                            />
                        </div>

                        {/* =================================================
                            SMALL FEATURE CARD
                        ================================================== */}

                        <div
                            className="
                                absolute
                                bottom-0
                                md:bottom-8
                                 left-2
                                 md:left-5
                                sm:left-8
                                lg:bottom-[9rem] lg:left-[-70px]
                                z-20
                                w-[152px]
                                sm:w-[220px]
                                overflow-hidden
                                rounded-2xl
                                border border-white/70
                                bg-white/90
                                shadow-[0_20px_60px_rgba(55,35,15,0.18)]
                                backdrop-blur-md
                            "
                        >
                            <div className="relative h-[70px] sm:h-[115px]">
                                <Image
                                    src={hero.image || ""}
                                    alt=""
                                    fill
                                    sizes="220px"
                                    className="object-cover"
                                />

                                <div className="absolute inset-0 bg-black/10" />
                            </div>

                            <div className="flex items-center justify-between px-4 md:py-3 ">
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.22em] text-[#A57B45]">
                                        {/* 01 / 04 */}
                                    </p>

                                    <p className="mt-1 font-serif text-sm">
                                        {/* Wall Art */}
                                    </p>
                                </div>

                                {/* <button
                                    type="button"
                                    aria-label="Explore wall art"
                                    className="
                                        flex h-8 w-8
                                        items-center justify-center
                                        rounded-full
                                        border border-[#B28A55]/40
                                        text-[#9B713D]
                                        transition-all
                                        hover:bg-[#B28A55]
                                        hover:text-white
                                    "
                                >
                                    <ArrowRight className="h-4 w-4" />
                                </button> */}
                            </div>
                        </div>

                        {/* =================================================
                            IMAGE CAROUSEL INDICATOR
                        ================================================== */}

                        <div
                            className="
                                absolute
                                bottom-3 md:bottom-7 
                                right-[1rem] md:right-[6rem]
                                lg:bottom-12 lg:right-[6rem]
                                z-20
                                flex items-center
                                gap-2
                                rounded-full
                                border border-white/40
                                bg-black/25
                                px-3 py-2
                                backdrop-blur-md
                            "
                        >
                            <span className="h-1.5 w-6 rounded-full bg-white" />
                            <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                            <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                            <span className="h-1.5 w-1.5 rounded-full bg-white/50" />

                            {/* <button
                                type="button"
                                aria-label="Next hero image"
                                className="
                                    ml-1 flex h-8 w-8
                                    items-center justify-center
                                    rounded-full
                                    bg-white
                                    text-[#3A2A1C]
                                    transition-transform
                                    hover:scale-105
                                "
                            >
                                <ArrowRight className="h-4 w-4" />
                            </button> */}
                        </div>

                        {/* =================================================
                            VERTICAL NUMBER
                        ================================================== */}

                        <div
                            className="
                                absolute
                                left-[-8px] top-[32%]
                                hidden lg:flex
                                items-center gap-3
                                text-[#A57B45]
                            "
                        >
                            <span className="text-xs tracking-[0.2em]">
                                01
                            </span>

                            <span className="h-16 w-px bg-[#B28A55]/40" />

                            <span className="text-[9px] uppercase tracking-[0.25em] [writing-mode:vertical-rl]">
                                Collection
                            </span>
                        </div>
                    </div>

                    {/* =================================================
                        CONTENT
                    ================================================== */}

                    <div
                        className="
                            order-2
                            relative z-30
                            py-4
                            lg:order-1
                            md:py-5
                            md:pr-8
                            lg:py-5
                            lg:pr-8
                        "
                    >

                        {/* eyebrow */}

                        <div
                            className="
                                mb-2
                                md:mb-5
                                flex items-center gap-3
                                text-[#A57B45]
                            "
                        >
                            <span className="h-px w-2 md:w-8 bg-[#A57B45]" />

                            <span
                                className="
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.28em]
                                "
                            >
                                CNC Technology + Artisan Craftsmanship
                            </span>
                        </div>

                        {/* =================================================
                            HEADLINE
                        ================================================== */}

                        <h1
                            className="
                                max-w-[715px]
                                font-italiana
                                text-[38px]
                                leading-[0.92]
                                tracking-[-0.035em]
                                sm:text-[64px]
                                lg:text-[65px]
                                xl:text-[65px]
                                flex
                                flex-col
md:items-start
items-center
                            "
                        >
                            <span className="block">
                                Artful Creations
                            {/* </span>

                            <span className="block"> */}
                                
                            </span>

                            <span
                                className="
                                    block
                                    italic
                                    font-normal
                                    text-[#AA4A1D]
                                "
                                // //#B2864D]
                            >
                                for Your Space
                            </span>
                        </h1>

                        {/* botanical accent */}

                        <img
                            src="/bg-svgs/botanical-line-art-small.svg"
                            alt=""
                            className="
                                pointer-events-none
                                absolute
                                right-[5%]
                                top-[8%]
                                hidden
                                h-32
                                w-20
                                text-[#B28A55]
                                opacity-20
                                lg:block
                            "
                        />

                        {/* =================================================
                            DESCRIPTION
                        ================================================== */}

                        <p
                            className="
                                mt-4
                                md:mt-7
                                max-w-[480px]
                                text-[15px]
                                leading-7
                                text-[#5D5751]
                                sm:text-base
                            "
                        >
                            Handcrafted décor, personalized gifts and
                            CNC-crafted pieces designed to make your
                            space unmistakably yours.
                        </p>

                        {/* =================================================
                            BUTTONS
                        ================================================== */}

                        <div
                            className="
                                mt-4
                                md:mt-8
                                flex
                                gap-3
                                sm:flex-row
                            "
                        >
                            <Button
                                size="lg"
                                onClick={() => {
                                    router.push(
                                        hero.buttons?.[0]?.url || "/collections"
                                    )
                                }}
                                className="
                                    group
                                    h-12
                                    rounded-md
                                    bg-[#AB6A36]
                                    px-7
                                    text-white
                                    shadow-[0_12px_30px_rgba(145,100,45,0.18)]
                                    transition-all
                                    hover:-translate-y-0.5
                                    hover:bg-[#91662F]
                                "
                            >
                                {hero.buttons?.[0]?.label || "Explore Collections"}

                                <ArrowRight
                                    className="
                                        ml-2 h-4 w-4
                                        transition-transform
                                        group-hover:translate-x-1
                                    "
                                />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => {
                                    router.push(
                                        hero.buttons?.[1]?.url || "/shop"
                                    )
                                }}
                                className="
                                    h-12
                                    rounded-md
                                    border-[#B28A55]/60
                                    bg-transparent
                                    px-7
                                    text-[#8D673D]
                                    transition-all
                                    hover:bg-[#B28A55]/10
                                "
                            >
                                {hero.buttons?.[1]?.label || "Shop Now"}
                            </Button>
                        </div>

                        {/* =================================================
                            SCROLL INDICATOR
                        ================================================== */}

                        <div
                            className="
                                mt-10
                                hidden
                                items-center
                                gap-3
                                lg:flex
                            "
                        >
                            <div
                                className="
                                    flex h-11 w-11
                                    items-center justify-center
                                    rounded-full
                                    border border-[#B28A55]/40
                                "
                            >
                                <ArrowDown className="h-4 w-4 text-[#9C723E]" />
                            </div>

                            <div>
                                <p className="text-[9px] uppercase tracking-[0.25em] text-[#A57B45]">
                                    Scroll
                                </p>

                                <p className="text-[9px] uppercase tracking-[0.25em] text-[#77716A]">
                                    to explore
                                </p>
                            </div>
                        </div>

                        {/* =================================================
                            STATS
                        ================================================== */}

                        <div
                            className="
                                mt-10
                                grid
                                grid-cols-2
                                gap-y-5
                                border-t
                                border-[#B28A55]/20
                                pt-6
                                sm:grid-cols-4
                                lg:mt-12
                            "
                        >
                            {stats.map((stat) => {
                                const Icon = stat.icon

                                return (
                                    <div
                                        key={stat.label}
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            sm:border-r
                                            sm:border-[#B28A55]/20
                                            sm:px-4
                                            first:pl-0
                                            last:border-r-0
                                        "
                                    >
                                        <div
                                            className="
                                                flex h-9 w-9
                                                shrink-0
                                                items-center justify-center
                                                rounded-full
                                                bg-[#B28A55]/10
                                                text-[#9B713D]
                                            "
                                        >
                                            <Icon className="h-4 w-4" />
                                        </div>

                                        <div>
                                            <p className="font-serif text-sm font-medium">
                                                {stat.value}
                                            </p>

                                            <p className="text-[9px] leading-3 text-[#77716A]">
                                                {stat.label}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================================
                MOBILE SCROLL CUE
            ========================================================== */}

            <div className="flex justify-center pb-6 lg:hidden">
                <div
                    className="
                        flex items-center gap-2
                        text-[9px]
                        uppercase
                        tracking-[0.25em]
                        text-[#9C723E]
                    "
                >
                    <ArrowDown className="h-3.5 w-3.5" />
                    Scroll to explore
                </div>
            </div>
        </section>
    )
}