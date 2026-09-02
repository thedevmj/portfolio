import React, { useEffect, useMemo, useState, useTransition } from 'react'
import { FiGithub, FiX, FiCpu, FiBook, FiTool, FiActivity, FiArrowRight, FiSmartphone } from 'react-icons/fi'
import { ProjectCardSkeleton } from './Skeleton'
import Portal from './Portal'
import TorsionText from './TorsionText'

const filters = ['All', 'Full Stack', 'AI', 'Developer Tools', 'E-Commerce', 'Mobile']

const projects = [
  {
    id: 1,
    title: 'AI Resume Analyzer',
    category: 'AI',
    tags: ['AI', 'Full Stack'],
    num: '01',
    description: 'A web application where users upload resumes and receive AI-powered analysis, scoring, and improvement suggestions.',
    problem: 'Helps job seekers optimize their resumes with actionable AI feedback while reducing the need for manual resume review.',
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'JWT', 'bcrypt'],
    features: ['AI resume analysis', 'Resume scoring', 'Improvement suggestions', 'Secure authentication'],
    featured: true,
    github: 'https://github.com/thedevmj'
  },
  {
    id: 2,
    title: 'Online Book Shopping Center',
    category: 'E-Commerce',
    tags: ['Full Stack', 'E-Commerce'],
    num: '02',
    description: 'A full-featured e-commerce platform for purchasing books with authentication, catalog browsing, shopping cart, and order management.',
    problem: 'Provides a secure online bookstore experience with complex state management and a seamless shopping workflow.',
    tech: ['React.js', 'Redux', 'Redux Saga', 'Node.js', 'Express', 'MongoDB'],
    features: ['Authentication', 'Product catalog', 'Cart management', 'Order management', 'Redux state management'],
    featured: false,
    github: 'https://github.com/thedevmj'
  },
  {
    id: 3,
    title: 'Scaffold Generator',
    category: 'Developer Tools',
    tags: ['Developer Tools'],
    num: '03',
    description: 'An automated tool that generates project boilerplates based on selected frameworks and features.',
    problem: 'Reduces repetitive setup work and boilerplate code, allowing developers to initialize projects faster.',
    tech: ['JavaScript', 'Project Automation'],
    features: ['Automatic boilerplate', 'Framework selection', 'Feature selection', 'Fast project setup'],
    featured: false,
    github: 'https://github.com/thedevmj'
  },
  {
    id: 4,
    title: 'MCP Code Project Analyzer',
    category: 'AI',
    tags: ['AI', 'Developer Tools'],
    num: '04',
    description: 'An MCP server tool that analyzes code structure and dependencies using Babel AST and generates graph visualizations showing project relationships and code flow.',
    problem: 'Helps developers understand complex codebase structures, visualize dependencies, accelerate onboarding, and gain AI-powered insights into project relationships.',
    tech: ['TypeScript', 'Node.js', 'Babel AST', 'Graph Visualization', 'MCP SDK'],
    features: ['Code structure analysis', 'Dependency visualization', 'Graph generation', 'AI-powered insights', 'MCP server tooling'],
    featured: true,
    github: 'https://github.com/thedevmj'
  },
  {
    id: 5,
    title: 'Wall-E',
    category: 'Mobile',
    tags: ['Mobile'],
    num: '05',
    description: 'A React Native live wallpaper studio for Android with video, doodle, static, and dynamic wallpaper modes.',
    problem: 'Provides a native Android experience for creating, customizing, and applying live and dynamic wallpapers with real-time previews.',
    tech: ['React Native', 'TypeScript', 'Kotlin', 'react-native-video', 'Android Native'],
    features: ['Live video wallpapers', 'Dynamic battery/membrane wallpapers', 'Doodle animations', 'Color customization', 'Home/Lock screen apply'],
    featured: true,
    github: 'https://github.com/thedevmj/wall_e'
  }
]

const iconMap = {
  1: <FiCpu />,
  2: <FiBook />,
  3: <FiTool />,
  4: <FiActivity />,
  5: <FiSmartphone />
}

