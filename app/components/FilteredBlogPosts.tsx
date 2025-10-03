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
  selectedCategories?: string[]
}

export default function FilteredBlogPosts({ 
  posts, 
  selectedCategories 
}: FilteredBlogPostsProps) {
  // Since filtering is now done server-side, we just render the posts directly
  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center py-12 sm:py-20">
          <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">🔍</div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-400 mb-3 sm:mb-4">
            No posts found
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto">
            {selectedCategories 
              ? 'Try adjusting your categories to see more content'
              : 'Check back later for new content'
            }
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}
