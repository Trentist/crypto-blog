import { client } from '@/sanity/lib/client'
import { postsByCategoryQuery, categoriesQuery } from '@/sanity/lib/queries'
import PostCard from '@/app/components/PostCard'

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

interface Category {
  _id: string
  title: string
  slug: { current: string }
  description?: string
}

export async function generateStaticParams() {
  const categories = await client.fetch(categoriesQuery)
  return categories.map((category: Category) => ({
    slug: category.slug.current,
  }))
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const posts: Post[] = await client.fetch(postsByCategoryQuery, { slug: params.slug })
  const categories: Category[] = await client.fetch(categoriesQuery)
  const currentCategory = categories.find((cat) => cat.slug.current === params.slug)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">
          <span className="gradient-text">{currentCategory?.title || 'Category'}</span>
        </h1>
        {currentCategory?.description && (
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{currentCategory.description}</p>
        )}
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-6">📝</div>
          <h2 className="text-2xl font-semibold text-gray-400 mb-4">
            No posts in this category yet
          </h2>
          <p className="text-gray-500 mb-8">
            Check back later for new content
          </p>
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition glow-effect"
          >
            Back to Home
          </a>
        </div>
      )}
    </div>
  )
}

