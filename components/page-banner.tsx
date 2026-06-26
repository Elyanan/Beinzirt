export function PageBanner({
  title,
  subtitle,
  image,
}: {
  title: string
  subtitle?: string
  image?: string
}) {
  return (
    <section className="relative overflow-hidden pattern-soft pt-32 pb-14 lg:pt-40 lg:pb-16">
      <div className="pattern-strip absolute inset-x-0 top-0 h-1 opacity-80" />
      {image && (
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.07]"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className="pattern-gold-overlay pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h1 className="animate-fade-up text-balance font-serif text-4xl text-foreground md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p
            className="animate-fade-up mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground"
            style={{ animationDelay: '0.15s' }}
          >
            {subtitle}
          </p>
        )}
        <div className="pattern-strip mx-auto mt-6 h-1 w-24 rounded-full opacity-90" />
      </div>
    </section>
  )
}
