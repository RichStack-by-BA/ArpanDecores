export const featuredProducts = [
    {
        id: "1",
        name: "Personalized Wooden Name Plate",
        price: 1299,
        image: "/images/products/wooden-nameplate.jpg",
        category: "Home Decor",
        isCustomizable: true,
        isBestseller: true,
    },
    {
        id: "2",
        name: "Brass Photo Frame",
        price: 1899,
        image: "/images/products/brass-photo-frame.jpg",
        category: "Photo Frames",
        isCustomizable: true,
    },
    {
        id: "3",
        name: "Personalized Metal Keychain",
        price: 599,
        image: "/images/products/personalized-keychain.jpg",
        category: "Keychains",
        isNew: true,
        isCustomizable: true,
    },
    {
        id: "4",
        name: "Wedding Gift Box Set",
        price: 3999,
        image: "/images/products/wedding-gift-box.jpg",
        category: "Gift Sets",
        isBestseller: true,
    },
]

export const allProducts = [
    ...featuredProducts,
    {
        id: "5",
        name: "Wooden Wall Art",
        price: 2299,
        image: "/images/products/wooden-wall-art.jpg",
        category: "Wall Art",
        isCustomizable: true,
    },
    {
        id: "6",
        name: "Decorative Ceramic Vase",
        price: 1599,
        image: "/images/products/decorative-vase.jpg",
        category: "Home Decor",
        isNew: true,
    },
    {
        id: "7",
        name: "Leather Bound Journal",
        price: 899,
        image: "/images/products/leather-journal.jpg",
        category: "Stationery",
        isCustomizable: true,
    },
    {
        id: "8",
        name: "Handcrafted Ceramic Bowls",
        price: 1299,
        image: "/images/products/ceramic-bowls.jpg",
        category: "Home Decor",
        isBestseller: true,
    },
    {
        id: "9",
        name: "Custom Cutting Board",
        price: 1799,
        image: "/images/products/custom-cutting-board.jpg",
        category: "Kitchen",
        isCustomizable: true,
        isNew: true,
    },
    {
        id: "10",
        name: "Brass Candle Holders",
        price: 2499,
        image: "/images/products/brass-candle-holders.jpg",
        category: "Home Decor",
        isCustomizable: true,
    },
    {
        id: "11",
        name: "Wooden Jewelry Box",
        price: 2199,
        image: "/images/products/wooden-jewelry-box.jpg",
        category: "Storage",
        isCustomizable: true,
    },
    {
        id: "12",
        name: "Anniversary Gift Hamper",
        price: 3499,
        image: "/images/products/wedding-gift-box.jpg",
        category: "Gift Sets",
        isCustomizable: true,
    },
]

export const categories = [
    {
        id: "festive",
        name: "Festive Treasures",
        description: "Celebrate special occasions with our festive collection",
        image: "/images/collections/festive-collection.jpg",
    },
    {
        id: "wedding",
        name: "Wedding Elegance",
        description: "Timeless gifts and decor for the perfect wedding",
        image: "/images/collections/wedding-collection.jpg",
    },
    {
        id: "custom",
        name: "Bespoke Creations",
        description: "Personalized gifts crafted to your specifications",
        image: "/images/collections/custom-collection.jpg",
    },
    {
        id: "home-decor",
        name: "Home Decor",
        description: "Beautiful pieces to enhance your living space",
        image: "/images/products/wooden-nameplate.jpg",
    },
    {
        id: "photo-frames",
        name: "Photo Frames",
        description: "Preserve your precious memories in style",
        image: "/images/products/brass-photo-frame.jpg",
    },
    {
        id: "gift-sets",
        name: "Gift Sets",
        description: "Curated gift boxes for every occasion",
        image: "/images/products/wedding-gift-box.jpg",
    },
]


export const craftSteps = [
    {
        id: 1,
        title: "Material Selection",
        description:
            "We carefully select premium materials from sustainable sources, ensuring each piece starts with the finest foundation.",
        image: "/images/craft/materials-selection.jpg",
    },
    {
        id: 2,
        title: "Artisan Design",
        description:
            "Our skilled artisans sketch and plan each piece, blending traditional techniques with contemporary aesthetics.",
        image: "/images/craft/artisan-design.jpg",
    },
    {
        id: 3,
        title: "Meticulous Crafting",
        description:
            "Every item is handcrafted with precision and care, with artisans dedicating hours to perfect each detail.",
        image: "/images/craft/crafting-process.jpg",
    },
    {
        id: 4,
        title: "Quality Assurance",
        description:
            "Each piece undergoes rigorous quality checks to ensure it meets our exacting standards before reaching you.",
        image: "/images/craft/quality-check.jpg",
    },
]


export const offers = [
    {
        id: "offer1",
        title: "Early Bird Wedding Collection",
        description: "20% off on all wedding gift sets when ordered 30 days in advance",
        image: "/images/products/wedding-gift-box.jpg",
        discount: "20% OFF",
        expiryDays: 7,
        link: "/categories/wedding",
    },
    {
        id: "offer2",
        title: "Personalized Keychain Bundle",
        description: "Buy 2 personalized keychains and get the 3rd one free",
        image: "/images/products/personalized-keychain.jpg",
        discount: "Buy 2 Get 1",
        expiryDays: 5,
        link: "/categories/keychains",
    },
    {
        id: "offer3",
        title: "Premium Photo Frame Collection",
        description: "15% discount on our new brass-finished photo frame collection",
        image: "/images/products/brass-photo-frame.jpg",
        discount: "15% OFF",
        expiryDays: 10,
        link: "/categories/photo-frames",
    },
]


export const testimonials = [
    {
        id: "1",
        name: "Priya Sharma",
        role: "Wedding Planner",
        content:
            "The personalized wedding gifts from Arpan Decores added such a special touch to our client's big day. The attention to detail and quality of craftsmanship is unmatched.",
        avatar: "/images/avatars/avatar-1.png",
        rating: 5,
    },
    {
        id: "2",
        name: "Rahul Mehta",
        role: "Happy Customer",
        content:
            "I ordered a custom name plate for my new home and was blown away by the quality. The elegant design perfectly matches our decor and has become a conversation starter!",
        avatar: "/images/avatars/avatar-2.png",
        rating: 5,
    },
    {
        id: "3",
        name: "Ananya Patel",
        role: "Interior Designer",
        content:
            "As an interior designer, I'm very particular about the decor pieces I recommend. Arpan Decores consistently delivers products that exceed my expectations and delight my clients.",
        avatar: "/images/avatars/avatar-3.png",
        rating: 4,
    },
    {
        id: "4",
        name: "Vikram Singh",
        role: "Corporate Client",
        content:
            "We ordered custom corporate gifts for our top clients, and the response was phenomenal. The personalized touch made our company stand out and strengthened our client relationships.",
        avatar: "/images/avatars/avatar-4.png",
        rating: 5,
    },
]


export const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/categories" },
    { name: "Our Craft", href: "/craft" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
]
