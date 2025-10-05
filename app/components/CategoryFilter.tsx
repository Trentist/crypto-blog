'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

interface Category {
  _id: string
  title: string
  slug: { current: string }
  description?: string
}

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [showAll, setShowAll] = useState(false)
  const [mounted, setMounted] = useState(false)
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get('category') || ''
  
  const displayCategories = showAll ? categories : categories.slice(0, 6)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Create URL with single category selection
  const createCategoryUrl = (categorySlug?: string) => {
    const params = new URLSearchParams()
    // Reset to page 1 when changing filters
    params.delete('page')
    
    if (categorySlug) {
      // Toggle category selection (select/deselect)
      if (selectedCategory === categorySlug) {
        // Deselect if already selected
        params.delete('category')
      } else {
        // Select new category
        params.set('category', categorySlug)
      }
    } else {
      // Clear category selection
      params.delete('category')
    }
    
    const queryString = params.toString()
    const url = `/blog${queryString ? `?${queryString}` : ''}`
    return url
  }

  if (!mounted) {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-end mb-3">
          {categories.length > 6 && (
            <span className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">
              {categories.length} topics
            </span>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="px-3 py-2 bg-slate-200/70 dark:bg-slate-600/50 border border-purple-300/40 dark:border-purple-500/40 text-slate-800 dark:text-gray-100 rounded-lg text-sm">
            All Categories
          </div>
          {displayCategories.map((category) => (
            <div
              key={category._id}
              className="px-3 py-2 bg-white/50 dark:bg-slate-700/30 border border-slate-300/30 dark:border-slate-500/30 text-slate-700 dark:text-gray-300 rounded-lg text-sm"
            >
              {category.title}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center justify-end mb-2 sm:mb-3">
        {categories.length > 6 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition font-medium px-2 py-1 rounded"
          >
            {showAll ? 'Less' : 'More'}
          </button>
        )}
      </div>
      
      <div className="space-y-1.5 sm:space-y-2">
        <Link
          href={createCategoryUrl()}
          className={`block px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition font-medium text-center text-xs sm:text-sm ${
            selectedCategory === ''
              ? 'bg-slate-200/70 dark:bg-slate-600/50 border-purple-300/40 dark:border-purple-500/40 text-slate-800 dark:text-gray-100'
              : 'bg-white/50 dark:bg-slate-700/30 border-slate-300/30 dark:border-slate-500/30 text-slate-700 dark:text-gray-300 hover:border-purple-300/40 dark:hover:border-purple-500/40 hover:bg-slate-100/50 dark:hover:bg-slate-600/40'
          }`}
        >
          All Categories
        </Link>
        {displayCategories.map((category) => (
          <Link
            key={category._id}
            href={createCategoryUrl(category.slug.current)}
            className={`block px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition font-medium text-center text-xs sm:text-sm ${
              selectedCategory === category.slug.current
                ? 'bg-purple-100/70 dark:bg-purple-500/25 border-purple-300/40 dark:border-purple-500/40 text-purple-800 dark:text-purple-200'
                : 'bg-white/50 dark:bg-slate-700/30 border-slate-300/30 dark:border-slate-500/30 text-slate-700 dark:text-gray-300 hover:border-purple-300/40 dark:hover:border-purple-500/40 hover:bg-purple-50/50 dark:hover:bg-purple-500/20'
            }`}
          >
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

