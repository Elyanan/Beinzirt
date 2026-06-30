'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  createAdminSessionToken,
  verifyAdminCredentials,
  verifyAdminSession,
} from '@/lib/admin-auth'
import {
  ensureCategory,
  imageReference,
  sanityMutate,
  seedRequiredCategories,
  slugify,
  uploadSanityImage,
  type CustomOrderStatus,
  type OrderStatus,
} from '@/lib/sanity'

async function assertAdmin() {
  const cookieStore = await cookies()
  const authenticated = await verifyAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)
  if (!authenticated) throw new Error('Unauthorized admin request.')
}

function text(formData: FormData, key: string, fallback = '') {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : fallback
}

function numberField(formData: FormData, key: string, fallback = 0) {
  const value = Number(text(formData, key))
  return Number.isFinite(value) ? value : fallback
}

function checkbox(formData: FormData, key: string) {
  return formData.get(key) === 'on'
}

function fileField(formData: FormData, key: string) {
  const file = formData.get(key)
  return file instanceof File && file.size > 0 ? file : null
}

function lines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
}

async function uploadImageFromForm(formData: FormData, key: string, alt = '') {
  const file = fileField(formData, key)
  if (!file) return null
  const uploaded = await uploadSanityImage(file)
  return uploaded ? imageReference(uploaded.assetRef, alt) : null
}

export async function loginAction(formData: FormData) {
  const username = text(formData, 'username')
  const password = text(formData, 'password')
  const next = text(formData, 'next', '/admin/dashboard')

  if (!verifyAdminCredentials(username, password)) {
    redirect('/admin/login?error=Invalid%20username%20or%20password')
  }

  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE, await createAdminSessionToken(), adminCookieOptions())
  redirect(next.startsWith('/admin') ? next : '/admin/dashboard')
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE)
  redirect('/admin/login')
}

export async function saveProductAction(formData: FormData) {
  await assertAdmin()

  const name = text(formData, 'name')
  const slug = slugify(text(formData, 'slug', name))
  const id = text(formData, 'id') || `product.${slug}-${Date.now()}`
  const categoryTitle = text(formData, 'category', 'Dresses')
  const categoryId = await ensureCategory(categoryTitle)
  const imageAlt = text(formData, 'imageAlt', name)
  const existingFeaturedImageRef = text(formData, 'existingFeaturedImageRef')
  const uploadedFeatured = await uploadImageFromForm(formData, 'featuredImage', imageAlt)
  const featuredImage = uploadedFeatured ?? imageReference(existingFeaturedImageRef, imageAlt)

  await sanityMutate([
    {
      createOrReplace: {
        _id: id,
        _type: 'product',
        name,
        slug: { _type: 'slug', current: slug },
        category: { _type: 'reference', _ref: categoryId },
        categoryName: categoryTitle,
        description: text(formData, 'description'),
        price: numberField(formData, 'priceUsd'),
        priceBirr: numberField(formData, 'priceBirr'),
        priceUsd: numberField(formData, 'priceUsd'),
        featuredImage,
        images: [],
        availability: checkbox(formData, 'availability'),
        featured: checkbox(formData, 'bestSeller'),
        bestSeller: checkbox(formData, 'bestSeller'),
        sortOrder: numberField(formData, 'sortOrder', 999),
        updatedDate: new Date().toISOString(),
      },
    },
  ])

  revalidatePath('/')
  revalidatePath('/shop')
  revalidatePath('/admin/products')
  redirect('/admin/products')
}

export async function deleteProductAction(formData: FormData) {
  await assertAdmin()
  const id = text(formData, 'id')
  if (id) await sanityMutate([{ delete: { id } }])
  revalidatePath('/shop')
  revalidatePath('/admin/products')
}

export async function saveCategoryAction(formData: FormData) {
  await assertAdmin()
  const title = text(formData, 'title')
  const slug = slugify(text(formData, 'slug', title))
  const id = text(formData, 'id') || `category.${slug}`

  await sanityMutate([
    {
      createOrReplace: {
        _id: id,
        _type: 'category',
        title,
        slug: { _type: 'slug', current: slug },
        description: text(formData, 'description'),
        sortOrder: numberField(formData, 'sortOrder', 999),
        hidden: checkbox(formData, 'hidden'),
        updatedDate: new Date().toISOString(),
      },
    },
  ])

  revalidatePath('/shop')
  revalidatePath('/admin/categories')
}

