import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { footerData } from "@/constants/FooterContent";
import { Button } from "../ui/Button";

export default function Footer() {
    const { brand, sections, policies } = footerData;

    return (
        <footer className="bg-secondary/5 border-t border-primary/10">
            <div className="max-w-screen-xl mx-auto px-4 py-12 md:py-16">
                <div className="bg-white dark:bg-card rounded-md p-6 md:p-8 mb-12 shadow-sm border border-primary/10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="md:max-w-md">
                            <h3 className="text-xl md:text-2xl font-semibold mb-2">
                                Join Our Artisan Community
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Subscribe for exclusive offers, artisan stories, and early access to new collections.
                            </p>
                        </div>
                        <form className="flex flex-col sm:flex-row gap-3 md:max-w-md w-full">
                            <input
                                type="email"
                                required
                                placeholder="Your email address"
                                className="w-full flex-1 rounded-md border border-primary/20 px-4 py-2 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition"
                            />
                            <Button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-yellow-600 to-yellow-400 text-white shadow-md hover:shadow-lg transition"
                            >
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Info */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <div className="flex items-center">
                                <span className="text-2xl font-bold text-primary tracking-wide">ARPAN</span>
                                <span className="text-2xl font-light text-secondary tracking-wide ml-1">DECORES</span>
                            </div>
                        </Link>
                        <p className="text-sm text-muted-foreground">{brand.description}</p>
                        <div className="flex space-x-4">
                            {brand.socialLinks.map(({ icon: Icon, label, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="p-2 rounded-md hover:bg-primary/10 transition"
                                >
                                    <Icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Sections */}
                    {sections.slice(0, 2).map((section) => (
                        <div key={section.heading}>
                            <h4 className="font-semibold text-lg mb-4">{section.heading}</h4>
                            <ul className="space-y-2">
                                {section.links?.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary flex items-center transition-colors"
                                        >
                                            <ArrowRight className="h-3 w-3 mr-2" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">{sections[2].heading}</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            {sections[2].contacts?.map(({ icon: Icon, value }, i) => (
                                <li key={i} className="flex items-start">
                                    <Icon className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                                    <span>{value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-12 pt-6 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Arpan Decores. Crafted with care.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        {policies.map(({ label, href }) => (
                            <Link key={label} href={href} className="hover:text-primary transition-colors">
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
