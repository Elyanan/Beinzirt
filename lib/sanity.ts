import {
  GOOGLE_MAPS_EMBED,
  aboutParagraphs,
  aboutValues,
  categories as fallbackCategoryNames,
  contactInfo,
  galleryItems as fallbackGalleryItems,
  homeCategories,
  products as fallbackProducts,
  useCases,
  type GalleryFilter,
  type GalleryItem,
  type Product,
} from '@/lib/data'
import { IMAGE_FALLBACK, LOGO, pageImages } from '@/lib/images'

const apiVersion = 'v2025-02-19'
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

export const storefrontCategoryNames = ['Dresses', 'Scarves']

export type CmsCategory = {
  id: string
  title: string
  slug: string
  description?: string
  sortOrder: number
  hidden: boolean
  createdAt?: string
  updatedAt?: string
}

export type CmsImage = {
  url: string
  alt?: string
  assetRef?: string
}

export type ProductAdmin = Product & {
  imageAlt?: string
  imageRef?: string
  galleryImages?: CmsImage[]
}

export type SiteHero = {
  eyebrow: string
  heading: string
  subtitle: string
  buttonText: string
  buttonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  image: string
  imageAlt: string
}

export type HomepageContent = {
  hero: SiteHero
  heritageTitle: string
  heritageEyebrow: string
  heritageText: string
  heritageImage: string
  storyTitle: string
  storyEyebrow: string
  storyParagraphs: string[]
  storyImage: string
  features: { title: string; text: string }[]
  featuredSections: { title: string; text: string; image: string }[]
  useCases: typeof useCases
  videoImage: string
}

export type AboutContent = {
  bannerImage: string
  storyImage: string
  mission: string
  vision: string
  storyParagraphs: string[]
  values: typeof aboutValues
}

export type ContactContent = {
  storeImage: string
  address: string
  email: string
  phone: string
  hours: string
  mapIframe: string
  socialLinks: { label: string; href: string }[]
}

export type FooterContent = {
  logo: string
  description: string
  copyright: string
  links: { label: string; href: string }[]
  socialLinks: { label: string; href: string }[]
  contactInfo: {
    phone: string
    email: string
    location: string
    hours: string
  }
}

export type OrderLineItem = {
  productId: string
  name: string
  category: string
  quantity: number
  price: number
  subtotal: number
  image?: string
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'

export type CustomerOrder = {
  id: string
  orderId: string
  customerName: string
  phone: string
  email: string
  address: string
  notes?: string
  items: OrderLineItem[]
  total: number
  timestamp: string
  status: OrderStatus
}

export type DashboardStats = {
  totalProducts: number
  totalCategories: number
  galleryImages: number
  websiteImages: number
  totalOrders: number
  recentOrders: CustomerOrder[]
  recentProducts: ProductAdmin[]
}

export function isSanityConfigured() {
  return Boolean(projectId && dataset)
}

export function canWriteSanity() {
  return Boolean(projectId && dataset && token)
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function queryUrl(query: string, params?: Record<string, string | number | boolean>) {
  const url = new URL(`https://${projectId}.api.sanity.io/${apiVersion}/data/query/${dataset}`)
  url.searchParams.set('query', query)
  Object.entries(params ?? {}).forEach(([key, value]) => {
    url.searchParams.set(`$${key}`, JSON.stringify(value))
  })
  return url
}

async function sanityQuery<T>(
  query: string,
  params?: Record<string, string | number | boolean>,
  options: RequestInit = {},
): Promise<T | null> {
  if (!isSanityConfigured()) return null

  try {
    const headers = new Headers(options.headers)
    if (token) headers.set('Authorization', `Bearer ${token}`)
    const response = await fetch(queryUrl(query, params), {
      ...options,
      headers,
      next: options.cache === 'no-store' ? undefined : { revalidate: 60 },
    })

    if (!response.ok) return null
    const payload = (await response.json()) as { result?: T }
    return payload.result ?? null
  } catch {
    return null
  }
}

export async function sanityMutate(mutations: unknown[]) {
  if (!canWriteSanity()) {
    throw new Error('Sanity write access is not configured. Check SANITY_API_TOKEN.')
  }

  const response = await fetch(
    `https://${projectId}.api.sanity.io/${apiVersion}/data/mutate/${dataset}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mutations }),
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Sanity mutation failed.')
  }

  return response.json()
}

export async function uploadSanityImage(file: File) {
  if (!canWriteSanity()) {
    throw new Error('Sanity image upload is not configured. Check SANITY_API_TOKEN.')
  }

  if (!file.size) return null

  const response = await fetch(
    `https://${projectId}.api.sanity.io/${apiVersion}/assets/images/${dataset}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': file.type || 'application/octet-stream',
      },
      body: file,
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Image upload failed.')
  }

  const payload = (await response.json()) as { document?: { _id: string; url: string } }
  return payload.document ? { assetRef: payload.document._id, url: payload.document.url } : null
}

function imageField(assetRef?: string, alt?: string) {
  if (!assetRef) return undefined
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: assetRef },
    alt: alt || '',
  }
}

