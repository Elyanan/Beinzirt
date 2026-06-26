import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, Geist_Mono } from 'next/font/google'
import { CartProvider } from '@/components/cart-context'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'በእንዝርት — Beinzirt Design | Handcrafted Ethiopian Textiles',
  description:
    'Beinzirt Design crafts handmade Ethiopian traditional clothing and textiles in Addis Ababa. Discover dresses, gabi, scarves, and home textiles woven with heritage and pride.',
  generator: 'v0.app',
  keywords: [
    'Ethiopian clothing',
    'habesha kemis',
    'gabi',
    'tibeb',
    'handmade textiles',
    'Addis Ababa',
    'Beinzirt',
  ],
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f4efe3',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <CartProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
