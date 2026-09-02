import React, { useEffect, useState } from 'react'
import { FiSun, FiMoon, FiSearch } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext.jsx'
import { useSearch } from '../context/SearchContext.jsx'

const links = [
  { id: 'home', label: 'intro' },
  { id: 'projects', label: 'works' },
  { id: 'about', label: 'studio' },
  { id: 'skills', label: 'skills' },
  { id: 'contact', label: 'contact' }
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { openSearch } = useSearch()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 30)
      // hide when scrolling down after some distance, show when scrolling up
      if (y > 320 && y > lastY + 6) setHidden(true)
      else if (y < lastY - 4 || y <= 320) setHidden(false)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [open])

  const handleNav = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <nav
        className={`flex items-center justify-between px-6 sm:px-10 h-16 lg:h-20 transition-colors duration-300 ${
          scrolled
            ? 'bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md border-b border-line-light dark:border-white/10'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* Logo / wordmark */}
        <button
          onClick={() => handleNav('home')}
          data-magnetic
          className="cursor-pointer font-sans text-lg font-semibold tracking-tight text-ink dark:text-white"
          aria-label="Home"
        >
          Junaid Mansoori<span className="text-accent">*</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.id} className="relative">
              <button
                onClick={() => handleNav(l.id)}
                className={`py-2 text-sm uppercase tracking-[0.15em] transition-colors cursor-pointer ${
                  active === l.id
                    ? 'text-ink dark:text-white'
                    : 'text-ink-muted dark:text-gray-400 hover:text-ink dark:hover:text-white'
                }`}
              >
                {l.label}
              </button>
              <span
                className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300 ${
                  active === l.id ? 'w-full opacity-100' : 'w-0 opacity-0'
                }`}
              />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            onClick={openSearch}
            className="w-10 h-10 flex items-center justify-center text-ink-muted dark:text-gray-300 hover:text-ink dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Search portfolio (Ctrl+K)"
            title="Search (Ctrl+K)"
          >
            <FiSearch size={18} />
          </button>

          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center text-ink-muted dark:text-gray-300 hover:text-ink dark:hover:text-white transition-transform duration-500 hover:rotate-[360deg] cursor-pointer"
            aria-label="Toggle dark/light mode"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Menu button */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden flex flex-col items-end justify-center w-10 h-10 gap-1.5 cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`block h-0.5 bg-ink dark:bg-white transition-all duration-300 ${open ? 'w-6 translate-y-[4px] rotate-45' : 'w-5'}`} />
            <span className={`block h-0.5 bg-ink dark:bg-white transition-all duration-300 ${open ? 'w-6 -translate-y-[4px] -rotate-45' : 'w-6'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className={`lg:hidden fixed inset-0 top-16 -z-10 bg-bg-light dark:bg-bg-dark transition-all duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="px-8 py-12 flex flex-col gap-4">
          {links.map((l, i) => (
            <li key={l.id}>
              <button
                onClick={() => handleNav(l.id)}
                className="group text-5xl font-light text-ink dark:text-white link-underline"
                style={{
                  transitionDelay: `${i * 0.05}s`,
                  transform: open ? 'translateY(0)' : 'translateY(20px)',
                  opacity: open ? 1 : 0,
                  transition: 'opacity .4s ease, transform .5s cubic-bezier(.22,1,.36,1)',
                }}
              >
                <span className="text-accent mr-3 text-2xl">/</span>
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
