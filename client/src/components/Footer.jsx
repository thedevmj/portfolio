import React from 'react'
import { FiMail, FiPhone, FiGithub } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { buildWhatsAppLink } from '../constants'

const navLinks = [
  { id: 'home', label: 'Intro' },
  { id: 'projects', label: 'Works' },
  { id: 'about', label: 'Studio' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' }
]

export default React.memo(function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="relative border-t border-line-light dark:border-white/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-10 py-12 md:py-16">
        <div className="grid gap-8 md:gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-sans text-2xl font-semibold tracking-tight text-ink dark:text-white">
              Junaid Mansoori<span className="text-accent">*</span>
            </p>
            <p className="mt-3 text-sm text-ink-muted dark:text-gray-400">Full Stack Developer</p>
            <p className="mt-1 text-sm text-ink-muted dark:text-gray-400">MERN • AI • React Native</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-ink-muted dark:text-gray-500 mb-5">Sitemap</h4>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button onClick={() => scrollTo(l.id)} className="text-sm text-ink dark:text-gray-300 hover:text-accent transition-colors link-underline cursor-pointer">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-ink-muted dark:text-gray-500 mb-5">Contact</h4>
            <ul className="space-y-3 text-sm text-ink dark:text-gray-300">
              <li><a href="mailto:junaidmansuri71@gmail.com" className="flex items-center gap-2 hover:text-accent transition-colors"><FiMail size={14} /> junaidmansuri71@gmail.com</a></li>
              <li><a href="tel:9649354858" className="flex items-center gap-2 hover:text-accent transition-colors"><FiPhone size={14} /> 9649354858</a></li>
              <li><a href={buildWhatsAppLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors"><FaWhatsapp size={14} /> WhatsApp</a></li>
              <li><a href="https://github.com/thedevmj" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors"><FiGithub size={14} /> github.com/thedevmj</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-14 pt-6 border-t border-line-light dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted dark:text-gray-500">
          <span>© 2026 Mohammad Junaid Mansoori. All rights reserved.</span>
          <span className="uppercase tracking-[0.15em]">EN</span>
        </div>
      </div>
    </footer>
  )
})
