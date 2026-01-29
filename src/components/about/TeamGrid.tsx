import Image from "next/image"

type Member = { name: string; role: string; bio: string; image: string }

export default function TeamGrid({
  title,
  description,
  members
}: {
  title: string
  description: string
  members: Member[]
}) {
  return (
    <section className="section-padding bg-royal-cream/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">{title}</h2>
          <p className="body-md text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((m, i) => (
            <div key={i} className="text-center">
              <div className="relative h-48 w-48 rounded-full overflow-hidden mx-auto mb-4 shadow-elegant">
                <Image src={m.image} alt={`${m.name} - ${m.role}`} fill className="object-cover" />
              </div>
              <h3 className="font-playfair font-semibold text-xl mb-2">{m.name}</h3>
              <p className="text-primary font-medium mb-2">{m.role}</p>
              <p className="text-sm text-muted-foreground">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
