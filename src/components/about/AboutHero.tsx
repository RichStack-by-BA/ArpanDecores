import Image from "next/image"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function AboutHero({
  titleHTML,
  paragraphs,
  image
}: {
  titleHTML: string
  paragraphs: string[]
  image: string
}) {
  return (
    <section className="relative bg-gradient-to-b from-royal-cream to-background md:py-16 md:py-1">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1
              className="heading-xl"
              dangerouslySetInnerHTML={{ __html: titleHTML }}
            />
            {paragraphs.map((p, i) => (
              <p key={i} className={`text-muted-foreground ${i === 0 ? "body-lg" : "body-md"}`}>
                {p}
              </p>
            ))}
           <div>
             <a href="/brochure/ARPAN%20DECORES.pdf" download>
              <Button className="bg-brass-gradient text-white shadow-brass hover:shadow-brass-lg">
                <Download className="h-4 w-4 mr-2" />
                Download Brochure
              </Button>
            </a>
          </div>
          </div>
          <div className="hidden md:block relative h-[400px] rounded-2xl overflow-hidden shadow-elegant-lg">
            <Image src={image} alt="About hero" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
