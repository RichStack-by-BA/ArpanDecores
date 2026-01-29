
import type React from "react"
import { Cormorant_Garamond, Lato } from "next/font/google"
import Header from "@/components/layout/header/Header"
import Footer from "@/components/layout/Footer"
import Toast from "@/components/ui/Toast"
import "@/styles/globals.css"
import { getServerCookie } from "@/lib/cookies"
import { getUserDetails } from "@/lib/api/auth"

// Import fonts
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

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
    const token = await  getServerCookie("token") ||''
    const userDetails:any = await getUserDetails()
    
    return (
        <div className={`${cormorant.variable} ${lato.variable} font-body bg-background`}>
            <div className="flex min-h-screen flex-col">
                <Header token={token} user={userDetails?.data?.user}/>
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
            <Toast />
        </div>
    )
}
