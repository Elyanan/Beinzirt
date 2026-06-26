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
  title: 'Beinzirt Design | Ethiopian Traditional Clothing in Addis Ababa',
  description:
    'Discover handmade Ethiopian traditional clothing, Gabi, dresses, scarves, home textiles, and custom designs crafted by Beinzirt Design in Addis Ababa.',
  keywords: [
    'Ethiopian clothing',
    'habesha kemis',
    'gabi',
    'tibeb',
    'handmade textiles',
    'Addis Ababa',
    'Beinzirt',
    'traditional dress',
    'custom order',
  ],
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#F5E1A4',
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
