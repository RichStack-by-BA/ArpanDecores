"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
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
    const interval = setInterval(goToNext, 6000)
    return () => clearInterval(interval)
  }, [goToNext])

  const visibleTestimonials = [
    testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length],
    testimonials[currentIndex],
  ]

  return (
    <div className="relative">
      <div className="relative mx-auto max-w-6xl">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_18%,rgba(255,255,255,0.55),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(105,130,99,0.12),transparent_24%),linear-gradient(135deg,#dfead4_0%,#dfead4_45%,#cad6bf_100%)]" />

        <div className="text-center">
          
          <h2 className="heading-lg mb-4">
            Trusted By Distinguished Brands
          </h2>
          <p className="body-md text-muted-foreground max-w-2xl mx-auto">
            Trusted by leading brands across diverse industries, we deliver precision-crafted solutions that seamlessly align with their vision and identity.
          </p>
        </div>

        <div className="relative mt-8 md:mt-10">
          <div className="flex items-stretch justify-center gap-5 md:gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.id}-${index}`}
                className="relative flex w-full max-w-[420px] min-h-[50px] flex-col rounded-[2rem] bg-[#ffffff] px-1 pb-4 pt-20 shadow-[0_20px_40px_rgba(29,66,46,0.18)] md:px-7 md:pb-4 md:pt-14"
              >
                <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-[20%]">
                  <div className="relative h-24 w-24 overflow-hidden rounded--[2rem] border-[5px] border-[#dfead4] bg-[#dfead4] shadow-[0_8px_22px_rgba(0,0,0,0.12)] md:h-28 md:w-28">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="absolute left-1 md:left-4 top-15 text-[4rem] md:text-[9rem] text-primary leading-none md:block ">
                  “
                </div>
                <div className="absolute right-1 md:right-4 top-15 text-[4rem] md:text-[9rem] text-primary leading-none md:block  ">
                  ”
                </div>

                <div className="mt-2 flex min-h-[70px] items-center justify-center text-center text-sm uppercase tracking-[0.18em] bold">
                  {testimonial.name}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>


   
    </div>
  )
}