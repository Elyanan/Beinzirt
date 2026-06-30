'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Box,
  ClipboardList,
  Database,
  GalleryHorizontalEnd,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  ReceiptText,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { LOGO_WHITE } from '@/lib/images'

const adminLinks = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Categories', href: '/admin/categories', icon: Box },
  { label: 'Gallery', href: '/admin/gallery', icon: GalleryHorizontalEnd },
  { label: 'Orders', href: '/admin/orders', icon: ReceiptText },
  { label: 'Custom Orders', href: '/admin/custom-orders', icon: ClipboardList },
  { label: 'Content', href: '/admin/content', icon: Home },
  { label: 'Sanity Studio', href: '/admin/studio', icon: Database },
]

export function AdminShell({
  children,
  logoutAction,
}: {
  children: React.ReactNode
  logoutAction: () => void
}) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-[#f6f1e8]">{children}</div>
  }

  if (pathname.startsWith('/admin/studio')) {
    return (
      <div className="min-h-screen bg-[#f6f1e8]">
        <header className="flex items-center justify-between gap-4 border-b border-primary-foreground/10 bg-primary px-5 py-3 text-primary-foreground">
          <Link href="/admin/dashboard" className="block">
            <Image src={LOGO_WHITE} alt="Beinzirt admin" width={150} height={80} className="h-14 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/dashboard"
              className="rounded-full border border-primary-foreground/20 px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10"
            >
              Dashboard
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-4 py-2 text-sm font-medium text-primary hover:bg-primary-foreground/90"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </form>
          </div>
        </header>
        <main className="h-[calc(100vh-65px)] overflow-hidden">{children}</main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f6f1e8] text-foreground">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border/80 bg-primary text-primary-foreground lg:block">
        <div className="pattern-strip h-1 w-full" />
        <div className="flex h-full flex-col px-5 py-6">
          <Link href="/admin/dashboard" className="block">
            <Image src={LOGO_WHITE} alt="Beinzirt admin" width={190} height={105} className="h-24 w-auto object-contain" />
          </Link>
          <nav className="mt-10 space-y-1">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground',
                  pathname === link.href || pathname.startsWith(`${link.href}/`)
                    ? 'bg-primary-foreground/10 text-primary-foreground'
                    : 'text-primary-foreground/75',
                )}
              >
                <link.icon className="size-4" />
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto space-y-3">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Home className="size-4" />
              View Website
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </form>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-border/80 bg-[#f6f1e8]/90 px-5 py-4 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <button
                type="button"
                aria-label="Open admin menu"
                onClick={() => setMobileOpen((value) => !value)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground lg:hidden"
              >
                {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
              <p className="hidden text-sm text-muted-foreground lg:block">
                Manage CMS content, products, gallery, and customer orders.
              </p>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </form>
          </div>
          <nav
            className={cn(
              'mt-4 grid gap-2 overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden',
              mobileOpen ? 'max-h-[38rem] opacity-100' : 'max-h-0 opacity-0',
            )}
          >
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium',
                  pathname === link.href || pathname.startsWith(`${link.href}/`)
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card',
                )}
              >
                <link.icon className="size-3.5" />
                {link.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="px-5 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
