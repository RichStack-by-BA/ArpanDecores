"use client"

import HeroSection from "@/components/contact/HeroSection"

import contantData from "@/constants/contactData.json"

export default function ContactPage() {


  return (
    <div className="py-8 md:py-12 container-custom">
      <HeroSection
        heading={contantData.heroSection.heading}
        description={contantData.heroSection.description}
        imageSrc={contantData.heroSection.imageSrc}
        contactMethods={contantData.contactMethods}
      />

      <section>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Location</h2>
        <p className="text-muted-foreground mb-4">Visit us at our office or explore the area before your visit.</p>
        <div className="w-full overflow-hidden rounded-2xl shadow-md">
          <iframe
            className="w-full h-[400px] md:h-[450px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={
              "https://www.google.com/maps?output=embed&q=Block+18,+Arpan+Decores,+Plot+11,+11,+Nehru+Nagar+East,+Bhilai,+Chhattisgarh+490020"}
          />
        </div>
      </section>
    </div>
  )
}
