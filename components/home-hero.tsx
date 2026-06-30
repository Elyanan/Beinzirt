'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { ArrowRight, Sparkles, ShieldCheck, Gem } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/components/language-provider'
import type { SiteHero } from '@/lib/sanity'

export function HomeHero({ hero }: { hero: SiteHero }) {
  const { t } = useTranslation()
  const [offset, setOffset] = useState(0)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReducedMotion(media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  const eyebrow = hero.eyebrow
  const heading = hero.heading
  const subtitle = hero.subtitle
  const buttonText = hero.buttonText
  const secondaryButtonText = hero.secondaryButtonText
  const parallaxY = reducedMotion ? 0 : offset * -0.05
  const glowStyle = useMemo(
    () =>
      reducedMotion
        ? undefined
        : ({
            '--mx': `${mouse.x}%`,
            '--my': `${mouse.y}%`,
          } as CSSProperties),
    [mouse.x, mouse.y, reducedMotion],
  )

  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden pattern-soft pt-28"
      onMouseMove={(event) => {
        if (reducedMotion) return
        const rect = event.currentTarget.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width) * 100
        const y = ((event.clientY - rect.top) / rect.height) * 100
        setMouse({ x, y })
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={glowStyle}>
        <div className="hero-glow absolute inset-0 opacity-60" />
        <div className="hero-bubble hero-bubble-lg left-[8%] top-28" />
        <div className="hero-bubble hero-bubble-md right-[10%] top-[22%]" />
        <div className="hero-bubble hero-bubble-sm left-[46%] top-[58%]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-16 lg:grid-cols-2 lg:px-8">
        <div className="relative z-10">
          <span
            className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-accent/40 bg-card/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent backdrop-blur"
            style={{ animationDelay: '0.05s' }}
          >
            {eyebrow}
          </span>
          <h1
            className="animate-fade-up mt-6 text-balance font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl"
            style={{ animationDelay: '0.15s' }}
          >
            {heading}
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: '0.3s' }}
          >
            {subtitle}
          </p>
          <div
            className="animate-fade-up mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: '0.45s' }}
          >
            <Button
              asChild
              size="lg"
              className="group rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90"
            >
              <Link href={hero.buttonLink || '/shop'}>
                {buttonText}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-foreground/20 px-7 hover:bg-foreground/5"
            >
              <Link href={hero.secondaryButtonLink || '/custom-order'}>
                {secondaryButtonText}
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="hero-orb absolute -left-8 top-6 size-28" aria-hidden="true" />
          <div className="hero-orb absolute -right-4 bottom-20 size-20 [animation-delay:1.2s]" aria-hidden="true" />
          <div className="hero-glass-card absolute left-0 top-10 z-20 hidden -translate-x-6 items-center gap-3 px-4 py-3 text-sm lg:flex">
            <Sparkles className="size-4 text-accent" />
            <span className="text-foreground/85">{t('hero.luxuryDetails')}</span>
          </div>
          <div className="hero-glass-card absolute bottom-8 right-4 z-20 hidden items-center gap-3 px-4 py-3 text-sm sm:flex">
            <ShieldCheck className="size-4 text-accent" />
            <span className="text-foreground/85">{t('hero.premiumCraft')}</span>
          </div>

          <div
            className="hero-image-shell relative ml-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.2rem] shadow-[0_50px_100px_-40px_rgba(60,40,20,0.55)]"
            style={{ transform: `translateY(${parallaxY}px)` }}
          >
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent" />
            <div className="pattern-strip absolute inset-x-0 bottom-0 h-2" />
            <div className="absolute right-4 top-4 rounded-full border border-white/35 bg-white/20 px-3 py-1 text-xs text-white/95 backdrop-blur-md">
              <span className="inline-flex items-center gap-1"><Gem className="size-3" /> {t('hero.premiumBadge')}</span>
            </div>
          </div>
          <div className="hero-glass-card absolute -bottom-5 left-2 rounded-2xl px-5 py-3 shadow-xl lg:left-0">
            <p className="font-serif text-2xl text-primary">{t('hero.handmade')}</p>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {t('hero.wovenBy')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
