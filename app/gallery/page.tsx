import type { Metadata } from 'next'
import { PageBanner } from '@/components/page-banner'
import { GalleryClient } from '@/components/gallery-client'
import { CtaSection } from '@/components/cta-section'
import { getMessages, translate } from '@/lib/i18n/messages'
import { getGalleryCategories, getGalleryItems } from '@/lib/sanity'
import { pageImages } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Gallery | Beinzirt Design',
  description:
    'Explore Beinzirt Design gallery — traditional clothing, handmade textiles, wedding designs, and artisan craftsmanship.',
}

export default async function GalleryPage() {
  const t = (key: string) => translate(getMessages(), key)
  const [items, categories] = await Promise.all([getGalleryItems(), getGalleryCategories()])
  const filters = ['All', ...categories.map((category) => category.title)]

  return (
    <>
      <PageBanner title={t('gallery.title')} subtitle={t('gallery.subtitle')} image={pageImages.galleryBanner} />
      <section className="pb-20 pt-8">
        <GalleryClient items={items} filters={filters} />
      </section>
      <CtaSection />
    </>
  )
}
