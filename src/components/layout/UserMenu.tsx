"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { User, Settings, ShoppingBag, Heart, LogOut, ChevronDown } from "lucide-react"
import { Avatar } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { useAuthMutations } from "@/hooks/useAuthMutations"

export default function UserMenu({ user }: { user: any }) {
  const { signOut } = useAuthMutations()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  if (!user) return null

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 hover:bg-primary/10"
      >
        <Avatar
          fallback={getInitials(user.firstName, user.lastName)}
          className="h-8 w-8 bg-primary text-primary-foreground text-sm"
        />
        <span className="hidden md:inline font-medium">{user.firstName}</span>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </Button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-md border bg-white shadow-lg ring-1 ring-black/5 z-50 animate-fade-in"
        >
          <div className="px-3 py-2 border-b">
            <p className="text-sm font-medium">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          <div className="py-1">
            <MenuItem href="/account" icon={<User className="h-4 w-4" />}>
              My Account
            </MenuItem>
            <MenuItem href="/orders" icon={<ShoppingBag className="h-4 w-4" />}>
              My Orders
            </MenuItem>
            <MenuItem href="/wishlist" icon={<Heart className="h-4 w-4" />}>
              Wishlist
            </MenuItem>
            <MenuItem href="/account/settings" icon={<Settings className="h-4 w-4" />}>
              Settings
            </MenuItem>

            <hr className="my-1 border-gray-200" />

            <button
              onClick={signOut}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const MenuItem = ({
  href,
  icon,
  children,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}) => (
  <Link
    href={href}
    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
  >
    {icon}
    {children}
  </Link>
)
