export type Product = {
  id: string
  name: string
  category: string
  price: number
  image: string
  description: string
}

export const categories = [
  'Dresses',
  'Scarves',
  'Tops',
  'Gabi',
  'Shirts',
  'Curtains',
  'Pillow Covers',
  'Table Runners',
  "Children's Wear",
  'Custom Orders',
] as const

export const products: Product[] = [
  {
    id: 'eth-dress-menen',
    name: 'Menen Habesha Kemis',
    category: 'Dresses',
    price: 240,
    image: '/images/product-dress.png',
    description:
      'A flowing handwoven cotton dress finished with a delicate gold tibeb border, perfect for ceremonies and celebrations.',
  },
  {
    id: 'eth-dress-zuria',
    name: 'Zuria Ceremonial Dress',
    category: 'Dresses',
    price: 285,
    image: '/images/product-dress.png',
    description:
      'An elegant ceremonial gown with intricate hand-embroidered borders in red, green and gold.',
  },
  {
    id: 'eth-gabi-classic',
    name: 'Classic Handwoven Gabi',
    category: 'Gabi',
    price: 165,
    image: '/images/product-gabi.png',
    description:
      'A soft, breathable four-layer cotton gabi wrap, woven by hand for warmth and timeless comfort.',
  },
  {
    id: 'eth-shirt-men',
    name: "Men's Tibeb Shirt",
    category: 'Shirts',
    price: 130,
    image: '/images/product-shirt.png',
    description:
      'A refined handwoven shirt with embroidered placket and collar detail for him.',
  },
  {
    id: 'eth-scarf-netela',
    name: 'Netela Sheer Scarf',
    category: 'Scarves',
    price: 75,
    image: '/images/product-scarf.png',
    description:
      'A sheer, lightweight netela with a vivid woven border — an everyday emblem of heritage.',
  },
  {
    id: 'eth-top-tibeb',
    name: 'Tibeb Cotton Top',
    category: 'Tops',
    price: 95,
    image: '/images/product-dress.png',
    description:
      'A modern handwoven top blending contemporary cut with traditional border work.',
  },
  {
    id: 'eth-curtain-set',
    name: 'Heritage Curtain Panel',
    category: 'Curtains',
    price: 210,
    image: '/images/product-curtain.png',
    description:
      'Hand-loomed curtain panels that bring warm cultural texture to any room.',
  },
  {
    id: 'eth-pillow-set',
    name: 'Tibeb Pillow Cover Set',
    category: 'Pillow Covers',
    price: 60,
    image: '/images/product-pillow.png',
    description:
      'A set of decorative cushion covers with handwoven geometric tibeb motifs.',
  },
  {
    id: 'eth-runner',
    name: 'Woven Table Runner',
    category: 'Table Runners',
    price: 70,
    image: '/images/product-runner.png',
    description:
      'A statement table runner with a colorful border, handmade to elevate every gathering.',
  },
  {
    id: 'eth-kids-dress',
    name: "Children's Habesha Set",
    category: "Children's Wear",
    price: 85,
    image: '/images/product-kids.png',
    description:
      'An adorable handmade outfit for little ones, crafted for cultural celebrations.',
  },
  {
    id: 'eth-scarf-gold',
    name: 'Golden Border Shawl',
    category: 'Scarves',
    price: 110,
    image: '/images/product-scarf.png',
    description:
      'A luxurious shawl with a rich golden woven border for special occasions.',
  },
  {
    id: 'eth-gabi-premium',
    name: 'Premium Cotton Gabi',
    category: 'Gabi',
    price: 220,
    image: '/images/product-gabi.png',
    description:
      'Our finest, densely woven gabi — soft, enduring, and beautifully finished.',
  },
]

export const homeCategories = [
  { name: 'Ethiopian Traditional Dresses', image: '/images/product-dress.png', slug: 'Dresses' },
  { name: 'Gabi', image: '/images/product-gabi.png', slug: 'Gabi' },
  { name: "Men's Traditional Shirts", image: '/images/product-shirt.png', slug: 'Shirts' },
  { name: 'Scarves', image: '/images/product-scarf.png', slug: 'Scarves' },
  { name: 'Curtains', image: '/images/product-curtain.png', slug: 'Curtains' },
  { name: 'Pillow Covers', image: '/images/product-pillow.png', slug: 'Pillow Covers' },
  { name: 'Table Runners', image: '/images/product-runner.png', slug: 'Table Runners' },
  { name: "Children's Traditional Wear", image: '/images/product-kids.png', slug: "Children's Wear" },
]

