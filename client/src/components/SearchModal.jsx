import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { FiSearch, FiX, FiArrowRight } from 'react-icons/fi'
import Portal from './Portal'
import { useSearch } from '../context/SearchContext.jsx'

export default function SearchModal() {
  const { query, setQuery, results, open, openSearch, closeSearch, search, setHighlight } = useSearch()
  const inputRef = useRef(null)
  const highlightTimeout = useRef(null)

  useEffect(() => {
    search(query)
  }, [query, search])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (open) closeSearch()
        else openSearch()
      }
      if (e.key === 'Escape') closeSearch()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, openSearch, closeSearch])

  const goTo = useCallback(
    (entry) => {
      closeSearch()
      const section = document.getElementById(entry.section)
      if (section) {
        setHighlight({ section: entry.section, term: entry.matchedTerm || query })
        section.scrollIntoView({ behavior: 'smooth' })
        if (highlightTimeout.current) clearTimeout(highlightTimeout.current)
      }
    },
    [closeSearch, setHighlight, query]
  )

  const groupedResults = useMemo(() => {
    const seen = new Set()
    const out = []
    results.forEach((r) => {
      const key = r.section + '|' + r.label
      if (!seen.has(key)) {
        seen.add(key)
        out.push(r)
      }
    })
    return out
  }, [results])

  if (!open) return null

  return (
    <Portal>
      <div
        className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-[12vh] bg-black/60 backdrop-blur-sm"
        onClick={closeSearch}
        role="dialog"
        aria-modal="true"
        aria-label="Search portfolio"
      >
        <div
          className="w-full max-w-lg max-h-[70vh] flex flex-col overflow-hidden bg-bg-light dark:bg-bg-dark border border-line-light dark:border-white/10 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 p-4 border-b border-line-light dark:border-white/10">
            <span className="text-accent text-sm">/</span>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills, projects, services, contact..."
              className="flex-1 bg-transparent text-ink dark:text-gray-200 placeholder-ink-muted/60 dark:placeholder-gray-500 focus:outline-none font-sans"
              aria-label="Search portfolio content"
            />
            <button
              onClick={closeSearch}
              className="w-8 h-8 border border-line-light dark:border-white/20 flex items-center justify-center text-ink-muted dark:text-gray-300 hover:bg-ink hover:text-white dark:hover:bg-white dark:hover:text-ink transition-colors cursor-pointer"
              aria-label="Close search"
            >
              <FiX />
            </button>
          </div>

          <div className="overflow-y-auto flex-1">
            {query.trim() === '' ? (
              <div className="p-6 text-center text-sm text-ink-muted dark:text-gray-400 font-sans">
                Type to search across skills, projects, services, education &amp; contact.
              </div>
            ) : groupedResults.length === 0 ? (
              <div className="p-6 text-center text-sm text-ink-muted dark:text-gray-400 font-sans">
                No results found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <ul className="p-2">
                {groupedResults.map((r, i) => (
                  <li key={i}>
                    <button
                      onClick={() => goTo(r)}
                      className="w-full text-left px-4 py-3 hover:bg-line-light/60 dark:hover:bg-white/5 transition-colors flex items-center justify-between gap-3 cursor-pointer font-sans"
                    >
                      <span>
                        <span className="text-sm font-medium text-ink dark:text-gray-200">{r.label}</span>
                        <span className="block text-xs text-ink-muted dark:text-gray-500 mt-0.5 uppercase tracking-wide">Go to {r.section} section</span>
                      </span>
                      <FiArrowRight className="text-ink-muted dark:text-gray-400 shrink-0" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="px-4 py-2 border-t border-line-light dark:border-white/10 text-xs text-ink-muted dark:text-gray-500 flex items-center justify-between font-sans">
            <span>debounced live search</span>
            <span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 rounded-sm border border-line-light dark:border-white/20">Esc</kbd> to close</span>
          </div>
        </div>
      </div>
    </Portal>
  )
}