export function imageReference(assetRef?: string, alt?: string) {
  return imageField(assetRef, alt)
}

function normalizeCategory(item: any, index = 0): CmsCategory {
  const title = item?.title ?? String(item ?? '')
  return {
    id: item?._id ?? `category.${slugify(title)}`,
    title,
    slug: item?.slug?.current ?? item?.slug ?? slugify(title),
    description: item?.description ?? '',
    sortOrder: Number(item?.sortOrder ?? index + 1),
    hidden: Boolean(item?.hidden),
    createdAt: item?._createdAt,
    updatedAt: item?._updatedAt,
  }
}

function fallbackCategories() {
  return fallbackCategoryNames.map((title, index) =>
    normalizeCategory(
      {
        _id: `category.${slugify(title)}`,
        title,
        slug: { current: slugify(title) },
        sortOrder: index + 1,
        hidden: false,
      },
      index,
    ),
  )
}

function normalizeImage(item: any): CmsImage | null {
  const url = item?.url ?? item?.asset?.url ?? item?.image ?? item
  if (!url || typeof url !== 'string') return null
  return {
    url,
    alt: item?.alt ?? '',
    assetRef: item?.assetRef ?? item?.asset?._ref ?? item?.asset?.assetRef,
  }
}

function normalizeProduct(item: any): ProductAdmin {
  const images = Array.isArray(item?.images)
    ? item.images.map(normalizeImage).filter(Boolean) as CmsImage[]
    : []
  const mainImage = item?.image ?? item?.featuredImageUrl ?? images[0]?.url ?? IMAGE_FALLBACK
  const category = item?.category ?? item?.categoryTitle ?? item?.categoryName ?? ''

  return {
    id: item?._id ?? item?.id ?? slugify(item?.name ?? 'product'),
    slug: item?.slug?.current ?? item?.slug ?? slugify(item?.name ?? 'product'),
    name: item?.name ?? 'Untitled product',
    category,
    price: Number(item?.price ?? 0),
    image: mainImage,
    imageAlt: item?.imageAlt ?? item?.featuredImageAlt ?? item?.name ?? 'Product image',
    imageRef: item?.featuredImageRef,
    images: images.map((image) => image.url),
    galleryImages: images,
    description: item?.description ?? '',
    availability: item?.availability !== false,
    featured: Boolean(item?.featured),
    sortOrder: Number(item?.sortOrder ?? 999),
    createdAt: item?._createdAt ?? item?.createdAt,
    updatedAt: item?._updatedAt ?? item?.updatedAt,
  }
}

function normalizeGalleryItem(item: any, index = 0): GalleryItem {
  return {
    id: item?._id ?? item?.id ?? `gallery.${index + 1}`,
    image: item?.image ?? item?.imageUrl ?? IMAGE_FALLBACK,
    filter: (item?.filter ?? 'All') as GalleryFilter,
    category: item?.category ?? item?.filter ?? 'Gallery',
    title: item?.title ?? 'Gallery image',
    caption: item?.caption ?? '',
    alt: item?.alt ?? item?.title ?? 'Beinzirt gallery image',
    imageRef: item?.imageRef,
    tall: Boolean(item?.tall),
    sortOrder: Number(item?.sortOrder ?? index + 1),
  }
}

function normalizeOrder(item: any): CustomerOrder {
  return {
    id: item?._id ?? item?.id ?? '',
    orderId: item?.orderId ?? item?._id ?? '',
    customerName: item?.customerName ?? '',
    phone: item?.phone ?? '',
    email: item?.email ?? '',
    address: item?.address ?? '',
    notes: item?.notes ?? '',
    items: Array.isArray(item?.items) ? item.items : [],
    total: Number(item?.total ?? 0),
    timestamp: item?.timestamp ?? item?._createdAt ?? new Date().toISOString(),
    status: (item?.status ?? 'Pending') as OrderStatus,
  }
}

