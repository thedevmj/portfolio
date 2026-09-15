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
        className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-[12vh] bg-black/60"
        onClick={closeSearch}
        role="dialog"
        aria-modal="true"
        aria-label="Search portfolio"
      >
        <div
          className="w-full max-w-lg max-h-[70vh] flex flex-col overflow-hidden bg-neo-bg border-4 border-neo-ink shadow-neo-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 p-4 border-b-4 border-neo-ink">
            <span className="text-neo-accent text-sm font-black">/</span>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills, projects, services..."
              className="flex-1 bg-transparent text-neo-ink placeholder:opacity-50 focus:outline-none font-black tracking-tight"
              aria-label="Search portfolio content"
            />
            <button
              onClick={closeSearch}
              aria-label="Close search"
              className="w-10 h-10 border-2 border-neo-ink bg-neo-panel flex items-center justify-center text-neo-ink hover:bg-neo-accent hover:text-white duration-100 active:translate-x-1 active:translate-y-1 cursor-pointer"
            >
              <FiX />
            </button>
          </div>

          <div className="overflow-y-auto flex-1">
            {query.trim() === '' ? (
              <div className="p-6 text-center text-sm font-bold text-neo-ink opacity-60 dark:opacity-90">
                Type to search across skills, projects, services, education &amp; contact.
              </div>
            ) : groupedResults.length === 0 ? (
              <div className="p-6 text-center text-sm font-bold text-neo-ink opacity-60 dark:opacity-90">
                No results found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <ul className="p-3 flex flex-col gap-2">
                {groupedResults.map((r, i) => (
                  <li key={i}>
                    <button
                      onClick={() => goTo(r)}
                      className="w-full text-left px-4 py-3 bg-neo-panel border-2 border-neo-ink shadow-neo-sm hover:bg-neo-muted duration-100 flex items-center justify-between gap-3 cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                    >
                      <span>
                        <span className="text-sm font-black text-neo-ink">{r.label}</span>
                        <span className="block text-xs font-bold text-neo-ink opacity-50 dark:opacity-80 mt-0.5 uppercase tracking-wide">Go to {r.section} section</span>
                      </span>
                      <FiArrowRight className="text-neo-ink shrink-0" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="px-4 py-2.5 border-t-4 border-neo-ink text-xs font-bold text-neo-ink flex items-center justify-between">
            <span>debounced live search</span>
            <span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 border-2 border-neo-ink bg-neo-panel shadow-neo-sm">Esc</kbd> to close</span>
          </div>
        </div>
      </div>
    </Portal>
  )
}