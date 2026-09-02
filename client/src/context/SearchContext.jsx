import { createContext, useContext, useCallback, useMemo, useRef, useState } from 'react'
import { searchIndex } from '../data/searchIndex'

const SearchContext = createContext()

// Simple text normalize for accent/case-insensitive matching
const normalize = (str) => str.toLowerCase().replace(/\s+/g, ' ').trim()

export function SearchProvider({ children }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(null) // { section, term }
  const debounceRef = useRef()

  // Normalize the search index once (memoized)
  const normalizedIndex = useMemo(
    () =>
      searchIndex.map((entry) => ({
        ...entry,
        haystack: normalize([entry.label, ...entry.keywords].join(' '))
      })),
    []
  )

  // Debounced search function
  const search = useCallback(
    (rawQuery) => {
      const q = normalize(rawQuery || '')
      if (debounceRef.current) clearTimeout(debounceRef.current)

      if (!q) {
        setResults([])
        return
      }

      debounceRef.current = setTimeout(() => {
        const terms = q.split(' ').filter(Boolean)
        const matched = normalizedIndex
          .map((entry) => {
            let score = 0
            let matchedTerm = ''
            terms.forEach((term) => {
              if (entry.haystack.includes(term)) {
                score += 1
                if (!matchedTerm) matchedTerm = term
              }
            })
            return { ...entry, score, matchedTerm }
          })
          .filter((e) => e.score > 0)
          .sort((a, b) => b.score - a.score)

        setResults(matched)
      }, 250)
    },
    [normalizedIndex]
  )

  const openSearch = useCallback(() => {
    setOpen(true)
    setQuery('')
    setResults([])
  }, [])

  const closeSearch = useCallback(() => {
    setOpen(false)
    setQuery('')
    setResults([])
    if (debounceRef.current) clearTimeout(debounceRef.current)
  }, [])

  const value = useMemo(
    () => ({ query, setQuery, results, open, openSearch, closeSearch, search, highlight, setHighlight }),
    [query, results, open, openSearch, closeSearch, search, highlight]
  )

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export const useSearch = () => useContext(SearchContext)
