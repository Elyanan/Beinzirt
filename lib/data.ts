import { images } from '@/lib/images'

export type Product = {
  id: string
  name: string
  category: string
  price: number
  image: string
  description: string
}

const { dresses: d, scarves: s, shop, lifestyle } = images

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
    image: d.d1,
    description:
      'A flowing handwoven cotton dress finished with a delicate gold tibeb border, perfect for ceremonies and celebrations.',
  },
  {
    id: 'eth-dress-zuria',
    name: 'Zuria Ceremonial Dress',
    category: 'Dresses',
    price: 285,
    image: d.d2,
    description:
      'An elegant ceremonial gown with intricate hand-embroidered borders in red, green and gold.',
  },
  {
    id: 'eth-gabi-classic',
    name: 'Classic Handwoven Gabi',
    category: 'Gabi',
    price: 165,
    image: d.d3,
    description:
      'A soft, breathable four-layer cotton gabi wrap, woven by hand for warmth and timeless comfort.',
  },
  {
    id: 'eth-shirt-men',
    name: "Men's Tibeb Shirt",
    category: 'Shirts',
    price: 130,
    image: d.d4,
    description:
      'A refined handwoven shirt with embroidered placket and collar detail for him.',
  },
  {
    id: 'eth-scarf-netela',
    name: 'Netela Sheer Scarf',
    category: 'Scarves',
    price: 75,
    image: s.s1,
    description:
      'A sheer, lightweight netela with a vivid woven border — an everyday emblem of heritage.',
  },
  {
    id: 'eth-top-tibeb',
    name: 'Tibeb Cotton Top',
    category: 'Tops',
    price: 95,
    image: d.d5,
    description:
      'A modern handwoven top blending contemporary cut with traditional border work.',
  },
  {
    id: 'eth-curtain-set',
    name: 'Heritage Curtain Panel',
    category: 'Curtains',
    price: 210,
    image: s.s2,
    description:
      'Hand-loomed curtain panels that bring warm cultural texture to any room.',
  },
  {
    id: 'eth-pillow-set',
    name: 'Tibeb Pillow Cover Set',
    category: 'Pillow Covers',
    price: 60,
    image: s.s3,
    description:
      'A set of decorative cushion covers with handwoven geometric tibeb motifs.',
  },
  {
    id: 'eth-runner',
    name: 'Woven Table Runner',
    category: 'Table Runners',
    price: 70,
    image: d.d8,
    description:
      'A statement table runner with a colorful border, handmade to elevate every gathering.',
  },
  {
    id: 'eth-kids-dress',
    name: "Children's Habesha Set",
    category: "Children's Wear",
    price: 85,
    image: d.d6,
    description:
      'An adorable handmade outfit for little ones, crafted for cultural celebrations.',
  },
  {
    id: 'eth-scarf-gold',
    name: 'Golden Border Shawl',
    category: 'Scarves',
    price: 110,
    image: s.s4,
    description:
      'A luxurious shawl with a rich golden woven border for special occasions.',
  },
  {
    id: 'eth-gabi-premium',
    name: 'Premium Cotton Gabi',
    category: 'Gabi',
    price: 220,
    image: d.d7,
    description:
      'Our finest, densely woven gabi — soft, enduring, and beautifully finished.',
  },
]

export const homeCategories = [
  { name: 'Ethiopian Traditional Dresses', image: d.d1, slug: 'Dresses' },
  { name: 'Gabi', image: d.d3, slug: 'Gabi' },
  { name: "Men's Traditional Shirts", image: d.d4, slug: 'Shirts' },
  { name: 'Scarves', image: s.s1, slug: 'Scarves' },
  { name: 'Curtains', image: s.s2, slug: 'Curtains' },
  { name: 'Pillow Covers', image: s.s3, slug: 'Pillow Covers' },
  { name: 'Table Runners', image: d.d8, slug: 'Table Runners' },
  { name: "Children's Traditional Wear", image: d.d6, slug: "Children's Wear" },
]

export const useCases = [
  {
    title: 'Festivals & Cultural Events',
    text: 'Traditional attire and textiles for cultural or religious festivals, ceremonies, and community gatherings.',
    image: d.d2,
  },
  {
    title: 'Everyday Wear',
    text: 'Traditional clothes worn in daily life, blending comfort and cultural expression.',
    image: d.d5,
  },
  {
    title: 'Special Occasions',
    text: 'Elegant traditional outfits and table settings for formal events, parties, and family gatherings.',
    image: d.d9,
  },
  {
    title: 'Weddings & Celebrations',
    text: "Perfect for bridal wear, groom's attire, guest outfits, and decorative wedding textiles.",
    image: lifestyle,
  },
  {
    title: "Children's Traditional Wear",
    text: 'Adorable handmade outfits for kids, perfect for family events or cultural celebrations.',
    image: d.d6,
  },
  {
    title: 'Custom & Personalized Orders',
    text: 'Bespoke creations tailored to individual preferences for unique occasions or personal use.',
    image: d.d7,
  },
]

