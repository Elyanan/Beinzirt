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
    image: '/images/product-dress.svg',
    description:
      'A flowing handwoven cotton dress finished with a delicate gold tibeb border, perfect for ceremonies and celebrations.',
  },
  {
    id: 'eth-dress-zuria',
    name: 'Zuria Ceremonial Dress',
    category: 'Dresses',
    price: 285,
    image: '/images/product-dress.svg',
    description:
      'An elegant ceremonial gown with intricate hand-embroidered borders in red, green and gold.',
  },
  {
    id: 'eth-gabi-classic',
    name: 'Classic Handwoven Gabi',
    category: 'Gabi',
    price: 165,
    image: '/images/product-gabi.svg',
    description:
      'A soft, breathable four-layer cotton gabi wrap, woven by hand for warmth and timeless comfort.',
  },
  {
    id: 'eth-shirt-men',
    name: "Men's Tibeb Shirt",
    category: 'Shirts',
    price: 130,
    image: '/images/product-shirt.svg',
    description:
      'A refined handwoven shirt with embroidered placket and collar detail for him.',
  },
  {
    id: 'eth-scarf-netela',
    name: 'Netela Sheer Scarf',
    category: 'Scarves',
    price: 75,
    image: '/images/product-scarf.svg',
    description:
      'A sheer, lightweight netela with a vivid woven border — an everyday emblem of heritage.',
  },
  {
    id: 'eth-top-tibeb',
    name: 'Tibeb Cotton Top',
    category: 'Tops',
    price: 95,
    image: '/images/product-dress.svg',
    description:
      'A modern handwoven top blending contemporary cut with traditional border work.',
  },
  {
    id: 'eth-curtain-set',
    name: 'Heritage Curtain Panel',
    category: 'Curtains',
    price: 210,
    image: '/images/product-curtain.svg',
    description:
      'Hand-loomed curtain panels that bring warm cultural texture to any room.',
  },
  {
    id: 'eth-pillow-set',
    name: 'Tibeb Pillow Cover Set',
    category: 'Pillow Covers',
    price: 60,
    image: '/images/product-pillow.svg',
    description:
      'A set of decorative cushion covers with handwoven geometric tibeb motifs.',
  },
  {
    id: 'eth-runner',
    name: 'Woven Table Runner',
    category: 'Table Runners',
    price: 70,
    image: '/images/product-runner.svg',
    description:
      'A statement table runner with a colorful border, handmade to elevate every gathering.',
  },
  {
    id: 'eth-kids-dress',
    name: "Children's Habesha Set",
    category: "Children's Wear",
    price: 85,
    image: '/images/product-kids.svg',
    description:
      'An adorable handmade outfit for little ones, crafted for cultural celebrations.',
  },
  {
    id: 'eth-scarf-gold',
    name: 'Golden Border Shawl',
    category: 'Scarves',
    price: 110,
    image: '/images/product-scarf.svg',
    description:
      'A luxurious shawl with a rich golden woven border for special occasions.',
  },
  {
    id: 'eth-gabi-premium',
    name: 'Premium Cotton Gabi',
    category: 'Gabi',
    price: 220,
    image: '/images/product-gabi.svg',
    description:
      'Our finest, densely woven gabi — soft, enduring, and beautifully finished.',
  },
]

export const homeCategories = [
  { name: 'Ethiopian Traditional Dresses', image: '/images/product-dress.svg', slug: 'Dresses' },
  { name: 'Gabi', image: '/images/product-gabi.svg', slug: 'Gabi' },
  { name: "Men's Traditional Shirts", image: '/images/product-shirt.svg', slug: 'Shirts' },
  { name: 'Scarves', image: '/images/product-scarf.svg', slug: 'Scarves' },
  { name: 'Curtains', image: '/images/product-curtain.svg', slug: 'Curtains' },
  { name: 'Pillow Covers', image: '/images/product-pillow.svg', slug: 'Pillow Covers' },
  { name: 'Table Runners', image: '/images/product-runner.svg', slug: 'Table Runners' },
  { name: "Children's Traditional Wear", image: '/images/product-kids.svg', slug: "Children's Wear" },
]

