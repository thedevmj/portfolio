import React, { useEffect, useRef, useState } from 'react'
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiChevronDown } from 'react-icons/fi'
import HeroVideo from './HeroVideo'
import TorsionText from './TorsionText'

const roles = [
  'Full Stack Developer',
  'MERN Stack Engineer',
  'AI Application Developer',
  'React Native Developer',
  'UI/UX Developer'
]

// Animated mock terminal that types lines as you land
function Terminal() {
  const lines = [
    { prompt: '$', cmd: 'junaid --intro', out: 'full stack + AI, ship fast.' },
    { prompt: '>', cmd: 'stack', out: 'react · node · mongo · ai' },
    { prompt: '>', cmd: 'status', out: 'open to opportunities ✦' }
  ]
  return (
    <div className="reveal border border-line-light dark:border-white/10 rounded-2xl bg-white/50 dark:bg-white/[0.03] backdrop-blur-md shadow-xl shadow-black/5 overflow-hidden w-full max-w-md">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line-light dark:border-white/10">
        <span className="w-3 h-3 rounded-full bg-red-400/80" />
        <span className="w-3 h-3 rounded-full bg-amber-400/80" />
        <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
        <span className="ml-3 text-xs text-ink-muted dark:text-gray-400 font-mono">junaid@dev: ~/portfolio</span>
      </div>
      <div className="px-4 py-5 font-mono text-sm space-y-2.5">
        {lines.map((l, i) => (
          <div key={i} className="terminal-line" style={{ '--d': `${0.6 + i * 0.5}s` }}>
            {l.out ? (
              <>
                <div className="text-ink-muted dark:text-gray-400"><span className="text-accent">{l.prompt}</span> {l.cmd}</div>
                <div className="text-ink dark:text-gray-200 opacity-90">{l.out}</div>
              </>
            ) : (
              <div className="text-ink-muted dark:text-gray-400"><span className="text-accent">{l.prompt}</span> {l.cmd}</div>
            )}
          </div>
        ))}
        <div className="text-accent">
          $ <span className="typing-caret">&nbsp;</span>
        </div>
      </div>
    </div>
  )
}

export default React.memo(function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [deleting, setDeleting] = useState(false)
  const glowRef = useRef(null)
  const target = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 3 })
  const pos = useRef({ ...target.current })

  // Typing role rotator
  useEffect(() => {
    const current = roles[roleIndex]
    const speed = deleting ? 45 : 95
    if (!deleting && typed === current) {
      const t = setTimeout(() => setDeleting(true), 1400)
      return () => clearTimeout(t)
    }
    if (deleting && typed === '') {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
      return
    }
    const t = setTimeout(() => {
      setTyped(current.slice(0, typed.length + (deleting ? -1 : 1)))
    }, speed)
    return () => clearTimeout(t)
  }, [typed, deleting, roleIndex])

  // Smooth mouse-following glow (lerped on rAF)
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    let raf
    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
    }
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.08
      pos.current.y += (target.current.y - pos.current.y) * 0.08
      if (glowRef.current) {
        glowRef.current.style.left = `${pos.current.x}px`
        glowRef.current.style.top = `${pos.current.y}px`
      }
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* WebGL torsion background video */}
      <HeroVideo />
      {/* Cursor glow */}
      <div ref={glowRef} className="mouse-glow" aria-hidden="true" />

      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full grid lg:grid-cols-[1.2fr,1fr] gap-8 lg:gap-12 items-center px-5 sm:px-10 lg:px-16 pt-20 pb-10 lg:pt-28 lg:pb-16">
          {/* Left: wordmark */}
          <div>
            <div className="mask-line-wrap" style={{ '--d': '0.1s' }}>
              <p className="hero-item font-sans text-sm uppercase tracking-[0.25em] text-accent" style={{ animationDelay: '0.1s' }}>
                &lt; full stack developer /&gt;
              </p>
            </div>

            {/* Name — line mask reveal + torsion twist on hover */}
            <TorsionText maxX={9} maxY={5} maxSkew={3} wobble={0.5}>
              <h1 className="mt-6 font-sans font-semibold tracking-tight leading-[0.92] text-ink dark:text-white select-none"
                style={{ fontSize: 'clamp(2.4rem, 10vw, 11rem)' }}
              >
                <span className="mask-line-wrap"><span className="mask-line">Junaid</span></span>
                <span className="mask-line-wrap"><span className="mask-line italic text-accent" style={{ animationDelay: '0.12s' }}>Mansoori</span></span>
              </h1>
            </TorsionText>

            {/* Typing role */}
            <div className="mt-8 flex items-center text-xl sm:text-2xl text-ink dark:text-gray-200 font-mono h-9">
              <span className="text-ink-muted dark:text-gray-500">&gt;_</span>
              <span className="ml-2">{typed}</span>
              <span className="typing-caret">&nbsp;</span>
            </div>

            {/* Tagline */}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink dark:text-gray-300">
              Full-stack developer building AI-integrated web and mobile applications with the MERN stack.
            </p>

            {/* CTAs */}
            <div className="mt-6 sm:mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <button onClick={() => scrollTo('projects')} data-magnetic className="btn-black group">
                View My Works <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => scrollTo('contact')} data-magnetic className="btn-outline">
                Let&rsquo;s Connect
              </button>
              <a href="/Junaid_Mansoori_Resume.pdf" download="Junaid_Mansoori_Resume.pdf" data-magnetic className="btn-outline">
                <FiDownload /> Resume
              </a>
            </div>
          </div>

          {/* Right: terminal */}
          <div className="hidden lg:flex justify-center">
            <div className="float-soft w-full flex justify-center">
              <Terminal />
            </div>
          </div>
        </div>
      </div>

      {/* Tech marquee */}
      <div className="relative z-10 marquee-mask overflow-hidden border-t border-line-light dark:border-white/10 py-4">
        <div className="flex w-max whitespace-nowrap marquee-track marquee-pause"
          style={{ animation: 'marquee 30s linear infinite' }}
        >
          {[0, 1].map((k) => (
            <div key={k} className="flex items-center text-sm uppercase tracking-[0.25em] text-ink-muted dark:text-gray-400">
              {['React', 'Node.js', 'MongoDB', 'Express', 'AI / LLM', 'React Native', 'TypeScript', 'REST APIs', 'UI/UX', 'MCP'].map((t) => (
                <span key={t} className="flex items-center px-5">
                  {t} <span className="ml-10 text-accent">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})
