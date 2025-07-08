"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag, Eye } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "./Badge"
// import { useToast } from "@/components/ui/use-toast"
// import { useCart } from "@/components/cart-provider"
import { cn } from "@/lib/utils"

interface Product {
    id: string
    name: string
    price: number
    image: string
    category: string
    isNew?: boolean
    isBestseller?: boolean
    isCustomizable?: boolean
}

interface ProductCardProps {
    product: Product
    className?: string
    viewMode?: "grid" | "list"
}

export default function ProductCard({ product, className, viewMode = "grid" }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    //   const { addToCart } = useCart()
    //   const { toast } = useToast()

    const handleAddToCart = () => {
        // addToCart({
        //   id: product.id,
        //   name: product.name,
        //   price: product.price,
        //   image: product.image,
        //   quantity: 1,
        // })

        // toast({
        //   title: "Added to cart",
        //   description: `${product.name} has been added to your cart.`,
        // })
    }

    if (viewMode === "list") {
        return (
            <div className={cn("flex gap-4 p-4 bg-card rounded-md shadow-soft border border-primary/10", className)}>
                <div className="relative h-32 w-32 rounded-md overflow-hidden flex-shrink-0">
                    <Link href={`/product/${product.id}`}>
                        <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </Link>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-2">
                        {product.isNew && <Badge className="bg-accent text-accent-foreground">New Arrival</Badge>}
                        {product.isBestseller && <Badge className="bg-primary text-primary-foreground">Bestseller</Badge>}
                        {product.isCustomizable && <Badge variant="outline">Customizable</Badge>}
                    </div>

                    <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
                    <Link href={`/product/${product.id}`}>
                        <h3 className="font-heading font-medium text-xl mb-2 hover:text-primary transition-colors">
                            {product.name}
                        </h3>
                    </Link>
                    <div className="font-semibold text-lg mb-4">₹{product.price.toLocaleString()}</div>

                    <div className="flex gap-2">
                        <Button
                            onClick={handleAddToCart}
                            className="bg-brass-gradient text-white shadow-brass hover:shadow-brass-lg"
                        >
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Add to Cart
                        </Button>
                        <Button variant="outline" size="icon" className="border-primary/20 hover:border-primary">
                            <Heart className="h-4 w-4" />
                        </Button>
                        <Link href={`/product/${product.id}`}>
                            <Button variant="outline" size="icon" className="border-primary/20 hover:border-primary">
                                <Eye className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            className={cn(
                "group relative rounded-md overflow-hidden bg-card shadow-soft border border-primary/10",
                className,
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Product image */}
            <div className="aspect-square relative overflow-hidden">
                <Link href={`/product/${product.id}`}>
                    <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </Link>

                {/* Quick actions */}
                <div
                    className={cn(
                        "absolute bottom-0 left-0 right-0 flex justify-center p-4 gap-2 transition-all duration-300 bg-gradient-to-t from-secondary/80 to-transparent",
                        isHovered ? "opacity-100" : "opacity-0",
                    )}
                >
                    <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-md bg-white/90 hover:bg-white text-secondary"
                        onClick={handleAddToCart}
                    >
                        <ShoppingBag className="h-4 w-4" />
                        <span className="sr-only">Add to cart</span>
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-md bg-white/90 hover:bg-white text-secondary">
                        <Heart className="h-4 w-4" />
                        <span className="sr-only">Add to wishlist</span>
                    </Button>
                    <Link href={`/product/${product.id}`}>
                        <Button size="icon" variant="secondary" className="rounded-md bg-white/90 hover:bg-white text-secondary">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Quick view</span>
                        </Button>
                    </Link>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && <Badge className="bg-accent text-accent-foreground">New Arrival</Badge>}
                    {product.isBestseller && <Badge className="bg-primary text-primary-foreground">Bestseller</Badge>}
                    {product.isCustomizable && (
                        <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
                            Customizable
                        </Badge>
                    )}
                </div>
            </div>

            {/* Product info */}
            <div className="p-4">
                <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
                <Link href={`/product/${product.id}`} className="block">
                    <h3 className="font-heading font-medium text-lg mb-2 transition-colors group-hover:text-primary">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-center justify-between">
                    <div className="font-semibold">₹{product.price.toLocaleString()}</div>
                    <Button
                        size="sm"
                        className="rounded-md bg-brass-gradient text-white h-8 w-8 p-0 shadow-brass hover:shadow-brass-lg"
                        onClick={handleAddToCart}
                    >
                        <ShoppingBag className="h-4 w-4" />
                        <span className="sr-only">Add to cart</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
