import Image from 'next/image'
import { AdminLoginForm } from '@/components/admin-login-form'
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

        <AdminLoginForm next={params.next ?? '/admin/dashboard'} />
      </div>
    </main>
  )
}
