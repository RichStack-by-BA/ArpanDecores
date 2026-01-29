"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, User, HelpCircle, Phone, X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import SearchBar from "@/components/ui/SearchBar";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navigation: { name: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, navigation }: MobileMenuProps) {
    const pathname = usePathname();

    // Prevent background scrolling when open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            {/* Menu content */}
            <div className="relative z-50 w-80 h-full bg-white dark:bg-background p-5 overflow-y-auto shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-primary">Menu</h2>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-primary"
                        aria-label="Close Menu"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <SearchBar />
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-3">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "py-2 text-lg font-medium transition-colors rounded-md px-3",
                                pathname === item.href
                                    ? "text-primary bg-primary/10"
                                    : "text-foreground/80 hover:bg-muted"
                            )}
                            onClick={onClose}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Utility Links */}
                <div className="mt-6 pt-6 border-t">
                    <div className="flex flex-col space-y-3">
                        <Link
                            href="/help"
                            className="flex items-center py-2 text-foreground/80 hover:text-primary"
                            onClick={onClose}
                        >
                            <HelpCircle className="h-5 w-5 mr-3" />
                            Help Center
                        </Link>
                        <Link
                            href="/track-order"
                            className="flex items-center py-2 text-foreground/80 hover:text-primary"
                            onClick={onClose}
                        >
                            <ShoppingBag className="h-5 w-5 mr-3" />
                            Track Order
                        </Link>
                        <div className="flex items-center py-2 text-foreground/80">
                            <Phone className="h-5 w-5 mr-3" />
                            +91 98765 43210
                        </div>
                    </div>
                </div>

                {/* Action Icons */}
                <div className="mt-6 flex justify-around">
                    <Link href="/wishlist" onClick={onClose}>
                        <button className="border border-input bg-background p-2 rounded-full hover:bg-accent">
                            <Heart className="h-5 w-5" />
                            <span className="sr-only">Wishlist</span>
                        </button>
                    </Link>
                    <Link href="/account" onClick={onClose}>
                        <button className="border border-input bg-background p-2 rounded-full hover:bg-accent">
                            <User className="h-5 w-5" />
                            <span className="sr-only">Account</span>
                        </button>
                    </Link>
                    <Link href="/cart" onClick={onClose}>
                        <button className="border border-input bg-background p-2 rounded-full hover:bg-accent">
                            <ShoppingBag className="h-5 w-5" />
                            <span className="sr-only">Cart</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
