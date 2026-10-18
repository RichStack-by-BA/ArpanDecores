"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { testimonials } from "@/constants/HomeContent"

export default function TestimonialSlider() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, [])

    const goToPrev = useCallback(() => {
        setCurrentIndex((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        )
    }, [])

    useEffect(() => {
        // const interval = setInterval(goToNext, 6000)

        // return () => clearInterval(interval)
    }, [goToNext])

    /*
     * Four brands are visible at a time.
     * Slider functionality remains unchanged.
     */
    const visibleTestimonials = Array.from(
        { length: Math.min(4, testimonials.length) },
        (_, index) =>
            testimonials[(currentIndex + index) % testimonials.length]
    )

    return (
        <section className="relative overflow-hidden bg-[#F8F3EA] py-16 md:py-20 lg:py-8">

            {/* =========================================================
                BACKGROUND
            ========================================================= */}


            {/* =========================================================
                CONTENT
            ========================================================= */}

            <div className="container-custom relative z-10">

                {/* =====================================================
                    HEADER
                ===================================================== */}

                <div className="text-center">

                    {/* TRUSTED BY */}
                    <div
                        className="
                            mb-4
                            flex
                            items-center
                            justify-center
                            gap-6
                        "
                    >
                        <span
                            className="
                                h-px
                                w-16
                                bg-[#B8874A]/50
                            "
                        />

                        <span
                            className="
                                font-body
                                text-[10px]
                                font-medium
                                uppercase
                                tracking-[0.48em]
                                text-[#A96F32]
                            "
                        >
                            Trusted By
                        </span>

                        <span
                            className="
                                h-px
                                w-16
                                bg-[#B8874A]/50
                            "
                        />
                    </div>


                    {/* MAIN TITLE */}
                    <h2
                        className="
                            font-heading
                            text-[38px]
                            font-normal
                            leading-none
                            tracking-[-0.035em]
                            text-[#2D241E]
                            sm:text-5xl
                            md:text-[54px]
                            lg:text-[60px]
                        "
                    >
                        Distinguished Brands
                    </h2>


                    {/* SMALL DECORATIVE DIVIDER */}
                    {/* <div
                        className="
                            mt-7
                            flex
                            items-center
                            justify-center
                            gap-5
                        "
                    >
                        <span
                            className="
                                h-px
                                w-24
                                bg-[#B8874A]/35
                            "
                        />

                        <span
                            className="
                                relative
                                h-[11px]
                                w-[11px]
                                rotate-45
                                border
                                border-[#B8874A]/65
                            "
                        />

                        <span
                            className="
                                h-px
                                w-24
                                bg-[#B8874A]/35
                            "
                        />
                    </div> */}

                </div>


                {/* =====================================================
                    SLIDER
                ===================================================== */}

                <div className="relative mt-14 md:mt-16 lg:mt-20 md:w-[80%] mx-auto">

                    {/* =================================================
                        LEFT ARROW
                    ================================================= */}

                    <button
                        type="button"
                        onClick={goToPrev}
                        aria-label="Previous brand"
                        className="
                            absolute
                            left-0
                            top-1/2
                            z-40
                            hidden
                            h-14
                            w-14
                            -translate-x-[35%]
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            bg-[#FFFDF9]
                            text-[#A86D31]
                            shadow-[0_8px_25px_rgba(89,59,31,0.08)]
                            transition-all
                            duration-300
                            hover:scale-105
                            hover:shadow-[0_12px_30px_rgba(89,59,31,0.14)]
                            md:flex
                            lg:h-16
                            lg:w-16
                        "
                    >
                        <ChevronLeft
                            className="h-6 w-6 lg:h-7 lg:w-7"
                            strokeWidth={1.6}
                        />
                    </button>


                    {/* =================================================
                        CARDS
                    ================================================= */}

                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-1
                            md:px-2
                            sm:grid-cols-2
                            sm:gap-2
                            lg:grid-cols-4
                            lg:gap-2
                            xl:gap-2
                            
                        "
                    >
                        {/* flex
                        flex-wrap
                        justify-center
                        gap-4
                        sm:gap-5
                        lg:gap-6 */}

                        {visibleTestimonials.map(
                            (testimonial, index) => (

                                <article
                                    key={`${testimonial.id}-${currentIndex}-${index}`}
                                    className="
                                        group
                                        relative
                                        flex
                                        flex-col
                                        items-center
                                    "
                                >

                                    {/* =================================
                                        ARCH / MAIN CARD
                                    ================================= */}

                                    <div
                                        className="
                                            relative
                                            h-[220px]
                                            md:h-[290px]
                                            w-[90%]
                                            max-w-[365px]
                                            overflow-hidden
                                            rounded-full
                                            rounded-b-[8px]
                                            border
                                             border-[#C18A4A]/70
                                            bg-[#F8F0E4]
                                            shadow-[0_10px_28px_rgba(76,51,28,0.08)]
                                            transition-transform
                                            duration-500
                                            group-hover:-translate-y-1
                                        "
                                    >

                                        {/* =============================
                                            IMAGE BACKGROUND
                                        ============================== */}

                                        <div
                                            className="
                                               
                                            md:absolute
                                                inset-x-0
                                                top-0
                                                h-[110px]
                                                md:h-[225px]
                                                overflow-hidden
                                                rounded-full
                                            "
                                        >

                                            <Image
                                                src={
                                                    testimonial.avatar ||
                                                    "/placeholder.svg"
                                                }
                                                alt={testimonial.name}
                                                fill
                                                sizes="
                                                    (max-width: 640px) 90vw,
                                                    (max-width: 1024px) 45vw,
                                                    25vw
                                                "
                                                className="
                                                    object-cover
                                                    transition-transform
                                                    duration-700
                                                    ease-out
                                                    group-hover:scale-[1.035]
                                                "
                                            />

                                            {/* subtle warm overlay */}
                                            <div
                                                className="
                                                    absolute
                                                    inset-0
                                                    bg-gradient-to-b
                                                    from-transparent
                                                    via-transparent
                                                    to-[#8B5D30]/10
                                                "
                                            />

                                        </div>


                                        {/* =================================
                                            LOGO / IMAGE CENTER BADGE
                                        ================================= */}

                                        <div
                                            className="
                                                absolute
                                                left-1/2
                                                top-[40px]
                                                md:top-[80px]
                                                z-10
                                                flex
                                                h-[105px]
                                                md:h-[125px]
                                                w-[105px]
                                                md:w-[125px]
                                                -translate-x-1/2
                                                items-center
                                                justify-center
                                                overflow-hidden
                                                rounded-[20px]
                                                border
                                                border-[#B8874A]/45
                                                bg-[#A8783E]/90
                                                p-[1px]
                                                shadow-[0_8px_25px_rgba(54,35,19,0.18)]
                                                backdrop-blur-[2px]
                                            "
                                        >

                                            <div
                                                className="
                                                    relative
                                                    h-full
                                                    w-full
                                                    overflow-hidden
                                                    rounded-[14px]
                                                    border
                                                    border-[#B8874A]/45
                                                    bg-[#A8783E]
                                                "
                                            >
                                                <Image
                                                    src={
                                                        testimonial.avatar ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt=""
                                                    fill
                                                    sizes="125px"
                                                    className="
                                                        object-contain
                                                       
                                                    "
                                                //  p-2
                                                />
                                            </div>

                                        </div>


                                        {/* =================================
                                            LOWER CREAM PANEL
                                        ================================= */}

                                        <div
                                            className="
                                                absolute
                                                bottom-0
                                                left-0
                                                right-0
                                                z-20
                                                h-[75px]
                                                
                                                px-2
                                                pt-4
                                                text-center
                                            "
                                        >

                                            {/* curved top edge */}
                                            {/* <div
                                                className="
                                                    absolute
                                                    -top-[28px]
                                                    left-1/2
                                                    h-[56px]
                                                    w-[115%]
                                                    -translate-x-1/2
                                                    rounded-[50%]
                                                    bg-[#F9F2E8]
                                                "
                                            /> */}

                                            <div className="relative z-10">

                                                {/* number */}
                                                {/* <div
                                                    className="
                                                        mb-2
                                                        flex
                                                        items-center
                                                        justify-center
                                                        gap-3
                                                    "
                                                >

                                                    <span
                                                        className="
                                                            h-px
                                                            w-10
                                                            bg-[#B8874A]/35
                                                        "
                                                    />

                                                    <span
                                                        className="
                                                            font-body
                                                            text-[10px]
                                                            tracking-[0.12em]
                                                            text-[#B47736]
                                                        "
                                                    >
                                                        {String(index + 1).padStart(
                                                            2,
                                                            "0"
                                                        )}
                                                    </span>

                                                    <span
                                                        className="
                                                            h-px
                                                            w-10
                                                            bg-[#B8874A]/35
                                                        "
                                                    />

                                                </div> */}


                                                {/* brand name */}
                                                <h3
                                                    className="
                                                      line-clamp-2
                                min-h-[48px]
                                font-heading
                                
                                font-normal
                                leading-[1.3]
                                tracking-[-0.025em]
                                text-[#24211F]
                                transition-colors
                                group-hover:text-[#A66D32]
                                text-[20px]
                                sm:text-[22px]
                                lg:text-[22px]
                                                    "
                                                >
                                                    {testimonial.name}
                                                </h3>


                                                {/* tiny gold line */}
                                                <div
                                                    className="
                                                        mx-auto
                                                        mt-1
                                                        flex
                                                        items-center
                                                        justify-center
                                                    "
                                                >
                                                    <span
                                                        className="
                                                            h-px
                                                            w-10
                                                            bg-[#B8874A]/45
                                                        "
                                                    />

                                                    <span
                                                        className="
                                                            mx-1
                                                            h-1
                                                            w-1
                                                            rounded-full
                                                            bg-[#A96D30]
                                                        "
                                                    />

                                                    <span
                                                        className="
                                                            h-px
                                                            w-10
                                                            bg-[#B8874A]/45
                                                        "
                                                    />
                                                </div>

                                            </div>

                                        </div>

                                    </div>


                                    {/* =================================
                                        PEDESTAL / BASE
                                    ================================= */}

                                    {/* <div
                                        className="
                                            relative
                                            -mt-[1px]
                                            h-[18px]
                                            w-[92%]
                                            rounded-[50%]
                                            border
                                            border-[#C69A63]/60
                                            bg-gradient-to-b
                                            from-[#E5CDAE]
                                            to-[#CDA77A]
                                            shadow-[0_7px_12px_rgba(76,51,28,0.10)]
                                        "
                                    /> */}

                                </article>

                            )
                        )}

                    </div>


                    {/* =================================================
                        RIGHT ARROW
                    ================================================= */}

                    <button
                        type="button"
                        onClick={goToNext}
                        aria-label="Next brand"
                        className="
                            absolute
                            right-0
                            top-1/2
                            z-40
                            hidden
                            h-14
                            w-14
                            translate-x-[35%]
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            bg-[#FFFDF9]
                            text-[#A86D31]
                            shadow-[0_8px_25px_rgba(89,59,31,0.08)]
                            transition-all
                            duration-300
                            hover:scale-105
                            hover:shadow-[0_12px_30px_rgba(89,59,31,0.14)]
                            md:flex
                            lg:h-16
                            lg:w-16
                        "
                    >
                        <ChevronRight
                            className="h-6 w-6 lg:h-7 lg:w-7"
                            strokeWidth={1.6}
                        />
                    </button>

                </div>


                {/* =====================================================
                    PAGINATION
                ====================================================== */}

                <div
                    className="
                        mt-10
                        flex
                        items-center
                        justify-center
                        gap-2
                        md:mt-12
                    "
                >

                    {testimonials.map((_, index) => (

                        <button
                            key={index}
                            type="button"
                            aria-label={`Go to brand ${index + 1}`}
                            onClick={() => setCurrentIndex(index)}
                            className={`
                                h-2
                                rounded-full
                                transition-all
                                duration-300
                                ${index === currentIndex
                                    ? "w-7 bg-[#B77935]"
                                    : "w-2 bg-[#D7C1A4]"
                                }
                            `}
                        />

                    ))}

                </div>

            </div>

        </section>
    )
}