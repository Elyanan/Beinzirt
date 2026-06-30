import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageBanner } from '@/components/page-banner'
import { SectionHeading } from '@/components/section-heading'
import { CustomOrderForm } from '@/components/custom-order-form'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { customOrderSteps } from '@/lib/data'
import { pageImages } from '@/lib/images'
import { getMessages, translate } from '@/lib/i18n/messages'

export const metadata: Metadata = {
  title: 'Custom Order | Beinzirt Design',
  description:
    'Request a custom handmade Ethiopian garment or home textile from Beinzirt Design. Share your design idea and we will bring it to life.',
}

export default async function CustomOrderPage() {
  const t = (key: string) => translate(getMessages(), key)

  return (
    <>
      <PageBanner
        title={t('customOrder.customOrdersTitle')}
        subtitle={t('customOrder.customOrdersSubtitle')}
        image={pageImages.customOrderBanner}
      />

      <section className="px-5 py-16 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow={t('customOrder.process')} title={t('customOrder.howItWorks')} />
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {customOrderSteps.map((step, i) => (
            <Reveal key={step.step} delay={i * 100}>
              <div className="relative h-full rounded-2xl border border-border/70 bg-card p-6 shadow-luxury transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury-hover">
                <span className="font-serif text-3xl text-accent/40">{step.step}</span>
                <h3 className="mt-3 font-serif text-lg text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow={t('customOrder.yourVision')}
              title={t('customOrder.requestForm')}
              subtitle={t('customOrder.subtitle')}
            />
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-luxury md:p-8">
              <CustomOrderForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-serif text-xl text-foreground">
            {t('customOrder.contactGuidance')}
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="mt-6 rounded-full border-foreground/20 px-7 hover:bg-foreground/5"
          >
            <Link href="/contact">
              {t('customOrder.contactBeinzirt')}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Reveal>
      </section>
    </>
  )
}
