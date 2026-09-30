import type React from "react"
import type { Metadata } from "next"
import "@/styles/globals.css"
import ClientLayout from "@/components/layout"
import Providers from "@/components/providers/Providers"
import { StoreProvider } from "@/components/providers/StoreProvider"
import Script from "next/script"
import { Cormorant_Garamond, Lato } from "next/font/google"

const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", display: "swap" })
const lato = Lato({ subsets: ["latin"], variable: "--font-lato", display: "swap", weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "Arpan Decores | Objects with a story",
  description:
    "Discover considered home decor and handcrafted objects made with premium materials and artisan craftsmanship.",
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
         <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
        <Providers>
          <StoreProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
          </StoreProvider>
        </Providers>
      </body>
    </html>
  )
}
