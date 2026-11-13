import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { FiSearch, FiX, FiArrowUpRight } from 'react-icons/fi'
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
        className="fixed inset-0 z-[70] flex items-start justify-center bg-black/60 p-4 pt-[12vh] backdrop-blur-sm"
        onClick={closeSearch}
        role="dialog"
        aria-modal="true"
        aria-label="Search portfolio"
      >
        <div
          className="flex max-h-[70vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-line bg-bg shadow-lift"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Input row */}
          <div className="flex items-center gap-3 border-b border-line p-4">
            <FiSearch className="shrink-0 text-muted" size={17} />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills, projects, services…"
              className="flex-1 bg-transparent text-sm font-medium text-fg outline-none placeholder:text-muted"
              aria-label="Search portfolio content"
            />
            <kbd className="hidden rounded-md border border-line px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-muted sm:block">
              Esc
            </kbd>
            <button onClick={closeSearch} aria-label="Close search" className="icon-btn h-8 w-8">
              <FiX size={15} />
            </button>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto">
            {query.trim() === '' ? (
              <div className="p-7 text-center text-sm text-muted">
                Type to search across skills, projects, services, education &amp; contact.
              </div>
            ) : groupedResults.length === 0 ? (
              <div className="p-7 text-center text-sm text-muted">
                No results found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <ul className="flex flex-col gap-2 p-3">
                {groupedResults.map((r, i) => (
                  <li key={i}>
                    <button
                      onClick={() => goTo(r)}
                      className="group flex w-full items-center justify-between gap-3 rounded-xl border border-line px-4 py-3 text-left transition-colors hover:border-line-strong hover:bg-elev"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-fg">{r.label}</span>
                        <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                          Go to {r.section}
                        </span>
                      </span>
                      <FiArrowUpRight className="shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
            <span>Debounced live search</span>
            <span className="hidden sm:inline">Ctrl / ⌘ + K</span>
          </div>
        </div>
      </div>
    </Portal>
  )
}
