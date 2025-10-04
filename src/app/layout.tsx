import type React from "react"
import type { Metadata } from "next"
import "@/styles/globals.css"
import ClientLayout from "@/components/layout"
import Providers from "@/components/Providers"

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
      <body className="font-body bg-background">
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  )
}
