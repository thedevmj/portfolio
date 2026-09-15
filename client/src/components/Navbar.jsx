import React, { useEffect, useState } from 'react'
import { FiSun, FiMoon, FiSearch } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext.jsx'
import { useSearch } from '../context/SearchContext.jsx'
import { motion } from 'motion/react'

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
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
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
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <nav className="bg-neo-bg border-b-4 border-neo-ink shadow-[0_6px_0_0_var(--neo-ink)]">
        <div className="container-neo py-3 md:py-4">
          <motion.div
            className="flex items-center justify-between gap-3"
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            {/* Logo */}
            <button
              onClick={() => handleNav('home')}
              data-magnetic
              className="bg-neo-accent border-4 border-neo-ink px-3 py-2 md:px-5 md:py-2.5 shadow-neo-sm duration-100 hover:shadow-neo-md active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer shrink-0"
              aria-label="Go to home"
            >
              <span className="font-black text-base md:text-lg uppercase tracking-tight leading-none text-white">
                JM<span className="hidden sm:inline">&nbsp;·&nbsp;DEV</span>
              </span>
            </button>

            {/* Desktop links */}
            <ul className="hidden lg:flex items-center gap-3">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => handleNav(l.id)}
                    data-magnetic
                    aria-current={active === l.id ? 'page' : undefined}
                    className={`font-black text-xs uppercase tracking-wider cursor-pointer px-4 py-2 border-4 duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                      active === l.id
                        ? 'bg-neo-accent border-neo-ink text-white shadow-neo-sm'
                        : 'border-transparent text-neo-ink hover:bg-neo-secondary hover:text-black hover:border-neo-ink hover:shadow-neo-sm'
                    }`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 md:gap-3">
              {/* Search */}
              <button
                onClick={openSearch}
                aria-label="Search portfolio (Ctrl+K)"
                title="Search (Ctrl+K)"
                className="w-11 h-11 flex items-center justify-center border-4 border-neo-ink bg-neo-panel shadow-neo-sm text-neo-ink hover:bg-neo-secondary hover:text-black duration-100 active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
              >
                <FiSearch size={18} />
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark/light mode"
                className="w-11 h-11 flex items-center justify-center border-4 border-neo-ink bg-neo-panel shadow-neo-sm text-neo-ink hover:bg-neo-secondary hover:text-black duration-100 active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
              >
                {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>

              {/* Menu button */}
              <button
                onClick={() => setOpen((o) => !o)}
                aria-label="Toggle menu"
                aria-expanded={open}
                className="lg:hidden w-11 h-11 border-4 border-neo-ink bg-neo-panel shadow-neo-sm flex flex-col items-center justify-center gap-[5px] duration-100 active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
              >
                <span className={`block h-[3px] bg-neo-ink transition-all duration-200 ${open ? 'w-5 translate-y-[4px] rotate-45' : 'w-[18px]'}`} />
                <span className={`block h-[3px] bg-neo-ink transition-all duration-200 ${open ? 'w-5 -translate-y-[4px] -rotate-45' : 'w-6'}`} />
              </button>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className={`lg:hidden fixed inset-0 top-0 -z-10 bg-neo-bg transition-all duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="px-6 pt-32 pb-12 flex flex-col gap-4">
          {links.map((l, i) => (
            <li key={l.id}>
              <button
                onClick={() => handleNav(l.id)}
                className="w-full text-left font-black uppercase tracking-tighter text-3xl text-neo-ink px-6 py-4 bg-neo-panel border-4 border-neo-ink shadow-neo-md duration-100 active:translate-x-1 active:translate-y-1 active:shadow-none"
                style={{
                  transitionDelay: `${i * 0.04}s`,
                  transform: open ? 'translateY(0)' : 'translateY(24px)',
                  opacity: open ? 1 : 0,
                  transition: 'opacity .3s ease, transform .4s cubic-bezier(.22,1,.36,1)'
                }}
              >
                <span className="text-neo-accent mr-3 text-xl">→</span>
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}