import { HomeHero } from '@/components/home-hero'
import { HomePageSections } from '@/components/home-page-sections'
import { CtaSection } from '@/components/cta-section'
import { getHomepageContent, getStorefrontProducts } from '@/lib/sanity'

export default async function HomePage() {
  const [home, products] = await Promise.all([getHomepageContent(), getStorefrontProducts()])

  return (
    <>
      <HomeHero hero={home.hero} />
      <HomePageSections home={home} products={products} />
      <CtaSection />
    </>
  )
}