function mergeSocialLinks(links?: { label: string; href: string }[]) {
  const byLabel = new Map(
    (links ?? [])
      .filter((link) => link?.label && link?.href)
      .map((link) => [link.label.toLowerCase(), link]),
  )

  contactInfo.socialLinks.forEach((link) => {
    if (!byLabel.has(link.label.toLowerCase())) {
      byLabel.set(link.label.toLowerCase(), link)
    }
  })

  return contactInfo.socialLinks.map(
    (fallback) => byLabel.get(fallback.label.toLowerCase()) ?? fallback,
  )
}

export async function getCategories(options?: { includeHidden?: boolean }) {
  const query = `*[_type == "category"] | order(sortOrder asc, title asc) {
    _id, title, slug, description, sortOrder, hidden, _createdAt, _updatedAt
  }`
  const docs = await sanityQuery<any[]>(query, undefined, { cache: 'no-store' })
  const categories = docs?.length ? docs.map(normalizeCategory) : fallbackCategories()
  return options?.includeHidden ? categories : categories.filter((item) => !item.hidden)
}

export async function getStorefrontProducts() {
  const query = `*[_type == "product" && availability != false && coalesce(category->title, categoryName) in ["Dresses", "Scarves"]] | order(sortOrder asc, _createdAt desc) {
    _id, name, slug, description, price, availability, featured, sortOrder, _createdAt, _updatedAt,
    "category": coalesce(category->title, categoryName),
    "image": featuredImage.asset->url,
    "imageAlt": featuredImage.alt,
    "featuredImageRef": featuredImage.asset._ref,
    "images": images[]{ "url": asset->url, "alt": alt, "assetRef": asset._ref }
  }`
  const docs = await sanityQuery<any[]>(query)
  const products = docs?.length ? docs.map(normalizeProduct) : fallbackProducts.map(normalizeProduct)
  return products
    .filter((item) => storefrontCategoryNames.includes(item.category))
    .filter((item) => item.availability !== false)
    .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999))
}

export async function getAdminProducts() {
  const query = `*[_type == "product"] | order(sortOrder asc, _createdAt desc) {
    _id, name, slug, description, price, availability, featured, sortOrder, _createdAt, _updatedAt,
    "category": coalesce(category->title, categoryName),
    "image": featuredImage.asset->url,
    "imageAlt": featuredImage.alt,
    "featuredImageRef": featuredImage.asset._ref,
    "images": images[]{ "url": asset->url, "alt": alt, "assetRef": asset._ref }
  }`
  const docs = await sanityQuery<any[]>(query, undefined, { cache: 'no-store' })
  return docs?.length ? docs.map(normalizeProduct) : fallbackProducts.map(normalizeProduct)
}

export async function getProductById(id: string) {
  const query = `*[_type == "product" && _id == $id][0] {
    _id, name, slug, description, price, availability, featured, sortOrder, _createdAt, _updatedAt,
    "category": coalesce(category->title, categoryName),
    "image": featuredImage.asset->url,
    "imageAlt": featuredImage.alt,
    "featuredImageRef": featuredImage.asset._ref,
    "images": images[]{ "url": asset->url, "alt": alt, "assetRef": asset._ref }
  }`
  const doc = await sanityQuery<any>(query, { id }, { cache: 'no-store' })
  return doc ? normalizeProduct(doc) : fallbackProducts.map(normalizeProduct).find((item) => item.id === id) ?? null
}

export async function getGalleryItems() {
  const query = `*[_type == "galleryItem"] | order(sortOrder asc, _createdAt desc) {
    _id, title, caption, alt, category, filter, tall, sortOrder,
    "image": image.asset->url,
    "imageRef": image.asset._ref
  }`
  const docs = await sanityQuery<any[]>(query)
  return docs?.length ? docs.map(normalizeGalleryItem) : fallbackGalleryItems
}

