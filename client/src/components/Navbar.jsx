import React, { useEffect, useState } from 'react'
import { FiSun, FiMoon, FiSearch, FiArrowUpRight } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext.jsx'
import { useSearch } from '../context/SearchContext.jsx'
import { motion, AnimatePresence } from 'motion/react'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { openSearch } = useSearch()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      if (y > 360 && y > lastY + 8) setHidden(true)
      else if (y < lastY - 6 || y <= 360) setHidden(false)
      lastY = y
    }
    onScroll()
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
      { rootMargin: '-42% 0px -54% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const goTo = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    if (window.location.hash !== `#${id}`) window.history.replaceState(null, '', `#${id}`)
  }

  const onAnchor = (event, id) => {
    event.preventDefault()
    goTo(id)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${
        hidden && !open ? '-translate-y-[140%]' : 'translate-y-0'
      }`}
    >
      <div className="container-wide">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 240, damping: 26 }}
          className={`mt-3 flex items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 transition-all duration-300 ${
            scrolled || open
              ? 'border-line bg-glass shadow-soft backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          {/* Wordmark */}
          <a href="#home" onClick={(e) => onAnchor(e, 'home')} className="group flex shrink-0 items-center gap-3" aria-label="Go to top">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent font-serif text-xl italic leading-none text-on-accent transition-transform duration-300 group-hover:-rotate-6">
              J
            </span>
            <span className="hidden flex-col text-left leading-none sm:flex">
              <span className="text-sm font-bold tracking-tight">Junaid Mansoori</span>
              <span className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
                Web · Full Stack · Apps
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => onAnchor(e, l.id)}
                  aria-current={active === l.id ? 'page' : undefined}
                  className={`group relative flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                    active === l.id ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {l.label}
                  {active === l.id && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-px bg-accent" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button onClick={openSearch} className="icon-btn" aria-label="Search portfolio (Ctrl+K)" title="Search (Ctrl+K)">
              <FiSearch size={16} />
            </button>
            <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle dark/light mode">
              {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>
            <a
              href="#contact"
              onClick={(e) => onAnchor(e, 'contact')}
              className="btn btn-accent hidden px-5 py-2.5 text-[13px] sm:inline-flex"
            >
              Contact Junaid <FiArrowUpRight size={15} />
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="icon-btn lg:hidden"
            >
              <span className="relative flex h-4 w-4 flex-col items-center justify-center">
                <span
                  className={`absolute h-[1.5px] w-4 rounded bg-fg transition-all duration-300 ${
                    open ? 'rotate-45' : '-translate-y-[3px]'
                  }`}
                />
                <span
                  className={`absolute h-[1.5px] w-4 rounded bg-fg transition-all duration-300 ${
                    open ? '-rotate-45' : 'translate-y-[3px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[45] flex flex-col overflow-y-auto overscroll-contain bg-bg pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:hidden"
          >
            <div className="container-wide flex min-h-full flex-1 flex-col justify-center py-24">
              <ul className="border-t border-line">
                {links.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-line"
                  >
                    <a
                      href={`#${l.id}`}
                      onClick={(e) => onAnchor(e, l.id)}
                      className="group flex w-full items-center gap-3 py-4 text-left sm:py-5"
                    >
                      <span                         className="font-serif text-3xl tracking-tight transition-colors group-hover:text-accent sm:text-4xl">
                        {l.label}
                      </span>
                      <FiArrowUpRight className="ml-auto text-muted transition-colors group-hover:text-accent" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                 className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-widest text-muted sm:mt-10"
              >
                <a href="mailto:junaidmansuri71@gmail.com" className="link-underline hover:text-fg">
                  Email
                </a>
                <a href="https://github.com/thedevmj" target="_blank" rel="noreferrer" className="link-underline hover:text-fg">
                  GitHub
                </a>
                <a href="/junaidMansoori_Resume.pdf" download className="link-underline hover:text-fg">
                  Download resume (PDF)
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
