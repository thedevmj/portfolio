import React from 'react'
import { FiMail, FiPhone, FiGithub, FiDownload, FiArrowUp } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { buildWhatsAppLink } from '../constants'
import { Reveal, Stagger, StaggerItem } from './Motion'

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
    <footer className="relative border-t border-line">
      <div className="container-wide py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <Reveal className="md:col-span-6">
            <button onClick={() => scrollTo('home')} className="text-left">
              <span className="display block text-[clamp(2.4rem,7vw,5rem)] leading-[0.9] tracking-tight">
                Junaid <span className="italic text-accent">Mansoori</span>
              </span>
            </button>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              Full Stack Developer
            </p>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              MERN · AI · React Native
            </p>
            <button onClick={() => scrollTo('contact')} className="btn btn-accent mt-7">
              Start a project
            </button>
          </Reveal>

          {/* Navigation */}
          <Reveal delay={0.1} className="md:col-span-3">
            <h4 className="eyebrow">Sitemap</h4>
            <Stagger as="ul" className="mt-5 space-y-2.5" gap={0.05}>
              {navLinks.map((l) => (
                <StaggerItem as="li" key={l.id}>
                  <button
                    onClick={() => scrollTo(l.id)}
                    className="link-underline text-sm font-medium text-muted transition-colors hover:text-fg"
                  >
                    {l.label}
                  </button>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>

          {/* Contact */}
          <Reveal delay={0.18} className="md:col-span-3">
            <h4 className="eyebrow">Contact</h4>
            <Stagger as="ul" className="mt-5 space-y-3 text-sm font-medium text-muted" gap={0.04}>
              <StaggerItem as="li">
                <a href="mailto:junaidmansuri71@gmail.com" className="flex items-center gap-2 transition-colors hover:text-fg">
                  <FiMail size={13} /> junaidmansuri71@gmail.com
                </a>
              </StaggerItem>
              <StaggerItem as="li">
                <a href="tel:9649354858" className="flex items-center gap-2 transition-colors hover:text-fg">
                  <FiPhone size={13} /> 9649354858
                </a>
              </StaggerItem>
              <StaggerItem as="li">
                <a href={buildWhatsAppLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-fg">
                  <FaWhatsapp size={13} /> WhatsApp
                </a>
              </StaggerItem>
              <StaggerItem as="li">
                <a href="https://github.com/thedevmj" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-fg">
                  <FiGithub size={13} /> github.com/thedevmj
                </a>
              </StaggerItem>
              <StaggerItem as="li">
                <a href="/junaidMansoori_Resume.pdf" download="junaidMansoori_Resume.pdf" className="flex items-center gap-2 transition-colors hover:text-fg">
                  <FiDownload size={13} /> Download resume
                </a>
              </StaggerItem>
            </Stagger>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            © 2026 Mohammad Junaid Mansoori. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              EN
            </span>
            <button
              onClick={() => scrollTo('home')}
              className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-fg"
            >
              Back to top <FiArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
})
