import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { SkillCardSkeleton } from './Skeleton'
import { buildSkillItems } from '../data/skillsGallery'
import TorsionText from './TorsionText'

// ogl is heavy — loaded on demand only when the Skills showcase renders
const CircularGallery = lazy(() => import('./CircularGallery'))

const categories = [
  { label: 'Frontend', skills: ['React.js', 'JavaScript', 'TypeScript', 'Redux', 'Redux Saga', 'Responsive UI', 'UI/UX Development'] },
  { label: 'Backend', skills: ['Node.js', 'Express.js', 'Java', 'Spring Boot', 'PHP', 'REST APIs', 'JWT Authentication', 'bcrypt', 'Microservices Architecture'] },
  { label: 'Languages', skills: ['Java', 'JavaScript', 'TypeScript', 'Python', 'PHP'] },
  { label: 'Database', skills: ['MongoDB', 'PostgreSQL', 'Neo4j', 'SQL', 'Database-driven development'] },
  { label: 'Mobile', skills: ['React Native', 'Cross-platform development'] },
  { label: 'AI & Emerging', skills: ['AI Integration', 'LLM Applications', 'Prompt Engineering', 'AI Tools', 'MCP Servers', 'MCP SDK', 'Babel AST', 'AI-powered tools'] },
  { label: 'Optimization', skills: ['Debouncing', 'Throttling', 'Rate Limiting', 'Memoization', 'Code Splitting', 'Lazy Loading', 'Virtualization', 'useCallback / useMemo'] },
  { label: 'Dev Tools', skills: ['Project Automation', 'Scaffold Generators', 'Code Analysis', 'Dependency Analysis', 'Graph Visualization', 'REST API Architecture', 'Auth & Authorization', 'Microservices'] }
]

export default React.memo(function Skills() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])

  const skillItems = useMemo(() => buildSkillItems(), [])

  return (
    <section id="skills" className="relative border-t border-line-light dark:border-white/10">
      <div className="section-pad">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="section-label">( skills )</span>
            <TorsionText maxX={7} maxY={4} maxSkew={2} wobble={0.4}>
              <h2 className="section-title mt-4">Skills &amp; Technologies</h2>
            </TorsionText>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-muted dark:text-gray-400">
            Technologies and tools I work with across frontend, backend, data, mobile, AI, and developer tooling.
          </p>
        </div>

        {/* Categories as list */}
        <div className="mt-16 flex flex-col">
          {loading ? (
            <SkillCardSkeleton />
          ) : (
            categories.map((cat, i) => (
              <div key={cat.label} className="reveal group border-t border-line-light dark:border-white/10 py-7 grid md:grid-cols-12 gap-4" style={{ transitionDelay: `${i * 0.04}s` }}>
                <span className="md:col-span-3 text-sm uppercase tracking-[0.15em] text-ink-muted dark:text-gray-500">
                  {i % 2 === 0 ? '+ ' : '• '}{cat.label}
                </span>
                <div className="md:col-span-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink dark:text-gray-300">
                  {cat.skills.map((s) => (
                    <span key={s} className="group-hover:text-ink-muted dark:group-hover:text-gray-400">{s}</span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Interactive skills showcase */}
        <div className="reveal mt-20">
          <div className="mb-6 flex items-end justify-between">
            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-ink dark:text-white">
              Tech Stack <span className="italic text-accent">Showcase</span>
            </h3>
            <p className="text-xs uppercase tracking-[0.15em] text-ink-muted dark:text-gray-400 hidden sm:block">
              drag / scroll / arrows
            </p>
          </div>
          <div className="relative w-full h-[420px] sm:h-[480px] md:h-[540px]">
            <Suspense
              fallback={
                <div className="h-full w-full grid place-items-center">
                  <span className="animate-pulse text-sm uppercase tracking-[0.2em] text-ink-muted dark:text-gray-400">
                    Initialising WebGL showcase…
                  </span>
                </div>
              }
            >
              <CircularGallery
                items={skillItems}
                bend={1.2}
                textColor="#ffffff"
                borderRadius={0.06}
                scrollEase={0.05}
                scrollSpeed={1.6}
                font="bold 26px IBM Plex Mono"
              />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
})
