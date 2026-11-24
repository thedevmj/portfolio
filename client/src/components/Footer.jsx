import React from 'react'
import { FiMail, FiPhone, FiGithub, FiDownload, FiArrowUp } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { buildWhatsAppLink } from '../constants'
import { Reveal, Stagger, StaggerItem } from './Motion'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Full-stack projects' },
  { id: 'about', label: 'About Junaid' },
  { id: 'skills', label: 'Skills & tech stack' },
  { id: 'services', label: 'Web & mobile services' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' }
]

export default React.memo(function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    if (window.location.hash !== `#${id}`) window.history.replaceState(null, '', `#${id}`)
  }

  const onAnchor = (event, id) => {
    event.preventDefault()
    scrollTo(id)
  }

  return (
    <footer className="relative border-t border-line">
      <div className="container-wide py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <a href="#home" onClick={(e) => onAnchor(e, 'home')} className="text-left">
              <span className="display block text-[clamp(2.4rem,7vw,5rem)] leading-[0.9] tracking-tight">
                Junaid <span className="italic text-accent">Mansoori</span>
              </span>
            </a>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              Full-Stack Developer · Web & Mobile
            </p>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              Websites · Android + iOS · AI
            </p>
            <a href="#contact" onClick={(e) => onAnchor(e, 'contact')} className="btn btn-accent mt-7 w-full whitespace-normal text-center sm:w-auto sm:whitespace-nowrap">
              Contact Junaid about a project
            </a>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-3">
            <h2 className="eyebrow">Sitemap</h2>
            <Stagger as="ul" className="mt-5 space-y-2.5" gap={0.05}>
              {navLinks.map((l) => (
                <StaggerItem as="li" key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => onAnchor(e, l.id)}
                    className="link-underline text-sm font-medium text-muted transition-colors hover:text-fg"
                  >
                    {l.label}
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>

          <Reveal delay={0.18} className="md:col-span-3">
            <h2 className="eyebrow">Contact</h2>
            <Stagger as="ul" className="mt-5 space-y-3 text-sm font-medium text-muted" gap={0.04}>
              <StaggerItem as="li">
                <a href="mailto:junaidmansuri71@gmail.com" className="flex items-center gap-2 transition-colors hover:text-fg">
                  <FiMail size={13} /> junaidmansuri71@gmail.com
                </a>
              </StaggerItem>
              <StaggerItem as="li">
                <a href="tel:+919649354858" className="flex items-center gap-2 transition-colors hover:text-fg">
                  <FiPhone size={13} /> +91 9649354858
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
                  <FiDownload size={13} /> Download resume (PDF)
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
            <a
              href="#home"
              onClick={(e) => onAnchor(e, 'home')}
              className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-fg"
            >
              Back to top <FiArrowUp size={13} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
})
