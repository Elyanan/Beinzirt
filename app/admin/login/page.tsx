import Image from 'next/image'
import { LockKeyhole } from 'lucide-react'
import { loginAction } from '@/app/admin/actions'
import { LOGO } from '@/lib/images'

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>
}) {
  const params = await searchParams

  return (
    <main className="grid min-h-screen place-items-center px-5 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border/80 bg-card p-8 shadow-luxury">
        <div className="flex items-center gap-4">
          <Image
            src={LOGO}
            alt="Beinzirt logo"
            width={96}
            height={96}
            className="h-16 w-24 object-contain"
            priority
          />
          <div>
            <p className="font-serif text-2xl text-foreground">Admin Login</p>
            <p className="text-sm text-muted-foreground">Secure CMS dashboard</p>
          </div>
        </div>

        {params.error && (
          <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {params.error}
          </div>
        )}

        <form action={loginAction} className="mt-8 space-y-5">
          <input type="hidden" name="next" value={params.next ?? '/admin/dashboard'} />
          <div>
            <label htmlFor="username" className="text-sm font-medium text-foreground">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <LockKeyhole className="size-4" />
            Sign In
          </button>
        </form>
      </div>
    </main>
  )
}
