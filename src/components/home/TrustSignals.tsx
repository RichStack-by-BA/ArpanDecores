import { Shield, Sparkles } from "lucide-react"
import homeContent from "@/constants/homeContent.json"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from "react"

const iconMap = {
    box: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect width="16" height="16" x="4" y="4" rx="2" />
            <path d="M10 10h4v4h-4z" />
            <path d="m16 16 4 4" />
            <path d="m4 4 4 4" />
            <path d="m4 20 4-4" />
            <path d="m20 4-4 4" />
        </svg>
    ),
    Shield: <Shield className="h-6 w-6 text-primary" />,
    message: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
            <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
        </svg>
    ),
    Sparkles: <Sparkles className="h-6 w-6 text-primary" />
}

export default function TrustSignals() {
    const { trustSignals } = homeContent

    return (
        <section className="py-16 bg-background">
            <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {trustSignals.map((signal: { icon: string; title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; desc: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined }, i: Key | null | undefined) => (
                    <div key={i} className="flex flex-col items-center text-center p-6 rounded-md bg-card shadow-soft border border-primary/10">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            {iconMap[signal.icon as keyof typeof iconMap]}
                        </div>
                        <h3 className="font-heading font-semibold text-lg mb-2">{signal.title}</h3>
                        <p className="text-sm text-muted-foreground">{signal.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
