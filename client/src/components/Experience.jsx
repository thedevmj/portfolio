import React from 'react'
import { Reveal, Stagger, StaggerItem } from './Motion'

const highlights = [
  'React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT authentication',
  'Redux', 'React Native', 'AI/LLM integration', 'MCP Servers', 'TypeScript',
  'Java', 'Spring Boot', 'Python', 'PHP', 'Project automation', 'Code analysis'
]

export default React.memo(function Experience() {
  return (
    <section id="experience" className="relative border-b-4 border-neo-ink">
      <div className="section-pad container-neo">
        <Reveal className="section-head">
          <span className="section-label">( experience )</span>
          <h2 className="section-title">Path &amp; Experience</h2>
        </Reveal>

        <div className="mt-10 md:mt-14 max-w-4xl">
          <Reveal className="bg-neo-panel border-4 border-neo-ink shadow-neo-md relative p-6 sm:p-10 md:p-12 lg:p-16">
            {/* Corner accent sticker */}
            <span className="absolute -top-5 right-6 bg-neo-accent border-4 border-neo-ink px-4 py-2 font-black text-xs uppercase tracking-widest shadow-neo-sm transform rotate-3 text-white">
              Fresher
            </span>

            <span className="inline-block bg-neo-muted border-2 border-neo-ink px-3 py-1.5 text-xs font-black uppercase tracking-widest shadow-neo-sm">
              Full Stack Web Development
            </span>

            <h3 className="mt-6 text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.95] text-neo-ink">
              Built end-to-end.
              <br />
              <span className="text-neo-accent">Shipped for real.</span>
            </h3>

            <p className="mt-6 text-base md:text-lg font-bold leading-snug text-neo-ink max-w-2xl">
              Hands-on development through multiple full-stack, AI-integrated, mobile,
              and developer-tool projects. Entering the professional field as a fresher
              with substantial practical experience from building complete applications end-to-end.
            </p>

            <div className="mt-10">
              <h4 className="inline-block bg-neo-secondary border-2 border-neo-ink px-3 py-1.5 text-xs font-black uppercase tracking-widest shadow-neo-sm mb-6 text-black">
                Practical experience with
              </h4>
              <Stagger className="flex flex-wrap gap-2.5" gap={0.04}>
                {highlights.map((h) => (
                  <StaggerItem key={h} className="flex items-center gap-1.5 bg-neo-white border-2 border-neo-ink px-3 py-1.5 text-xs font-black uppercase tracking-wide text-black duration-100 hover:shadow-neo-sm" whileHover={{ y: -4 }}>
                    <span className="text-neo-accent">*</span> {h}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
})