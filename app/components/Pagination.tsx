'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalPosts: number
  postsPerPage: number
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  totalPosts, 
  postsPerPage 
}: PaginationProps) {
  const searchParams = useSearchParams()
  
  // Create URL with current filters preserved
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page > 1) {
      params.set('page', page.toString())
    } else {
      params.delete('page')
    }
    
    const queryString = params.toString()
    return `/blog${queryString ? `?${queryString}` : ''}`
  }

  // Don't render if there's only one page
  if (totalPages <= 1) {
    return null
  }

  const startPost = (currentPage - 1) * postsPerPage + 1
  const endPost = Math.min(currentPage * postsPerPage, totalPosts)

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)
      
      if (currentPage > 3) {
        pages.push('...')
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i)
        }
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...')
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 py-6 sm:py-8">
      {/* Posts info */}
      <div className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 text-center px-4">
        Showing {startPost}-{endPost} of {totalPosts} posts
      </div>
      
      {/* Pagination controls */}
      <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
        {/* Previous button */}
        {currentPage > 1 ? (
          <Link
            href={createPageUrl(currentPage - 1)}
            className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/50 dark:bg-slate-700/50 border border-slate-300/50 dark:border-slate-500/50 text-slate-700 dark:text-gray-300 hover:bg-purple-50/50 dark:hover:bg-purple-500/20 hover:border-purple-300/40 dark:hover:border-purple-500/40 transition-all duration-200 text-xs sm:text-sm"
          >
            <span className="hidden sm:inline">← Previous</span>
            <span className="sm:hidden">←</span>
          </Link>
        ) : (
          <span className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-600/50 text-slate-400 dark:text-gray-600 cursor-not-allowed text-xs sm:text-sm">
            <span className="hidden sm:inline">← Previous</span>
            <span className="sm:hidden">←</span>
          </span>
        )}

        {/* Page numbers */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-1 sm:px-2 py-1 text-slate-500 dark:text-gray-500 text-xs sm:text-sm"
                >
                  ...
                </span>
              )
            }
            
            const pageNum = page as number
            const isActive = pageNum === currentPage
            
            return (
              <Link
                key={pageNum}
                href={createPageUrl(pageNum)}
                className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-all duration-200 text-xs sm:text-sm ${
                  isActive
                    ? 'bg-purple-100/70 dark:bg-purple-500/25 border-purple-300/40 dark:border-purple-500/40 text-purple-800 dark:text-purple-200'
                    : 'bg-white/50 dark:bg-slate-700/50 border-slate-300/50 dark:border-slate-500/50 text-slate-700 dark:text-gray-300 hover:bg-purple-50/50 dark:hover:bg-purple-500/20 hover:border-purple-300/40 dark:hover:border-purple-500/40'
                }`}
              >
                {pageNum}
              </Link>
            )
          })}
        </div>

        {/* Next button */}
        {currentPage < totalPages ? (
          <Link
            href={createPageUrl(currentPage + 1)}
            className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/50 dark:bg-slate-700/50 border border-slate-300/50 dark:border-slate-500/50 text-slate-700 dark:text-gray-300 hover:bg-purple-50/50 dark:hover:bg-purple-500/20 hover:border-purple-300/40 dark:hover:border-purple-500/40 transition-all duration-200 text-xs sm:text-sm"
          >
            <span className="hidden sm:inline">Next →</span>
            <span className="sm:hidden">→</span>
          </Link>
        ) : (
          <span className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-600/50 text-slate-400 dark:text-gray-600 cursor-not-allowed text-xs sm:text-sm">
            <span className="hidden sm:inline">Next →</span>
            <span className="sm:hidden">→</span>
          </span>
        )}
      </div>
    </div>
  )
}
