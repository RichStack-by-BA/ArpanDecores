import type React from "react"
import type { Metadata } from "next"
import "@/styles/globals.css"
import ClientLayout from "@/components/layout"
import Providers from "@/components/providers/Providers"
import { StoreProvider } from "@/components/providers/StoreProvider"
import Script from "next/script"
import NextTopLoader from "nextjs-toploader"
import { Bodoni_Moda, Lato } from "next/font/google"

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni-moda",
  display: "swap",
  weight: ["400", "500"],
})

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
  weight: ["300", "400", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://arpandecores.in"),
  title: {
    default: "Arpan Decores | Artisan Crafted Gifts & Home Decor",
    template: "%s | Arpan Decores",
  },
  description:
    "Discover exquisite handcrafted gifts and home decor made with premium materials and artisan craftsmanship.",
  applicationName: "Arpan Decores",
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    siteName: "Arpan Decores",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${bodoniModa.variable}
          ${lato.variable}
          font-body
          bg-background
        `}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Arpan Decores",
              url:
                process.env.NEXT_PUBLIC_SITE_URL ||
                "https://arpandecores.in",
            }),
          }}
        />

        <NextTopLoader
          color="hsl(36, 34%, 52%)"
          height={3}
          showSpinner={true}
        />

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
