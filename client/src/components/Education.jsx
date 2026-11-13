import React from 'react'
import { Reveal, Stagger, StaggerItem } from './Motion'

const education = [
  { title: 'Bachelor of Science — Computer Science', institution: 'Mohanlal Sukhadia University Science College', year: '2023', type: 'BSc' },
  { title: 'Master of Computer Applications — MCA', institution: 'Aravali Institute of Technical Studies', year: '2023–2026', type: 'MCA' }
]

export default React.memo(function Education() {
  return (
    <section id="education" className="section relative border-t border-line">
      <div className="container-wide">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">06 / Education</span>
            <h2 className="display mt-5 text-5xl leading-none sm:text-6xl md:text-7xl">
              Education<span className="text-accent">.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm font-medium leading-relaxed text-muted md:text-base">
            Formal grounding in computer science, paired with continuous self-directed
            practice.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-2" gap={0.08}>
          {education.map((ed) => (
            <StaggerItem key={ed.title}>
              <div className="card card-hover h-full p-6 sm:p-8 md:p-9">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-on-accent">
                    {ed.year}
                  </span>
                  <span className="chip">{ed.type}</span>
                </div>

                <h3 className="display mt-6 text-2xl leading-tight sm:text-[1.9rem]">{ed.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{ed.institution}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
})
