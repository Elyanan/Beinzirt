import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/lib/data'
import { IMAGE_FALLBACK } from '@/lib/images'

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-500 hover:-translate-y-1 shadow-luxury hover:shadow-luxury-hover ${
        featured ? 'md:flex-row md:items-stretch' : ''
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          featured ? 'aspect-[16/10] md:aspect-auto md:w-1/2' : 'aspect-[16/10]'
        }`}
      >
        <Image
          src={post.image || IMAGE_FALLBACK}
          alt={post.title}
          fill
          sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-foreground backdrop-blur">
          {post.category}
        </span>
      </div>
      <div className={`flex flex-1 flex-col p-5 ${featured ? 'md:justify-center md:p-8 lg:p-10' : ''}`}>
        <span className="text-xs text-muted-foreground">{post.date}</span>
        <h3
          className={`mt-2 font-serif leading-tight text-foreground transition-colors group-hover:text-accent ${
            featured ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}
        >
          {post.title}
        </h3>
        <p className={`mt-2 line-clamp-3 flex-1 leading-relaxed text-muted-foreground ${featured ? 'text-base' : 'text-sm'}`}>
          {post.excerpt}
        </p>
        <Link
          href={`/blog#${post.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-accent"
        >
          Read More
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
