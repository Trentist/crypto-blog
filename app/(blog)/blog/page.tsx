import { client } from '@/sanity/lib/client'
import { paginatedPostsQuery, filteredPostsQuery, categoriesQuery } from '@/sanity/lib/queries'
import FilteredBlogPosts from '@/app/components/FilteredBlogPosts'
import ClientFilters from '@/app/components/ClientFilters'
import Pagination from '@/app/components/Pagination'

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

interface PaginatedResult {
  posts: Post[]
  total: number
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { categories?: string; page?: string }
}) {
  const postsPerPage = 12
  const currentPage = parseInt(searchParams.page || '1', 10)
  const offset = (currentPage - 1) * postsPerPage
  
  const categories: Category[] = await client.fetch(categoriesQuery)
  
  // Build filter conditions for GROQ query
  let filterConditions = ''
  const queryParams: any = {
    offset,
    limit: postsPerPage
  }
  
  if (searchParams.categories) {
    const categorySlugs = searchParams.categories.split(',')
    const categoryCondition = categorySlugs
      .map(slug => `"${slug}" in categories[]->slug.current`)
      .join(' || ')
    filterConditions = `(${categoryCondition})`
    queryParams.conditions = filterConditions
    
    // Fetch filtered and paginated posts
    const result: PaginatedResult = await client.fetch(filteredPostsQuery, queryParams)
    var { posts, total } = result
  } else {
    // Fetch all paginated posts
    const result: PaginatedResult = await client.fetch(paginatedPostsQuery, queryParams)
    var { posts, total } = result
  }
  
  // Calculate pagination info
  const totalPages = Math.ceil(total / postsPerPage)

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto text-center mb-6 sm:mb-8 lg:mb-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
          <span className="gradient-text">All Articles</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Deep dives into blockchain development, smart contracts, DeFi, and Web3 technologies
        </p>
      </div>

      {/* Main Content with Sidebar Layout */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
        {/* Left Sidebar - Filters */}
        <div className="lg:w-48 xl:w-56 flex-shrink-0 order-2 lg:order-1">
          <div className="lg:sticky lg:top-8">
            <ClientFilters categories={categories} />
          </div>
        </div>

        {/* Right Content - Blog Posts */}
        <div className="flex-1 min-w-0 order-1 lg:order-2">
          {posts.length > 0 ? (
            <>
              <FilteredBlogPosts 
                posts={posts} 
                selectedCategories={searchParams.categories?.split(',')}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalPosts={total}
                postsPerPage={postsPerPage}
              />
            </>
          ) : (
            /* Centered empty state within the content area */
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center py-12 sm:py-20">
                <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">📝</div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-400 mb-3 sm:mb-4">
                  No posts found
                </h2>
                <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto">
                  {searchParams.categories 
                    ? 'Try adjusting your categories to see more content'
                    : 'Check back later for new content'
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

