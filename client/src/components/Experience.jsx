import React from 'react'
import TorsionText from './TorsionText'

const highlights = [
  'React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT authentication',
  'Redux', 'React Native', 'AI/LLM integration', 'MCP Servers', 'TypeScript',
  'Java', 'Spring Boot', 'Python', 'PHP', 'Project automation', 'Code analysis'
]

export default React.memo(function Experience() {
  return (
    <section id="experience" className="relative border-t border-line-light dark:border-white/10">
      <div className="section-pad">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="section-label">( experience )</span>
            <TorsionText maxX={7} maxY={4} maxSkew={2} wobble={0.4}>
              <h2 className="section-title mt-4">Path &amp; Experience</h2>
            </TorsionText>
          </div>
        </div>

        <div className="mt-16 max-w-3xl">
          <div className="reveal border-l border-line-light dark:border-white/10 pl-10 relative">
            <span className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs uppercase tracking-[0.2em] text-ink-muted dark:text-gray-500">
              Full Stack Web Development — <span className="text-accent">Fresher</span>
            </span>
            <h3 className="mt-3 text-3xl sm:text-4xl font-medium tracking-tight text-ink dark:text-white">
              Hands-on. End-to-end. Real.
            </h3>
            <p className="mt-5 text-ink dark:text-gray-300 leading-relaxed max-w-xl">
              Hands-on development experience through multiple full-stack, AI-integrated, mobile,
              and developer-tool projects. Although entering the professional field as a fresher,
              I have built substantial practical experience by building complete applications end-to-end.
            </p>

            <div className="mt-8">
              <h4 className="text-xs uppercase tracking-[0.2em] text-ink-muted dark:text-gray-500 mb-4">
                Practical experience with :
              </h4>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink dark:text-gray-300">
                {highlights.map((h) => (
                  <span key={h} className="flex items-center gap-1.5">
                    <span className="text-accent">*</span> {h}
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
