// @/data/footer-data.ts
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  LucideIcon,
} from "lucide-react";
import { ReactNode } from "react";

type SocialLink = {
  icon: LucideIcon;
  label: string;
  href: string;
};

type FooterLink = {
  label: string;
  href: string;
};

type ContactItem = {
  icon: LucideIcon;
  value: ReactNode;
};

export interface FooterSection {
  heading: string;
  links?: FooterLink[];
  contacts?: ContactItem[];
}

export interface FooterData {
  brand: {
    name: string;
    description: string;
    socialLinks: SocialLink[];
  };
  sections: FooterSection[];
  policies: FooterLink[];
}

export const footerData: FooterData = {
  brand: {
    name: "ARPAN DECORES",
    description:
      "Exquisite handcrafted gifts and home decor created with premium materials and artisan craftsmanship.",
    socialLinks: [
      { icon: Facebook, label: "Facebook", href: "#" },
      { icon: Instagram, label: "Instagram", href: "#" },
      { icon: Twitter, label: "Twitter", href: "#" },
    ],
  },
  sections: [
    {
      heading: "Collections",
      links: [
        { label: "All Products", href: "/shop" },
        { label: "Festive Treasures", href: "/categories/festive" },
        { label: "Wedding Elegance", href: "/categories/wedding" },
        { label: "Bespoke Creations", href: "/categories/custom" },
        { label: "Gallery", href: "/gallery" },
      ],
    },
    {
      heading: "Customer Care",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "FAQs", href: "/faq" },
        { label: "Shipping & Returns", href: "/shipping" },
        { label: "Care Guide", href: "/care-guide" },
        { label: "Sustainability", href: "/sustainability" },
      ],
    },
    {
      heading: "Visit Our Atelier",
      contacts: [
        {
          icon: MapPin,
          value: (
            <>
              Block 18 Plot, 11, Nehru Nagar East,
              <br />
              Bhilai, Chhattisgarh, 490020
            </>
          ),
        },
        {
          icon: Phone,
          value: "+91 7587144408",
        },
        {
          icon: Mail,
          value: "arpandecores@gmail.com",
        },
      ],
    },
  ],
  policies: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Cookies", href: "/cookies" },
  ],
};
