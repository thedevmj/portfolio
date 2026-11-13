import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { Reveal } from './Motion'

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
    <section id="about" className="section relative border-t border-line">
      <div className="container-wide">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Intro */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">01 / About</span>
              <h2 className="display mt-6 text-4xl leading-[1.04] sm:text-5xl md:text-[3.4rem]">
                Full-stack dev focused on{' '}
                <em className="italic text-accent">AI-integrated</em> apps.
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 max-w-md space-y-5">
              <p className="text-base font-medium leading-relaxed text-fg md:text-lg">
                I&rsquo;m a motivated full-stack developer building scalable full-stack
                applications, AI-integrated web apps, REST APIs, modern responsive
                interfaces, and cross-platform mobile apps with React Native.
              </p>
              <p className="text-sm leading-relaxed text-muted md:text-base">
                Interested in AI/LLM features, developer tools, and code analysis systems.
              </p>
            </Reveal>

            <Reveal delay={0.18} className="mt-10 flex items-center gap-4 border-t border-line pt-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong font-serif text-lg italic">
                JM
              </span>
              <div>
                <p className="text-sm font-bold tracking-tight">Mohammad Junaid Mansoori</p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Full Stack Developer — India
                </p>
              </div>
            </Reveal>
          </div>

          {/* Focus list + strengths */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">What I focus on</span>
            </Reveal>

            <div className="mt-6 border-t border-line">
              {highlights.map((h, i) => (
                <Reveal key={h.title} delay={i * 0.06}>
                  <div className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 border-b border-line py-6">
                    <span className="pt-1 font-mono text-xs text-muted">{h.num}</span>
                    <div>
                      <h3 className="text-lg font-bold tracking-tight transition-colors group-hover:text-accent md:text-xl">
                        {h.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{h.desc}</p>
                    </div>
                    <FiArrowUpRight className="mt-1 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1} className="mt-10">
              <span className="eyebrow">Strengths</span>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {strengths.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
})
