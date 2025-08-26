"use client"

import { useState } from "react"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import CategoryFilters from "@/components/categories/CategoryFilter"
import GalleryGrid from "@/components/gallery/GalleryGrid"
import Lightbox from "@/components/gallery/LightBox"
import shopContent from '@/constants/shopContent.json'

export default function GalleryPage() {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const filteredImages =
        selectedCategory === "All" ? shopContent.galleryImages : shopContent.galleryImages.filter((img) => img.category === selectedCategory)

    const openLightbox = (imageId: string) => {
        setSelectedImage(imageId)
        document.body.style.overflow = "hidden"
    }

    const closeLightbox = () => {
        setSelectedImage(null)
        document.body.style.overflow = "auto"
    }

    return (
        <div className="container-custom py-8 md:py-12">
            {/* Breadcrumbs */}
            {/* <Breadcrumbs current="Gallery" /> */}

            <div className="text-center mb-12">
                <h1 className="heading-lg mb-4">Our Gallery</h1>
                <p className="body-md text-muted-foreground max-w-2xl mx-auto">
                    Explore our collection of handcrafted gifts and decor items that have brought joy to our customers
                </p>
            </div>

            {/* Category filters */}
            <CategoryFilters
                categories={shopContent.categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />

            {/* Gallery grid */}
            <GalleryGrid images={filteredImages} onImageClick={openLightbox} />

            {/* Lightbox */}
            <Lightbox selectedImage={selectedImage} closeLightbox={closeLightbox} galleryImages={shopContent.galleryImages} />
        </div>
    )
}
