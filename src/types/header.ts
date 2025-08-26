// types/header.ts
export type NavigationItem = {
  name: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  children?: NavigationItem[]
}

export type HeaderProps = {
  currentPath?: string
  logo: {
    primaryText: string
    secondaryText: string
    href?: string
  }
  announcementBar?: {
    show?: boolean
    contact?: {
      phone: string
      label: string
    }
    shippingInfo?: string
    links?: {
      text: string
      href: string
    }[]
  }
  navigation: NavigationItem[]
  ctaItems?: {
    search?: boolean
    wishlist?: boolean
    account?: boolean
    cart?: boolean
  }
  className?: string
}