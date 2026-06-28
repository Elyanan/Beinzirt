'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { pageImages } from '@/lib/images'

export function HomeHero() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pattern-soft pt-28">
      {/* Floating pattern accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute -left-10 top-32 h-40 w-40 rounded-full pattern-strip opacity-[0.07] blur-[1px]" />
        <div
          className="animate-float-slow absolute right-10 top-1/3 h-24 w-24 rounded-full pattern-strip opacity-10"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-16 lg:grid-cols-2 lg:px-8">
        <div className="relative z-10">
          <span
            className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-accent/40 bg-card/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent backdrop-blur"
            style={{ animationDelay: '0.05s' }}
          >
            Handwoven in Addis Ababa
          </span>
          <h1
            className="animate-fade-up mt-6 text-balance font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl"
            style={{ animationDelay: '0.15s' }}
          >
            Handcrafted Heritage, Worn with Pride!
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: '0.3s' }}
          >
            Experience the timeless beauty of Ethiopian textiles, handmade
            garments, and cultural designs crafted with care in Addis Ababa.
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
              <Link href="/shop">
                Explore Collection
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-foreground/20 px-7 hover:bg-foreground/5"
            >
              <Link href="/custom-order">Custom Order</Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div
            className="relative ml-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(60,40,20,0.6)]"
            style={{ transform: `translateY(${offset * -0.06}px)` }}
          >
            <Image
              src={pageImages.homeHero}
              alt="Two models wearing elegant handwoven Ethiopian traditional clothing by Beinzirt"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="pattern-strip absolute inset-x-0 bottom-0 h-2" />
          </div>
          <div className="absolute -bottom-5 left-2 rounded-2xl border border-border bg-card/95 px-5 py-3 shadow-xl backdrop-blur lg:left-0">
            <p className="font-serif text-2xl text-primary">100% Handmade</p>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Woven by master artisans
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
