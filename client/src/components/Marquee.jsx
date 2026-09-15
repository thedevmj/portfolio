import React from 'react'

const countChars = (items) => Math.max(18, items.join('').length * 0.35)

// Scrolling neo-brutalist tape row. Edge-fades, pauses on hover, runs in
// reverse for alternating rows. Use `tone="accent"` for the red variant.
export default function Marquee({
  items = ['Full Stack Developer', 'MERN', 'AI', 'React Native'],
  reverse = false,
  tone = 'secondary',
  className = ''
}) {
  const duration = `${countChars(items)}s`
  const row = (key) => (
    <div key={key} className="flex items-center shrink-0">
      {items.map((t, i) => (
        <span key={`${key}-${i}`} className="flex items-center">
          <span className={`text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter px-4 sm:px-7 ${tone === 'accent' ? 'text-white' : 'text-black'}`}>{t}</span>
          <span className={`text-2xl sm:text-3xl md:text-4xl ${tone === 'accent' ? 'text-white' : 'text-black'}`}>✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <div
      className={`marquee-mask relative overflow-hidden py-5 select-none border-y-4 border-neo-ink ${
        tone === 'accent' ? 'bg-neo-accent' : 'bg-neo-secondary'
      }`}
      aria-hidden="true"
    >
      <div
        className={`flex w-max whitespace-nowrap ${className}`}
        style={{
          animation: `marquee ${duration} linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
      >
        {row(1)}
        {row(2)}
      </div>
    </div>
  )
}