export default React.memo(function Projects() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter]
  )

  const handleFilter = (f) => startTransition(() => setFilter(f))
  const openProject = (p) => setSelected(p)
  const closeProject = () => setSelected(null)

  return (
    <section id="projects" className="relative">
      <div className="section-pad">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="section-label">( works )</span>
            <TorsionText maxX={7} maxY={4} maxSkew={2} wobble={0.4}>
              <h2 className="section-title mt-4">Good developers ship.<br />Great developers <span className="italic text-accent">surprise.</span></h2>
            </TorsionText>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-muted dark:text-gray-400">
            Full-stack applications, AI-integrated tools, e-commerce platforms, and developer tooling.
          </p>
        </div>

        {/* Filters */}
        <div className="reveal mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm uppercase tracking-[0.12em]">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`link-underline cursor-pointer ${
                filter === f ? 'text-ink dark:text-white' : 'text-ink-muted dark:text-gray-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Works list */}
        <div className="mt-14 flex flex-col">
          {loading ? (
            <ProjectCardSkeleton />
          ) : (
            filtered.map((p, i) => (
              <article
                key={p.id}
                className="reveal group relative border-t border-line-light dark:border-white/10 py-10 grid md:grid-cols-12 gap-6 cursor-pointer transition-colors duration-500 hover:bg-accent/[0.03] dark:hover:bg-white/[0.02]"
                style={{ transitionDelay: `${i * 0.05}s` }}
                data-cursor="explore"
                onClick={() => openProject(p)}
              >
                <span className="absolute left-0 top-0 h-full w-px bg-accent scale-y-0 origin-top transition-transform duration-500 group-hover:scale-y-100" />
                <div className="md:col-span-2 flex items-start gap-4 text-sm text-ink-muted dark:text-gray-500">
                  <span className="tabular-nums">({p.num})</span>
                </div>
                <div className="md:col-span-7">
                  <h3 className="text-4xl sm:text-5xl font-medium tracking-tight text-ink dark:text-white transition-colors group-hover:text-accent group-hover:italic">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-muted dark:text-gray-400">
                    {p.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-[0.12em] text-ink-muted dark:text-gray-500">
                    {p.tech.slice(0, 4).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                    {p.featured && <span className="text-accent">★ featured</span>}
                  </div>
                </div>
                <div className="md:col-span-3 flex items-start justify-between">
                  <span className="text-5xl text-line-light dark:text-white/10 select-none">{iconMap[p.id]}</span>
                  <span className="hidden md:inline-flex items-center gap-2 text-sm uppercase tracking-[0.12em] text-ink-muted dark:text-gray-400 group-hover:text-ink dark:group-hover:text-white">
                    explore <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <Portal>
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeProject}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-bg-light dark:bg-bg-dark border border-line-light dark:border-white/10 p-6 sm:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-2xl font-medium tracking-tight text-ink dark:text-white">
                  <span className="text-ink-muted dark:text-gray-500 mr-3">({selected.num})</span>
                  {selected.title}
                </h3>
                <button
                  onClick={closeProject}
                  className="w-9 h-9 border border-line-light dark:border-white/20 flex items-center justify-center text-ink dark:text-gray-200 hover:bg-ink hover:text-white dark:hover:bg-white dark:hover:text-ink transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <FiX />
                </button>
              </div>

              <div className="h-px w-full bg-ink dark:bg-white mb-8" />

              <p className="text-ink dark:text-gray-300 leading-relaxed">{selected.description}</p>

              <div className="mt-8">
                <h4 className="text-xs uppercase tracking-[0.2em] text-ink-muted dark:text-gray-500 mb-3">Problem solved</h4>
                <p className="text-sm text-ink dark:text-gray-300 leading-relaxed border-l-2 border-accent pl-4">{selected.problem}</p>
              </div>

              <div className="mt-8">
                <h4 className="text-xs uppercase tracking-[0.2em] text-ink-muted dark:text-gray-500 mb-3">Key features</h4>
                <ul className="flex flex-wrap gap-2">
                  {selected.features.map((f) => (
                    <li key={f} className="px-3 py-1 border border-line-light dark:border-white/20 text-xs text-ink dark:text-gray-300">{f}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <h4 className="text-xs uppercase tracking-[0.2em] text-ink-muted dark:text-gray-500 mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2 text-sm text-ink dark:text-gray-300">
                  {selected.tech.map((t) => (
                    <span key={t} className="mr-2">/{t}</span>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <a href={selected.github} target="_blank" rel="noreferrer" className="btn-black">
                  <FiGithub /> View on GitHub
                </a>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </section>
  )
})