export const useCases = [
  {
    title: 'Festivals & Cultural Events',
    text: 'Traditional attire and textiles for cultural or religious festivals, ceremonies, and community gatherings.',
    image: '/images/gallery-festival.png',
  },
  {
    title: 'Everyday Wear',
    text: 'Traditional clothes worn in daily life, blending comfort and cultural expression.',
    image: '/images/gallery-everyday.png',
  },
  {
    title: 'Special Occasions',
    text: 'Elegant traditional outfits and table settings for formal events, parties, and family gatherings.',
    image: '/images/gallery-home.png',
  },
  {
    title: 'Weddings & Celebrations',
    text: "Perfect for bridal wear, groom's attire, guest outfits, and decorative wedding textiles.",
    image: '/images/gallery-wedding.png',
  },
  {
    title: "Children's Traditional Wear",
    text: 'Adorable handmade outfits for kids, perfect for family events or cultural celebrations.',
    image: '/images/product-kids.png',
  },
  {
    title: 'Custom & Personalized Orders',
    text: 'Bespoke creations tailored to individual preferences for unique occasions or personal use.',
    image: '/images/gallery-textile.png',
  },
]

export const galleryItems = [
  { image: '/images/gallery-wedding.png', category: 'Weddings', tall: true },
  { image: '/images/product-dress.png', category: 'Traditional Dresses', tall: false },
  { image: '/images/gallery-textile.png', category: 'Textile Patterns', tall: false },
  { image: '/images/workshop.png', category: 'Artisan Process', tall: true },
  { image: '/images/gallery-home.png', category: 'Home Textiles', tall: false },
  { image: '/images/gallery-festival.png', category: 'Cultural Events', tall: true },
  { image: '/images/product-scarf.png', category: 'Scarves', tall: false },
  { image: '/images/gallery-everyday.png', category: 'Everyday Wear', tall: false },
  { image: '/images/product-gabi.png', category: 'Gabi', tall: false },
  { image: '/images/product-pillow.png', category: 'Pillow Covers', tall: true },
  { image: '/images/product-runner.png', category: 'Table Runners', tall: false },
  { image: '/images/product-kids.png', category: "Children's Wear", tall: false },
]

export type BlogPost = {
  slug: string
  title: string
  category: string
  date: string
  excerpt: string
  image: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'meaning-behind-ethiopian-clothing',
    title: 'The Meaning Behind Ethiopian Traditional Clothing',
    category: 'Heritage',
    date: 'March 12, 2026',
    excerpt:
      'From the symbolism of tibeb borders to the rituals they accompany, explore the deep cultural language woven into every garment.',
    image: '/images/gallery-festival.png',
  },
  {
    slug: 'style-ethiopian-textiles-modern',
    title: 'How to Style Ethiopian Textiles for Modern Events',
    category: 'Style',
    date: 'February 28, 2026',
    excerpt:
      'Blend tradition with contemporary fashion — practical ideas for wearing netela, gabi and tibeb pieces today.',
    image: '/images/blog-styling.png',
  },
  {
    slug: 'beauty-of-handmade-gabi',
    title: 'The Beauty of Handmade Gabi',
    category: 'Craft',
    date: 'February 10, 2026',
    excerpt:
      'A look at the patient four-layer weaving process that gives the gabi its softness, warmth and longevity.',
    image: '/images/product-gabi.png',
  },
  {
    slug: 'why-handmade-matters',
    title: 'Why Handmade Clothing Matters',
    category: 'Craft',
    date: 'January 22, 2026',
    excerpt:
      'Slow, intentional craftsmanship supports artisans, sustains traditions, and creates pieces that last a lifetime.',
    image: '/images/workshop.png',
  },
  {
    slug: 'ethiopian-wedding-fashion',
    title: 'Ethiopian Wedding Fashion Inspiration',
    category: 'Weddings',
    date: 'January 8, 2026',
    excerpt:
      'Bridal and groom attire ideas, decorative textiles and timeless looks for an unforgettable Ethiopian celebration.',
    image: '/images/gallery-wedding.png',
  },
]

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Shop', href: '/shop' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export const contactInfo = {
  phone: '(+251) 91 160 4413 / 91 121 7967',
  email: 'info@beinzirt.com',
  location:
    'Old Airport, Near Bisrate Gebriel Church, South Africa Street, Laphto Mall, 1st Floor, Addis Ababa, Ethiopia',
  hours: 'Mon – Sun: 8:30 AM – 8:00 PM',
}
