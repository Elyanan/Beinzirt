'use client'

import Image from 'next/image'
import { Sparkles, Heart, Users, Palette } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { useTranslation } from '@/components/language-provider'
import type { AboutContent } from '@/lib/sanity'
import { localizedAbout } from '@/lib/sanity'

const valueIcons = [Sparkles, Heart, Users, Palette]

export function AboutPageContent({ about }: { about: AboutContent }) {
  const { t, locale } = useTranslation()
  const content = localizedAbout(about, locale)

  return (
    <section className="px-5 py-12 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2">
        <Reveal className="relative lg:sticky lg:top-28">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src={content.storyImage}
              alt="Beinzirt flagship store"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="pattern-gold-overlay absolute inset-0" />
          </div>
          <div className="pattern-strip absolute -bottom-4 -left-4 h-24 w-24 rounded-2xl opacity-90" />
        </Reveal>
        <Reveal delay={120}>
          <SectionHeading align="left" eyebrow={t('about.ourStory')} title={t('about.title')} />
          <div className="mt-5 space-y-4">
            {content.storyParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border/70 bg-card p-5">
              <h3 className="font-serif text-xl text-foreground">{t('about.ourMission')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{content.mission}</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-card p-5">
              <h3 className="font-serif text-xl text-foreground">{t('about.ourVision')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{content.vision}</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-20 max-w-6xl">
        <Reveal>
          <SectionHeading eyebrow={t('about.ourValues')} title={t('about.ourValues')} />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.values.map((value, index) => {
            const Icon = valueIcons[index] ?? Sparkles
            return (
              <Reveal key={value.title} delay={(index % 4) * 100}>
                <div className="group h-full rounded-2xl border border-border/70 bg-card p-6 text-center shadow-luxury transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury-hover">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
