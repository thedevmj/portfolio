import React, { useEffect, useState } from 'react'

// Editorial preloader: monogram reveal, thin accent progress line, live counter.
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
      className={`fixed inset-0 z-[80] flex flex-col bg-bg transition-all duration-700 ${
        leaving ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      <div className="container-wide flex items-center justify-between pt-6">
        <span className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
          <span className="h-2 w-2 rounded-[3px] bg-accent" />
          Junaid Mansoori
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">Loading</span>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <div className="display select-none text-[30vw] leading-none tracking-tight sm:text-[15rem]">
            <span className="mech-char">J</span>
            <span className="mech-char italic text-accent" style={{ animationDelay: '0.14s' }}>
              M
            </span>
            <span className="mech-char text-accent" style={{ animationDelay: '0.28s' }}>
              .
            </span>
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            Full Stack Developer
          </p>
        </div>
      </div>

      <div className="container-wide flex items-end justify-between pb-5">
        <span className="font-mono text-xs tabular-nums tracking-widest text-muted">
          {String(count).padStart(3, '0')}%
        </span>
        <span className="typing-caret text-muted" />
      </div>

      <div className="h-[3px] w-full bg-elev-2">
        <div
          className="h-full bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${count}%` }}
        />
      </div>
    </div>
  )
}
