import { images } from '@/lib/images'

export type Product = {
  id: string
  slug?: string
  name: string
  category: string
  price: number
  image: string
  images?: string[]
  description: string
  availability?: boolean
  featured?: boolean
  sortOrder?: number
  createdAt?: string
  updatedAt?: string
}

const { dresses: d, scarves: s, shop, lifestyle } = images

export const categories = [
  'Dresses',
  'Scarves',
  'Table Runners',
  'Bags',
  'Pillow Cases',
  'T-Shirts',
  'Tops',
  'Mats',
  'Gabi (ጋቢ)',
  'Bed Covers',
  'Paintings',
  'Jewelry',
  "Children's Wear",
] as const

export const products: Product[] = [
  {
    id: 'eth-dress-menen',
    slug: 'menen-habesha-kemis',
    name: 'Menen Habesha Kemis',
    category: 'Dresses',
    price: 240,
    image: d.d1,
    images: [d.d1, d.d2],
    description:
      'A flowing handwoven cotton dress finished with a delicate gold tibeb border, perfect for ceremonies and celebrations.',
    availability: true,
    featured: true,
    sortOrder: 1,
  },
  {
    id: 'eth-dress-zuria',
    slug: 'zuria-ceremonial-dress',
    name: 'Zuria Ceremonial Dress',
    category: 'Dresses',
    price: 285,
    image: d.d2,
    images: [d.d2, d.d9],
    description:
      'An elegant ceremonial gown with intricate hand-embroidered borders in red, green, and gold.',
    availability: true,
    featured: true,
    sortOrder: 2,
  },
  {
    id: 'eth-dress-tibeb',
    slug: 'tibeb-celebration-dress',
    name: 'Tibeb Celebration Dress',
    category: 'Dresses',
    price: 260,
    image: d.d5,
    images: [d.d5, d.d8],
    description:
      'A graceful handmade dress blending contemporary shape with traditional woven border work.',
    availability: true,
    featured: false,
    sortOrder: 3,
  },
  {
    id: 'eth-dress-bridal',
    slug: 'bridal-gold-border-dress',
    name: 'Bridal Gold Border Dress',
    category: 'Dresses',
    price: 340,
    image: d.d9,
    images: [d.d9, d.d1],
    description:
      'A statement ceremonial dress with luminous gold details for weddings and treasured occasions.',
    availability: true,
    featured: false,
    sortOrder: 4,
  },
  {
    id: 'eth-scarf-netela',
    slug: 'netela-sheer-scarf',
    name: 'Netela Sheer Scarf',
    category: 'Scarves',
    price: 75,
    image: s.s1,
    images: [s.s1, s.s2],
    description:
      'A sheer, lightweight netela with a vivid woven border, an everyday emblem of heritage.',
    availability: true,
    featured: true,
    sortOrder: 5,
  },
  {
    id: 'eth-scarf-gold',
    slug: 'golden-border-shawl',
    name: 'Golden Border Shawl',
    category: 'Scarves',
    price: 110,
    image: s.s4,
    images: [s.s4, s.s3],
    description:
      'A luxurious shawl with a rich golden woven border for special occasions and elegant layering.',
    availability: true,
    featured: true,
    sortOrder: 6,
  },
  {
    id: 'eth-scarf-classic',
    slug: 'classic-cotton-scarf',
    name: 'Classic Cotton Scarf',
    category: 'Scarves',
    price: 90,
    image: s.s2,
    images: [s.s2, s.s1],
    description:
      'Soft handwoven cotton with subtle texture and a traditional finish for daily wear.',
    availability: true,
    featured: false,
    sortOrder: 7,
  },
  {
    id: 'eth-scarf-heritage',
    slug: 'heritage-pattern-scarf',
    name: 'Heritage Pattern Scarf',
    category: 'Scarves',
    price: 98,
    image: s.s3,
    images: [s.s3, s.s4],
    description:
      'A refined scarf with handloom patterning that pairs beautifully with modern and traditional looks.',
    availability: true,
    featured: false,
    sortOrder: 8,
  },
]

export const homeCategories = categories.map((name, index) => {
  const product = products.find((item) => item.category === name)
  const fallbackImages = [
    d.d1,
    s.s1,
    d.d8,
    shop,
    s.s3,
    d.d5,
    d.d6,
    s.s2,
    d.d3,
    d.d7,
    d.d4,
    s.s4,
    d.d6,
  ]

  return {
    name,
    image: product?.image ?? fallbackImages[index] ?? shop,
    slug: name,
  }
})

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
    text: "Perfect for bridal wear, guest outfits, and decorative wedding textiles.",
    image: lifestyle,
  },
  {
    title: "Children's Traditional Wear",
    text: 'Adorable handmade outfits for children, perfect for family events or cultural celebrations.',
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
  | 'Dresses'
  | 'Scarves'
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
  alt?: string
  imageRef?: string
  tall?: boolean
  sortOrder?: number
}

