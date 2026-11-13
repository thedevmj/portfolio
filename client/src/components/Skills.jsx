import React, { useEffect, useState } from 'react'
import { SkillCardSkeleton } from './Skeleton'
import { Reveal, Stagger, StaggerItem } from './Motion'

const categories = [
  { label: 'Frontend', skills: ['React.js', 'JavaScript', 'TypeScript', 'Redux', 'Redux Saga', 'Responsive UI', 'UI/UX Development'] },
  { label: 'Backend', skills: ['Node.js', 'Express.js', 'Java', 'Spring Boot', 'PHP', 'REST APIs', 'JWT Authentication', 'bcrypt', 'Microservices Architecture'] },
  { label: 'Languages', skills: ['Java', 'JavaScript', 'TypeScript', 'Python', 'PHP'] },
  { label: 'Database & BaaS', skills: ['MongoDB', 'PostgreSQL', 'Supabase', 'Neo4j', 'SQL', 'Database-driven development'] },
  { label: 'Mobile', skills: ['React Native', 'Cross-platform development'] },
  { label: 'AI & Emerging', skills: ['AI Integration', 'LLM Applications', 'Prompt Engineering', 'AI Tools', 'MCP Servers', 'MCP SDK', 'Babel AST', 'AI-powered tools'] },
  { label: 'Optimization', skills: ['Debouncing', 'Throttling', 'Rate Limiting', 'Memoization', 'Code Splitting', 'Lazy Loading', 'Virtualization', 'useCallback / useMemo', 'Redis', 'CI/CD', 'Docker'] },
  { label: 'Dev Tools', skills: ['Project Automation', 'Scaffold Generators', 'Code Analysis', 'Dependency Analysis', 'Graph Visualization', 'REST API Architecture', 'Auth & Authorization', 'Microservices'] }
]

export default React.memo(function Skills() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  const allSkills = categories.flatMap((cat) => cat.skills)

  return (
    <section id="skills" className="section relative border-t border-line">
      <div className="container-wide">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">02 / Toolkit</span>
            <h2 className="display mt-5 text-5xl leading-none sm:text-6xl md:text-7xl">
              The toolkit<span className="text-accent">.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm font-medium leading-relaxed text-muted md:text-base">
            Tools for building end-to-end products across frontend, backend, and data, plus
            mobile, AI, and developer tooling.
          </p>
        </Reveal>

        {/* Category cards */}
        <div className="mt-12">
          {loading ? (
            <SkillCardSkeleton />
          ) : (
            <Stagger className="grid gap-4 md:grid-cols-2" gap={0.05}>
              {categories.map((cat, i) => (
                <StaggerItem key={cat.label}>
                  <div className="card card-hover h-full p-6 md:p-7">
                    <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
                      <h3 className="text-base font-bold tracking-tight md:text-lg">{cat.label}</h3>
                      <span className="font-mono text-[10px] tracking-widest text-muted">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {cat.skills.map((s) => (
                        <span key={s} className="chip">
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

        {/* Stack wall */}
        <Reveal className="mt-14">
          <div className="flex items-end justify-between gap-4 border-t border-line pt-6">
            <h3 className="display text-2xl md:text-3xl">
              Stack wall <span className="italic text-accent">— everything</span>
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              {allSkills.length} tools
            </span>
          </div>

          <Stagger className="mt-6 flex flex-wrap gap-2.5" gap={0.012}>
            {allSkills.map((s, i) => (
              <StaggerItem as="span" key={`${s}-${i}`}>
                <span className="inline-flex rounded-full border border-line bg-elev px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-on-accent">
                  {s}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </div>
    </section>
  )
})