export type GalleryFilter =
  | 'All'
  | 'Women'
  | 'Men'
  | 'Weddings'
  | 'Children'
  | 'Home Textiles'
  | 'Workshop'

export type GalleryItem = {
  id: string
  image: string
  filter: GalleryFilter
  category: string
  title: string
  caption: string
  tall?: boolean
}

export const galleryFilters: GalleryFilter[] = [
  'All',
  'Women',
  'Men',
  'Weddings',
  'Children',
  'Home Textiles',
  'Workshop',
]

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    image: d.d1,
    filter: 'Weddings',
    category: 'Weddings',
    title: 'Wedding Cultural Outfit',
    caption: 'Hand-embroidered bridal ensemble with gold tibeb borders.',
    tall: true,
  },
  {
    id: 'g2',
    image: d.d2,
    filter: 'Women',
    category: 'Traditional Dresses',
    title: 'Handwoven Traditional Dress',
    caption: 'Flowing cotton kemis with delicate woven detail.',
  },
  {
    id: 'g3',
    image: d.d3,
    filter: 'Women',
    category: 'Textile Patterns',
    title: 'Embroidered Textile Pattern',
    caption: 'Close-up of intricate handwoven border work.',
  },
  {
    id: 'g4',
    image: shop,
    filter: 'Workshop',
    category: 'Our Store',
    title: 'Beinzirt Flagship Store',
    caption: 'Visit our Laphto Mall showroom in Addis Ababa.',
    tall: true,
  },
  {
    id: 'g5',
    image: s.s1,
    filter: 'Home Textiles',
    category: 'Accessories',
    title: 'Golden Border Netela',
    caption: 'Sheer scarf with rich woven border accents.',
  },
  {
    id: 'g6',
    image: d.d4,
    filter: 'Women',
    category: 'Cultural Events',
    title: 'Festival Celebration Wear',
    caption: 'Vibrant traditional attire for cultural gatherings.',
    tall: true,
  },
  {
    id: 'g7',
    image: s.s2,
    filter: 'Women',
    category: 'Scarves',
    title: 'Handwoven Scarf Detail',
    caption: 'Fine cotton netela with traditional tibeb edge.',
  },
  {
    id: 'g8',
    image: d.d5,
    filter: 'Women',
    category: 'Everyday Wear',
    title: 'Everyday Elegance',
    caption: 'Comfortable heritage pieces for daily life.',
  },
  {
    id: 'g9',
    image: d.d6,
    filter: 'Men',
    category: 'Gabi',
    title: 'Elegant Gabi Detail',
    caption: 'Soft four-layer cotton wrap in classic weave.',
  },
  {
    id: 'g10',
    image: d.d7,
    filter: 'Men',
    category: 'Shirts',
    title: "Men's Traditional Shirt",
    caption: 'Refined handwoven shirt with tibeb placket.',
  },
  {
    id: 'g11',
    image: s.s3,
    filter: 'Home Textiles',
    category: 'Textiles',
    title: 'Woven Textile Close-up',
    caption: 'Decorative handloom patterns and motifs.',
    tall: true,
  },
  {
    id: 'g12',
    image: s.s4,
    filter: 'Home Textiles',
    category: 'Accessories',
    title: 'Golden Border Shawl',
    caption: 'Luxurious shawl for special occasions.',
  },
  {
    id: 'g13',
    image: d.d8,
    filter: 'Children',
    category: "Children's Wear",
    title: "Children's Celebration Wear",
    caption: 'Adorable handmade outfit for little ones.',
  },
  {
    id: 'g14',
    image: d.d9,
    filter: 'Weddings',
    category: 'Weddings',
    title: 'Bridal Tibeb Border',
    caption: 'Exquisite gold embroidery for special occasions.',
  },
  {
    id: 'g15',
    image: lifestyle,
    filter: 'Weddings',
    category: 'Lifestyle',
    title: 'Celebration in Tradition',
    caption: 'Models wearing Beinzirt ceremonial attire.',
    tall: true,
  },
  {
    id: 'g16',
    image: shop,
    filter: 'Workshop',
    category: 'Workshop',
    title: 'Our Addis Ababa Store',
    caption: 'Where heritage meets modern elegance.',
  },
  {
    id: 'g17',
    image: d.d1,
    filter: 'Women',
    category: 'Dresses',
    title: 'Ceremonial Habesha Kemis',
    caption: 'Elegant dress for weddings and celebrations.',
  },
  {
    id: 'g18',
    image: d.d9,
    filter: 'Women',
    category: 'Dresses',
    title: 'Formal Traditional Dress',
    caption: 'Statement piece for your most treasured occasions.',
  },
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
    category: 'Culture',
    date: 'March 12, 2026',
    excerpt:
      'Explore how Ethiopian clothing carries identity, heritage, faith, and family tradition through fabric and detail.',
    image: d.d1,
  },
  {
    slug: 'style-ethiopian-textiles-modern',
    title: 'How to Style Ethiopian Textiles for Modern Events',
    category: 'Styling',
    date: 'February 28, 2026',
    excerpt:
      'Discover ways to blend traditional fabrics with modern silhouettes for weddings, gatherings, and everyday elegance.',
    image: lifestyle,
  },
  {
    slug: 'beauty-of-handmade-gabi',
    title: 'The Beauty of Handmade Gabi',
    category: 'Craftsmanship',
    date: 'February 10, 2026',
    excerpt:
      'A closer look at one of Ethiopia\'s most beloved traditional garments and why handmade quality matters.',
    image: d.d3,
  },
  {
    slug: 'why-handmade-matters',
    title: 'Why Handmade Clothing Matters',
    category: 'Sustainability',
    date: 'January 22, 2026',
    excerpt:
      'Handmade fashion supports artisans, reduces mass-production waste, and creates meaningful pieces that last.',
    image: shop,
  },
  {
    slug: 'ethiopian-wedding-fashion',
    title: 'Ethiopian Wedding Fashion Inspiration',
    category: 'Weddings',
    date: 'January 8, 2026',
    excerpt:
      'Ideas for bridal wear, groom attire, guest outfits, and decorative textiles for unforgettable celebrations.',
    image: d.d9,
  },
  {
    slug: 'workshop-to-wardrobe',
    title: 'From Workshop to Wardrobe',
    category: 'Behind the Scenes',
    date: 'December 18, 2025',
    excerpt:
      'Follow the journey of a Beinzirt piece from fabric selection to hand finishing.',
    image: d.d2,
  },
]

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Shop', href: '/shop' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Custom Order', href: '/custom-order' },
  { label: 'Contact', href: '/contact' },
]