export const fallbackHomepage: HomepageContent = {
  hero: {
    eyebrow: 'Handwoven in Addis Ababa',
    heading: 'Handcrafted Heritage, Worn with Pride!',
    subtitle:
      'Experience the timeless beauty of Ethiopian textiles, handmade garments, and cultural designs crafted with care in Addis Ababa.',
    buttonText: 'Explore Collection',
    buttonLink: '/shop',
    secondaryButtonText: 'Custom Order',
    secondaryButtonLink: '/custom-order',
    image: pageImages.homeHero,
    imageAlt: 'Models wearing elegant handwoven Ethiopian traditional clothing by Beinzirt',
  },
  heritageTitle: 'Exploring the Rich Variety of Ethiopian Textiles',
  heritageEyebrow: 'Our Unique Heritage',
  heritageText:
    'Discover the captivating stories behind our exquisite Ethiopian cloths. Each piece tells a story of craftsmanship and carries a legacy of artistry.',
  heritageImage: pageImages.homeHeritage,
  storyTitle: 'Who We Are',
  storyEyebrow: 'Our Story',
  storyParagraphs: aboutParagraphs.slice(0, 2),
  storyImage: pageImages.homeStory,
  features: [
    {
      title: 'Handmade with Care',
      text: 'Every piece is woven, embroidered, or dyed by hand with careful finishing.',
    },
    {
      title: 'Inspired by Ethiopian Heritage',
      text: 'Patterns and techniques passed down through generations of master artisans.',
    },
    {
      title: 'Custom Designs Available',
      text: 'Share your idea and we tailor a bespoke creation made just for you.',
    },
  ],
  featuredSections: homeCategories.map((item) => ({
    title: item.name,
    text: 'Handcrafted with Ethiopian heritage.',
    image: item.image,
  })),
  useCases,
  videoImage: pageImages.homeVideo,
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const query = `*[_type == "homepage"][0] {
    hero{
      eyebrow, heading, subtitle, buttonText, buttonLink, secondaryButtonText, secondaryButtonLink,
      "image": image.asset->url, "imageAlt": image.alt
    },
    heritageTitle, heritageEyebrow, heritageText, "heritageImage": heritageImage.asset->url,
    storyTitle, storyEyebrow, storyParagraphs, "storyImage": storyImage.asset->url,
    features[]{title, text},
    featuredSections[]{title, text, "image": image.asset->url},
    "videoImage": videoImage.asset->url
  }`
  const doc = await sanityQuery<any>(query)
  if (!doc) return fallbackHomepage

  return {
    ...fallbackHomepage,
    ...doc,
    hero: {
      ...fallbackHomepage.hero,
      ...(doc.hero ?? {}),
      image: doc.hero?.image ?? fallbackHomepage.hero.image,
      imageAlt: doc.hero?.imageAlt ?? fallbackHomepage.hero.imageAlt,
    },
    heritageImage: doc.heritageImage ?? fallbackHomepage.heritageImage,
    storyImage: doc.storyImage ?? fallbackHomepage.storyImage,
    videoImage: doc.videoImage ?? fallbackHomepage.videoImage,
    features: doc.features?.length ? doc.features : fallbackHomepage.features,
    featuredSections: doc.featuredSections?.length
      ? doc.featuredSections
      : fallbackHomepage.featuredSections,
    useCases: fallbackHomepage.useCases,
  } satisfies HomepageContent
}

export const fallbackAbout: AboutContent = {
  bannerImage: pageImages.aboutBanner,
  storyImage: pageImages.aboutStory,
  mission:
    'To celebrate Ethiopian heritage through handmade fashion and home textiles that create lasting value for customers and artisans.',
  vision:
    'To become a globally recognized Ethiopian luxury craft house rooted in culture, quality, and women-led artistry.',
  storyParagraphs: aboutParagraphs,
  values: aboutValues,
}

export async function getAboutContent(): Promise<AboutContent> {
  const query = `*[_type == "aboutPage"][0] {
    mission, vision, storyParagraphs, values[]{title, description},
    "bannerImage": bannerImage.asset->url,
    "storyImage": storyImage.asset->url
  }`
  const doc = await sanityQuery<any>(query)
  if (!doc) return fallbackAbout
  return {
    ...fallbackAbout,
    ...doc,
    bannerImage: doc.bannerImage ?? fallbackAbout.bannerImage,
    storyImage: doc.storyImage ?? fallbackAbout.storyImage,
    storyParagraphs: doc.storyParagraphs?.length ? doc.storyParagraphs : fallbackAbout.storyParagraphs,
    values: doc.values?.length ? doc.values : fallbackAbout.values,
  } satisfies AboutContent
}

export const fallbackContact: ContactContent = {
  storeImage: pageImages.contactStore,
  address: contactInfo.location,
  email: contactInfo.email,
  phone: contactInfo.phone,
  hours: contactInfo.hours,
  mapIframe: GOOGLE_MAPS_EMBED,
  socialLinks: contactInfo.socialLinks,
}

export async function getContactContent(): Promise<ContactContent> {
  const query = `*[_type == "contactPage"][0] {
    address, email, phone, hours, mapIframe, socialLinks[]{label, href},
    "storeImage": storeImage.asset->url
  }`
  const doc = await sanityQuery<any>(query)
  if (!doc) return fallbackContact
  return {
    ...fallbackContact,
    ...doc,
    storeImage: doc.storeImage ?? fallbackContact.storeImage,
    socialLinks: mergeSocialLinks(doc.socialLinks),
  } satisfies ContactContent
}

