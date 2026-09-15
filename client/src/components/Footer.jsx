import React from 'react'
import { FiMail, FiPhone, FiGithub, FiDownload } from 'react-icons/fi'
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
    <footer className="relative bg-neo-secondary border-t-4 border-neo-ink">
      <div className="container-neo py-14 md:py-20">
        <div className="grid gap-10 md:gap-12 md:grid-cols-3">
          {/* Brand */}
          <Reveal>
            <div className="inline-block bg-neo-accent border-4 border-neo-ink px-5 py-3 shadow-neo-sm transform -rotate-1">
              <p className="font-black text-xl uppercase tracking-tight text-white" style={{ textShadow: '3px 3px 0 #000' }}>
                Junaid Mansoori
              </p>
            </div>
            <p className="mt-5 text-sm font-black uppercase tracking-widest text-black">Full Stack Developer</p>
            <p className="mt-1 text-sm font-bold uppercase tracking-widest text-black opacity-60">MERN • AI • React Native</p>
          </Reveal>

          {/* Navigation */}
          <Reveal delay={0.1}>
            <h4 className="inline-block bg-black border-2 border-black text-white px-3 py-1.5 text-xs font-black uppercase tracking-widest mb-5">
              Sitemap
            </h4>
            <Stagger as="ul" className="space-y-2.5" gap={0.05}>
              {navLinks.map((l) => (
                <StaggerItem as="li" key={l.id}>
                  <button onClick={() => scrollTo(l.id)} className="font-black uppercase tracking-wide text-sm text-black hover:text-neo-accent link-underline cursor-pointer">
                    {l.label}
                  </button>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>

          {/* Contact */}
          <Reveal delay={0.2}>
            <h4 className="inline-block bg-black border-2 border-black text-white px-3 py-1.5 text-xs font-black uppercase tracking-widest mb-5">
              Contact
            </h4>
            <Stagger as="ul" className="space-y-3 text-sm text-black font-bold" gap={0.04}>
              <StaggerItem as="li"><a href="mailto:junaidmansuri71@gmail.com" className="flex items-center gap-2 hover:text-neo-accent transition-colors"><FiMail size={14} /> junaidmansuri71@gmail.com</a></StaggerItem>
              <StaggerItem as="li"><a href="tel:9649354858" className="flex items-center gap-2 hover:text-neo-accent transition-colors"><FiPhone size={14} /> 9649354858</a></StaggerItem>
              <StaggerItem as="li"><a href={buildWhatsAppLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-neo-accent transition-colors"><FaWhatsapp size={14} /> WhatsApp</a></StaggerItem>
              <StaggerItem as="li"><a href="https://github.com/thedevmj" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-neo-accent transition-colors"><FiGithub size={14} /> github.com/thedevmj</a></StaggerItem>
              <StaggerItem as="li"><a href="/junaidMansoori_Resume.pdf" download="junaidMansoori_Resume.pdf" className="flex items-center gap-2 hover:text-neo-accent transition-colors"><FiDownload size={14} /> Download Resume</a></StaggerItem>
            </Stagger>
          </Reveal>
        </div>

        <div className="mt-12 pt-6 border-t-4 border-neo-ink flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-black uppercase tracking-widest text-black">
          <span>© 2026 Mohammad Junaid Mansoori. All rights reserved.</span>
          <span className="bg-neo-panel border-2 border-neo-ink px-3 py-1.5 shadow-neo-sm">EN</span>
        </div>
      </div>
    </footer>
  )
})