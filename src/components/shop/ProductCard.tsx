"use client"

import { useState } from "react"
import Link from "next/link"
import {
    ArrowRight,
    ArrowUpRight,
    Heart,
    ShoppingBag,
    Eye,
} from "lucide-react"

import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { Badge } from "../misc/Badge"
import { Product } from "@/types/products"
import { useAddToCart } from "@/hooks/useAddToCart"
import ShimmerImage from "@/components/ui/ShimmerImage"

interface ProductCardProps {
    product: Product
    className?: string
    viewMode?: "grid" | "list"
    quantity?: number
    variant?: "default" | "collection"
}

export default function ProductCard({
    product,
    className,
    viewMode = "grid",
    quantity = 1,
    variant = "default",
}: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    const { addToCart, isPending } = useAddToCart()

    const handleAddToCart = () => {
        const cartItem = {
            productId: product._id,
            product: product,
            slug: product.slug,
            quantity,
            priceAtAddTime: product.price,
        }

        addToCart(cartItem)
    }

    /* =========================================================
       LIST VIEW
    ========================================================= */

    if (viewMode === "list") {
        return (
            <div
                className={cn(
                    "flex gap-4 rounded-md border border-primary/10 bg-card p-4 shadow-soft",
                    className
                )}
            >
                <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-md">
                    <Link href={`/product/${product.slug}`}>
                        <ShimmerImage
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </Link>
                </div>

                <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap gap-2">
                        {product.isNew && (
                            <Badge className="bg-accent text-accent-foreground">
                                New Arrival
                            </Badge>
                        )}

                        {product.isBestseller && (
                            <Badge className="bg-primary text-primary-foreground">
                                Bestseller
                            </Badge>
                        )}

                        {product.isCustomizable && (
                            <Badge variant="outline">
                                Customizable
                            </Badge>
                        )}
                    </div>

                    <Link href={`/product/${product.slug}`}>
                        <h3 className="mb-2 font-heading text-xl font-medium transition-colors hover:text-primary">
                            {product.name}
                        </h3>
                    </Link>

                    <div className="mb-4 text-lg font-semibold">
                        ₹{product.price.toLocaleString()}
                    </div>
                </div>
            </div>
        )
    }

    /* =========================================================
       COLLECTION VIEW
       
       Used on Home Page
       Styled to match Curated Collections section
    ========================================================= */

    if (variant === "collection") {
        return (
            <div
                className={cn(
                    `
                    group
                    relative
                    overflow-hidden
                    rounded-t-[110px]
                    border
                    border-[#B8874A]/20
                    bg-[#FBF7F0]
                    shadow-[0_8px_25px_rgba(82,58,35,0.035)]
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:shadow-[0_18px_40px_rgba(82,58,35,0.10)]

                    sm:rounded-t-[130px]
                    lg:rounded-t-[150px]
                    `,
                    className
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* =================================================
                    IMAGE
                ================================================== */}

                <div
                    className="
                        relative
                        mx-[5px]
                        mt-[5px]
                        overflow-hidden
                        rounded-t-[105px]
                        bg-[#F1E9DD]

                        aspect-[1.05]

                        sm:rounded-t-[125px]
                        sm:aspect-[1.05]

                        lg:rounded-t-[145px]
                        lg:aspect-[1.05]
                    "
                >
                    <Link
                        href={`/product/${product.slug}`}
                        className="absolute inset-0"
                    >
                        <ShimmerImage
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            sizes="
                                (max-width: 640px) 45vw,
                                (max-width: 1024px) 30vw,
                                23vw
                            "
                            className="
                                object-cover
                                transition-transform
                                duration-700
                                ease-[cubic-bezier(.2,.7,.2,1)]
                                group-hover:scale-[1.045]
                            "
                        />
                    </Link>

                    {/* Image warmth */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-[#5B3B21]/10
                            via-transparent
                            to-[#FFF8EC]/5
                        "
                    />

                    {/* =================================================
                        WISHLIST
                    ================================================== */}

                    <button
                        type="button"
                        aria-label={`Add ${product.name} to wishlist`}
                        className="
                            absolute
                            right-3
                            top-3
                            z-20
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-[#FFFDF9]/95
                            text-[#A66D32]
                            shadow-[0_4px_12px_rgba(50,35,20,0.10)]
                            backdrop-blur-sm
                            transition-all
                            duration-300
                            hover:scale-105
                            hover:bg-white
                        "
                    >
                        <Heart
                            className="h-[17px] w-[17px]"
                            strokeWidth={1.7}
                        />
                    </button>

                    {/* =================================================
                        BADGES
                    ================================================== */}

                    <div
                        className="
                            absolute
                            left-3
                            top-3
                            z-20
                            flex
                            flex-col
                            gap-1.5
                        "
                    >
                        {product.isNew && (
                            <Badge className="bg-[#B8874A] text-white">
                                New
                            </Badge>
                        )}

                        {product.isBestseller && (
                            <Badge className="bg-[#2E2925] text-white">
                                Bestseller
                            </Badge>
                        )}

                        {product.isCustomizable && (
                            <Badge
                                variant="outline"
                                className="
                                    border-white/70
                                    bg-white/85
                                    text-[#554B43]
                                    backdrop-blur-sm
                                "
                            >
                                Custom
                            </Badge>
                        )}
                    </div>
                </div>

                {/* =================================================
                    PRODUCT INFORMATION
                ================================================== */}

                <div
                    className="
                        relative
                        px-4
                        pb-5
                        pt-4
                        sm:px-5
                        sm:pb-6
                        sm:pt-4
                        lg:px-4
                        lg:pb-5
                    "
                >
                    {/* PRODUCT NAME */}

                    <Link
                        href={`/product/${product.slug}`}
                        className="block pr-2"
                    >
                        <h3
                            className="
                                line-clamp-2
                                min-h-[48px]
                                font-heading
                                
                                font-normal
                                leading-[1.3]
                                tracking-[-0.025em]
                                text-[#24211F]
                                transition-colors
                                group-hover:text-[#A66D32]
                                text-[20px]
                                sm:text-[22px]
                                lg:text-[22px]
                            "
                        >
                            {product.name}
                        </h3>
                    </Link>

                    {/* CATEGORY */}

                    <p
                        className="
                            mt-1
                            font-body
                            text-[11px]
                            text-[#91857A] capitalize
                        "
                    >
                        {/* {console.log(product.categories, "Product Categories")} */}
                        {product.categories[0]?.name || "Home Decor"}
                    </p>

                    {/* =================================================
                        PRICE + CART
                    ================================================== */}

                    <div
                        className="
                            mt-4
                            flex
                            items-center
                            justify-between
                            gap-3
                        "
                    >
                        {/* PRICE */}

                        {product.price > 10 ? (
                            <div
                                className="
                                    font-body
                                    text-lg
                                    font-medium
                                    tracking-[0.04em]
                                    text-[#A66D32]
                                    sm:text-xl
                                "
                            >
                                ₹ {product.price.toLocaleString()}
                            </div>
                        ) : (
                            <div
                                className="
                                    font-body
                                    text-sm
                                    font-medium
                                    text-[#A66D32]
                                "
                            >
                                View Product
                            </div>
                        )}

                        {/* CART */}

                        {/* <button
                            type="button"
                            disabled={
                                isPending ||
                                product?.stock === 0
                            }
                            onClick={handleAddToCart}
                            aria-label={`Add ${product.name} to cart`}
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-[#B77A38]
                                text-white
                                shadow-[0_6px_16px_rgba(166,109,50,0.25)]
                                transition-all
                                duration-300
                                hover:scale-105
                                hover:bg-[#9D642D]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                sm:h-11
                                sm:w-11
                            "
                        >
                            <ShoppingBag
                                className="h-[17px] w-[17px]"
                                strokeWidth={1.8}
                            />
                        </button> */}
                    </div>
                </div>
            </div>
        )
    }

    /* =========================================================
       DEFAULT PRODUCT CARD
    ========================================================= */

    return (
        <div
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-md border border-primary/10 bg-card shadow-soft",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative aspect-square overflow-hidden">
                <Link href={`/product/${product.slug}`}>
                    <ShimmerImage
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </Link>

                <div className="absolute left-3 top-3 flex flex-col gap-2">
                    {product.isNew && (
                        <Badge className="bg-accent text-accent-foreground">
                            New Arrival
                        </Badge>
                    )}

                    {product.isBestseller && (
                        <Badge className="bg-primary text-primary-foreground">
                            Bestseller
                        </Badge>
                    )}

                    {product.isCustomizable && (
                        <Badge
                            variant="outline"
                            className="bg-white/80 backdrop-blur-sm"
                        >
                            Customizable
                        </Badge>
                    )}
                </div>
            </div>

            <div className="p-1">
                <Link
                    href={`/product/${product.slug}`}
                    className="block text-center"
                >
                    <h3 className="mb-2 font-heading text-lg font-medium transition-colors group-hover:text-primary">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center justify-between">
                    {product.price > 10 && (
                        <div className="font-semibold">
                            ₹{product.price.toLocaleString()}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}