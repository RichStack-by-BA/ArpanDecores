import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Leaf, Award, Shield, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/Button"
import ProductCard from "@/components/misc/ProductCard"
import TestimonialSlider from "@/components/misc/TestimonialSlider"
import CraftProcess from "@/components/misc/CraftProcess"
import CuratedCollection from "@/components/misc/CuratedCollection"
import SpecialOffers from "@/components/misc/SpecialOffer"
import { featuredProducts } from "@/constants/HomeContent"
import { Badge } from "@/components/misc/Badge"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Natural Textures */}
      <section className="relative bg-secondary/10 pt-16 pb-20 md:pt-24 md:pb-32 wood-texture">
        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Badge className="bg-accent/80 text-white mb-4">Artisan Crafted Excellence</Badge>
              <h1 className="heading-xl">
                Handcrafted Gifts <span className="text-primary">With Passion</span>
              </h1>
              <p className="body-lg max-w-md">
                Discover exquisite personalized gifts and home decor crafted with premium materials and meticulous
                attention to detail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-brass-gradient text-white shadow-brass hover:shadow-brass-lg">
                  Explore Collections
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Custom Orders
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[500px] rounded-md overflow-hidden shadow-soft-lg">
              <Image
                src="/images/hero-main.jpg"
                alt="Premium handcrafted items"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-white text-sm">4.9/5 from over 2,000 reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <SpecialOffers />

      {/* Curated Collections */}
      <section className="py-16 bg-background wood-texture">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Curated Collections</h2>
            <p className="body-md text-muted-foreground max-w-2xl mx-auto">
              Thoughtfully selected pieces for every occasion and space
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <CuratedCollection
              title="Festive Treasures"
              description="Celebrate special occasions with our festive collection"
              image="/images/collections/festive-collection.jpg"
              href="/categories/festive"
            />
            <CuratedCollection
              title="Wedding Elegance"
              description="Timeless gifts and decor for the perfect wedding"
              image="/images/collections/wedding-collection.jpg"
              href="/categories/wedding"
            />
            <CuratedCollection
              title="Bespoke Creations"
              description="Personalized gifts crafted to your specifications"
              image="/images/collections/custom-collection.jpg"
              href="/categories/custom"
            />
          </div>
        </div>
      </section>

      {/* Craft Process Section */}
      <CraftProcess />

      {/* Featured Products */}
      <section className="py-16 bg-background copper-texture">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="heading-lg mb-4">Handpicked Selections</h2>
              <p className="body-md text-muted-foreground max-w-2xl">
                Our most exquisite creations, meticulously crafted with premium materials
              </p>
            </div>
            <Link href="/shop" className="mt-4 md:mt-0 group flex items-center text-accent font-medium">
              View All Collections
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

      {/* Sustainability Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] rounded-md overflow-hidden shadow-soft-lg">
              <Image
                src="/images/sustainability/eco-materials.jpg"
                alt="Sustainable craftsmanship"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <Badge className="bg-accent/20 text-accent border-accent/30 mb-2">Our Commitment</Badge>
              <h2 className="heading-lg">Crafted with Care for the Planet</h2>
              <p className="body-md text-muted-foreground">
                At Arpan Decores, sustainability isn't just a buzzword—it's woven into every piece we create. We
                carefully source eco-friendly materials, minimize waste through thoughtful design, and ensure fair
                compensation for our skilled artisans.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <Leaf className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Responsibly Sourced Materials</h3>
                    <p className="text-sm text-muted-foreground">
                      We use reclaimed wood, organic textiles, and locally sourced materials whenever possible.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <Award className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Artisan Fair Trade</h3>
                    <p className="text-sm text-muted-foreground">
                      We ensure fair wages and safe working conditions for all our skilled craftspeople.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <Shield className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Minimal Waste Production</h3>
                    <p className="text-sm text-muted-foreground">
                      Our production processes are designed to minimize waste and reduce our environmental footprint.
                    </p>
                  </div>
                </div>
              </div>
              <Link href="/sustainability">
                <Button className="mt-4 bg-brass-gradient text-white shadow-brass hover:shadow-brass-lg">
                  Learn More About Our Practices
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-md bg-card shadow-soft border border-primary/10">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <rect width="16" height="16" x="4" y="4" rx="2" />
                  <path d="M10 10h4v4h-4z" />
                  <path d="m16 16 4 4" />
                  <path d="m4 4 4 4" />
                  <path d="m4 20 4-4" />
                  <path d="m20 4-4 4" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Premium Materials</h3>
              <p className="text-sm text-muted-foreground">
                We source only the finest materials for exceptional quality and longevity
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-md bg-card shadow-soft border border-primary/10">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Lifetime Guarantee</h3>
              <p className="text-sm text-muted-foreground">
                We stand behind our craftsmanship with a lifetime guarantee on all products
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-md bg-card shadow-soft border border-primary/10">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Expert Consultation</h3>
              <p className="text-sm text-muted-foreground">
                Personal guidance from our artisans for custom orders and special requests
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-md bg-card shadow-soft border border-primary/10">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Bespoke Customization</h3>
              <p className="text-sm text-muted-foreground">
                Personalize your gifts to create truly unique and meaningful pieces
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-secondary/5">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Client Testimonials</h2>
            <p className="body-md text-muted-foreground max-w-2xl mx-auto">
              Hear from our clients about their Arpan Decores experience
            </p>
          </div>

          <TestimonialSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary/10 relative">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/craft/crafting-process.jpg" alt="Background" fill className="object-cover" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Create Something Extraordinary</h2>
            <p className="body-lg mb-8 max-w-2xl mx-auto">
              Whether you're celebrating a special occasion or enhancing your living space, our artisans are ready to
              bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-brass-gradient text-white shadow-brass hover:shadow-brass-lg">
                Start Your Custom Order
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Browse Collections
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
