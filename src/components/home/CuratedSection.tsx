import Link from "next/link"
import { ArrowRight } from "lucide-react"

import CuratedCollection from "@/components/misc/CuratedCollection"
import homeContent from "@/constants/homeContent.json"

export default function CuratedSection({ categoryList }: any) {
    const { curatedCollections } = homeContent

    const categories = categoryList?.data?.categories || []

    return (
        <section
            className="
                relative
                overflow-hidden
                bg-[#F8F3EA]
                py-16
                sm:py-8
                lg:py-8
            "
        >
            {/* =====================================================
                BACKGROUND
            ====================================================== */}

            {/* <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                // {/* TOP LEFT SOFT SHAPE 
                <div
                    className="
                        absolute
                        -left-[180px]
                        -top-[180px]
                        h-[460px]
                        w-[460px]
                        rounded-full
                        bg-[#E9D7BC]/30
                    "
                />

                {/* TOP RIGHT 
                <div
                    className="
                        absolute
                        -right-[170px]
                        -top-[80px]
                        h-[430px]
                        w-[430px]
                        rounded-full
                        bg-[#E8D5B8]/25
                    "
                />

                {/* RIGHT CENTER 
                <div
                    className="
                        absolute
                        right-[8%]
                        top-[14%]
                        h-[170px]
                        w-[170px]
                        rounded-full
                        bg-[#EBDCC7]/30
                    "
                />

                {/* BOTTOM LEFT 
                <div
                    className="
                        absolute
                        -bottom-[260px]
                        -left-[100px]
                        h-[520px]
                        w-[520px]
                        rounded-full
                        bg-[#E6D0AD]/25
                    "
                />

                {/* BOTTOM RIGHT 
                <div
                    className="
                        absolute
                        -bottom-[280px]
                        -right-[100px]
                        h-[520px]
                        w-[520px]
                        rounded-full
                        bg-[#E7D4B8]/25
                    "
                />

                {/* SIDE LINES 
                <div
                    className="
                        absolute
                        left-[3.2%]
                        top-0
                        h-full
                        w-px
                        bg-[#B08D57]/10
                    "
                />

                <div
                    className="
                        absolute
                        right-[3.2%]
                        top-0
                        h-full
                        w-px
                        bg-[#B08D57]/10
                    "
                />

                {/* =================================================
                    LEFT BOTANICAL
                ================================================== 

                <svg
                    className="
                        absolute
                        -left-5
                        top-[130px]
                        h-[230px]
                        w-[180px]
                        text-[#B8874A]/35
                        md:left-0
                        md:h-[280px]
                        md:w-[220px]
                    "
                    viewBox="0 0 220 300"
                    fill="none"
                >
                    <path
                        d="M8 285C58 238 77 184 82 115C86 66 110 30 166 8"
                        stroke="currentColor"
                        strokeWidth="1.2"
                    />

                    <path
                        d="M73 170C42 159 24 139 13 112"
                        stroke="currentColor"
                        strokeWidth="1.2"
                    />

                    <path
                        d="M82 130C113 112 131 89 137 62"
                        stroke="currentColor"
                        strokeWidth="1.2"
                    />

                    <path
                        d="M51 208C28 201 14 187 6 169"
                        stroke="currentColor"
                        strokeWidth="1.2"
                    />

                    <path
                        d="M91 96C110 83 123 68 128 50"
                        stroke="currentColor"
                        strokeWidth="1.2"
                    />

                    <path
                        d="M116 48C137 43 151 30 160 14"
                        stroke="currentColor"
                        strokeWidth="1.2"
                    />
                </svg>

                {/* =================================================
                    RIGHT BOTANICAL
                ================================================== 

                <svg
                    className="
                        absolute
                        -right-5
                        bottom-[90px]
                        h-[210px]
                        w-[240px]
                        rotate-[-8deg]
                        text-[#B8874A]/30
                        md:h-[250px]
                        md:w-[300px]
                    "
                    viewBox="0 0 300 240"
                    fill="none"
                >
                    <path
                        d="M15 225C77 195 127 151 167 94C192 58 221 35 278 17"
                        stroke="currentColor"
                        strokeWidth="1.2"
                    />

                    <path
                        d="M109 163C82 161 60 149 45 131"
                        stroke="currentColor"
                        strokeWidth="1.2"
                    />

                    <path
                        d="M145 122C172 120 192 110 208 92"
                        stroke="currentColor"
                        strokeWidth="1.2"
                    />

                    <path
                        d="M178 83C201 80 218 70 232 54"
                        stroke="currentColor"
                        strokeWidth="1.2"
                    />

                    <path
                        d="M82 184C61 180 45 171 33 157"
                        stroke="currentColor"
                        strokeWidth="1.2"
                    />
                </svg>
            </div> */}

            {/* =====================================================
                CONTENT
            ====================================================== */}

            <div className="container-custom relative z-10">

                {/* HEADER */}
                <div
                    className="
                        mx-auto
                        mb-10
                        max-w-4xl
                        text-center
                        sm:mb-12
                        lg:mb-14
                    "
                >
                    {/* EYEBROW */}
                    <div
                        className="
                            mb-4
                            flex
                            items-center
                            justify-center
                            gap-5
                        "
                    >
                        <span className="h-px w-12 bg-[#B8874A]/65" />

                        <span
                            className="
                                font-body
                                text-[9px]
                                font-medium
                                uppercase
                                tracking-[0.42em]
                                text-[#A86F34]
                                sm:text-[10px]
                            "
                        >
                            Discover Our Categories
                        </span>

                        <span className="h-px w-12 bg-[#B8874A]/65" />
                    </div>

                    {/* TITLE */}
                    <h2
                        className="
                            font-heading
                            text-[38px]
                            font-normal
                            leading-[0.95]
                            tracking-[-0.035em]
                            text-[#24211F]
                            sm:text-5xl
                            lg:text-[56px]
                        "
                    >
                        {curatedCollections.title}
                    </h2>

                    {/* DESCRIPTION */}
                    <p
                        className="
                            mx-auto
                            mt-2
                            max-w-2xl
                            font-body
                            text-sm
                            leading-7
                            text-[#66615B]
                            sm:text-base
                        "
                    >
                        {curatedCollections.description}
                    </p>
                </div>

                {/* =================================================
                    CARDS
                ================================================== */}

                <div
                    className="
                        flex
                        flex-wrap
                        justify-center
                        gap-4
                        sm:gap-5
                        lg:gap-6
                    "
                >
                    {categories.map((item: any, i: number) => (
                        <CuratedCollection
                            key={i}
                            {...item}
                            index={i}
                        />
                    ))}
                </div>

                {/* =================================================
                    VIEW ALL COLLECTIONS
                ================================================== */}

                <div
                    className="
                        mt-5
                        flex
                        items-center
                        justify-center
                        gap-4
                        sm:mt-5
                    "
                >
                    <span
                        className="
                            hidden
                            h-px
                            w-16
                            bg-[#B8874A]/60
                            sm:block
                        "
                    />

                    <Link
                        href="/categories"
                        className="
                            group
                            inline-flex
                            items-center
                            gap-5
                            rounded-full
                            border
                            border-[#B8874A]
                            bg-transparent
                            px-7
                            py-3.5
                            font-body
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.25em]
                            text-[#875525]
                            transition-all
                            duration-300
                            hover:bg-[#B8874A]
                            hover:text-white
                            sm:px-9
                            sm:py-4
                        "
                    >
                        <span>View All Collections</span>

                        <ArrowRight
                            className="
                                h-4
                                w-4
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                            "
                        />
                    </Link>

                    <span
                        className="
                            hidden
                            h-px
                            w-16
                            bg-[#B8874A]/60
                            sm:block
                        "
                    />
                </div>

            </div>
        </section>
    )
}