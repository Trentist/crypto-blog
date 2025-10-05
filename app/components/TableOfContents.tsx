'use client'

import { useEffect, useState } from 'react'

interface TableOfContentsProps {
  content: any
}

interface Heading {
  id: string
  text: string
  level: number
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const extractHeadings = (blocks: any[]): Heading[] => {
      const result: Heading[] = []
      
      blocks?.forEach((block) => {
        if (block._type === 'block' && block.style && block.style.startsWith('h')) {
          const level = parseInt(block.style.substring(1))
          if (level >= 1 && level <= 6) {
            const text = block.children?.map((child: any) => child.text).join('') || ''
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
            result.push({ id, text, level })
          }
        }
      })
      
      return result
    }

    if (content) {
      setHeadings(extractHeadings(content))
    }
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0% -35% 0%' }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (headings.length === 0) return null

  return (
    <div className="mt-96">
      <nav className="sticky top-8 bg-slate-50 dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-200 mb-4">
          Table of Contents
        </h3>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`block w-full text-left text-sm transition-colors duration-200 hover:text-purple-600 dark:hover:text-purple-400 ${
                  activeId === heading.id
                    ? 'text-purple-600 dark:text-purple-400 font-medium'
                    : 'text-slate-600 dark:text-gray-400'
                }`}
                style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
