"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, ShoppingBag, Heart, User, Phone, LogOut } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
// import { useCart } from "@/components/cart-provider"
import MobileMenu from "@/components/layout/MobileMenu"
import SearchBar from "@/components/ui/SearchBar"
import { navigation } from "@/constants/HomeContent"
import { useAppSelector } from "@/store/hooks"
import { AuthModal } from "@/components/auth/AuthModal"
import UserMenu from "../UserMenu"
import { setCredentials } from "@/store/slices/authSlice"
import { useDispatch } from "react-redux"
import { selectCartCount } from "@/store/slices/cartSlice"
import { closeLoginModal, openLoginModal } from "@/store/slices/UISlice"

export default function Header({token,user}: {token: string,user:any}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const pathname = usePathname()

  const {loginModalOpen} = useAppSelector((state) => state.UIState)

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
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setCredentials({user,token}))
  }, [token])

  const cartCount = useAppSelector(selectCartCount)

  const handleLoginModalOpen = (isOpen: boolean) => {
    if(isOpen)
      dispatch(openLoginModal())
    else
      dispatch(closeLoginModal())
  }

  return (
    <>
      {/* <div className="bg-secondary/10 py-2 hidden md:block">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Phone className="h-3 w-3 mr-1 text-accent" />
                <span className="text-secondary">Artisan Support: +91 7587144408</span>
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
      </div> */}

      {/* Main header */}
      <header
        className={cn(
            "sticky top-0 z-50 w-full border-b border-primary/10 transition-all duration-500",
          isScrolled
            ? "bg-background/95 py-2 shadow-soft backdrop-blur-xl"
            : "bg-[#f8f4ee]/95 py-4 backdrop-blur-md",
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="font-heading text-[1.55rem] font-semibold tracking-[0.04em] text-primary">ARPAN</span>
              <span className="ml-1 font-heading text-[1.55rem] font-light tracking-[0.04em] text-secondary">DECORES</span>
            </Link>

            {/* Search bar - desktop */}
            {/* <div className="hidden md:block flex-1 max-w-md mx-8">
              <SearchBar />
            </div> */}

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "font-body text-[0.72rem] uppercase tracking-[0.04em] transition-colors hover:text-primary",
                    pathname === item.href ? "border-b-2 border-primary pb-5 font-semibold text-foreground" : "text-foreground/80",
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

               {/* <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="hidden md:flex relative rounded-md hover:bg-primary/10">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Wishlist</span>
                </Button>
              </Link>  */}

              {token && user ? (
                <div className="hidden md:flex items-center gap-2">
                   <UserMenu user={user}/>
                </div>
              ) : (

                  <Button onClick={() => handleLoginModalOpen(true)} variant="ghost" size="icon" className="hidden md:flex rounded-md hover:bg-primary/10">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Button>
              )} 

               <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative rounded-md hover:bg-primary/10">
                  <ShoppingBag className="h-5 w-5" />
                   {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
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

      {loginModalOpen && <AuthModal isOpen={loginModalOpen} onClose={() => handleLoginModalOpen(false)} />}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} navigation={navigation} />
    </>
  )
}