export const useCases = [
  {
    title: 'Festivals & Cultural Events',
    text: 'Traditional attire and textiles for cultural or religious festivals, ceremonies, and community gatherings.',
    image: '/images/gallery-festival.svg',
  },
  {
    title: 'Everyday Wear',
    text: 'Traditional clothes worn in daily life, blending comfort and cultural expression.',
    image: '/images/gallery-everyday.svg',
  },
  {
    title: 'Special Occasions',
    text: 'Elegant traditional outfits and table settings for formal events, parties, and family gatherings.',
    image: '/images/gallery-home.svg',
  },
  {
    title: 'Weddings & Celebrations',
    text: "Perfect for bridal wear, groom's attire, guest outfits, and decorative wedding textiles.",
    image: '/images/gallery-wedding.svg',
  },
  {
    title: "Children's Traditional Wear",
    text: 'Adorable handmade outfits for kids, perfect for family events or cultural celebrations.',
    image: '/images/product-kids.svg',
  },
  {
    title: 'Custom & Personalized Orders',
    text: 'Bespoke creations tailored to individual preferences for unique occasions or personal use.',
    image: '/images/gallery-textile.svg',
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
    image: '/images/gallery-wedding.svg',
    filter: 'Weddings',
    category: 'Weddings',
    title: 'Wedding Cultural Outfit',
    caption: 'Hand-embroidered bridal ensemble with gold tibeb borders.',
    tall: true,
  },
  {
    id: 'g2',
    image: '/images/product-dress.svg',
    filter: 'Women',
    category: 'Traditional Dresses',
    title: 'Handwoven Traditional Dress',
    caption: 'Flowing cotton kemis with delicate woven detail.',
  },
  {
    id: 'g3',
    image: '/images/gallery-textile.svg',
    filter: 'Women',
    category: 'Textile Patterns',
    title: 'Embroidered Textile Pattern',
    caption: 'Close-up of intricate handwoven border work.',
  },
  {
    id: 'g4',
    image: '/images/workshop.svg',
    filter: 'Workshop',
    category: 'Artisan Process',
    title: 'Artisan Workshop Detail',
    caption: 'Skilled hands at the loom in our Addis Ababa studio.',
    tall: true,
  },
  {
    id: 'g5',
    image: '/images/gallery-home.svg',
    filter: 'Home Textiles',
    category: 'Home Textiles',
    title: 'Heritage Home Collection',
    caption: 'Coordinated textiles for an elegant living space.',
  },
  {
    id: 'g6',
    image: '/images/gallery-festival.svg',
    filter: 'Women',
    category: 'Cultural Events',
    title: 'Festival Celebration Wear',
    caption: 'Vibrant traditional attire for cultural gatherings.',
    tall: true,
  },
  {
    id: 'g7',
    image: '/images/product-scarf.svg',
    filter: 'Women',
    category: 'Scarves',
    title: 'Golden Border Netela',
    caption: 'Sheer scarf with rich woven border accents.',
  },
  {
    id: 'g8',
    image: '/images/gallery-everyday.svg',
    filter: 'Women',
    category: 'Everyday Wear',
    title: 'Everyday Elegance',
    caption: 'Comfortable heritage pieces for daily life.',
  },
  {
    id: 'g9',
    image: '/images/product-gabi.svg',
    filter: 'Men',
    category: 'Gabi',
    title: 'Elegant Gabi Detail',
    caption: 'Soft four-layer cotton wrap in classic weave.',
  },
  {
    id: 'g10',
    image: '/images/product-shirt.svg',
    filter: 'Men',
    category: 'Shirts',
    title: "Men's Traditional Shirt",
    caption: 'Refined handwoven shirt with tibeb placket.',
  },
  {
    id: 'g11',
    image: '/images/product-pillow.svg',
    filter: 'Home Textiles',
    category: 'Pillow Covers',
    title: 'Handmade Pillow Cover',
    caption: 'Decorative cushion with geometric motifs.',
    tall: true,
  },
  {
    id: 'g12',
    image: '/images/product-runner.svg',
    filter: 'Home Textiles',
    category: 'Table Runners',
    title: 'Traditional Table Runner',
    caption: 'Statement runner for gatherings and celebrations.',
  },
  {
    id: 'g13',
    image: '/images/product-kids.svg',
    filter: 'Children',
    category: "Children's Wear",
    title: "Children's Celebration Wear",
    caption: 'Adorable handmade outfit for little ones.',
  },
  {
    id: 'g14',
    image: '/images/gallery-wedding.svg',
    filter: 'Weddings',
    category: 'Weddings',
    title: 'Bridal Tibeb Border',
    caption: 'Exquisite gold embroidery for special occasions.',
  },
  {
    id: 'g15',
    image: '/images/product-curtain.svg',
    filter: 'Home Textiles',
    category: 'Curtains',
    title: 'Woven Curtain Panel',
    caption: 'Hand-loomed panels with cultural texture.',
    tall: true,
  },
  {
    id: 'g16',
    image: '/images/workshop.svg',
    filter: 'Workshop',
    category: 'Workshop',
    title: 'Loom Weaving Process',
    caption: 'Traditional techniques passed through generations.',
  },
  {
    id: 'g17',
    image: '/images/product-dress.svg',
    filter: 'Women',
    category: 'Dresses',
    title: 'Ceremonial Habesha Kemis',
    caption: 'Elegant dress for weddings and celebrations.',
  },
  {
    id: 'g18',
    image: '/images/product-gabi.svg',
    filter: 'Men',
    category: 'Gabi',
    title: 'Premium Cotton Gabi',
    caption: 'Dense weave for warmth and lasting comfort.',
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
    image: '/images/gallery-festival.svg',
  },
  {
    slug: 'style-ethiopian-textiles-modern',
    title: 'How to Style Ethiopian Textiles for Modern Events',
    category: 'Styling',
    date: 'February 28, 2026',
    excerpt:
      'Discover ways to blend traditional fabrics with modern silhouettes for weddings, gatherings, and everyday elegance.',
    image: '/images/blog-styling.svg',
  },
  {
    slug: 'beauty-of-handmade-gabi',
    title: 'The Beauty of Handmade Gabi',
    category: 'Craftsmanship',
    date: 'February 10, 2026',
    excerpt:
      'A closer look at one of Ethiopia\'s most beloved traditional garments and why handmade quality matters.',
    image: '/images/product-gabi.svg',
  },
  {
    slug: 'why-handmade-matters',
    title: 'Why Handmade Clothing Matters',
    category: 'Sustainability',
    date: 'January 22, 2026',
    excerpt:
      'Handmade fashion supports artisans, reduces mass-production waste, and creates meaningful pieces that last.',
    image: '/images/workshop.svg',
  },
  {
    slug: 'ethiopian-wedding-fashion',
    title: 'Ethiopian Wedding Fashion Inspiration',
    category: 'Weddings',
    date: 'January 8, 2026',
    excerpt:
      'Ideas for bridal wear, groom attire, guest outfits, and decorative textiles for unforgettable celebrations.',
    image: '/images/gallery-wedding.svg',
  },
  {
    slug: 'workshop-to-wardrobe',
    title: 'From Workshop to Wardrobe',
    category: 'Behind the Scenes',
    date: 'December 18, 2025',
    excerpt:
      'Follow the journey of a Beinzirt piece from fabric selection to hand finishing.',
    image: '/images/about-founder.svg',
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
