import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/reveal'

export function CtaSection() {
  return (
    <section className="px-5 py-20 lg:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground md:py-20">
        <div className="pattern-soft pointer-events-none absolute inset-0 opacity-10" />
        <div className="pattern-strip absolute inset-x-0 top-0 h-1.5" />
        <div className="pattern-strip absolute inset-x-0 bottom-0 h-1.5" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-balance font-serif text-3xl leading-tight md:text-4xl">
            Can&apos;t find the perfect piece?
          </h2>
          <p className="mt-3 font-serif text-xl text-accent">Let us create it for you.</p>
          <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-primary-foreground/80">
            Send us a sample design or idea and we&apos;ll bring your vision to life.
            From weddings to everyday wear, we&apos;ve got you covered.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90"
          >
            <Link href="/custom-order">
              Start a Custom Order
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
