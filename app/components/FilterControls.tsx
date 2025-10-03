'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function FilterControls() {
  const [mounted, setMounted] = useState(false)
  const searchParams = useSearchParams()
  const selectedYear = searchParams.get('year')
  const selectedCategory = searchParams.get('category')
  
  const hasActiveFilters = selectedYear || selectedCategory

  useEffect(() => {
    setMounted(true)
  }, [])

  return null
}
