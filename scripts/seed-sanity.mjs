import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const envPath = path.join(root, '.env.local')

if (existsSync(envPath)) {
  const envText = await readFile(envPath, 'utf8')
  for (const line of envText.split(/\r?\n/)) {
    const match = line.match(/^([^#=\s]+)=(.*)$/)
    if (match) process.env[match[1]] = match[2]
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN
const apiVersion = 'v2025-02-19'

if (!projectId || !dataset || !token) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_TOKEN.')
}

const categories = [
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
]

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/beinzirt' },
  { label: 'Facebook', href: 'https://facebook.com/beinzirt' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@beinzirt' },
  { label: 'Pinterest', href: 'https://www.pinterest.com/beinzirt' },
  { label: 'Telegram Channel', href: 'https://t.me/beinzirt' },
  { label: 'WhatsApp', href: 'https://wa.me/251911604413' },
]

const contactInfo = {
  phone: '(+251) 91 160 4413 / 91 121 7967',
  email: 'info@beinzirt.com',
  location:
    'Old Airport, Near Bisrate Gebriel Church, South Africa Street, Laphto Mall, 1st Floor, Addis Ababa, Ethiopia',
  hours: 'Mon - Sun: 8:30 AM - 8:00 PM',
}

const mapIframe =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15763.202760026832!2d38.70726468715821!3d8.990479699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b86909d8cf577%3A0x527dacea47975c49!2z4Ymg4YuV4YqV4Yud4Yit4Ym1IC0gQmVpbnppcnQgRXRoaW9waWFuIFRyYWRpdGlvbmFsIENsb3RoaW5ncw!5e0!3m2!1sen!2set!4v1782453571609!5m2!1sen!2set'

const imageFiles = {
  logo: 'public/logo.png',
  logoWhite: 'public/logo-white.png',
  hero: 'public/images/hero.jpg',
  shop: 'public/images/shop-min.jpg',
  together: 'public/images/together-1-min.jpg',
  d1: 'public/images/dress-1-min.jpg',
  d2: 'public/images/dress-2-min.jpg',
  d3: 'public/images/dress-3-min.jpg',
  d4: 'public/images/dress-4-min.jpg',
  d5: 'public/images/dress-5-min.jpg',
  d6: 'public/images/dress-6-min.jpg',
  d7: 'public/images/dress-7-min.jpg',
  d8: 'public/images/dress-8-min.JPG',
  d9: 'public/images/dress-9-min.jpg',
  s1: 'public/images/scarf-1-min.JPG',
  s2: 'public/images/scarf-2-min.JPG',
  s3: 'public/images/scarf-3-min.JPG',
  s4: 'public/images/scarf-4-min.JPG',
}

const products = [
  ['eth-dress-menen', 'menen-habesha-kemis', 'Menen Habesha Kemis', 'Dresses', 33600, 240, 'd1', true, 1, 'A flowing handwoven cotton dress finished with a delicate gold tibeb border, perfect for ceremonies and celebrations.'],
  ['eth-dress-zuria', 'zuria-ceremonial-dress', 'Zuria Ceremonial Dress', 'Dresses', 39900, 285, 'd2', true, 2, 'An elegant ceremonial gown with intricate hand-embroidered borders in red, green, and gold.'],
  ['eth-dress-tibeb', 'tibeb-celebration-dress', 'Tibeb Celebration Dress', 'Dresses', 36400, 260, 'd5', false, 3, 'A graceful handmade dress blending contemporary shape with traditional woven border work.'],
  ['eth-dress-bridal', 'bridal-gold-border-dress', 'Bridal Gold Border Dress', 'Dresses', 47600, 340, 'd9', false, 4, 'A statement ceremonial dress with luminous gold details for weddings and treasured occasions.'],
  ['eth-scarf-netela', 'netela-sheer-scarf', 'Netela Sheer Scarf', 'Scarves', 10500, 75, 's1', true, 5, 'A sheer, lightweight netela with a vivid woven border, an everyday emblem of heritage.'],
  ['eth-scarf-gold', 'golden-border-shawl', 'Golden Border Shawl', 'Scarves', 15400, 110, 's4', true, 6, 'A luxurious shawl with a rich golden woven border for special occasions and elegant layering.'],
  ['eth-scarf-classic', 'classic-cotton-scarf', 'Classic Cotton Scarf', 'Scarves', 12600, 90, 's2', false, 7, 'Soft handwoven cotton with subtle texture and a traditional finish for daily wear.'],
  ['eth-scarf-heritage', 'heritage-pattern-scarf', 'Heritage Pattern Scarf', 'Scarves', 13700, 98, 's3', false, 8, 'A refined scarf with handloom patterning that pairs beautifully with modern and traditional looks.'],
]

const galleryItems = [
  ['g1', 'Wedding Cultural Outfit', 'Weddings', 'Hand-embroidered bridal ensemble with gold tibeb borders.', 'd1', true, 1],
  ['g2', 'Handwoven Traditional Dress', 'Dresses', 'Flowing cotton kemis with delicate woven detail.', 'd2', false, 2],
  ['g3', 'Beinzirt Flagship Store', 'Workshop', 'Visit our Laphto Mall showroom in Addis Ababa.', 'shop', true, 3],
  ['g4', 'Golden Border Netela', 'Scarves', 'Sheer scarf with rich woven border accents.', 's1', false, 4],
  ['g5', 'Festival Celebration Wear', 'Dresses', 'Vibrant traditional attire for cultural gatherings.', 'd4', true, 5],
  ['g6', 'Handwoven Scarf Detail', 'Scarves', 'Fine cotton netela with traditional tibeb edge.', 's2', false, 6],
  ['g7', "Children's Celebration Wear", 'Children', 'Adorable handmade outfit for little ones.', 'd6', false, 7],
  ['g8', 'Woven Textile Close-up', 'Home Textiles', 'Decorative handloom patterns and motifs.', 's3', true, 8],
  ['g9', 'Bridal Tibeb Border', 'Weddings', 'Exquisite gold embroidery for special occasions.', 'd9', false, 9],
]

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function imageRef(assetId, alt = '') {
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: assetId },
    alt,
  }
}

function mimeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (ext === '.png') return 'image/png'
  if (ext === '.webp') return 'image/webp'
  return 'image/jpeg'
}

async function uploadImage(label, relativePath) {
  const absolutePath = path.join(root, relativePath)
  const bytes = await readFile(absolutePath)
  const response = await fetch(
    `https://${projectId}.api.sanity.io/${apiVersion}/assets/images/${dataset}?filename=${encodeURIComponent(path.basename(relativePath))}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': mimeFor(relativePath),
      },
      body: bytes,
    },
  )

  if (!response.ok) {
    throw new Error(`Failed to upload ${label}: ${await response.text()}`)
  }

  const payload = await response.json()
  return payload.document._id
}

async function mutate(mutations) {
  const response = await fetch(
    `https://${projectId}.api.sanity.io/${apiVersion}/data/mutate/${dataset}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mutations }),
    },
  )

  if (!response.ok) {
    throw new Error(`Mutation failed: ${await response.text()}`)
  }

  return response.json()
}

