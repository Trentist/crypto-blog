import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'
import PostCard from '../components/PostCard'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 60

interface Post {
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

export default async function Home() {
  const posts: Post[] = await client.fetch(postsQuery)
  const latestPosts = posts.slice(0, 6) // Show only 6 latest posts

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative py-24 mb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent rounded-3xl"></div>
        
        <div className="relative text-center">
          <div className="mb-10 animate-float inline-block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full blur-2xl opacity-40"></div>
              <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden ring-4 ring-purple-400/30 ring-offset-4 ring-offset-slate-900">
                <Image
                  src="/profile.jpg"
                  alt="Profile"
                  width={144}
                  height={144}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="gradient-text">Blockchain Engineer</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Crafting the decentralized future through <span className="text-purple-400">smart contracts</span>, 
            <span className="text-cyan-400"> Web3</span>, and innovative blockchain solutions
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/blog" 
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 glow-effect"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Articles
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            
            <Link 
              href="/about" 
              className="px-8 py-4 glass-effect text-purple-300 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:bg-purple-500/10"
            >
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="mt-16">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold gradient-text">Latest Articles</h2>
            <p className="text-gray-400 mt-2">
              Recent posts from the blog
            </p>
          </div>
          {posts.length > 6 && (
            <Link 
              href="/blog"
              className="text-cyan-400 hover:text-cyan-300 transition font-medium"
            >
              View All →
            </Link>
          )}
        </div>

        {latestPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            {posts.length > 6 && (
              <div className="text-center mt-12">
                <Link
                  href="/blog"
                  className="inline-block bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition font-semibold glow-effect"
                >
                  View All Articles
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📝</div>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">
              No posts yet
            </h2>
            <p className="text-gray-500">
              Check back later for new content
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
