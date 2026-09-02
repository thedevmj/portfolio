import React from 'react'

const countChars = (items) => Math.max(18, items.join('').length * 0.35)

// Scrolling marquee tape (inspired by noth.in's "we are nothin'"). Edge-fades,
// pauses on hover, and can run in reverse for alternating rows.
export default function Marquee({
  items = ['Full Stack Developer', 'MERN', 'AI', 'React Native'],
  reverse = false,
  className = ''
}) {
  const duration = `${countChars(items)}s`
  const row = (key) => (
    <div key={key} className="flex items-center shrink-0">
      {items.map((t, i) => (
        <span key={`${key}-${i}`} className="flex items-center">
          <span className="text-3xl sm:text-4xl font-medium uppercase tracking-tight px-5">{t}</span>
          <span className="text-accent text-2xl">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee-mask relative overflow-hidden py-6 select-none" aria-hidden="true">
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