const assets = {}
for (const [label, relativePath] of Object.entries(imageFiles)) {
  assets[label] = await uploadImage(label, relativePath)
  console.log(`Uploaded ${label}`)
}

const categoryMutations = categories.map((title, index) => ({
  createOrReplace: {
    _id: `category.${slugify(title)}`,
    _type: 'category',
    title,
    slug: { _type: 'slug', current: slugify(title) },
    description: '',
    sortOrder: index + 1,
    hidden: false,
  },
}))

const galleryCategoryMutations = ['Dresses', 'Scarves', 'Weddings', 'Children', 'Home Textiles', 'Workshop'].map((title, index) => ({
  createOrReplace: {
    _id: `galleryCategory.${slugify(title)}`,
    _type: 'galleryCategory',
    title,
    slug: { _type: 'slug', current: slugify(title) },
    sortOrder: index + 1,
    hidden: false,
  },
}))

const productMutations = products.map(([id, slug, name, category, priceBirr, priceUsd, imageKey, bestSeller, sortOrder, description]) => ({
  createOrReplace: {
    _id: `product.${id}`,
    _type: 'product',
    name,
    slug: { _type: 'slug', current: slug },
    category: { _type: 'reference', _ref: `category.${slugify(category)}` },
    categoryName: category,
    description,
    price: priceUsd,
    priceBirr,
    priceUsd,
    featuredImage: imageRef(assets[imageKey], name),
    images: [],
    availability: true,
    featured: bestSeller,
    bestSeller,
    sortOrder,
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
  },
}))

