import React, { useEffect, useState } from 'react'

// Cinematic preloader: mech-reveals the JM monogram, fills a progress bar,
// counts 000→100, then blurs/scales/fades away to reveal the page.
const MONO = ['J', 'M', '.', '']

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    let val = 0
    const interval = setInterval(() => {
      val += Math.ceil((100 - val) * 0.3)
      if (val >= 99) val = 100
      setCount(val)
      if (val >= 100) {
        clearInterval(interval)
        setTimeout(() => setLeaving(true), 250)
        setTimeout(onDone, 1150)
      }
    }, 55)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-[80] flex flex-col items-center justify-center bg-bg-light dark:bg-bg-dark transition-all duration-1000 ${
        leaving ? 'opacity-0 scale-110 blur-md pointer-events-none' : 'opacity-100 scale-100 blur-0'
      }`}
      aria-hidden="true"
    >
      {/* Monogram */}
      <div className="font-sans text-[20vw] sm:text-[11rem] leading-none font-semibold tracking-tight text-ink dark:text-white select-none">
        {MONO.map((ch, i) => (
          <span key={i} className="mech-char" style={{ animationDelay: `${i * 0.18}s` }}>
            {i === MONO.length - 1 ? <span className="text-accent">_</span> : ch}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-ink-muted dark:text-gray-400">
        <span className="typing-caret">&nbsp;</span>
        <span>Full Stack Developer</span>
      </div>

      {/* Progress bar */}
      <div className="mt-10 w-56 h-px bg-line-light dark:bg-white/15 overflow-hidden">
        <div
          className="h-full bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${count}%` }}
        />
      </div>

      <div className="absolute bottom-8 left-6 text-6xl sm:text-8xl font-light text-ink-muted dark:text-gray-500 tabular-nums">
        {String(count).padStart(3, '0')}
      </div>
      <div className="absolute bottom-8 right-6 text-xs tracking-[0.2em] uppercase text-ink-muted dark:text-gray-400">
        Loading…
      </div>
    </div>
  )
}
