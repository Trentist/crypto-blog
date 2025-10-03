import { client } from '@/sanity/lib/client'
import { postQuery, postsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  mainImage?: any
  body?: any
  author?: {
    name: string
    image?: any
    bio?: any
  }
  categories?: Array<{
    title: string
    slug: { current: string }
  }>
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await client.fetch(postsQuery)
  return posts.map((post: Post) => ({
    slug: post.slug.current,
  }))
}

const PortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt || 'Post image'}
          width={800}
          height={500}
          className="rounded-lg shadow-lg shadow-purple-500/20 w-full"
        />
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mt-8 mb-4 text-purple-600 dark:text-purple-300">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-8 mb-4 text-purple-700 dark:text-purple-400">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-6 mb-3 text-cyan-600 dark:text-cyan-400">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-bold mt-4 mb-2 text-slate-800 dark:text-gray-200">{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-purple-500 pl-4 italic my-4 text-slate-600 dark:text-gray-400">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ value, children }: any) => (
      <a href={value?.href} className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 underline">
        {children}
      </a>
    ),
  },
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post: Post = await client.fetch(postQuery, { slug: params.slug })

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <div className="mb-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-200/60 dark:bg-slate-800/60 border border-slate-300/40 dark:border-slate-600/40 text-slate-700 dark:text-gray-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/60 dark:hover:bg-slate-700/60 hover:border-slate-400/50 dark:hover:border-slate-500/50 transition-all duration-200 shadow-lg mb-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back To Posts
          </Link>
          <h1 className="text-5xl font-bold">
            <span className="gradient-text">{post.title}</span>
          </h1>
        </div>
        {post.excerpt && (
          <p className="text-xl text-slate-600 dark:text-gray-300 mb-6">{post.excerpt}</p>
        )}
        <div className="flex items-center gap-4 text-slate-600 dark:text-gray-400">
          {post.author?.image && (
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500/30">
              <Image
                src={urlFor(post.author.image).width(48).height(48).url()}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <p className="font-semibold text-slate-800 dark:text-gray-200">{post.author?.name}</p>
            <time dateTime={post.publishedAt} className="text-sm text-slate-500 dark:text-gray-400">
              {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
            </time>
          </div>
        </div>
        
        {post.categories && post.categories.length > 0 && (
          <div className="mt-4">
            <span className="text-sm text-slate-500 dark:text-gray-500">Categories: </span>
            <span className="text-sm text-purple-600 dark:text-purple-300">
              {post.categories.map(cat => cat.title).join(', ')}
            </span>
          </div>
        )}
      </header>

      {/* Main Image */}
      {post.mainImage && (
        <div className="mb-8">
          <Image
            src={urlFor(post.mainImage).width(1200).url()}
            alt={post.mainImage.alt || post.title}
            width={1200}
            height={600}
            className="rounded-lg shadow-xl w-full"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {post.body && <PortableText value={post.body} components={PortableTextComponents} />}
      </div>

      {/* Back to Home */}
      <div className="mt-16 text-center">
        <Link
          href="/blog"
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 glow-effect"
        >
          ← Back to All Posts
        </Link>
      </div>
    </article>
  )
}

