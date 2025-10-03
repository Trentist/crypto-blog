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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-24 mb-8 sm:mb-12 lg:mb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent rounded-3xl"></div>
        
        <div className="relative text-center">
          <div className="mb-6 sm:mb-8 lg:mb-10 animate-float inline-block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full blur-2xl opacity-40"></div>
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 mx-auto rounded-full overflow-hidden ring-2 sm:ring-4 ring-purple-400/30 ring-offset-2 sm:ring-offset-4 ring-offset-slate-900">
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
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight">
            <span className="gradient-text">Blockchain Engineer</span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            Crafting the decentralized future through <span className="text-purple-400">smart contracts</span>, 
            <span className="text-cyan-400"> Web3</span>, and innovative blockchain solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center flex-wrap px-4">
            <Link 
              href="/blog" 
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 glow-effect w-full sm:w-auto text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Articles
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            
            <Link 
              href="/about" 
              className="px-6 sm:px-8 py-3 sm:py-4 glass-effect text-purple-300 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:bg-purple-500/10 w-full sm:w-auto text-center"
            >
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="mt-8 sm:mt-12 lg:mt-16">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold gradient-text">Latest Articles</h2>
            <p className="text-sm sm:text-base text-gray-400 mt-1 sm:mt-2">
              Recent posts from the blog
            </p>
          </div>
          {posts.length > 6 && (
            <Link 
              href="/blog"
              className="text-cyan-400 hover:text-cyan-300 transition font-medium text-sm sm:text-base"
            >
              View All →
            </Link>
          )}
        </div>

        {latestPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {latestPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            {posts.length > 6 && (
              <div className="text-center mt-8 sm:mt-12">
                <Link
                  href="/blog"
                  className="inline-block bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition font-semibold glow-effect text-sm sm:text-base"
                >
                  View All Articles
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 sm:py-20">
            <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">📝</div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-400 mb-3 sm:mb-4">
              No posts yet
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto px-4">
              Check back later for new content
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
