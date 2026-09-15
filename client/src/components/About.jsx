import React from 'react'
import { Reveal, Stagger, StaggerItem } from './Motion'

const highlights = [
  { num: '01', title: 'Full Stack Development', desc: 'MERN-based end-to-end application development.' },
  { num: '02', title: 'AI Integration', desc: 'LLM applications, AI-powered features, and AI tools.' },
  { num: '03', title: 'Mobile Development', desc: 'Cross-platform applications with React Native.' },
  { num: '04', title: 'Developer Tools', desc: 'MCP servers, code analysis, automation, and developer productivity solutions.' }
]

const strengths = [
  'Problem solving',
  'Continuous learning',
  'User-centric development',
  'Full-stack thinking',
  'Adaptability across technologies',
  'Interest in emerging AI technologies'
]

export default React.memo(function About() {
  return (
    <section id="about" className="relative border-b-4 border-neo-ink">
      <div className="section-pad container-neo grid lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: heading + bio */}
        <div>
          <Reveal className="section-head">
            <span className="section-label">( The Studio )</span>
            <h2 className="section-title">
              Full-stack dev focused on <span className="text-neo-accent">AI-integrated apps.</span>
            </h2>
          </Reveal>

          <Reveal className="mt-10 max-w-md">
            <p className="text-lg md:text-xl font-bold leading-snug text-neo-ink">
              I&rsquo;m a motivated full-stack developer building scalable full-stack
              applications, AI-integrated web apps, REST APIs, modern responsive
              interfaces, and cross-platform mobile apps with React Native.
            </p>
            <p className="mt-5 text-base font-medium text-neo-ink opacity-70 dark:opacity-90">
              Interested in AI/LLM features, developer tools, and code analysis systems.
            </p>
          </Reveal>

          <Reveal className="mt-10 inline-block bg-neo-panel border-4 border-neo-ink shadow-neo-md px-6 py-4">
            <p className="font-black uppercase tracking-wide leading-snug">Mohammad Junaid Mansoori</p>
            <p className="font-bold uppercase tracking-wide mt-1 text-neo-accent">Full Stack Developer — India</p>
          </Reveal>
        </div>

        {/* Right: highlights + strengths */}
        <Stagger className="space-y-12" gap={0.1}>
          <div>
            <h3 className="inline-block bg-neo-muted border-2 border-neo-ink px-3 py-1.5 text-xs font-black uppercase tracking-widest shadow-neo-sm mb-8">
              What I focus on
            </h3>
            <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6" gap={0.08}>
              {highlights.map((h) => (
                <StaggerItem key={h.title}>
                  <div className="bg-neo-panel border-4 border-neo-ink shadow-neo-md card-lift p-5 md:p-6 h-full">
                    <span className="text-neo-accent font-black tabular-nums">{h.num}</span>
                    <h4 className="mt-3 text-lg font-black uppercase tracking-tight text-neo-ink">{h.title}</h4>
                    <p className="mt-2 text-sm font-bold text-neo-ink opacity-60 dark:opacity-90">{h.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div>
            <h3 className="inline-block bg-neo-secondary border-2 border-neo-ink px-3 py-1.5 text-xs font-black uppercase tracking-widest shadow-neo-sm mb-8 text-black">
              Strengths
            </h3>
            <div className="flex flex-wrap gap-3">
              {strengths.map((s, i) => (
                <span key={s} className="bg-neo-panel border-2 border-neo-ink px-4 py-2 text-sm font-bold uppercase tracking-wide shadow-neo-sm duration-100 hover:bg-neo-muted hover:-translate-y-0.5">
                  <span className="text-neo-accent mr-1.5">/{String(i + 1).padStart(2, '0')}</span>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Stagger>
      </div>
    </section>
  )
})