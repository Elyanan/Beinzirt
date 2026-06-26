import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { contactInfo } from '@/lib/data'

export function SiteFooter() {
  return (
    <footer className="relative mt-24 bg-primary text-primary-foreground">
      <div className="pattern-strip h-1 w-full" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <p className="font-serif text-2xl">በእንዝርት — Beinzirt Design</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
            Handmade Ethiopian traditional clothing and textiles crafted with
            pride in Addis Ababa.
          </p>
          <div className="mt-6 pattern-strip h-1 w-24 rounded-full" />
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            For Her
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li><Link href="/shop" className="transition-colors hover:text-accent">Dresses</Link></li>
            <li><Link href="/shop" className="transition-colors hover:text-accent">Scarves</Link></li>
            <li><Link href="/shop" className="transition-colors hover:text-accent">Tops</Link></li>
          </ul>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            For Him
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li><Link href="/shop" className="transition-colors hover:text-accent">Gabi</Link></li>
            <li><Link href="/shop" className="transition-colors hover:text-accent">Shirts</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Company
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li><Link href="/about" className="transition-colors hover:text-accent">About</Link></li>
            <li><Link href="/gallery" className="transition-colors hover:text-accent">Gallery</Link></li>
            <li><Link href="/blog" className="transition-colors hover:text-accent">Blog</Link></li>
            <li><Link href="/contact" className="transition-colors hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>{contactInfo.phone}</span>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" />
              <a href={`mailto:${contactInfo.email}`} className="transition-colors hover:text-accent">
                {contactInfo.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>{contactInfo.location}</span>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>{contactInfo.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <p className="mx-auto max-w-7xl px-5 py-6 text-center text-xs text-primary-foreground/60 lg:px-8">
          Copyright © 2026 በእንዝርት - Beinzirt Design. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
