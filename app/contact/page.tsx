import type { Metadata } from 'next'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { PageBanner } from '@/components/page-banner'
import { ContactForm } from '@/components/contact-form'
import { Reveal } from '@/components/reveal'
import { SocialLinks } from '@/components/social-links'
import { getContactContent } from '@/lib/sanity'
import { getMessages, translate } from '@/lib/i18n/messages'

export const metadata: Metadata = {
  title: 'Contact | Beinzirt Design',
  description:
    'Contact Beinzirt Design in Addis Ababa. Visit our store, call us, or send a message about custom orders and handmade Ethiopian textiles.',
}

export default async function ContactPage() {
  const t = (key: string) => translate(getMessages(), key)
  const contact = await getContactContent()
  const infoCards = [
    { icon: Phone, label: t('contact.phoneNumber'), value: contact.phone, href: undefined },
    { icon: Mail, label: t('contact.email'), value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: t('contact.location'), value: contact.address, href: undefined },
    { icon: Clock, label: t('contact.openHours'), value: contact.hours, href: undefined },
  ]

  return (
    <>
      <PageBanner title={t('contact.title')} subtitle={t('contact.subtitle')} image={contact.storeImage} />

      <section className="px-5 py-12 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {infoCards.map((card, i) => (
            <Reveal key={card.label} delay={i * 80}>
              <div className="h-full rounded-2xl border border-border/70 bg-card p-5 shadow-luxury transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury-hover">
                <div className="flex size-10 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <card.icon className="size-4" />
                </div>
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {card.label}
                </h3>
                {card.href ? (
                  <a
                    href={card.href}
                    className="mt-2 block text-sm leading-relaxed text-foreground transition-colors hover:text-accent"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{card.value}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={180} className="mx-auto mt-8 max-w-6xl">
          <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-luxury">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {t('contact.followBeinzirt')}
            </p>
            <SocialLinks links={contact.socialLinks} className="mt-4" />
          </div>
        </Reveal>
      </section>

      <section className="bg-secondary/50 px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-3xl text-foreground">{t('contact.sendMessage')}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {t('contact.supportCopy')}
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-3xl text-foreground">{t('contact.visitStore')}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {t('contact.visitStoreCopy')}
            </p>
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-border/70 shadow-luxury">
              <Image
                src={contact.storeImage}
                alt="Beinzirt Design store at Laphto Mall, Addis Ababa"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border/70 shadow-luxury">
              <iframe
                src={contact.mapIframe}
                title="Beinzirt Design location on Google Maps"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full md:aspect-auto md:h-[420px]"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
