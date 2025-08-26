import Image from "next/image"

type HeroSectionProps = {
  heading: string
  description: string
  imageSrc: string
}

const HeroSection: React.FC<HeroSectionProps> = ({ heading, description, imageSrc }) => {
  return (
    <section className="relative bg-gradient-to-b from-royal-cream to-background py-16 md:py-24">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="heading-xl">
              {heading} <span className="text-primary">Touch</span>
            </h1>
            <p className="body-lg text-muted-foreground">{description}</p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-elegant-lg">
            <Image src={imageSrc} alt="Contact Us" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
