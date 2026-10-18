"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ProductCard from "@/components/shop/ProductCard"
import homeContent from "@/constants/homeContent.json"

export default function FeaturedProducts({ products }: any) {
    const { featuredProducts: fp } = homeContent

    return (
        <section
            className="
                relative
                overflow-hidden
                bg-[#F8F3EA]
                py-16
                sm:py-8
                lg:py-8
            "
        >
            {/* =====================================================
                BACKGROUND DECORATION
            ====================================================== */}

            

            {/* =====================================================
                CONTENT
            ====================================================== */}

            <div className="container-custom relative z-10">

                {/* HEADER */}
                <div
                    className="
                        mx-auto
                        mb-10
                        max-w-4xl
                        text-center
                        sm:mb-12
                        lg:mb-14
                    "
                >
                    {/* EYEBROW */}
                    <div
                        className="
                            mb-4
                            flex
                            items-center
                            justify-center
                            gap-5
                        "
                    >
                        <span className="h-px w-12 bg-[#B8874A]/65" />

                        <span
                            className="
                                font-body
                                text-[9px]
                                font-medium
                                uppercase
                                tracking-[0.42em]
                                text-[#A86F34]
                                sm:text-[10px]
                            "
                        >
                            Our Collection
                        </span>

                        <span className="h-px w-12 bg-[#B8874A]/65" />
                    </div>

                    {/* TITLE */}
                    <h2
                        className="
                            font-heading
                            text-[38px]
                            font-normal
                            leading-[0.95]
                            tracking-[-0.035em]
                            text-[#24211F]
                            sm:text-5xl
                            lg:text-[56px]
                        "
                    >
                        {fp.title}
                    </h2>

                    {/* DESCRIPTION */}
                    <p
                        className="
                            mx-auto
                            mt-3
                            max-w-2xl
                            font-body
                            text-sm
                            leading-7
                            text-[#66615B]
                            sm:text-base
                        "
                    >
                        {fp.description}
                    </p>
                </div>

                {/* =================================================
                    PRODUCTS
                ================================================== */}

                <div
                    className="
                        flex
                        flex-wrap
                        justify-center
                        gap-4
                        sm:gap-5
                        lg:gap-6
                    "
                >
                    {products.map((product: any, index: number) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            variant="collection"
                            className="w-[calc(50%-8px)] lg:w-[calc(25%-18px)]"
                        />
                    ))}
                </div>

                {/* =================================================
                    VIEW ALL PRODUCTS
                ================================================== */}

                <div
                    className="
                        mt-5
                        flex
                        items-center
                        justify-center
                        gap-4
                        sm:mt-5
                    "
                >
                    {/* <span
                        className="
                            hidden
                            h-px
                            w-16
                            bg-[#B8874A]/60
                            sm:block
                        "
                    /> */}

                    <Link
                        href="/shop"
                        className="
                            group
                            inline-flex
                            items-center
                            gap-5
                            rounded-full
                            border
                            border-[#B8874A]
                            bg-transparent
                            px-7
                            py-3.5
                            font-body
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.25em]
                            text-[#875525]
                            transition-all
                            duration-300
                            hover:bg-[#B8874A]
                            hover:text-white
                            sm:px-9
                            sm:py-4
                        "
                    >
                        <span>View All Products</span>

                        <ArrowRight
                            className="
                                h-4
                                w-4
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                            "
                        />
                    </Link>

                    {/* <span
                        className="
                            hidden
                            h-px
                            w-16
                            bg-[#B8874A]/60
                            sm:block
                        "
                    /> */}
                </div>

            </div>
        </section>
    )
}