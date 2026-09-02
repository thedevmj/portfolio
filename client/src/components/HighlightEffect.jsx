import { useEffect, useRef } from 'react'
import { useSearch } from '../context/SearchContext.jsx'

// Applies a temporary visual flash to the section a user jumped to from search.
export default function HighlightEffect() {
  const { highlight, setHighlight } = useSearch()
  const timers = useRef([])

  useEffect(() => {
    if (!highlight) return
    const { section } = highlight
    const el = document.getElementById(section)
    if (el) {
      el.classList.add('search-highlight')
      const t = setTimeout(() => {
        el.classList.remove('search-highlight')
        if (timers.current.length) timers.current = timers.current.filter((x) => x !== t)
      }, 2600)
      timers.current.push(t)
    }
    // Clear global highlight state shortly after
    const clearT = setTimeout(() => setHighlight(null), 2800)
    timers.current.push(clearT)

    return () => {
      timers.current.forEach((t) => clearTimeout(t))
      timers.current = []
      el?.classList.remove('search-highlight')
    }
  }, [highlight, setHighlight])

  return null
}
