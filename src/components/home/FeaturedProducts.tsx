import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ProductCard from "@/components/misc/ProductCard"
import { featuredProducts } from "@/constants/HomeContent"
import homeContent from "@/constants/homeContent.json"

export default function FeaturedProducts() {
    const { featuredProducts: fp } = homeContent

    return (
        <section className="py-16 bg-background copper-texture">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <h2 className="heading-lg mb-4">{fp.title}</h2>
                        <p className="body-md text-muted-foreground max-w-2xl">{fp.description}</p>
                    </div>
                    <Link href="/shop" className="mt-4 md:mt-0 group flex items-center text-accent font-medium">
                        {fp.cta}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}
