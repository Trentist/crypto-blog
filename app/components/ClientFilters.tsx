'use client'

import { Suspense } from 'react'
import YearFilter from './YearFilter'
import CategoryFilter from './CategoryFilter'
import FilterControls from './FilterControls'

interface ClientFiltersProps {
  years: number[]
  categories: Array<{
    _id: string
    title: string
    slug: { current: string }
    description?: string
  }>
}

export default function ClientFilters({ years, categories }: ClientFiltersProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/50 rounded-lg p-5">
        <h2 className="text-xl font-bold mb-4 gradient-text">Filters</h2>
        
        <Suspense fallback={<div className="h-16 bg-white/30 dark:bg-slate-800/30 rounded-lg animate-pulse"></div>}>
          {years.length > 0 && (
            <YearFilter years={years} />
          )}
        </Suspense>
        
        <Suspense fallback={<div className="h-16 bg-white/30 dark:bg-slate-800/30 rounded-lg animate-pulse"></div>}>
          {categories.length > 0 && (
            <CategoryFilter categories={categories} />
          )}
        </Suspense>
      </div>
    </div>
  )
}
