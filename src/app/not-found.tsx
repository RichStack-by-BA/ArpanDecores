import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { AlertCircle, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-12 w-12 text-primary" />
          </div>
          <h1 className="heading-xl mb-2">404</h1>
          <p className="text-muted-foreground text-lg">Page Not Found</p>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-muted-foreground mb-2">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-muted-foreground text-sm">
            Let's get you back to exploring our beautiful collection of handcrafted gifts and home decor.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="bg-brass-gradient text-white shadow-brass hover:shadow-brass-lg w-full sm:w-auto">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              <Search className="h-4 w-4 mr-2" />
              Browse Shop
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Popular Pages</p>
          <div className="flex flex-col gap-2">
            <Link href="/shop" className="text-primary hover:text-primary/80 text-sm font-medium">
              Shop All Products
            </Link>
            <Link href="/categories" className="text-primary hover:text-primary/80 text-sm font-medium">
              Browse Categories
            </Link>
            <Link href="/contact" className="text-primary hover:text-primary/80 text-sm font-medium">
              Contact Us
            </Link>
            <Link href="/about" className="text-primary hover:text-primary/80 text-sm font-medium">
              About Arpan Decores
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