export const galleryFilters: GalleryFilter[] = [
  'All',
  'Dresses',
  'Scarves',
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
    alt: 'Hand-embroidered Ethiopian bridal dress with gold tibeb borders',
    tall: true,
    sortOrder: 1,
  },
  {
    id: 'g2',
    image: d.d2,
    filter: 'Dresses',
    category: 'Traditional Dresses',
    title: 'Handwoven Traditional Dress',
    caption: 'Flowing cotton kemis with delicate woven detail.',
    alt: 'Flowing handwoven Ethiopian cotton dress',
    sortOrder: 2,
  },
  {
    id: 'g3',
    image: shop,
    filter: 'Workshop',
    category: 'Our Store',
    title: 'Beinzirt Flagship Store',
    caption: 'Visit our Laphto Mall showroom in Addis Ababa.',
    alt: 'Beinzirt flagship store in Addis Ababa',
    tall: true,
    sortOrder: 3,
  },
  {
    id: 'g4',
    image: s.s1,
    filter: 'Scarves',
    category: 'Scarves',
    title: 'Golden Border Netela',
    caption: 'Sheer scarf with rich woven border accents.',
    alt: 'Sheer Ethiopian netela scarf with woven gold border',
    sortOrder: 4,
  },
  {
    id: 'g5',
    image: d.d4,
    filter: 'Dresses',
    category: 'Cultural Events',
    title: 'Festival Celebration Wear',
    caption: 'Vibrant traditional attire for cultural gatherings.',
    alt: 'Vibrant Ethiopian traditional attire for cultural events',
    tall: true,
    sortOrder: 5,
  },
  {
    id: 'g6',
    image: s.s2,
    filter: 'Scarves',
    category: 'Scarves',
    title: 'Handwoven Scarf Detail',
    caption: 'Fine cotton netela with traditional tibeb edge.',
    alt: 'Handwoven scarf detail with traditional tibeb edge',
    sortOrder: 6,
  },
  {
    id: 'g7',
    image: d.d6,
    filter: 'Children',
    category: "Children's Wear",
    title: "Children's Celebration Wear",
    caption: 'Adorable handmade outfit for little ones.',
    alt: "Children's handmade Ethiopian celebration outfit",
    sortOrder: 7,
  },
  {
    id: 'g8',
    image: s.s3,
    filter: 'Home Textiles',
    category: 'Textiles',
    title: 'Woven Textile Close-up',
    caption: 'Decorative handloom patterns and motifs.',
    alt: 'Decorative handloom textile pattern close-up',
    tall: true,
    sortOrder: 8,
  },
  {
    id: 'g9',
    image: d.d9,
    filter: 'Weddings',
    category: 'Weddings',
    title: 'Bridal Tibeb Border',
    caption: 'Exquisite gold embroidery for special occasions.',
    alt: 'Gold tibeb embroidery on a ceremonial dress',
    sortOrder: 9,
  },
]

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Shop', href: '/shop' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Custom Order', href: '/custom-order' },
  { label: 'Contact', href: '/contact' },
]

export const contactInfo = {
  phone: '(+251) 91 160 4413 / 91 121 7967',
  email: 'info@beinzirt.com',
  location:
    'Old Airport, Near Bisrate Gebriel Church, South Africa Street, Laphto Mall, 1st Floor, Addis Ababa, Ethiopia',
  hours: 'Mon - Sun: 8:30 AM - 8:00 PM',
  socialLinks: [
    { label: 'Instagram', href: 'https://instagram.com/beinzirt' },
    { label: 'Facebook', href: 'https://facebook.com/beinzirt' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@beinzirt' },
    { label: 'Pinterest', href: 'https://www.pinterest.com/beinzirt' },
    { label: 'Telegram Channel', href: 'https://t.me/beinzirt' },
    { label: 'WhatsApp', href: 'https://wa.me/251911604413' },
  ],
}

export const customOrderProductTypes = [
  "Women's Dress",
  'Scarf',
  'Table Runner',
  'Bag',
  'Pillow Case',
  'T-Shirt',
  'Top',
  'Mat',
  'Gabi',
  'Bed Cover',
  'Painting',
  'Jewelry',
  "Children's Wear",
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

export const aboutParagraphs = [
  'Selam, a visionary designer, was inspired by the rich tapestry of Ethiopian culture. She saw the beauty in traditional textiles and the potential to breathe new life into them. With a passion for design and a commitment to empowering women, she founded Beinzirt.',
  "Beinzirt's journey began with a small workshop where skilled artisans transformed handwoven cotton into stunning garments. Each piece is a labor of love, reflecting the intricate details and unique patterns of Ethiopian heritage.",
  "Selam's vision extends beyond fashion. She is committed to empowering women by providing training and opportunities. By supporting local artisans, Beinzirt contributes to the economic growth of the community.",
  'Today, Beinzirt has grown into a thriving business offering elegant dresses, scarves, and custom textile pieces. The flagship store in Addis Ababa is a haven for those who appreciate the beauty of Ethiopian design.',
]

export const GOOGLE_MAPS_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15763.202760026832!2d38.70726468715821!3d8.990479699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b86909d8cf577%3A0x527dacea47975c49!2z4Ymg4YuV4YqV4Yud4Yit4Ym1IC0gQmVpbnppcnQgRXRoaW9waWFuIFRyYWRpdGlvbmFsIENsb3RoaW5ncw!5e0!3m2!1sen!2set!4v1782453571609!5m2!1sen!2set'