export async function deleteCategoryAction(formData: FormData) {
  await assertAdmin()
  const id = text(formData, 'id')
  if (id) await sanityMutate([{ delete: { id } }])
  revalidatePath('/shop')
  revalidatePath('/admin/categories')
}

export async function seedCategoriesAction() {
  await assertAdmin()
  await seedRequiredCategories()
  revalidatePath('/shop')
  revalidatePath('/admin/categories')
}

export async function saveGalleryItemAction(formData: FormData) {
  await assertAdmin()
  const title = text(formData, 'title')
  const id = text(formData, 'id') || `gallery.${slugify(title)}-${Date.now()}`
  const existingImageRef = text(formData, 'existingImageRef')
  const uploadedImage = await uploadImageFromForm(formData, 'image', text(formData, 'alt', title))
  const image = uploadedImage ?? imageReference(existingImageRef, text(formData, 'alt', title))

  await sanityMutate([
    {
      createOrReplace: {
        _id: id,
        _type: 'galleryItem',
        title,
        caption: text(formData, 'caption'),
        alt: text(formData, 'alt', title),
        category: text(formData, 'category', 'Gallery'),
        filter: text(formData, 'filter', 'All'),
        sortOrder: numberField(formData, 'sortOrder', 999),
        tall: checkbox(formData, 'tall'),
        image,
        updatedDate: new Date().toISOString(),
      },
    },
  ])

  revalidatePath('/gallery')
  revalidatePath('/admin/gallery')
}

export async function deleteGalleryItemAction(formData: FormData) {
  await assertAdmin()
  const id = text(formData, 'id')
  if (id) await sanityMutate([{ delete: { id } }])
  revalidatePath('/gallery')
  revalidatePath('/admin/gallery')
}

export async function saveGalleryCategoryAction(formData: FormData) {
  await assertAdmin()
  const title = text(formData, 'title')
  const slug = slugify(text(formData, 'slug', title))
  const id = text(formData, 'id') || `galleryCategory.${slug}`

  await sanityMutate([
    {
      createOrReplace: {
        _id: id,
        _type: 'galleryCategory',
        title,
        slug: { _type: 'slug', current: slug },
        sortOrder: numberField(formData, 'sortOrder', 999),
        hidden: checkbox(formData, 'hidden'),
        updatedDate: new Date().toISOString(),
      },
    },
  ])

  revalidatePath('/gallery')
  revalidatePath('/admin/gallery')
}

export async function deleteGalleryCategoryAction(formData: FormData) {
  await assertAdmin()
  const id = text(formData, 'id')
  if (id) await sanityMutate([{ delete: { id } }])
  revalidatePath('/gallery')
  revalidatePath('/admin/gallery')
}

export async function updateOrderStatusAction(formData: FormData) {
  await assertAdmin()
  const id = text(formData, 'id')
  const status = text(formData, 'status', 'Pending') as OrderStatus
  if (id) {
    await sanityMutate([{ patch: { id, set: { status, updatedDate: new Date().toISOString() } } }])
  }
  revalidatePath('/admin/orders')
  revalidatePath('/admin/dashboard')
}

export async function deleteOrderAction(formData: FormData) {
  await assertAdmin()
  const id = text(formData, 'id')
  if (id) await sanityMutate([{ delete: { id } }])
  revalidatePath('/admin/orders')
  revalidatePath('/admin/dashboard')
}

export async function updateCustomOrderStatusAction(formData: FormData) {
  await assertAdmin()
  const id = text(formData, 'id')
  const status = text(formData, 'status', 'Pending') as CustomOrderStatus
  if (id) {
    await sanityMutate([{ patch: { id, set: { status, updatedDate: new Date().toISOString() } } }])
  }
  revalidatePath('/admin/custom-orders')
  revalidatePath('/admin/dashboard')
}

export async function deleteCustomOrderAction(formData: FormData) {
  await assertAdmin()
  const id = text(formData, 'id')
  if (id) await sanityMutate([{ delete: { id } }])
  revalidatePath('/admin/custom-orders')
  revalidatePath('/admin/dashboard')
}

