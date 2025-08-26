import { Heart, Award, Users, Sparkles } from "lucide-react"

const iconMap = {
  Heart: Heart,
  Award: Award,
  Users: Users,
  Sparkles: Sparkles
} as const

type ValueItem = { icon: keyof typeof iconMap; title: string; text: string }

export default function ValuesGrid({
  title,
  description,
  items
}: {
  title: string
  description: string
  items: ValueItem[]
}) {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">{title}</h2>
          <p className="body-md text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <div key={i} className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
