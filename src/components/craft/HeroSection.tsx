import { Award, Clock, Sparkles } from "lucide-react"
import Image from "next/image"

type HeroSectionProps = {
    heading: string
    description: string
    imageSrc: string
}

const HeroSection: React.FC<HeroSectionProps> = ({ heading, description, imageSrc }) => {
    return (
        <section className="relative bg-secondary/10 py-16 md:py-24 wood-texture">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <h1 className="heading-xl">
                            {heading} <span className="text-primary">Craftsmanship</span>
                        </h1>
                        <p className="body-lg text-muted-foreground">{description}</p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <div className="flex items-center gap-2">
                                <Award className="h-5 w-5 text-primary" />
                                <span className="font-medium">Award-winning artisans</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-primary" />
                                <span className="font-medium">30+ years of expertise</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                <span className="font-medium">Handcrafted excellence</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[300px] md:h-[400px] rounded-md overflow-hidden shadow-soft-lg">
                        <Image src={imageSrc} alt="Artisan craftsmanship" fill className="object-cover" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
