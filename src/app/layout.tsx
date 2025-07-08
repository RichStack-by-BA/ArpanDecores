import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Lato } from "next/font/google"
import "@/styles/globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Arpan Decores | Artisan Crafted Gifts & Home Decor",
  description:
    "Discover exquisite handcrafted gifts and home decor made with premium materials and artisan craftsmanship.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${lato.variable} font-body bg-background`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        {/* <Toaster /> */}
      </body>
    </html>
  )
}
