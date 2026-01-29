import Link from "next/link"
import { cn } from "@/lib/utils"

type HeaderLinkProps = {
    href: string
    children: React.ReactNode
    className?: string
    isActive?: boolean
    variant?: "default" | "button"
}

export const HeaderLink = ({
    href,
    children,
    className = "",
    isActive = false,
    variant = "default",
}: HeaderLinkProps) => {
    const baseStyles = "transition-colors hover:text-primary"

    const variantStyles = {
        default: cn(
            "font-body text-sm uppercase tracking-wider",
            isActive ? "text-primary font-bold" : "text-foreground/80",
            className
        ),
        button: cn(
            "text-secondary hover:text-accent text-sm",
            className
        )
    }

    return (
        <Link href={href} className={cn(baseStyles, variantStyles[variant])}>
            {children}
        </Link>
    )
}