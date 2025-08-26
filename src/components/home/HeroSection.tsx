import Image from "next/image"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/misc/Badge"
import homeContent from "@/constants/homeContent.json"

export default function HeroSection() {
    const { hero } = homeContent

    return (
        <section className="relative bg-secondary/10 pt-16 pb-20 md:pt-24 md:pb-32 wood-texture">
            <div className="container-custom relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <Badge className="bg-accent/80 text-white mb-4">{hero.badge}</Badge>
                    <h1 className="heading-xl">
                        {hero.title} <span className="text-primary">{hero.highlight}</span>
                    </h1>
                    <p className="body-lg max-w-md">{hero.description}</p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        {hero.buttons.map((btn, i) => (
                            <Button key={i} size="lg" variant={btn.variant === "outline" ? "outline" : undefined}>
                                {btn.label}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="relative h-[300px] md:h-[500px] rounded-md overflow-hidden shadow-soft-lg">
                    <Image src={hero.image} alt="Hero" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 flex items-center gap-2 text-white text-sm">
                        {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
                        <span>{hero.rating}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
