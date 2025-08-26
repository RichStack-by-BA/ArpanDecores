"use client"

import { useState } from "react"
import HeroSection from "@/components/contact/HeroSection"
import ContactForm from "@/components/contact/ContactForm"
import ContactMethod from "@/components/contact/ContactMethod"
import { useToast } from "@/components/ui/useToast"
import contantData from "@/constants/contactData.json"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    // const { addToast } = useToast()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubjectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, subject: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 2000))


        // addToast({
        //     id: Date.now().toString(), // Unique ID for each toast
        //     title: "Message sent successfully!",
        //     description: "We'll get back to you within 24 hours.",
        //     variant: "destructive",
        // })

        setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        })
        setIsSubmitting(false)
    }
    const isValidIcon = (icon: string): icon is "phone" | "mail" | "clock" => {
        return ["phone", "mail", "clock"].includes(icon);
    };


    return (
        <div className="py-8 md:py-12">
            <HeroSection
                heading={contantData.heroSection.heading}
                description={contantData.heroSection.description}
                imageSrc={contantData.heroSection.imageSrc}
            />

            <section className="section-padding bg-background">
                <div className="container-custom">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <ContactForm
                                formData={formData}
                                handleInputChange={handleInputChange}
                                handleSubjectChange={handleSubjectChange}
                                handleSubmit={handleSubmit}
                                isSubmitting={isSubmitting}
                                formFields={contantData.contactFormFields}
                            />
                        </div>
                        <div className="space-y-6">
                            {contantData.contactMethods.map((method) => (
                                <ContactMethod key={method.label} label={method.label}
                                    icon={isValidIcon(method.icon) ? method.icon : "phone"}
                                    value={method.value} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
