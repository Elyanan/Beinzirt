import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageBanner } from '@/components/page-banner'
import { GalleryClient } from '@/components/gallery-client'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { getGalleryItems } from '@/lib/sanity'

import { pageImages } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Gallery | Beinzirt Design',
  description:
    'Explore Beinzirt Design gallery — traditional clothing, handmade textiles, wedding designs, and artisan craftsmanship.',
}

export default async function GalleryPage() {
  const items = await getGalleryItems()

  return (
    <>
      <PageBanner
        title="Gallery"
        subtitle="Explore our traditional clothing, handmade textiles, wedding designs, and artisan details."
        image={pageImages.galleryBanner}
      />

      <section className="pb-20 pt-8">
        <GalleryClient items={items} />
      </section>

      <section className="px-5 pb-24 lg:px-8">
        <Reveal className="mx-auto max-w-2xl rounded-3xl border border-border/70 bg-card px-6 py-12 text-center shadow-luxury md:py-16">
          <h2 className="font-serif text-2xl text-foreground md:text-3xl">
            Have a design in mind?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Share your vision and our artisans will bring it to life.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/custom-order">
              Request a Custom Piece
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Reveal>
      </section>
    </>
  )
}
