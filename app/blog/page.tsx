import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import { PageBanner } from '@/components/page-banner'
import { BlogCard } from '@/components/blog-card'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { blogPosts } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Blog | Beinzirt Design',
  description:
    'Stories and inspiration about Ethiopian textiles, styling ideas, cultural fashion, and handmade craftsmanship from Beinzirt Design.',
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  return (
    <>
      <PageBanner
        title="Stories & Inspiration"
        subtitle="Learn about Ethiopian textiles, styling ideas, cultural fashion, and handmade craftsmanship."
        image="/images/gallery-festival.svg"
      />

      <section className="px-5 py-12 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Featured
          </p>
        </Reveal>
        <div className="mx-auto mt-6 max-w-6xl">
          <Reveal delay={80}>
            <BlogCard post={featured} featured />
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary/50 px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 100}>
              <div id={post.slug}>
                <BlogCard post={post} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <Reveal className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground md:py-16">
          <div className="pattern-soft pointer-events-none absolute inset-0 opacity-10" />
          <div className="pattern-strip absolute inset-x-0 top-0 h-1" />
          <div className="relative">
            <Mail className="mx-auto size-8 text-accent" />
            <h2 className="mt-4 font-serif text-2xl md:text-3xl">
              Stay Inspired
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/80">
              Have questions about Ethiopian textiles or want styling advice?
              Reach out to our team — we&apos;d love to hear from you.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/contact">
                Contact Beinzirt
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
