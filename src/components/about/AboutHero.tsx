import Image from "next/image"

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
    <section className="relative bg-gradient-to-b from-royal-cream to-background py-16 md:py-24">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1
              className="heading-xl"
              dangerouslySetInnerHTML={{ __html: titleHTML }}
            />
            {paragraphs.map((p, i) => (
              <p key={i} className={`text-muted-foreground ${i === 0 ? "body-lg" : "body-md"}`}>
                {p}
              </p>
            ))}
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-elegant-lg">
            <Image src={image} alt="About hero" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
