import React, { useEffect, useState } from 'react'
import { SkillCardSkeleton } from './Skeleton'
import { Reveal, Stagger, StaggerItem } from './Motion'

const categories = [
  { label: 'Frontend', skills: ['React.js', 'JavaScript', 'TypeScript', 'Redux', 'Redux Saga', 'Responsive UI', 'UI/UX Development'] },
  { label: 'Backend', skills: ['Node.js', 'Express.js', 'Java', 'Spring Boot', 'PHP', 'REST APIs', 'JWT Authentication', 'bcrypt', 'Microservices Architecture'] },
  { label: 'Languages', skills: ['Java', 'JavaScript', 'TypeScript', 'Python', 'PHP'] },
  { label: 'Database', skills: ['MongoDB', 'PostgreSQL', 'Neo4j', 'SQL', 'Database-driven development'] },
  { label: 'Mobile', skills: ['React Native', 'Cross-platform development'] },
  { label: 'AI & Emerging', skills: ['AI Integration', 'LLM Applications', 'Prompt Engineering', 'AI Tools', 'MCP Servers', 'MCP SDK', 'Babel AST', 'AI-powered tools'] },
  { label: 'Optimization', skills: ['Debouncing', 'Throttling', 'Rate Limiting', 'Memoization', 'Code Splitting', 'Lazy Loading', 'Virtualization', 'useCallback / useMemo','Redis','CI/CD','Docker'] },
  { label: 'Dev Tools', skills: ['Project Automation', 'Scaffold Generators', 'Code Analysis', 'Dependency Analysis', 'Graph Visualization', 'REST API Architecture', 'Auth & Authorization', 'Microservices'] }
]

const stickerRotations = ['-rotate-2', 'rotate-1', 'rotate-3', '-rotate-1', 'rotate-2', '-rotate-3', 'rotate-1', '-rotate-2', 'rotate-2', '-rotate-1']

export default React.memo(function Skills() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  const allSkills = categories.flatMap((cat) => cat.skills)

  return (
    <section id="skills" className="relative border-b-4 border-neo-ink">
      <div className="section-pad container-neo">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="section-head">
            <span className="section-label">( skills )</span>
            <h2 className="section-title">Toolkit</h2>
          </div>
          <p className="max-w-sm text-base font-bold text-neo-ink opacity-70 dark:opacity-90 leading-snug">
            Technologies and tools I use across frontend, backend, data, mobile, AI, and developer tooling.
          </p>
        </Reveal>

        {/* Categories as bordered rows */}
        <div className="mt-10 md:mt-16 flex flex-col">
          {loading ? (
            <SkillCardSkeleton />
          ) : (
            <Stagger className="flex flex-col" gap={0.06}>
              {categories.map((cat, i) => (
                <StaggerItem key={cat.label} className="mb-5 md:mb-6">
                  <div className="grid md:grid-cols-12 gap-4 items-start border-4 border-neo-ink bg-neo-panel shadow-neo-sm duration-100 hover:shadow-neo-md p-5 md:p-6">
                    <span className="md:col-span-3 inline-flex items-center gap-2">
                      <span className={`w-8 h-8 shrink-0 border-2 border-neo-ink ${i % 2 === 0 ? 'bg-neo-accent text-white' : 'bg-neo-secondary text-black'} flex items-center justify-center font-black text-sm`}>
                        {i % 2 === 0 ? '+' : '•'}
                      </span>
                      <span className="font-black uppercase tracking-tight text-sm md:text-base text-neo-ink">{cat.label}</span>
                    </span>
                    <div className="md:col-span-9 flex flex-wrap gap-2 md:gap-2.5">
                      {cat.skills.map((s, si) => (
                        <span
                          key={s}
                          className={`${['bg-neo-muted text-neo-ink', 'bg-neo-secondary text-black', 'bg-neo-white text-black', 'bg-neo-accent text-white'][si % 4]} border-2 border-neo-ink px-3 py-1.5 text-xs font-black uppercase tracking-wide duration-100 hover:-translate-y-0.5 hover:shadow-neo-sm ${stickerRotations[si % stickerRotations.length]}`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>

        {/* Tech stack sticker wall (flat replacement for the WebGL gallery) */}
        <Reveal className="mt-12 md:mt-16">
          <div className="section-head flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-neo-ink">
              Tech Stack <span className="text-neo-accent">Wall</span>
            </h3>
            <span className="inline-block bg-neo-accent border-4 border-neo-ink px-4 py-2 font-black text-xs uppercase tracking-widest shadow-neo-sm transform rotate-1 w-fit text-white">
              pick a sticker
            </span>
          </div>

          <Stagger className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5" gap={0.03}>
            {allSkills.map((s, i) => (
              <StaggerItem key={`${s}-${i}`}>
                <div
                  className={`bg-neo-panel border-4 border-neo-ink p-4 md:p-5 shadow-neo-sm duration-150 hover:shadow-neo-md hover:-translate-y-1.5 text-center ${stickerRotations[i % stickerRotations.length]}`}
                >
                  <span className="font-black text-sm md:text-base uppercase tracking-tight text-neo-ink">{s}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </div>
    </section>
  )
})