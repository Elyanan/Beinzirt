import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/lib/data'

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(60,40,20,0.45)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.image || '/placeholder.svg'}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-foreground backdrop-blur">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs text-muted-foreground">{post.date}</span>
        <h3 className="mt-2 font-serif text-xl leading-tight text-foreground transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <Link
          href="/blog"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
        >
          Read More
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
