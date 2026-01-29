import Image from "next/image"
import { Award, Leaf, Shield } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/misc/Badge"
import homeContent from "@/constants/homeContent.json"

const iconMap = {
    Leaf: <Leaf className="h-3 w-3 text-primary" />,
    Award: <Award className="h-3 w-3 text-primary" />,
    Shield: <Shield className="h-3 w-3 text-primary" />
}

export default function SustainabilitySection() {
    const { sustainability } = homeContent

    return (
        <section className="py-16 bg-secondary/10">
            <div className="container-custom grid md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[400px] rounded-md overflow-hidden shadow-soft-lg">
                    <Image src={sustainability.image} alt="Sustainable craftsmanship" fill className="object-cover" />
                </div>
                <div className="space-y-6">
                    <Badge className="bg-accent/20 text-accent border-accent/30 mb-2">{sustainability.badge}</Badge>
                    <h2 className="heading-lg">{sustainability.title}</h2>
                    <p className="body-md text-muted-foreground">{sustainability.description}</p>
                    <div className="space-y-4 pt-2">
                        {sustainability.points.map((point, i) => (
                            <div className="flex items-start gap-3" key={i}>
                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                                    {iconMap[point.icon as keyof typeof iconMap]}
                                </div>
                                <div>
                                    <h3 className="font-medium text-lg">{point.title}</h3>
                                    <p className="text-sm text-muted-foreground">{point.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button className="mt-4 bg-brass-gradient text-white shadow-brass hover:shadow-brass-lg">
                        {sustainability.button}
                    </Button>
                </div>
            </div>
        </section>
    )
}
