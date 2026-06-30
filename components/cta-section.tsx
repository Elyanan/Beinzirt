'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/reveal'
import { useTranslation } from '@/components/language-provider'

type CtaSectionProps = {
  title?: string
  subtitle?: string
  description?: string
  buttonLabel?: string
  buttonHref?: string
}

export function CtaSection({
  title,
  subtitle,
  description,
  buttonLabel,
  buttonHref = '/custom-order',
}: CtaSectionProps) {
  const { t } = useTranslation()

  return (
    <section className="px-5 py-20 lg:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground md:py-20">
        <div className="pattern-soft pointer-events-none absolute inset-0 opacity-10" />
        <div className="pattern-strip absolute inset-x-0 top-0 h-1.5" />
        <div className="pattern-strip absolute inset-x-0 bottom-0 h-1.5" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-balance font-serif text-3xl leading-tight md:text-4xl">
            {title ?? t('cta.defaultTitle')}
          </h2>
          {(subtitle ?? description) && (
            <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-primary-foreground/80">
              {description ?? t('cta.defaultText')}
            </p>
          )}
          <Button
            asChild
            size="lg"
            className="mt-8 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90"
          >
            <Link href={buttonHref}>
              {buttonLabel ?? t('cta.defaultButton')}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
