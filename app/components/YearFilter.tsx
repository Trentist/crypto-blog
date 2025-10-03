'use client'

import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface YearFilterProps {
  years: number[]
}

export default function YearFilter({ years }: YearFilterProps) {
  const [mounted, setMounted] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedYear = searchParams.get('year')
  const selectedCategory = searchParams.get('category')

  useEffect(() => {
    setMounted(true)
  }, [])

  // Create URL with current category filter preserved
  const createYearUrl = (year?: string) => {
    const params = new URLSearchParams()
    if (year) params.set('year', year)
    if (selectedCategory) params.set('category', selectedCategory)
    // Reset to page 1 when changing filters
    params.delete('page')
    
    const queryString = params.toString()
    return `/blog${queryString ? `?${queryString}` : ''}`
  }

  if (!mounted) {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-slate-700 dark:text-gray-200">Year</h3>
        <select className="w-full px-3 py-2 bg-white/70 dark:bg-slate-700/50 border border-slate-300/50 dark:border-slate-500/50 text-slate-800 dark:text-gray-100 rounded-lg text-sm font-medium">
          <option>All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-slate-700 dark:text-gray-200">Year</h3>
      <select 
        value={selectedYear || ''} 
        onChange={(e) => {
          const year = e.target.value
          router.push(createYearUrl(year || undefined))
        }}
        className="w-full px-3 py-2 bg-white/70 dark:bg-slate-700/50 border border-slate-300/50 dark:border-slate-500/50 text-slate-800 dark:text-gray-100 rounded-lg text-sm focus:border-cyan-500/40 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 font-medium"
      >
        <option value="">All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  )
}
