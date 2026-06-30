/** Central image paths — all assets live under public/ */
export const LOGO = '/logo.png'
export const LOGO_WHITE = '/logo-white.png'

export const images = {
  logo: LOGO,
  hero: '/images/hero.jpg',
  lifestyle: '/images/together-1-min.jpg',
  shop: '/images/shop-min.jpg',
  dresses: {
    d1: '/images/dress-1-min.jpg',
    d2: '/images/dress-2-min.jpg',
    d3: '/images/dress-3-min.jpg',
    d4: '/images/dress-4-min.jpg',
    d5: '/images/dress-5-min.jpg',
    d6: '/images/dress-6-min.jpg',
    d7: '/images/dress-7-min.jpg',
    d8: '/images/dress-8-min.JPG',
    d9: '/images/dress-9-min.jpg',
  },
  scarves: {
    s1: '/images/scarf-1-min.JPG',
    s2: '/images/scarf-2-min.JPG',
    s3: '/images/scarf-3-min.JPG',
    s4: '/images/scarf-4-min.JPG',
  },
} as const

export const IMAGE_FALLBACK = images.dresses.d1

export const dressImages = Object.values(images.dresses)
export const scarfImages = Object.values(images.scarves)

const { dresses: d, scarves: s } = images

/** Page-level hero / banner backgrounds */
export const pageImages = {
  homeHero: images.hero,
  homeHeritage: d.d3,
  homeStory: images.shop,
  homeVideo: images.shop,
  aboutBanner: images.lifestyle,
  aboutStory: images.shop,
  galleryBanner: d.d1,
  customOrderBanner: d.d7,
  contactStore: images.shop,
} as const
