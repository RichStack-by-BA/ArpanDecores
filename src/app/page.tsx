import HeroSection from "@/components/home/HeroSection"
import CuratedSection from "@/components/home/CuratedSection"
import SpecialOffers from "@/components/misc/SpecialOffer"
import FeaturedProducts from "@/components/home/FeaturedProducts"
import CraftProcess from "@/components/misc/CraftProcess"
import SustainabilitySection from "@/components/home/SustainabilitySection"
import TrustSignals from "@/components/home/TrustSignals"
import TestimonialSlider from "@/components/misc/TestimonialSlider"
import CTASection from "@/components/home/CTASection"
import homeContent from "@/constants/homeContent.json"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <SpecialOffers />
      <CuratedSection />
      <CraftProcess />
      <FeaturedProducts />
      <SustainabilitySection />
      <TrustSignals />
      <section className="py-16 bg-secondary/5">
        <div className="container-custom text-center mb-12">
          <h2 className="heading-lg mb-4">{homeContent.testimonialSection.title}</h2>
          <p className="body-md text-muted-foreground max-w-2xl mx-auto">{homeContent.testimonialSection.description}</p>
        </div>
        <TestimonialSlider />
      </section>
      <CTASection />
    </div>
  )
}
