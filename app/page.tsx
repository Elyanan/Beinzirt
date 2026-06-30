import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Hand, Scissors, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HomeHero } from '@/components/home-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { CtaSection } from '@/components/cta-section'
import { getHomepageContent, getStorefrontProducts } from '@/lib/sanity'
import { formatDualPrice } from '@/lib/pricing'

const featureIcons = [Hand, Sparkles, Scissors]

export default async function HomePage() {
  const [home, products] = await Promise.all([getHomepageContent(), getStorefrontProducts()])
  const bestSellers = products.filter((product) => product.bestSeller ?? product.featured)

  return (
    <>
      <HomeHero hero={home.hero} />

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={home.heritageImage}
                alt="Close-up of intricate handwoven Ethiopian tibeb textile"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="pattern-strip absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl opacity-90" />
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              align="left"
              eyebrow={home.heritageEyebrow}
              title={home.heritageTitle}
            />
            <p className="mt-5 leading-relaxed text-muted-foreground">{home.heritageText}</p>
            <Button
              asChild
              className="mt-7 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/about">
                See More <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary/60 px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading align="left" eyebrow={home.storyEyebrow} title={home.storyTitle} />
            {home.storyParagraphs.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 28)}
                className={
                  index === 0
                    ? 'mt-5 leading-relaxed text-muted-foreground'
                    : 'mt-4 leading-relaxed text-muted-foreground'
                }
              >
                {paragraph}
              </p>
            ))}
            <Button
              asChild
              variant="outline"
              className="mt-7 rounded-full border-foreground/20 px-6 hover:bg-foreground/5"
            >
              <Link href="/about">
                Read More <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
          <Reveal delay={120} className="relative">
            <div className="relative aspect-[4/5] max-w-sm overflow-hidden rounded-2xl lg:ml-auto">
              <Image
                src={home.storyImage}
                alt="Beinzirt flagship store in Addis Ababa"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Craftsmanship"
            title="Timeless Creations, Crafted with Care for You"
            subtitle="At Beinzirt, we specialize in creating exquisite handmade traditional clothes and textiles using time-honored techniques passed down through generations."
          />
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {home.features.map((feature, index) => {
            const Icon = featureIcons[index] ?? Sparkles
            return (
              <Reveal key={feature.title} delay={index * 120}>
                <div className="group h-full rounded-2xl border border-border/70 bg-card p-7 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(60,40,20,0.4)]">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-5 font-serif text-xl text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.text}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="bg-secondary/60 px-5 py-20 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Shop"
            title="Our Best Sellers"
            subtitle="Customer-loved dresses and scarves, handmade with Ethiopian heritage."
          />
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {(bestSellers.length ? bestSellers : products.slice(0, 4)).map((product, index) => {
            return (
              <Reveal key={product.id} delay={(index % 4) * 80}>
                <Link
                  href="/shop"
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(60,40,20,0.45)]"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-accent-foreground">
                      Best Seller
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-serif text-base leading-tight text-foreground">
                      {product.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-serif text-base text-primary">
                        {formatDualPrice(product)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground/70 transition-colors group-hover:text-primary">
                        View Details <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      <CtaSection />
    </>
  )
}