export async function saveHomepageAction(formData: FormData) {
  await assertAdmin()
  const set: Record<string, unknown> = {
    'hero.eyebrow': text(formData, 'heroEyebrow'),
    'hero.heading': text(formData, 'heroHeading'),
    'hero.subtitle': text(formData, 'heroSubtitle'),
    'hero.buttonText': text(formData, 'heroButtonText'),
    'hero.buttonLink': text(formData, 'heroButtonLink'),
    'hero.secondaryButtonText': text(formData, 'heroSecondaryButtonText'),
    'hero.secondaryButtonLink': text(formData, 'heroSecondaryButtonLink'),
    heritageEyebrow: text(formData, 'heritageEyebrow'),
    heritageTitle: text(formData, 'heritageTitle'),
    heritageText: text(formData, 'heritageText'),
    storyEyebrow: text(formData, 'storyEyebrow'),
    storyTitle: text(formData, 'storyTitle'),
    storyParagraphs: lines(text(formData, 'storyParagraphs')),
  }

  const heroImage = await uploadImageFromForm(formData, 'heroImage', text(formData, 'heroImageAlt'))
  if (checkbox(formData, 'deleteHeroImage')) set['hero.image'] = null
  if (heroImage) set['hero.image'] = heroImage

  await sanityMutate([
    { createIfNotExists: { _id: 'homepage', _type: 'homepage' } },
    { patch: { id: 'homepage', set } },
  ])

  revalidatePath('/')
  revalidatePath('/admin/content')
}

export async function saveAboutAction(formData: FormData) {
  await assertAdmin()
  const set: Record<string, unknown> = {
    mission: text(formData, 'mission'),
    vision: text(formData, 'vision'),
    storyParagraphs: lines(text(formData, 'storyParagraphs')),
  }

  const bannerImage = await uploadImageFromForm(formData, 'bannerImage', 'About Beinzirt')
  const storyImage = await uploadImageFromForm(formData, 'storyImage', 'Beinzirt story')
  if (checkbox(formData, 'deleteBannerImage')) set.bannerImage = null
  if (checkbox(formData, 'deleteStoryImage')) set.storyImage = null
  if (bannerImage) set.bannerImage = bannerImage
  if (storyImage) set.storyImage = storyImage

  await sanityMutate([
    { createIfNotExists: { _id: 'aboutPage', _type: 'aboutPage' } },
    { patch: { id: 'aboutPage', set } },
  ])

  revalidatePath('/about')
  revalidatePath('/admin/content')
}

export async function saveContactAction(formData: FormData) {
  await assertAdmin()
  const set: Record<string, unknown> = {
    address: text(formData, 'address'),
    email: text(formData, 'email'),
    phone: text(formData, 'phone'),
    hours: text(formData, 'hours'),
    mapIframe: text(formData, 'mapIframe'),
    socialLinks: [
      { label: 'Instagram', href: text(formData, 'instagram') },
      { label: 'Facebook', href: text(formData, 'facebook') },
      { label: 'TikTok', href: text(formData, 'tiktok') },
      { label: 'Pinterest', href: text(formData, 'pinterest') },
      { label: 'Telegram Channel', href: text(formData, 'telegram') },
      { label: 'WhatsApp', href: text(formData, 'whatsapp') },
    ].filter((link) => link.href),
  }

  const storeImage = await uploadImageFromForm(formData, 'storeImage', 'Beinzirt store')
  if (checkbox(formData, 'deleteStoreImage')) set.storeImage = null
  if (storeImage) set.storeImage = storeImage

  await sanityMutate([
    { createIfNotExists: { _id: 'contactPage', _type: 'contactPage' } },
    { patch: { id: 'contactPage', set } },
  ])

  revalidatePath('/contact')
  revalidatePath('/admin/content')
}

export async function saveFooterAction(formData: FormData) {
  await assertAdmin()
  const set: Record<string, unknown> = {
    description: text(formData, 'description'),
    copyright: text(formData, 'copyright'),
    contactInfo: {
      phone: text(formData, 'phone'),
      email: text(formData, 'email'),
      location: text(formData, 'location'),
      hours: text(formData, 'hours'),
    },
  }

  const logo = await uploadImageFromForm(formData, 'logo', 'Beinzirt logo')
  if (checkbox(formData, 'deleteLogo')) set.logo = null
  if (logo) set.logo = logo

  await sanityMutate([
    { createIfNotExists: { _id: 'footer', _type: 'footer' } },
    { patch: { id: 'footer', set } },
  ])

  revalidatePath('/')
  revalidatePath('/admin/content')
}
