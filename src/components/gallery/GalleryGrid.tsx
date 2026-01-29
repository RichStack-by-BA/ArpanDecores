import Image from "next/image"

type GalleryGridProps = {
    images: { id: string, src: string, alt: string, category: string }[]
    onImageClick: (imageId: string) => void
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, onImageClick }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
                <div
                    key={image.id}
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() => onImageClick(image.id)}
                >
                    <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="text-white text-center p-4">
                            <h3 className="font-playfair font-semibold text-lg">{image.alt}</h3>
                            <p className="text-sm text-white/80">{image.category}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default GalleryGrid
