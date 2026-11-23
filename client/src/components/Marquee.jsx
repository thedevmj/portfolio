import React from 'react'

const countChars = (items) => Math.max(20, items.join('').length * 0.55)

const toneMap = {
  accent: 'bg-accent text-on-accent',
  secondary: 'bg-elev-2 text-fg border-y border-line',
  default: 'bg-bg text-fg border-y border-line'
}

// Slim editorial ticker. Edge-fades, loops endlessly, supports reverse + tone.
export default function Marquee({
  items = ['Full-Stack Apps', 'Websites', 'Android + iOS', 'React Native', 'AI'],
  reverse = false,
  tone = 'default',
  className = ''
}) {
  const repeatCount = 4
  const duration = `${Math.min(70, countChars(items) * repeatCount)}s`

  const group = (key) => (
    <div key={key} className="flex shrink-0 items-center">
      {Array.from({ length: repeatCount }).flatMap((_, repeat) =>
        items.map((t, i) => (
          <span key={`${key}-${repeat}-${i}`} className="flex items-center">
            <span className="px-5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] sm:px-7 sm:text-xs">
              {t}
            </span>
            <span className={`text-xs ${tone === 'accent' ? 'opacity-70' : 'text-accent'}`} aria-hidden="true">
              ✳
            </span>
          </span>
        ))
      )}
    </div>
  )

  return (
    <div
      className={`marquee-mask relative select-none overflow-hidden py-4 ${toneMap[tone] || toneMap.default}`}
      aria-hidden="true"
    >
      <div
        className={`marquee-track flex w-max items-center ${className}`}
        style={{
          animation: `marquee ${duration} linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal'
        }}
      >
        {group(1)}
        {group(2)}
      </div>
    </div>
  )
}
