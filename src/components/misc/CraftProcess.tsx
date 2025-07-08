import { craftSteps } from "@/constants/HomeContent"
import Image from "next/image"


export default function CraftProcess() {
  return (
    <section className="py-16 bg-secondary/5">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Our Craft Process</h2>
          <p className="body-md text-muted-foreground max-w-2xl mx-auto">
            Discover the meticulous journey behind each handcrafted piece
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {craftSteps.map((step) => (
            <div key={step.id} className="bg-card rounded-md shadow-soft overflow-hidden border border-primary/10">
              <div className="relative h-48">
                <Image src={step.image || "/placeholder.svg"} alt={step.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent"></div>
                <div className="absolute bottom-3 left-3 bg-primary text-white text-xs font-bold py-1 px-2 rounded">
                  STEP {step.id}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-xl mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
