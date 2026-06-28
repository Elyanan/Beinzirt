'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navLinks } from '@/lib/data'
import { useCart } from '@/components/cart-context'
import { SiteLogo } from '@/components/site-logo'

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [bump, setBump] = useState(false)
  const { count, lastAdded } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (lastAdded === 0) return
    setBump(true)
    const t = setTimeout(() => setBump(false), 400)
    return () => clearTimeout(t)
  }, [lastAdded])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled || open
          ? 'bg-background/90 shadow-[0_1px_0_0_var(--border)] backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <div className="pattern-strip h-1 w-full opacity-80" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <SiteLogo />

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300 group-hover:w-full',
                    active ? 'w-full' : 'w-0',
                  )}
                />
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            aria-label={`Cart with ${count} items`}
            className={cn(
              'relative flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted',
              bump && 'animate-fade-up',
            )}
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[0.65rem] font-semibold text-accent-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-t border-border bg-background/95 backdrop-blur-md transition-[max-height,opacity] duration-500 lg:hidden',
          open ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className="flex flex-col px-5 py-4">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ transitionDelay: `${i * 40}ms` }}
              className={cn(
                'border-b border-border/60 py-3 font-serif text-lg transition-colors last:border-0',
                pathname === link.href ? 'text-accent' : 'text-foreground',
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/cart"
            className="border-b border-border/60 py-3 font-serif text-lg text-foreground last:border-0"
          >
            Cart ({count})
          </Link>
        </nav>
      </div>
    </header>
  )
}
