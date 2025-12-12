import Image from "next/image"
import ContactMethod from "./ContactMethod"



type HeroSectionProps = {
  heading: string
  description: string
  imageSrc: string
  contactMethods: any[]
}

const HeroSection: React.FC<HeroSectionProps> = ({ heading, description, imageSrc,contactMethods }) => {
  const isValidIcon = (icon: string): icon is "phone" | "mail" | "clock" => {
    return ["phone", "mail", "clock"].includes(icon)
  }
  return (
    <section className="relative bg-gradient-to-b from-royal-cream to-background py-16 md:py-24">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="heading-xl">
              {heading} <span className="text-primary">Touch</span>
            </h1>
            <p className="body-lg text-muted-foreground">{description}</p>

             <div className="space-y-6">
              {contactMethods.map((method) => (
                <ContactMethod
                  key={method.label}
                  label={method.label}
                  icon={isValidIcon(method.icon) ? method.icon : "phone"}
                  value={method.value}
                />
              ))}
            </div>
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
