"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, ShoppingBag, Heart, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
// import { useCart } from "@/components/cart-provider"
import MobileMenu from "@/components/layout/MobileMenu"
import SearchBar from "@/components/ui/SearchBar"
import { navigation } from "@/constants/HomeContent"


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const pathname = usePathname()
  //   const { cartItems } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-secondary/10 py-2 hidden md:block">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Phone className="h-3 w-3 mr-1 text-accent" />
                <span className="text-secondary">Artisan Support: +91 98765 43210</span>
              </div>
              <div className="hidden lg:block text-muted-foreground">Free shipping on orders over ₹1999</div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <Link href="/sustainability" className="text-secondary hover:text-accent transition-colors">
                Our Sustainability Pledge
              </Link>
              <Link href="/track-order" className="text-secondary hover:text-accent transition-colors">
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 w-full z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-soft py-2"
            : "bg-background py-4 border-b border-primary/10",
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-3xl font-heading font-bold text-primary tracking-wide">ARPAN</span>
              <span className="text-3xl font-heading font-light text-secondary tracking-wide ml-1">DECORES</span>
            </Link>

            {/* Search bar - desktop */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <SearchBar />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "font-body text-sm uppercase tracking-wider transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary font-bold" : "text-foreground/80",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-md hover:bg-primary/10"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>

              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="hidden md:flex relative rounded-md hover:bg-primary/10">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Wishlist</span>
                </Button>
              </Link>

              <Link href="/account">
                <Button variant="ghost" size="icon" className="hidden md:flex rounded-md hover:bg-primary/10">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              </Link>

              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative rounded-md hover:bg-primary/10">
                  <ShoppingBag className="h-5 w-5" />
                  {/* {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartItems.length}
                    </span>
                  )} */}
                  <span className="sr-only">Cart</span>
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-md hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile search bar */}
          {showSearch && (
            <div className="pb-4 md:hidden">
              <SearchBar />
            </div>
          )}
        </div>
      </header>

      {/* Mobile menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} navigation={navigation} />
    </>
  )
}
