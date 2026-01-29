"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

// ---------------------------------------------
// Sheet context & provider (local state or controlled)
// ---------------------------------------------

type SheetContextValue = {
    open: boolean
    setOpen: (v: boolean) => void
    triggerRef: React.MutableRefObject<HTMLElement | null>
}

const SheetContext = React.createContext<SheetContextValue | null>(null)

function useSheetContext() {
    const ctx = React.useContext(SheetContext)
    if (!ctx) throw new Error("Sheet components must be used within <Sheet>.")
    return ctx
}

export type SheetProps = {
    children: React.ReactNode
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
}

function Sheet({ children, open: openProp, defaultOpen, onOpenChange }: SheetProps) {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(!!defaultOpen)
    const isControlled = openProp !== undefined
    const open = isControlled ? !!openProp : uncontrolledOpen
    const setOpen = React.useCallback(
        (v: boolean) => {
            if (!isControlled) setUncontrolledOpen(v)
            onOpenChange?.(v)
        },
        [isControlled, onOpenChange]
    )

    const triggerRef = React.useRef<HTMLElement | null>(null)

    // Body scroll lock while open
    React.useEffect(() => {
        if (!open) return
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = prevOverflow
        }
    }, [open])

    return (
        <SheetContext.Provider value={{ open, setOpen, triggerRef }}>
            {children}
        </SheetContext.Provider>
    )
}

// ---------------------------------------------
// Trigger (asChild or button)
// ---------------------------------------------

export type SheetTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
    children: React.ReactElement | React.ReactNode
}

const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
    ({ asChild, children, ...props }, ref) => {
        const { setOpen, triggerRef } = useSheetContext()

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            props.onClick?.(e)
            setOpen(true)
        }

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement, {
                onClick: (e: React.MouseEvent<any>) => {
                    children.props?.onClick?.(e)
                    handleClick(e as any)
                },
                ref: (node: HTMLElement) => {
                    triggerRef.current = node
                    // merge external ref if present
                    const anyRef = (children as any).ref
                    if (anyRef) {
                        if (typeof anyRef === "function") anyRef(node)
                        else (anyRef as React.MutableRefObject<HTMLElement | null>).current = node
                    }
                },
            })
        }

        return (
            <button
                ref={(node) => {
                    if (typeof ref === "function") ref(node!)
                    else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
                    if (triggerRef && 'current' in triggerRef) {
                        try {
                            (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node as unknown as HTMLElement
                        } catch {}
                    }
                }}
                type="button"
                onClick={handleClick}
                {...props}
            >
                {children}
            </button>
        )
    }
)
SheetTrigger.displayName = "SheetTrigger"

// ---------------------------------------------
// Portal (SSR-safe)
// ---------------------------------------------

function SheetPortal({ children }: { children: React.ReactNode }) {
    if (typeof window === "undefined") return null
    const { open } = useSheetContext()
    if (!open) return null
    return createPortal(children, document.body)
}

// ---------------------------------------------
// Overlay
// ---------------------------------------------

const SheetOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const { setOpen, open } = useSheetContext()
        return (
            <div
                ref={ref}
                onClick={() => setOpen(false)}
                aria-hidden
                data-state={open ? "open" : "closed"}
                className={cn(
                    "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                    className
                )}
                {...props}
            />
        )
    }
)
SheetOverlay.displayName = "SheetOverlay"

// ---------------------------------------------
// Content (Tailwind-only variants)
// ---------------------------------------------

export type SheetSide = "top" | "bottom" | "left" | "right"

function getSheetClasses(side: SheetSide = "right") {
    const base =
        "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out " +
        "data-[state=open]:animate-in data-[state=closed]:animate-out " +
        "data-[state=closed]:duration-300 data-[state=open]:duration-500 outline-none"

    const variants: Record<SheetSide, string> = {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
            "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left:
            "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
            "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
    }

    return `${base} ${variants[side]}`
}

export interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
    side?: SheetSide
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
    ({ side = "right", className, children, ...props }, ref) => {
        const { open, setOpen, triggerRef } = useSheetContext()
        const panelRef = React.useRef<HTMLDivElement | null>(null)

        // Focus handling: focus panel when opened; return focus to trigger when closed
        React.useEffect(() => {
            if (open) {
                panelRef.current?.focus({ preventScroll: true })
            }
            return () => {
                if (!open) triggerRef.current?.focus()
            }
        }, [open, triggerRef])

        // Close on Escape key
        React.useEffect(() => {
            if (!open) return
            const onKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape") setOpen(false)
            }
            window.addEventListener("keydown", onKeyDown)
            return () => window.removeEventListener("keydown", onKeyDown)
        }, [open, setOpen])

        return (
            <SheetPortal>
                <SheetOverlay />
                <div
                    role="dialog"
                    aria-modal="true"
                    data-state={open ? "open" : "closed"}
                    ref={(node) => {
                        panelRef.current = node
                        if (typeof ref === "function") ref(node as HTMLDivElement)
                        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
                    }}
                    tabIndex={-1}
                    className={cn(getSheetClasses(side), className)}
                    {...props}
                >
                    {children}
                    <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </SheetClose>
                </div>
            </SheetPortal>
        )
    }
)
SheetContent.displayName = "SheetContent"

// ---------------------------------------------
// Close (asChild or button)
// ---------------------------------------------

export type SheetCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
    children: React.ReactElement | React.ReactNode
}

const SheetClose = React.forwardRef<HTMLButtonElement, SheetCloseProps>(
    ({ asChild, children, ...props }, ref) => {
        const { setOpen } = useSheetContext()

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            props.onClick?.(e)
            setOpen(false)
        }

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement, {
                onClick: (e: React.MouseEvent<any>) => {
                    children.props?.onClick?.(e)
                    handleClick(e as any)
                },
            })
        }

        return (
            <button ref={ref} type="button" onClick={handleClick} {...props}>
                {children}
            </button>
        )
    }
)
SheetClose.displayName = "SheetClose"

// ---------------------------------------------
// Header / Footer / Title / Description (pure Tailwind)
// ---------------------------------------------

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h2 ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
    )
)
SheetTitle.displayName = "SheetTitle"

const SheetDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
    )
)
SheetDescription.displayName = "SheetDescription"

// ---------------------------------------------
// Exports
// ---------------------------------------------

export {
    Sheet,
    SheetPortal,
    SheetOverlay,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
}
