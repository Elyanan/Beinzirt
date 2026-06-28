import { logoutAction } from '@/app/admin/actions'
import { AdminShell } from '@/components/admin-shell'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body > header,
        body > footer {
          display: none !important;
        }
      `}</style>
      <AdminShell logoutAction={logoutAction}>{children}</AdminShell>
    </>
  )
}
