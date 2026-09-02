import React from 'react'
import TorsionText from './TorsionText'

const highlights = [
  { title: 'Full Stack Development', desc: 'MERN-based end-to-end application development.' },
  { title: 'AI Integration', desc: 'LLM applications, AI-powered features, and AI tools.' },
  { title: 'Mobile Development', desc: 'Cross-platform applications with React Native.' },
  { title: 'Developer Tools', desc: 'MCP servers, code analysis, automation, and developer productivity solutions.' }
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
    <section id="about" className="relative border-t border-line-light dark:border-white/10">
      <div className="section-pad">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: heading + bio */}
          <div>
            <span className="section-label reveal">( The Studio )</span>
            <TorsionText maxX={7} maxY={4} maxSkew={2} wobble={0.4}>
              <h2 className="section-title reveal mt-8">
                Most developers produce code.<br />
                <span className="italic text-accent">I produce experiences.</span>
              </h2>
            </TorsionText>
            <div className="reveal mt-10 max-w-md">
              <p className="text-lg leading-relaxed text-ink dark:text-gray-300">
                I&rsquo;m a motivated full-stack developer focused on building scalable full-stack
                applications, AI-integrated web applications, REST APIs, modern responsive interfaces,
                and cross-platform mobile applications with React Native.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-ink-muted dark:text-gray-400">
                I&rsquo;m also deeply interested in AI/LLM-powered features, developer productivity
                tools, and code analysis and visualization systems. Not a stack, a perspective —
                because great software is everythin&rsquo;.
              </p>
            </div>
            <div className="reveal mt-10 font-mono text-sm text-ink-muted dark:text-gray-400">
              <p className="uppercase tracking-[0.15em] mb-2">Mohammad Junaid Mansoori</p>
              <p className="uppercase tracking-[0.15em]">Full Stack Developer — India</p>
            </div>
          </div>

          {/* Right: highlights + strengths */}
          <div className="space-y-10">
            <div className="reveal">
              <h3 className="text-xs uppercase tracking-[0.2em] text-ink-muted dark:text-gray-500 mb-6">
                What I focus on :
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line-light dark:bg-white/10">
                {highlights.map((h) => (
                  <div key={h.title} className="bg-bg-light dark:bg-bg-dark p-6 group">
                    <span className="text-accent text-sm">*</span>
                    <h4 className="mt-3 text-lg font-medium tracking-tight text-ink dark:text-white">
                      {h.title}
                    </h4>
                    <p className="mt-2 text-sm text-ink-muted dark:text-gray-400">{h.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal">
              <h3 className="text-xs uppercase tracking-[0.2em] text-ink-muted dark:text-gray-500 mb-6">
                Strengths :
              </h3>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink dark:text-gray-300">
                {strengths.map((s, i) => (
                  <span key={s} className="flex items-center gap-2">
                    <span className="text-xs text-ink-muted dark:text-gray-500">/{String(i + 1).padStart(2, '0')}</span>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
