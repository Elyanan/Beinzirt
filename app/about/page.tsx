import type { Metadata } from 'next'
import { PageBanner } from '@/components/page-banner'
import { AboutPageContent } from '@/components/about-page-content'
import { CtaSection } from '@/components/cta-section'
import { getMessages, translate } from '@/lib/i18n/messages'
import { getServerLocale } from '@/lib/i18n/server'
import { getAboutContent } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'About | Beinzirt Design',
  description:
    'The story of Beinzirt Design — handmade Ethiopian textiles, empowering artisans, and celebrating heritage from Addis Ababa.',
}

export default async function AboutPage() {
  const locale = await getServerLocale()
  const t = (key: string) => translate(getMessages(locale), key)
  const about = await getAboutContent()

  return (
    <>
      <PageBanner title={t('about.title')} subtitle={t('about.subtitle')} image={about.bannerImage} />
      <AboutPageContent about={about} />
      <CtaSection />
    </>
  )
}
