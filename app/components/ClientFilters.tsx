'use client'

import { Suspense } from 'react'
import CategoryFilter from './CategoryFilter'
import FilterControls from './FilterControls'

interface ClientFiltersProps {
  categories: Array<{
    _id: string
    title: string
    slug: { current: string }
    description?: string
  }>
}

export default function ClientFilters({ categories }: ClientFiltersProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/50 rounded-lg p-4 sm:p-5">
        <h2 className="text-lg sm:text-xl font-bold gradient-text mb-3 sm:mb-4">Categories</h2>
        
        <Suspense fallback={<div className="h-16 bg-white/30 dark:bg-slate-800/30 rounded-lg animate-pulse"></div>}>
          {categories.length > 0 && (
            <CategoryFilter categories={categories} />
          )}
        </Suspense>
      </div>
    </div>
  )
}
