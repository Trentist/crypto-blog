import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { format } from 'date-fns'

interface PostCardProps {
  post: {
    _id: string
    title: string
    slug: { current: string }
    publishedAt: string
    excerpt?: string
    mainImage?: any
    author?: {
      name: string
      image?: any
    }
    categories?: Array<{
      title: string
      slug: { current: string }
    }>
  }
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative glass-effect rounded-xl sm:rounded-2xl overflow-hidden card-hover">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {post.mainImage && (
        <Link href={`/posts/${post.slug.current}`}>
          <div className="relative h-32 sm:h-40 lg:h-44 w-full overflow-hidden">
            <Image
              src={urlFor(post.mainImage).width(600).height(400).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10 group-hover:scale-105 transition-transform duration-700"></div>
            {post.categories && post.categories.length > 0 && (
              <div className="absolute top-2 sm:top-3 lg:top-4 left-2 sm:left-3 lg:left-4 z-20 flex flex-wrap gap-1 sm:gap-2">
                {post.categories.slice(0, 2).map((category) => (
                  <span
                    key={category.slug.current}
                    className="text-xs bg-purple-500/30 backdrop-blur-md text-purple-100 px-2 sm:px-3 py-1 rounded-full border border-purple-400/30"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>
      )}
      
      <div className="relative p-4 sm:p-5 lg:p-6">
        <Link href={`/posts/${post.slug.current}`}>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-gray-50 mb-2 sm:mb-3 group-hover:gradient-text transition-all duration-300 leading-tight">
            {post.title}
          </h2>
        </Link>
        
        {post.excerpt && (
          <p className="text-slate-600 dark:text-gray-400 text-sm mb-4 sm:mb-5 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-purple-300/10 dark:border-purple-400/10">
          <div className="flex items-center gap-2 sm:gap-3">
            {post.author?.image && (
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden ring-2 ring-purple-400/20">
                <Image
                  src={urlFor(post.author.image).width(36).height(36).url()}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm text-slate-700 dark:text-gray-200 font-medium">{post.author?.name}</span>
              <time dateTime={post.publishedAt} className="text-xs text-slate-500 dark:text-gray-500">
                {format(new Date(post.publishedAt), 'MMM d, yyyy')}
              </time>
            </div>
          </div>
          
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </article>
  )
}
