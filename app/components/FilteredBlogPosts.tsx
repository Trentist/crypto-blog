import PostCard from './PostCard'

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

interface FilteredBlogPostsProps {
  posts: Post[]
  selectedYear?: string
  selectedCategories?: string[]
}

export default function FilteredBlogPosts({ 
  posts, 
  selectedYear, 
  selectedCategories 
}: FilteredBlogPostsProps) {
  // Since filtering is now done server-side, we just render the posts directly
  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-6">🔍</div>
        <h2 className="text-2xl font-semibold text-slate-600 dark:text-gray-400 mb-4">
          No posts found
        </h2>
        <p className="text-slate-500 dark:text-gray-500">
          {selectedYear || selectedCategories 
            ? 'Try adjusting your filters to see more content'
            : 'Check back later for new content'
          }
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}
