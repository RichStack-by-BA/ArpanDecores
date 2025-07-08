"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { testimonials } from "@/constants/HomeContent"


export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goToNext = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  const goToPrev = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  // Auto-advance the slider
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4 md:px-12">
              <div className="bg-card rounded-md p-6 md:p-8 shadow-soft border border-primary/10 flex flex-col items-center text-center">
                <div className="relative h-20 w-20 rounded-full overflow-hidden border-4 border-primary/20 mb-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < testimonial.rating ? "fill-primary text-primary" : "fill-muted text-muted",
                      )}
                    />
                  ))}
                </div>

                <blockquote className="mb-6 text-lg italic font-heading">"{testimonial.content}"</blockquote>

                <div>
                  <div className="font-heading font-semibold text-lg">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-0 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background border-primary/20 hover:border-primary"
        onClick={goToPrev}
        disabled={isAnimating}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Previous testimonial</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background border-primary/20 hover:border-primary"
        onClick={goToNext}
        disabled={isAnimating}
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Next testimonial</span>
      </Button>

      {/* Indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 rounded-full transition-all",
              index === currentIndex ? "w-8 bg-primary" : "w-2 bg-primary/30",
            )}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
