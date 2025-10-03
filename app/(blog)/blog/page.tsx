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
  searchParams: { year?: string; categories?: string; page?: string }
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
  
  if (searchParams.year || searchParams.categories) {
    const conditions: string[] = []
    
    if (searchParams.year) {
      const year = parseInt(searchParams.year, 10)
      const startOfYear = new Date(year, 0, 1).toISOString()
      const endOfYear = new Date(year + 1, 0, 1).toISOString()
      conditions.push(`publishedAt >= "${startOfYear}" && publishedAt < "${endOfYear}"`)
    }
    
    if (searchParams.categories) {
      const categorySlugs = searchParams.categories.split(',')
      const categoryCondition = categorySlugs
        .map(slug => `"${slug}" in categories[]->slug.current`)
        .join(' || ')
      conditions.push(`(${categoryCondition})`)
    }
    
    filterConditions = conditions.join(' && ')
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
  
  // Extract unique years from all posts (for filter dropdown)
  // We need to fetch all posts to get all years, but we'll cache this
  const allPostsForYears: Post[] = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      publishedAt
    }
  `)
  
  const years = Array.from(
    new Set(
      allPostsForYears.map(post => new Date(post.publishedAt).getFullYear())
    )
  ).sort((a, b) => b - a) // Sort descending (newest first)

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">
          <span className="gradient-text">All Articles</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-gray-300 max-w-4xl mx-auto">
          Deep dives into blockchain development, smart contracts, DeFi, and Web3 technologies
        </p>
      </div>

      {/* Main Content with Sidebar Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar - Filters */}
        <div className="lg:w-56 flex-shrink-0 order-2 lg:order-1 pl-1 lg:pl-2">
          <div className="lg:sticky lg:top-8">
            <ClientFilters years={years} categories={categories} />
          </div>
        </div>

        {/* Right Content - Blog Posts */}
        <div className="flex-1 min-w-0 order-1 lg:order-2 pr-3 lg:pr-6">
          {posts.length > 0 ? (
            <>
              <FilteredBlogPosts 
                posts={posts} 
                selectedYear={searchParams.year}
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
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📝</div>
              <h2 className="text-2xl font-semibold text-gray-400 mb-4">
                No posts found
              </h2>
              <p className="text-gray-500">
                {searchParams.year || searchParams.categories 
                  ? 'Try adjusting your filters to see more content'
                  : 'Check back later for new content'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

