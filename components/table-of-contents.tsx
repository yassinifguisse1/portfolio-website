"use client"

import { useEffect, useState } from 'react'
import { TOCItem } from '@/lib/utils/toc'

interface TableOfContentsProps {
  items: TOCItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      // Find the current section being viewed
      const headingElements = items.map((item) => {
        const element = document.getElementById(item.id)
        return { id: item.id, element, top: element?.getBoundingClientRect().top || 0 }
      })

      // Find the heading that's currently in view (closest to top but not scrolled past)
      const currentHeading = headingElements
        .filter((h) => h.top <= 100) // Within 100px of top
        .sort((a, b) => b.top - a.top)[0] // Get the one closest to top

      if (currentHeading) {
        setActiveId(currentHeading.id)
      } else if (headingElements[0]?.top > 0) {
        // If we're at the top, highlight first heading
        setActiveId(headingElements[0].id)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [items])

  if (items.length === 0) {
    return null
  }

  return (
    <nav className="sticky top-24 hidden lg:block self-start">
      <div className="rounded-lg border border-foreground/20 bg-foreground/5 p-6 backdrop-blur-sm">
        <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-foreground/80">
          Table of Contents
        </h3>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(item.id)
                  if (element) {
                    const offset = 100 // Account for sticky header
                    const elementPosition = element.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.pageYOffset - offset

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth',
                    })
                  }
                }}
                className={`block font-sans text-sm transition-colors ${
                  activeId === item.id
                    ? 'font-medium text-foreground'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

