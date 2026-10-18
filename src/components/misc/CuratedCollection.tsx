import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CuratedCollectionProps {
    title: string
    description: string
    image: string
    href: string
    className?: string
    slug: string
    index?: number
}

export default function CuratedCollection({
    title,
    description,
    image,
    href,
    className,
    slug,
    index = 0,
}: CuratedCollectionProps) {
    const collectionNumber = String(index + 1).padStart(2, "0")

    return (
        <Link
            href={`/categories/${slug}`}
            className={cn(
                "group relative block",
                "w-[calc(50%-8px)]",
                "lg:w-[calc(25%-18px)]",
                "overflow-hidden",
                "rounded-t-[150px]",
                "border border-[#B8874A]/20",
                "bg-[#FBF7F0]",
                "shadow-[0_8px_25px_rgba(82,58,35,0.035)]",
                "transition-all duration-500",
                "hover:-translate-y-1",
                "hover:shadow-[0_18px_40px_rgba(82,58,35,0.10)]",
                className
            )}
        >
            {/* IMAGE */}
            <div
                className="
                    relative
                    mx-[5px]
                    mt-[5px]
                    
                    overflow-hidden
                    rounded-t-[150px]
                    sm:aspect-[1.2]
                    lg:aspect-[1.2]
                    aspect-[1.2]
                "
            >
                <Image
                    src={image || "/placeholder.svg"}
                    alt={title}
                    fill
                    sizes="
                        (max-width: 640px) 46vw,
                        (max-width: 1024px) 30vw,
                        24vw
                    "
                    className="
                        object-cover
                        transition-transform
                        duration-700
                        ease-[cubic-bezier(.2,.7,.2,1)]
                        group-hover:scale-[1.045]
                    "
                />

                {/* Image warmth */}
                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#5B3B21]/10
                        via-transparent
                        to-[#FFF8EC]/5
                    "
                />
            </div>

            {/* CONTENT */}
            <div
                className="
                    relative
                    min-h-[180px]
                    p-3
                    sm:min-h-[180px]
                    sm:p-3
                    lg:min-h-[180px]
                    lg:p-3
                "
            >
                {/* NUMBER */}
                <div
                    className="
                        mb-2
                        flex
                        items-center
                        gap-2
                        font-body
                        text-[10px]
                        font-medium
                        tracking-[0.12em]
                        text-[#66615B]
                    "
                >
                    <span>{collectionNumber}</span>

                    <span className="h-px w-7 bg-[#B8874A]/70" />
                </div>

                {/* TITLE */}
                <h3
                    className="
                        max-w-[240px]
                        font-heading
                        text-[24px]
                        font-normal
                        leading-[0.98]
                        tracking-[-0.025em]
                        text-[#24211F]
                        sm:text-[26px]
                        lg:text-[27px]
                    "
                >
                    {title}
                </h3>

                {/* DESCRIPTION */}
                <p
                    className="
                        mt-2
                        text-justify
                        font-body
                        text-[10px]
                        leading-[1.2]
                        text-[#68635D]
                        sm:text-[13px]
                        lg:text-[13px]
                    "
                >
                    {description}
                </p>

                {/* ARROW */}
                <div
                    className="
                        hidden
                        absolute
                        bottom-3
                        right-5
                        md:flex
                        h-5
                        w-5
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#B8874A]
                        text-[#A66D32]
                        transition-all
                        duration-300
                        sm:bottom-[0.5rem]
                        sm:right-6
                        sm:h-11
                        sm:w-11
                        lg:right-3
                        group-hover:bg-[#B8874A]
                        group-hover:text-white
                    "
                >
                    <ArrowUpRight
                        className="
                            h-4
                            w-4
                            transition-transform
                            duration-300
                            group-hover:translate-x-0.5
                            group-hover:-translate-y-0.5
                        "
                    />
                </div>
            </div>
        </Link>
    )
}