const galleryMutations = galleryItems.map(([id, title, filter, caption, imageKey, tall, sortOrder]) => ({
  createOrReplace: {
    _id: `gallery.${id}`,
    _type: 'galleryItem',
    title,
    caption,
    alt: title,
    category: filter,
    filter,
    image: imageRef(assets[imageKey], title),
    tall,
    sortOrder,
  },
}))

const websiteImageMutations = [
  ['home-hero', 'Home hero', 'Homepage hero', 'hero'],
  ['home-heritage', 'Home heritage', 'Homepage heritage image', 'd3'],
  ['home-story', 'Home story', 'Homepage story image', 'shop'],
  ['about-banner', 'About banner', 'About page banner', 'together'],
  ['about-story', 'About story', 'About page story image', 'shop'],
  ['contact-store', 'Contact store', 'Contact page store image', 'shop'],
  ['logo', 'Logo', 'Primary logo', 'logo'],
  ['logo-white', 'White logo', 'Footer and admin logo', 'logoWhite'],
].map(([id, title, placement, imageKey]) => ({
  createOrReplace: {
    _id: `websiteImage.${id}`,
    _type: 'websiteImage',
    title,
    placement,
    alt: title,
    image: imageRef(assets[imageKey], title),
  },
}))

const singletonMutations = [
  {
    createOrReplace: {
      _id: 'homepage',
      _type: 'homepage',
      hero: {
        eyebrow: 'Handwoven in Addis Ababa',
        heading: 'Handcrafted Heritage, Worn with Pride!',
        subtitle:
          'Experience the timeless beauty of Ethiopian textiles, handmade garments, and cultural designs crafted with care in Addis Ababa.',
        buttonText: 'Explore Collection',
        buttonLink: '/shop',
        secondaryButtonText: 'Custom Order',
        secondaryButtonLink: '/custom-order',
        image: imageRef(assets.hero, 'Models wearing elegant handwoven Ethiopian traditional clothing by Beinzirt'),
      },
      heritageEyebrow: 'Our Unique Heritage',
      heritageTitle: 'Exploring the Rich Variety of Ethiopian Textiles',
      heritageText:
        'Discover the captivating stories behind our exquisite Ethiopian cloths. Each piece tells a story of craftsmanship and carries a legacy of artistry.',
      heritageImage: imageRef(assets.d3, 'Close-up of intricate handwoven Ethiopian tibeb textile'),
      storyEyebrow: 'Our Story',
      storyTitle: 'Who We Are',
      storyParagraphs: [
        'Selam, a visionary designer, was inspired by the rich tapestry of Ethiopian culture. She saw the beauty in traditional textiles and the potential to breathe new life into them.',
        "Beinzirt's journey began with a small workshop where skilled artisans transformed handwoven cotton into stunning garments.",
      ],
      storyImage: imageRef(assets.shop, 'Beinzirt flagship store in Addis Ababa'),
      features: [
        { title: 'Handmade with Care', text: 'Every piece is woven, embroidered, or dyed by hand with careful finishing.' },
        { title: 'Inspired by Ethiopian Heritage', text: 'Patterns and techniques passed down through generations of master artisans.' },
        { title: 'Custom Designs Available', text: 'Share your idea and we tailor a bespoke creation made just for you.' },
      ],
      featuredSections: [],
      videoImage: imageRef(assets.shop, 'Beinzirt store and artisan workshop in Addis Ababa'),
    },
  },
  {
    createOrReplace: {
      _id: 'aboutPage',
      _type: 'aboutPage',
      bannerImage: imageRef(assets.together, 'Beinzirt handmade Ethiopian clothing'),
      storyImage: imageRef(assets.shop, 'Beinzirt store'),
      mission:
        'To celebrate Ethiopian heritage through handmade fashion and home textiles that create lasting value for customers and artisans.',
      vision:
        'To become a globally recognized Ethiopian luxury craft house rooted in culture, quality, and women-led artistry.',
      storyParagraphs: [
        'Selam, a visionary designer, was inspired by the rich tapestry of Ethiopian culture.',
        "Beinzirt's journey began with a small workshop where skilled artisans transformed handwoven cotton into stunning garments.",
        "Selam's vision extends beyond fashion. She is committed to empowering women by providing training and opportunities.",
        'Today, Beinzirt has grown into a thriving business offering elegant dresses, scarves, and custom textile pieces.',
      ],
      values: [
        { title: 'Handmade Quality', description: 'Every piece is carefully crafted with attention to detail, comfort, and lasting beauty.' },
        { title: 'Cultural Heritage', description: 'Our designs celebrate Ethiopian identity through patterns, textures, and traditional craftsmanship.' },
        { title: 'Women Empowerment', description: 'Beinzirt supports local artisans and creates opportunities for skilled women in the community.' },
        { title: 'Custom Creations', description: 'From weddings to everyday wear, we create personalized pieces that match your vision.' },
      ],
    },
  },
  {
    createOrReplace: {
      _id: 'contactPage',
      _type: 'contactPage',
      storeImage: imageRef(assets.shop, 'Beinzirt store'),
      address: contactInfo.location,
      email: contactInfo.email,
      phone: contactInfo.phone,
      hours: contactInfo.hours,
      mapIframe,
      socialLinks,
    },
  },
  {
    createOrReplace: {
      _id: 'footer',
      _type: 'footer',
      logo: imageRef(assets.logoWhite, 'Beinzirt logo'),
      description: 'Handmade Ethiopian traditional clothing and textiles crafted with pride in Addis Ababa.',
      copyright: 'Copyright © 2026 Beinzirt Design. All rights reserved.',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Shop', href: '/shop' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'Custom Order', href: '/custom-order' },
        { label: 'Contact', href: '/contact' },
      ],
      socialLinks,
      contactInfo,
    },
  },
  {
    createOrReplace: {
      _id: 'siteSettings',
      _type: 'siteSettings',
      siteTitle: 'Beinzirt Design | Ethiopian Traditional Clothing in Addis Ababa',
      metaDescription:
        'Discover handmade Ethiopian traditional clothing, dresses, scarves, home textiles, and custom designs crafted by Beinzirt Design in Addis Ababa.',
      openGraphImage: imageRef(assets.hero, 'Beinzirt Design'),
      structuredData: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Store',
        name: 'Beinzirt Design',
        address: contactInfo.location,
        telephone: contactInfo.phone,
        url: 'https://beinzirt.com',
      }),
    },
  },
]

const allMutations = [
  ...categoryMutations,
  ...galleryCategoryMutations,
  ...productMutations,
  ...galleryMutations,
  ...websiteImageMutations,
  ...singletonMutations,
]

for (let index = 0; index < allMutations.length; index += 25) {
  await mutate(allMutations.slice(index, index + 25))
}

console.log(`Seeded ${categoryMutations.length} categories, ${productMutations.length} products, ${galleryMutations.length} gallery items, and ${websiteImageMutations.length} website images.`)
