import React, { useEffect, useState } from 'react'

// Neo-brutalist preloader: mech-reveals the JM monogram, fills a thick accent
// progress bar, counts 000→100, then slides/scales away to reveal the page.
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
        setTimeout(onDone, 1100)
      }
    }, 55)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-[80] flex flex-col items-center justify-center bg-neo-ink text-neo-bg transition-all duration-700 ${
        leaving ? 'opacity-0 -translate-y-3 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
      aria-hidden="true"
    >
      {/* Monogram */}
      <div className="font-black text-[22vw] sm:text-[12rem] leading-none uppercase tracking-tighter text-neo-bg select-none">
        {MONO.map((ch, i) => (
          <span key={i} className="mech-char" style={{ animationDelay: `${i * 0.16}s` }}>
            {i === MONO.length - 1 ? <span className="text-neo-accent">_</span> : ch}
          </span>
        ))}
      </div>

      <span className="mt-4 inline-block bg-neo-secondary border-4 border-neo-bg px-4 py-2 font-black text-xs uppercase tracking-widest text-black shadow-neo-sm transform rotate-1">
        Full Stack Developer
      </span>

      {/* Thick progress bar */}
      <div className="mt-10 w-64 sm:w-80 h-6 border-4 border-neo-bg bg-transparent overflow-hidden relative">
        <div
          className="h-full bg-neo-accent transition-[width] duration-150 ease-out"
          style={{ width: `${count}%` }}
        />
      </div>

      <div className="absolute bottom-6 left-6 text-7xl sm:text-9xl font-black text-neo-bg opacity-20 tabular-nums leading-none">
        {String(count).padStart(3, '0')}
      </div>
      <div className="absolute bottom-8 right-6 flex items-center gap-2 text-xs tracking-[0.25em] uppercase font-bold text-neo-bg">
        <span className="typing-caret">&nbsp;</span>
        <span>Loading…</span>
      </div>
    </div>
  )
}