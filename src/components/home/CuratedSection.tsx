import CuratedCollection from "@/components/misc/CuratedCollection"
import homeContent from "@/constants/homeContent.json"

export default function CuratedSection() {
    const { curatedCollections } = homeContent

    return (
        <section className="py-16 bg-background wood-texture">
            <div className="container-custom text-center mb-12">
                <h2 className="heading-lg mb-4">{curatedCollections.title}</h2>
                <p className="body-md text-muted-foreground max-w-2xl mx-auto">{curatedCollections.description}</p>
            </div>
            <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {curatedCollections.collections.map((item, i) => (
                    <CuratedCollection key={i} {...item} />
                ))}
            </div>
        </section>
    )
}
