import type { Metadata } from 'next'
import Image from 'next/image'
import { Sparkles, Heart, Users, Palette } from 'lucide-react'
import { PageBanner } from '@/components/page-banner'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { CtaSection } from '@/components/cta-section'
import { getAboutContent } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'About | Beinzirt Design',
  description:
    'The story of Beinzirt Design — handmade Ethiopian textiles, empowering artisans, and celebrating heritage from Addis Ababa.',
}

const valueIcons = [Sparkles, Heart, Users, Palette]

export default async function AboutPage() {
  const about = await getAboutContent()

  return (
    <>
      <PageBanner
        title="About Beinzirt"
        subtitle="Handcrafted Ethiopian heritage, reimagined for modern life."
        image={about.bannerImage}
      />

      <section className="px-5 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2">
          <Reveal className="relative lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src={about.storyImage}
                alt="Beinzirt flagship store — handmade Ethiopian textiles in Addis Ababa"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="pattern-gold-overlay absolute inset-0" />
            </div>
            <div className="pattern-strip absolute -bottom-4 -left-4 h-24 w-24 rounded-2xl opacity-90" />
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading align="left" eyebrow="Our Story" title="Who We Are" />
            <div className="mt-5 space-y-4">
              {about.storyParagraphs.map((p) => (
                <p key={p.slice(0, 24)} className="leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border/70 bg-card p-5">
                <h3 className="font-serif text-xl text-foreground">Mission</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{about.mission}</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-card p-5">
                <h3 className="font-serif text-xl text-foreground">Vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{about.vision}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary/60 px-5 py-20 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Our Values" title="What We Stand For" />
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((v, i) => {
            const Icon = valueIcons[i] ?? Sparkles
            return (
              <Reveal key={v.title} delay={(i % 4) * 100}>
                <div className="group h-full rounded-2xl border border-border/70 bg-card p-6 text-center shadow-luxury transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury-hover">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <CtaSection
        title="Bring Ethiopian heritage into your wardrobe and home."
        subtitle=""
        description="From custom wedding attire to everyday elegance, Beinzirt creates pieces that honor tradition and reflect your personal style."
        buttonLabel="Start a Custom Order"
      />
    </>
  )
}
