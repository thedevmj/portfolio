import React from 'react'
import { Reveal, Stagger, StaggerItem } from './Motion'

const education = [
  { title: 'Bachelor of Science — Computer Science', institution: 'Mohanlal Sukhadia University Science College', year: '2023', type: 'BSc' },
  { title: 'Master of Computer Applications — MCA', institution: 'Aravali Institute of Technical Studies', year: '2023–2026', type: 'MCA' }
]

export default React.memo(function Education() {
  return (
    <section id="education" className="relative border-b-4 border-neo-ink bg-neo-secondary">
      <div className="section-pad container-neo">
        <Reveal className="section-head">
          <span className="section-label !bg-neo-white !text-black">( education )</span>
          <h2 className="section-title text-black">Education</h2>
        </Reveal>

        <Stagger className="mt-10 md:mt-14 grid md:grid-cols-2 gap-6 md:gap-8" gap={0.1}>
          {education.map((ed, i) => (
            <StaggerItem key={ed.title}>
              <div className="bg-neo-white border-4 border-neo-ink shadow-neo-md card-lift p-6 sm:p-8 md:p-10 relative text-black h-full">
              <span className="absolute -top-4 left-6 bg-neo-accent border-4 border-neo-ink px-4 py-1.5 font-black text-xs uppercase tracking-widest shadow-neo-sm transform rotate-2 tabular-nums text-white">
                {ed.year}
              </span>
              <span className="absolute top-5 right-5 inline-block bg-neo-muted border-2 border-neo-ink px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-neo-sm text-neo-ink">
                {ed.type}
              </span>
              <h3 className="mt-8 text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight">
                {ed.title}
              </h3>
              <p className="mt-3 text-sm md:text-base font-bold opacity-60">
                {ed.institution}
              </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
})