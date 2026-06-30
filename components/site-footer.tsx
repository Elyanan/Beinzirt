import Image from 'next/image'
import Link from 'next/link'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { SocialLinks } from '@/components/social-links'
import { getFooterContent } from '@/lib/sanity'

export async function SiteFooter() {
  const footer = await getFooterContent()

  return (
    <footer className="relative mt-24 bg-primary text-primary-foreground">
      <div className="pattern-strip h-1 w-full" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <Link href="/" className="inline-flex">
            <Image
              src={footer.logo}
              alt="Beinzirt Design logo"
              width={210}
              height={120}
              className="h-28 w-auto object-contain sm:h-32"
            />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
            {footer.description}
          </p>
          <div className="mt-6 pattern-strip h-1 w-24 rounded-full" />
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Collections
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li><Link href="/shop" className="transition-colors hover:text-accent">Dresses</Link></li>
            <li><Link href="/shop" className="transition-colors hover:text-accent">Scarves</Link></li>
            <li><Link href="/shop" className="transition-colors hover:text-accent">Custom Orders</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Company
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            {footer.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {footer.socialLinks.length ? (
            <>
              <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Social
              </h3>
              <SocialLinks links={footer.socialLinks} variant="dark" className="mt-4" showLabels={false} />
            </>
          ) : null}
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>{footer.contactInfo.phone}</span>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" />
              <a href={`mailto:${footer.contactInfo.email}`} className="transition-colors hover:text-accent">
                {footer.contactInfo.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>{footer.contactInfo.location}</span>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>{footer.contactInfo.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-center text-xs text-primary-foreground/60 lg:flex-row lg:px-8">
          <p>{footer.copyright}</p>
          <p>
            Developed by{' '}
            <a
              href="https://websitecrafters.net"
              className="font-medium text-accent transition-colors hover:text-primary-foreground"
            >
              Website Crafters
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
