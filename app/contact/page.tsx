import type { Metadata } from 'next'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { PageBanner } from '@/components/page-banner'
import { ContactForm } from '@/components/contact-form'
import { Reveal } from '@/components/reveal'
import { contactInfo, GOOGLE_MAPS_EMBED } from '@/lib/data'
import { pageImages } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Contact | Beinzirt Design',
  description:
    'Contact Beinzirt Design in Addis Ababa. Visit our store, call us, or send a message about custom orders and handmade Ethiopian textiles.',
}

const infoCards = [
  { icon: Phone, label: 'Phone Number', value: contactInfo.phone, href: undefined },
  { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
  { icon: MapPin, label: 'Location', value: contactInfo.location, href: undefined },
  { icon: Clock, label: 'Open Hours', value: contactInfo.hours, href: undefined },
]

export default function ContactPage() {
  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="Have any queries? We're here to answer."
        image={pageImages.contactStore}
      />

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
      </section>

      <section className="bg-secondary/50 px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-3xl text-foreground">Send Us a Message</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Whether you have a question about our collection, need styling advice,
              or want to discuss a custom order, we&apos;re happy to help.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-3xl text-foreground">Visit Our Store</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Find us at Laphto Mall in Addis Ababa. We welcome walk-ins during
              opening hours.
            </p>
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-border/70 shadow-luxury">
              <Image
                src={pageImages.contactStore}
                alt="Beinzirt Design store at Laphto Mall, Addis Ababa"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border/70 shadow-luxury">
              <iframe
                src={GOOGLE_MAPS_EMBED}
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
