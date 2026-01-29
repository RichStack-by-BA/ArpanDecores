import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { X } from "lucide-react"

type LightboxProps = {
    selectedImage: string | null
    closeLightbox: () => void
    galleryImages: { id: string, src: string, alt: string, category: string }[]
}

const Lightbox: React.FC<LightboxProps> = ({ selectedImage, closeLightbox, galleryImages }) => {
    const currentImage = galleryImages.find((img) => img.id === selectedImage)

    if (!currentImage) return null

    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full h-full max-h-[80vh] flex items-center justify-center">
                <div className="relative w-full h-full">
                    <Image
                        src={currentImage.src || "/placeholder.svg"}
                        alt={currentImage.alt}
                        fill
                        className="object-contain"
                    />
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 text-white rounded-full bg-black/50 hover:bg-black/70"
                    onClick={closeLightbox}
                >
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close</span>
                </Button>
                <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                    <h3 className="font-playfair font-semibold text-xl">{currentImage.alt}</h3>
                    <p className="text-sm text-white/80">{currentImage.category}</p>
                </div>
            </div>
        </div>
    )
}

export default Lightbox
