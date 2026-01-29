import Image from "next/image"

export default function WorkshopSection({
  title,
  image,
  paragraphs,
  bullets
}: {
  title: string
  image: string
  paragraphs: string[]
  bullets: string[]
}) {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-elegant-lg">
            <Image src={image} alt="Our workshop" fill className="object-cover" />
          </div>
          <div className="space-y-6">
            <h2 className="heading-lg">{title}</h2>
            {paragraphs.map((p, i) => (
              <p key={i} className="body-md text-muted-foreground">{p}</p>
            ))}
            <div className="space-y-3">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
