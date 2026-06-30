import { cn } from '@/lib/utils'

export function AdminToggle({
  name,
  label,
  description,
  defaultChecked,
  className,
}: {
  name: string
  label: string
  description?: string
  defaultChecked?: boolean
  className?: string
}) {
  return (
    <label
      className={cn(
        'flex min-h-20 items-center justify-between gap-4 rounded-lg border border-border bg-background px-4 py-3 text-sm',
        className,
      )}
    >
      <span>
        <span className="block font-medium text-foreground">{label}</span>
        {description ? (
          <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
            {description}
          </span>
        ) : null}
      </span>
      <span className="relative inline-flex items-center">
        <input
          name={name}
          type="checkbox"
          defaultChecked={defaultChecked}
          className="peer sr-only"
          aria-label={label}
        />
        <span className="h-7 w-12 rounded-full border border-border bg-muted transition-colors peer-checked:border-accent peer-checked:bg-accent/90 peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40" />
        <span className="absolute left-1 size-5 rounded-full bg-card shadow-sm transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  )
}
