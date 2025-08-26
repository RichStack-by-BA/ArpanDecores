import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

type CategoryCardProps = {
    id: string;
    name: string;
    description: string;
    image: string;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, description, image }) => {
    return (
        <Link
            key={id}
            href={`/categories/${id}`}
            className="group relative overflow-hidden rounded-2xl shadow-elegant card-hover"
        >
            <div className="aspect-[4/5] relative">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-playfair font-bold text-2xl mb-2">{name}</h3>
                    <p className="text-white/80 mb-4 max-w-xs">{description}</p>
                    <div className="flex items-center font-medium">
                        Shop Now
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;
