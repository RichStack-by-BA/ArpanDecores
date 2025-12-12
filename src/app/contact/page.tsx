"use client"

import { useState } from "react"
import HeroSection from "@/components/contact/HeroSection"
import ContactForm from "@/components/contact/ContactForm"
import ContactMethod from "@/components/contact/ContactMethod"
import contantData from "@/constants/contactData.json"
import { ContactFormValues } from "@/lib/schemas"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  // const { addToast } = useToast()

  const handleFormSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Example toast (optional)
    // addToast({
    //   id: Date.now().toString(),
    //   title: "Message sent successfully!",
    //   description: "We'll get back to you within 24 hours.",
    //   variant: "success",
    // })


    setIsSubmitting(false)
  }

  const isValidIcon = (icon: string): icon is "phone" | "mail" | "clock" => {
    return ["phone", "mail", "clock"].includes(icon)
  }

  return (
    <div className="py-8 md:py-12">
      <HeroSection
        heading={contantData.heroSection.heading}
        description={contantData.heroSection.description}
        imageSrc={contantData.heroSection.imageSrc}
        contactMethods={contantData.contactMethods}
      />

      {/* <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <ContactForm contactFormFields={contantData.subjectOptions}/>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}
