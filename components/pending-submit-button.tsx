'use client'

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type PendingSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  pendingLabel?: string
  children: ReactNode
}

export function PendingSubmitButton({
  pendingLabel = 'Saving...',
  children,
  className,
  disabled,
  ...props
}: PendingSubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      {...props}
      type={props.type ?? 'submit'}
      disabled={disabled || pending}
      className={cn(
        'inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70',
        className,
      )}
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </button>
  )
}