export const fallbackFooter: FooterContent = {
  logo: LOGO,
  description: 'Handmade Ethiopian traditional clothing and textiles crafted with pride in Addis Ababa.',
  copyright: 'Copyright © 2026 Beinzirt Design. All rights reserved.',
  links: [
    { label: 'About', href: '/about' },
    { label: 'Shop', href: '/shop' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Custom Order', href: '/custom-order' },
    { label: 'Contact', href: '/contact' },
  ],
  socialLinks: contactInfo.socialLinks,
  contactInfo: {
    phone: contactInfo.phone,
    email: contactInfo.email,
    location: contactInfo.location,
    hours: contactInfo.hours,
  },
}

export async function getFooterContent(): Promise<FooterContent> {
  const query = `*[_type == "footer"][0] {
    description, copyright, links[]{label, href}, socialLinks[]{label, href},
    contactInfo{phone, email, location, hours},
    "logo": logo.asset->url
  }`
  const doc = await sanityQuery<any>(query)
  if (!doc) return fallbackFooter
  return {
    ...fallbackFooter,
    ...doc,
    logo: doc.logo ?? fallbackFooter.logo,
    links: doc.links?.length ? doc.links : fallbackFooter.links,
    socialLinks: mergeSocialLinks(doc.socialLinks),
    contactInfo: { ...fallbackFooter.contactInfo, ...(doc.contactInfo ?? {}) },
  } satisfies FooterContent
}

export async function getOrders() {
  const query = `*[_type == "order"] | order(timestamp desc) {
    _id, orderId, customerName, phone, email, address, notes, items, total, timestamp, status
  }`
  const docs = await sanityQuery<any[]>(query, undefined, { cache: 'no-store' })
  return docs?.map(normalizeOrder) ?? []
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const query = `{
    "totalProducts": count(*[_type == "product"]),
    "totalCategories": count(*[_type == "category"]),
    "galleryImages": count(*[_type == "galleryItem"]),
    "websiteImages": count(*[_type == "websiteImage"]),
    "totalOrders": count(*[_type == "order"]),
    "recentOrders": *[_type == "order"] | order(timestamp desc)[0...5] {
      _id, orderId, customerName, phone, email, address, notes, items, total, timestamp, status
    },
    "recentProducts": *[_type == "product"] | order(_createdAt desc)[0...5] {
      _id, name, slug, description, price, availability, featured, sortOrder, _createdAt, _updatedAt,
      "category": coalesce(category->title, categoryName),
      "image": featuredImage.asset->url
    }
  }`
  const doc = await sanityQuery<any>(query, undefined, { cache: 'no-store' })
  if (!doc) {
    return {
      totalProducts: fallbackProducts.length,
      totalCategories: fallbackCategoryNames.length,
      galleryImages: fallbackGalleryItems.length,
      websiteImages: 8,
      totalOrders: 0,
      recentOrders: [],
      recentProducts: fallbackProducts.slice(0, 5).map(normalizeProduct),
    }
  }

  return {
    totalProducts: Number(doc.totalProducts ?? 0),
    totalCategories: Number(doc.totalCategories ?? 0),
    galleryImages: Number(doc.galleryImages ?? 0),
    websiteImages: Number(doc.websiteImages ?? 0),
    totalOrders: Number(doc.totalOrders ?? 0),
    recentOrders: (doc.recentOrders ?? []).map(normalizeOrder),
    recentProducts: (doc.recentProducts ?? []).map(normalizeProduct),
  }
}

export async function ensureCategory(title: string) {
  const slug = slugify(title)
  const existing = await sanityQuery<{ _id: string }>(
    `*[_type == "category" && slug.current == $slug][0]{ _id }`,
    { slug },
    { cache: 'no-store' },
  )
  if (existing?._id) return existing._id

  const id = `category.${slug}`
  await sanityMutate([
    {
      createIfNotExists: {
        _id: id,
        _type: 'category',
        title,
        slug: { _type: 'slug', current: slug },
        sortOrder: fallbackCategoryNames.indexOf(title as any) + 1 || 999,
        hidden: false,
      },
    },
  ])
  return id
}

export async function seedRequiredCategories() {
  await sanityMutate(
    fallbackCategoryNames.map((title, index) => ({
      createIfNotExists: {
        _id: `category.${slugify(title)}`,
        _type: 'category',
        title,
        slug: { _type: 'slug', current: slugify(title) },
        sortOrder: index + 1,
        hidden: false,
      },
    })),
  )
}
