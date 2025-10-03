'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 100) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/blog', label: 'Blog', icon: '📝' },
    { href: '/audits', label: 'Audits', icon: '🔍' }
  ]

  return (
    <header className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
    }`}>
      <nav className="group bg-white/95 dark:bg-crypto-darker/95 backdrop-blur-2xl border border-purple-300/20 dark:border-purple-500/20 rounded-full px-8 py-4 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300">
        <div className="flex items-center gap-6">
          {/* Name/Brand */}
          <Link href="/" className="flex items-center gap-3 group/name">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-md opacity-60 group-hover/name:opacity-80 transition-opacity duration-300"></div>
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-400/30">
                <Image
                  src="/profile.jpg"
                  alt="Nathan An"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold gradient-text">Nathan An</span>
              <span className="text-xs text-slate-600 dark:text-gray-400 -mt-1">Blockchain Dev</span>
            </div>
          </Link>

          {/* Separator */}
          <div className="w-px h-6 bg-gradient-to-b from-transparent via-purple-500/50 to-transparent"></div>

          {/* Navigation */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group/nav relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  pathname === item.href
                    ? 'text-white bg-gradient-to-r from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/25'
                    : 'text-slate-600 dark:text-gray-400 hover:text-white hover:bg-slate-800/60 dark:hover:bg-slate-800/60 hover:shadow-lg hover:shadow-slate-800/20'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm transition-transform duration-300 group-hover/nav:scale-110">
                    {item.icon}
                  </span>
                  <span className="hidden sm:inline">{item.label}</span>
                </span>
                
                {/* Active indicator */}
                {pathname === item.href && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                )}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