export const footerCompanyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Shop', href: '/shop' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Custom Order', href: '/custom-order' },
  { label: 'Contact', href: '/contact' },
]

export const contactInfo = {
  phone: '(+251) 91 160 4413 / 91 121 7967',
  email: 'info@beinzirt.com',
  location:
    'Old Airport, Near Bisrate Gebriel Church, South Africa Street, Laphto Mall, 1st Floor, Addis Ababa, Ethiopia',
  hours: 'Mon – Sun: 8:30 AM – 8:00 PM',
}

export const customOrderProductTypes = [
  "Women's Dress",
  "Men's Shirt",
  'Gabi',
  'Scarf',
  "Children's Wear",
  'Curtains',
  'Pillow Covers',
  'Table Runner',
  'Wedding Set',
  'Other',
] as const

export const customOrderOccasions = [
  'Wedding',
  'Cultural Event',
  'Religious Celebration',
  'Everyday Wear',
  'Gift',
  'Home Decoration',
  'Other',
] as const

export const customOrderSteps = [
  {
    step: '01',
    title: 'Share Your Idea',
    description: 'Tell us about your vision, occasion, or send a sample design reference.',
  },
  {
    step: '02',
    title: 'Choose Fabric & Style',
    description: 'Select colors, fabrics, and traditional details with our design team.',
  },
  {
    step: '03',
    title: 'We Craft by Hand',
    description: 'Our artisans weave and finish your piece with care and precision.',
  },
  {
    step: '04',
    title: 'Pick Up or Arrange Delivery',
    description: 'Collect from our Addis Ababa store or arrange delivery to your location.',
  },
]

export const aboutValues = [
  {
    title: 'Handmade Quality',
    description:
      'Every piece is carefully crafted with attention to detail, comfort, and lasting beauty.',
  },
  {
    title: 'Cultural Heritage',
    description:
      'Our designs celebrate Ethiopian identity through patterns, textures, and traditional craftsmanship.',
  },
  {
    title: 'Women Empowerment',
    description:
      'Beinzirt supports local artisans and creates opportunities for skilled women in the community.',
  },
  {
    title: 'Custom Creations',
    description:
      'From weddings to everyday wear, we create personalized pieces that match your vision.',
  },
]

export const GOOGLE_MAPS_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15763.202760026832!2d38.70726468715821!3d8.990479699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b86909d8cf577%3A0x527dacea47975c49!2z4Ymg4YuV4YqV4Yud4Yit4Ym1IC0gQmVpbnppcnQgRXRoaW9waWFuIFRyYWRpdGlvbmFsIENsb3RoaW5ncw!5e0!3m2!1sen!2set!4v1782453571609!5m2!1sen!2set'
