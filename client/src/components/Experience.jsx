import React from 'react'
import { Reveal, Stagger, StaggerItem } from './Motion'

const highlights = [
  'React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs',
  'JWT authentication', 'Redux', 'React Native', 'AI/LLM integration',
  'MCP Servers', 'TypeScript', 'Java', 'Spring Boot', 'Python', 'PHP',
  'Project automation', 'Code analysis'
]

export default React.memo(function Experience() {
  return (
    <section id="experience" className="section relative border-t border-line">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <span className="eyebrow">04 / Experience</span>
            <h2 className="display mt-5 text-5xl leading-[0.95] sm:text-6xl">
              Hands-on
              <br />
              <em className="italic text-accent">experience.</em>
            </h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              Professional, project-driven work — building complete applications from the
              first commit to the final deploy.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={0.1}>
            <div className="card relative overflow-hidden p-6 sm:p-9 md:p-11">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-accent opacity-[0.08] blur-3xl" />

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-accent px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-on-accent">
                  1+ Year
                </span>
                <span className="chip">Full Stack Developer</span>
                <span className="chip">Arvana Mall, Udaipur</span>
              </div>

              <h3 className="display mt-7 text-3xl leading-[1.02] sm:text-4xl md:text-5xl">
                Brainmatrix Solutions
                <br />
                <span className="text-accent">End-to-end web delivery.</span>
              </h3>

              <p className="mt-6 max-w-2xl text-sm font-medium leading-relaxed text-muted md:text-base">
                1+ year of professional experience at Brainmatrix Solutions in Arvana Mall,
                Udaipur, building full-stack web applications and websites end to end —
                responsive React and Next.js interfaces, secure Node.js and Express REST APIs,
                MongoDB data models, and deploy-ready features. Selected live work includes
                HK SPICES and Bellarro.
              </p>

              <div className="mt-8 grid gap-5 border-t border-line pt-6 sm:grid-cols-3">
                <div>
                  <span className="eyebrow">Role</span>
                  <p className="mt-2 text-sm font-semibold text-ink">Full Stack Developer</p>
                </div>
                <div>
                  <span className="eyebrow">Company</span>
                  <p className="mt-2 text-sm font-semibold text-ink">Brainmatrix Solutions</p>
                </div>
                <div>
                  <span className="eyebrow">Location</span>
                  <p className="mt-2 text-sm font-semibold text-ink">Arvana Mall, Udaipur</p>
                </div>
              </div>

              <div className="mt-9 border-t border-line pt-6">
                <span className="eyebrow">Professional experience with</span>
                <Stagger className="mt-5 flex flex-wrap gap-2" gap={0.025}>
                  {highlights.map((h) => (
                    <StaggerItem as="span" key={h}>
                      <span className="chip">{h}</span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
})
