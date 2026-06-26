import type { Metadata } from 'next'
import Image from 'next/image'
import { Globe, Award, Tag, ShieldCheck } from 'lucide-react'
import { PageBanner } from '@/components/page-banner'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { CtaSection } from '@/components/cta-section'

export const metadata: Metadata = {
  title: 'About | Beinzirt Design',
  description:
    'The story of Beinzirt Design — handmade Ethiopian textiles, empowering artisans, and celebrating heritage from Addis Ababa.',
}

const values = [
  { icon: Globe, title: 'Worldwide Shipping', text: 'We deliver our handmade pieces to customers across the globe.' },
  { icon: Award, title: 'Best Quality', text: 'Premium handwoven cotton and meticulous finishing on every item.' },
  { icon: Tag, title: 'Best Offers', text: 'Fair, transparent pricing that honors both craft and customer.' },
  { icon: ShieldCheck, title: 'Secure Payments', text: 'Safe, trusted checkout so you can shop with complete confidence.' },
]

const paragraphs = [
  'Selam, a visionary designer, was inspired by the rich tapestry of Ethiopian culture. She saw the beauty in traditional textiles and the potential to breathe new life into them. With a passion for design and a commitment to empowering women, she founded Beinzirt.',
  "Beinzirt's journey began with a small workshop, where skilled artisans meticulously transformed handwoven cotton into stunning garments. Each piece is a labor of love, reflecting the intricate details and unique patterns of Ethiopian heritage. From the delicate Menen to the sturdy Gabi, every fabric tells a story, woven with care and precision.",
  "Selam's vision extends beyond fashion. She is committed to empowering women by providing training and opportunities. By supporting local artisans, Beinzirt contributes to the economic growth of the community.",
  'Today, Beinzirt has grown into a thriving business, offering a diverse range of products, from elegant dresses and stylish shirts to cozy home textiles. Their flagship store in Addis Ababa is a haven for those who appreciate the beauty of traditional Ethiopian design.',
]

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="About Beinzirt"
        subtitle="Weaving heritage, empowering artisans, and sharing the beauty of Ethiopian design with the world."
      />

      <section className="px-5 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2">
          <Reveal className="relative lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/about-founder.png"
                alt="Selam, founder of Beinzirt, in her textile workshop"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="pattern-strip absolute -bottom-4 -left-4 h-24 w-24 rounded-2xl opacity-90" />
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading align="left" eyebrow="Our Story" title="Who We Are" />
            <div className="mt-5 space-y-4">
              {paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary/60 px-5 py-20 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Why Beinzirt" title="What Sets Us Apart" />
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={(i % 4) * 100}>
              <div className="group h-full rounded-2xl border border-border/70 bg-card p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(60,40,20,0.4)]">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <v.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-serif text-lg text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  )
}
