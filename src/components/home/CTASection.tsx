import Image from "next/image"
import { Button } from "@/components/ui/Button"
import homeContent from "@/constants/homeContent.json"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from "react"

export default function CTASection() {
  const { cta } = homeContent

  return (
    <section className="py-16 bg-secondary/10 relative">
      <div className="absolute inset-0 opacity-20">
        <Image src={cta.image} alt="Background" fill className="object-cover" />
      </div>
      <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="heading-lg mb-6">{cta.title}</h2>
        <p className="body-lg mb-8 max-w-2xl mx-auto">{cta.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {cta.buttons.map((btn: { variant: string; label: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined }, i: Key | null | undefined) => (
            <Button
              key={i}
              size="lg"
              variant={btn.variant === "outline" ? "outline" : undefined}
              className={btn.variant === "primary" ? "bg-brass-gradient text-white shadow-brass hover:shadow-brass-lg" : ""}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
