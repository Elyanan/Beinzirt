import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Hand, Play, Scissors, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HomeHero } from '@/components/home-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { CtaSection } from '@/components/cta-section'
import { homeCategories } from '@/lib/data'
import { getHomepageContent, getStorefrontProducts } from '@/lib/sanity'

const featureIcons = [Hand, Sparkles, Scissors]

export default async function HomePage() {
  const [home, products] = await Promise.all([getHomepageContent(), getStorefrontProducts()])

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
            title="Our Latest Collections"
            subtitle="Explore our curated categories of handmade clothing and home textiles."
          />
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {homeCategories.map((cat, index) => {
            const sample = products.find((product) => product.category === cat.slug)
            return (
              <Reveal key={cat.name} delay={(index % 4) * 80}>
                <Link
                  href="/shop"
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(60,40,20,0.45)]"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={sample?.image ?? cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-serif text-base leading-tight text-foreground">
                      {cat.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {sample?.description ?? 'This category is ready for future additions.'}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-serif text-base text-primary">
                        {sample ? `from $${sample.price}` : 'Coming soon'}
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

      <section className="px-5 py-20 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Portfolio" title="Check Out Our Work" />
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {home.useCases.map((useCase, index) => (
            <Reveal key={useCase.title} delay={(index % 3) * 100}>
              <div className="group relative h-72 overflow-hidden rounded-2xl">
                <Image
                  src={useCase.image}
                  alt={useCase.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
                  <h3 className="font-serif text-xl">{useCase.title}</h3>
                  <p className="mt-1.5 max-h-0 overflow-hidden text-sm leading-relaxed text-primary-foreground/85 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                    {useCase.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-foreground/20 px-7 hover:bg-foreground/5"
          >
            <Link href="/gallery">
              View More <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Reveal>
      </section>

      <section className="px-5 pb-20 lg:px-8">
        <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl">
          <div className="relative aspect-video">
            <Image
              src={home.videoImage}
              alt="Beinzirt store and artisan workshop in Addis Ababa"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-foreground/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-primary-foreground">
              <button
                type="button"
                aria-label="Play craftsmanship video"
                className="group flex size-20 items-center justify-center rounded-full bg-primary-foreground/15 backdrop-blur transition-all hover:scale-110 hover:bg-primary-foreground/25"
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Play className="size-6 translate-x-0.5 fill-current" />
                </span>
              </button>
              <h2 className="mt-6 text-balance font-serif text-3xl md:text-4xl">
                See the Craft in Motion
              </h2>
              <p className="mt-2 max-w-md text-pretty text-primary-foreground/85">
                Explore our handmade process, designs, and cultural inspiration.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaSection />
    </>
  )
}
