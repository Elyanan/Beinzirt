'use client'

import { useEffect, useState, type ChangeEvent } from 'react'

export function AdminImageUploadPreview({
  inputName,
  currentImage,
  alt,
}: {
  inputName: string
  currentImage?: string
  alt: string
}) {
  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) {
      setPreviewUrl('')
      return
    }

    if (previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const imageUrl = previewUrl || currentImage

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium">Featured Image</label>
          <input
            name={inputName}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:text-primary-foreground"
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium">Current Preview</p>
        <div className="relative mt-2 flex aspect-[4/5] items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={alt}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              No image uploaded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
