import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { offers } from "@/constants/HomeContent"


export default function SpecialOffers({ products }: any) {
    return (
        <section className="py-16 bg-background">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="heading-lg mb-4">Limited Time Offers</h2>
                    <p className="body-md text-muted-foreground max-w-2xl mx-auto">
                        Exclusive promotions on our handcrafted collections
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((product:any) => (
                        <div
                            key={product._id}
                            className="bg-card rounded-md overflow-hidden shadow-soft border border-primary/10 group hover:shadow-brass transition-shadow"
                        >
                            <div className="relative h-48">
                                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                                {product.discount && (
                                    <div className="absolute top-0 right-0 bg-accent text-white font-bold py-1 px-3 rounded-bl-md">
                                        {product.discount}
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <h3 className="font-heading font-semibold text-xl mb-2">{product.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3 mr-1" />
                                        <span>Expires in {product.expiryDays} days</span>
                                    </div>
                                    <Link
                                        href={product.slug ? `/product/${product.slug}` : "#"}
                                        className="text-primary font-medium text-sm flex items-center group-hover:text-accent transition-colors"
                                    >
                                        Shop Now
                                        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* <div className="mt-10 text-center">
                    <Button className="bg-brass-gradient text-white shadow-brass hover:shadow-brass-lg">View All Offers</Button>
                </div> */}
            </div>
        </section>
    )
}
