import React from 'react'
import TorsionText from './TorsionText'

const education = [
  { title: 'Bachelor of Science — Computer Science', institution: 'Mohanlal Sukhadia University Science College', year: '2023', type: 'BSc' },
  { title: 'Master of Computer Applications — MCA', institution: 'Aravali Institute of Technical Studies', year: '2023–2026', type: 'MCA' }
]

export default React.memo(function Education() {
  return (
    <section id="education" className="relative border-t border-line-light dark:border-white/10">
      <div className="section-pad">
        <div className="reveal mb-8 sm:mb-12 md:mb-16">
          <span className="section-label">( education )</span>
          <TorsionText maxX={7} maxY={4} maxSkew={2} wobble={0.4}>
            <h2 className="section-title mt-4">Education</h2>
          </TorsionText>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-line-light dark:bg-white/10">
          {education.map((ed, i) => (
            <div key={ed.title} className="reveal bg-bg-light dark:bg-bg-dark p-5 sm:p-8 md:p-12 relative group" style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="text-2xl text-ink-muted dark:text-gray-500 tabular-nums">({ed.year})</span>
              <span className="absolute top-8 right-8 text-xs uppercase tracking-[0.2em] text-accent">{ed.type}</span>
              <h3 className="mt-6 text-2xl font-medium tracking-tight text-ink dark:text-white">
                {ed.title}
              </h3>
              <p className="mt-3 text-sm text-ink-muted dark:text-gray-400">{ed.institution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})
