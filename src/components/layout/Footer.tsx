import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import { footerData } from "@/constants/FooterContent"

export default function Footer() {
    const { brand, sections, policies } = footerData

    const contactSection = sections[1]

    return (
        <footer className="relative overflow-hidden bg-[#F8F4EC] text-[#2C2621]">

            {/* =========================================================
                MAIN FOOTER
            ========================================================== */}

            <div className="relative z-10 mx-auto max-w-[1500px] px-6 py-16 sm:px-8 md:px-12 lg:px-16 lg:py-20">

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-0">

                    {/* =================================================
                        BRAND
                    ================================================== */}

                    <div className="lg:pr-16">

                        <Link
                            href="/"
                            className="inline-block"
                        >
                            <div className="flex items-baseline">
                                <span className="font-heading text-[32px] font-medium tracking-[-0.04em] text-[#A96F35] sm:text-[36px]">
                                    ARPAN
                                </span>

                                <span className="ml-1 font-heading text-[32px] font-normal tracking-[-0.04em] text-[#29231E] sm:text-[36px]">
                                    DECORES
                                </span>
                            </div>
                        </Link>

                        {/* Tagline */}
                        <div className="mt-3 flex items-center gap-3">
                            <span className="font-body text-[9px] uppercase tracking-[0.38em] text-[#A96F35]">
                                Artisan Craftsmanship
                            </span>

                            <span className="h-1 w-1 rounded-full bg-[#B8874A]" />

                            <span className="font-body text-[9px] uppercase tracking-[0.38em] text-[#A96F35]">
                                Timeless Spaces
                            </span>
                        </div>

                        <p className="mt-2 max-w-[560px] font-body text-[15px] leading-7 text-[#5F5953] sm:text-[16px]">
                            {brand.description}
                        </p>

                        {/* Social icons */}
                        <div className="mt-8 flex items-center gap-4">
                            {brand.socialLinks.map(({ icon: Icon, label, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="
                                        flex
                                        h-16
                                        w-16
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-[#B8874A]/30
                                        bg-[#FBF7F0]/70
                                        text-[#A96F35]
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:border-[#B8874A]
                                        hover:bg-[#B8874A]
                                        hover:text-white
                                    "
                                >
                                    <Icon className="h-6 w-6" />
                                </Link>
                            ))}
                        </div>
                    </div>


                    {/* =================================================
                        VERTICAL DIVIDER
                    ================================================== */}

                    <div className="relative lg:border-l lg:border-[#B8874A]/30 lg:pl-16">

                        {/* Diamond divider */}
                        <span
                            aria-hidden="true"
                            className="
                                absolute
                                -left-[5px]
                                top-1/2
                                hidden
                                h-2
                                w-2
                                rotate-45
                                border
                                border-[#B8874A]
                                bg-[#F8F4EC]
                                lg:block
                            "
                        />

                        <h3 className="font-heading text-[28px] font-normal tracking-[-0.025em] text-[#29231E]">
                            {contactSection.heading}
                        </h3>

                        <div className="mt-4 h-px w-14 bg-[#A96F35]" />

                        <ul className="mt-5 space-y-2">

                            {contactSection.contacts?.map(
                                ({ icon: Icon, value }, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-4"
                                    >
                                        <span
                                            className="
                                                flex
                                                h-12
                                                w-12
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-[#EFE4D4]
                                                text-[#A96F35]
                                            "
                                        >
                                            <Icon className="h-5 w-5" />
                                        </span>

                                        <span className="pt-2 font-body text-[15px] leading-6 text-[#5F5953]">
                                            {value}
                                        </span>
                                    </li>
                                )
                            )}

                            {/* Brochure */}
                            <li className="flex items-start gap-4">
                                <a
                                    href="/brochure/ARPAN%20DECORES.pdf"
                                    download
                                    aria-label="Download Brochure"
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#EFE4D4]
                                        text-[#A96F35]
                                        transition-colors
                                        hover:bg-[#B8874A]
                                        hover:text-white
                                    "
                                >
                                    <Download className="h-5 w-5" />
                                </a>

                                <span className="pt-2 font-body text-[15px] leading-6 text-[#5F5953]">
                                    Download Brochure
                                </span>
                            </li>

                        </ul>
                    </div>


                    {/* =================================================
                        CTA
                    ================================================== */}

                    <div className="relative lg:border-l lg:border-[#B8874A]/30 lg:pl-16">

                        {/* Diamond divider */}
                        <span
                            aria-hidden="true"
                            className="
                                absolute
                                -left-[5px]
                                top-1/2
                                hidden
                                h-2
                                w-2
                                rotate-45
                                border
                                border-[#B8874A]
                                bg-[#F8F4EC]
                                lg:block
                            "
                        />

                        <h3 className="font-heading text-[28px] font-normal tracking-[-0.025em] text-[#29231E]">
                            Let’s Create Together
                        </h3>

                        <div className="mt-4 h-px w-14 bg-[#A96F35]" />

                        <p className="mt-7 max-w-[360px] font-body text-[16px] leading-7 text-[#5F5953]">
                            Have something special in mind?
                            <br />
                            We’d love to create it with you.
                        </p>

                        <Link
                            href="/contact"
                            className="
                                group
                                mt-8
                                inline-flex
                                w-full
                                max-w-[310px]
                                items-center
                                justify-between
                                rounded-full
                                bg-[#A96F35]
                                px-8
                                py-5
                                font-body
                                text-[13px]
                                font-medium
                                uppercase
                                tracking-[0.16em]
                                text-white
                                shadow-[0_10px_25px_rgba(169,111,53,0.18)]
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:bg-[#8F5D2C]
                                hover:shadow-[0_14px_30px_rgba(169,111,53,0.25)]
                            "
                        >
                            <span>Get In Touch</span>

                            <ArrowRight
                                className="
                                    h-5
                                    w-5
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                "
                            />
                        </Link>
                    </div>

                </div>
            </div>


            {/* =========================================================
                BOTTOM BAR
            ========================================================== */}

            <div className="relative z-10 border-t border-[#B8874A]/25">

                <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-6 py-7 sm:px-8 md:px-12 lg:flex-row lg:items-center lg:justify-between lg:px-16">

                    <p className="font-body text-sm text-[#66605A]">
                        &copy; {new Date().getFullYear()} Arpan Decores. Crafted with care.
                    </p>

                    <div className="flex items-center gap-5 font-body text-sm text-[#66605A]">
                        {policies.map(({ label, href }, index) => (
                            <div
                                key={label}
                                className="flex items-center gap-5"
                            >
                                <Link
                                    href={href}
                                    className="transition-colors hover:text-[#A96F35]"
                                >
                                    {label}
                                </Link>

                                {index < policies.length - 1 && (
                                    <span
                                        aria-hidden="true"
                                        className="h-5 w-px bg-[#B8874A]/30"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </footer>
    )
}