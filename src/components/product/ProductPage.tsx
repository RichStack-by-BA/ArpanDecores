'use client'
import React, { useState } from 'react'
import ProductImageGallery from './ProductImageGallery'
import { Star } from 'lucide-react'
import ProductVariantSelector from './ProductVariantsSelector'
import AddToCartButton from '../shop/AddToCard'
import { Button } from '../ui/Button'
import Accordion from '../ui/Accordian'



const ProductDetails = ({ product }: any) => {

    const [selectedVariant, setSelectedVariant] = useState<any>(product.isVariant ? product.variants[0] : { name: 'Default', images: product.images, stock: product.stock })
    const [productImages, setProductImages] = useState<string[]>(product.isVariant ? product.variants[0].images : product.images)

    const handleVariantChange = (variant: any) => {
        setSelectedVariant(variant)
        setProductImages(variant.images)
    }

    return (
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="md:sticky top-24 self-start">
                <ProductImageGallery images={productImages} />
            </div>

            <div className="space-y-6">
                <div>
                    <h1 className="heading-lg mb-2 capitalize">{product.name}</h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            {[...Array(product.rating)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={i < 4 ? "h-5 w-5 fill-primary text-primary" : "h-5 w-5 fill-muted text-muted"}
                                />
                            ))}
                            <span className="ml-2 text-sm text-muted-foreground">
                                ({product.totalReviews} reviews)
                            </span>
                        </div>
                    </div>
                </div>

                {
                    product.price === product.discountPrice ? (
                        <div className="text-2xl font-bold">
                            ₹ {product.price.toLocaleString()}
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className=" text-3xl font-bold text-gray-500 line-through">
                                ₹ {product.price.toLocaleString()}
                            </div>
                            <div className="text-3xl font-bold text-green-600">
                                ₹ {product.discountPrice.toLocaleString()}
                            </div>
                            <div className="text-xl font-semibold text-red-600">
                                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                            </div>
                        </div>
                    )
                }
                {product.isVariant && <ProductVariantSelector variants={product.variants} onVariantChange={handleVariantChange} />}
                <div className="space-y-4">

                    {!product.isVariant &&
                        product.stock > 0 ? (
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded-full bg-green-500" />
                                <span className="text-sm font-medium text-green-600">In Stock</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded-full bg-red-500" />
                                <span className="text-sm font-medium text-red-600">Out Of Stock</span>
                            </div>
                        )
                    }

                    <div className="flex flex-col sm:flex-row gap-4">
                        <AddToCartButton product={product} />
                        <Button variant="outline" className="btn-outline">Add to Wishlist</Button>
                    </div>
                </div>

                <Accordion
                    items={[
                        { title: "Description", content: product.description, id: "1" },
                        { title: "Product Details", content: product.specifications, id: "2" },
                        { title: "Policies", content: product.policy.content, id: "3" },
                    ]}
                    type="single"
                />
            </div>
        </div>

    )
}

export default ProductDetails