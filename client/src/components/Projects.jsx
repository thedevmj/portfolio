import React, { useEffect, useMemo, useState, useTransition } from 'react'
import { FiGithub, FiX, FiCpu, FiBook, FiTool, FiActivity, FiArrowRight, FiSmartphone } from 'react-icons/fi'
import { ProjectCardSkeleton } from './Skeleton'
import Portal from './Portal'
import { Reveal } from './Motion'
import { AnimatePresence, motion } from 'motion/react'

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

const rowTones = ['bg-neo-white text-black', 'bg-neo-muted text-neo-ink', 'bg-neo-white text-black', 'bg-neo-secondary text-black', 'bg-neo-white text-black']

export default React.memo(function Projects() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
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
      <div className="section-pad container-neo">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="section-head">
            <span className="section-label">( works )</span>
            <h2 className="section-title">
              Good developers ship.
              <br />
              Great developers <span className="text-neo-accent">surprise.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base font-bold text-neo-ink opacity-70 dark:opacity-90 leading-snug">
            Full-stack applications, AI-integrated tools, e-commerce platforms, and developer tooling.
          </p>
        </Reveal>

        {/* Filters */}
        <Reveal className="mt-10 flex flex-wrap gap-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`font-black text-xs uppercase tracking-wider px-4 py-2.5 border-4 border-neo-ink duration-100 cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                filter === f
                  ? 'bg-neo-accent text-white shadow-neo-sm'
                  : 'bg-neo-panel text-neo-ink hover:bg-neo-secondary hover:text-black hover:shadow-neo-sm'
              }`}
              aria-pressed={filter === f}
            >
              {f}
            </button>
          ))}
          {isPending && <span className="self-center text-xs font-bold uppercase animate-pulse">filtering…</span>}
        </Reveal>

        {/* Works list */}
        <div className="mt-8 md:mt-12 flex flex-col gap-6 md:gap-8">
          {loading ? (
            <ProjectCardSkeleton />
          ) : (
            filtered.map((p, i) => (
              <Reveal key={p.id} threshold={0.95}>
                <article
                  className={`group ${rowTones[i % rowTones.length]} border-4 border-neo-ink shadow-neo-md card-lift relative p-5 sm:p-7 md:p-9 cursor-pointer grid md:grid-cols-12 gap-5 md:gap-8 items-center`}
                  data-cursor="explore"
                  onClick={() => openProject(p)}
                >
                {/* Number panel */}
                <div className="md:col-span-1 flex md:flex-col items-center md:items-start gap-4 md:gap-0">
                  <span className="w-14 h-14 md:w-16 md:h-16 border-4 border-neo-ink bg-neo-accent flex items-center justify-center font-black text-lg text-white shadow-neo-sm transform -rotate-3 group-hover:rotate-3 duration-200 tabular-nums">
                    {p.num}
                  </span>
                </div>

                <div className="md:col-span-9">
                  <div className="flex items-center gap-3 flex-wrap">
                    {p.featured && (
                      <span className="bg-neo-accent border-4 border-neo-ink px-3 py-1 font-black text-[10px] uppercase tracking-widest shadow-neo-sm transform rotate-2 text-white">
                        ★ Featured
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none duration-200 group-hover:translate-x-1.5">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm md:text-base font-bold leading-snug opacity-70">
                    {p.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.slice(0, 4).map((t) => (
                      <span key={t} className="bg-neo-muted border-2 border-neo-ink px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-neo-ink">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4 md:flex-col md:items-end">
                  <span className="text-4xl opacity-20 duration-200 group-hover:opacity-60 group-hover:scale-110 select-none">{iconMap[p.id]}</span>
                  <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neo-ink bg-neo-panel border-2 border-neo-ink px-3 py-2 shadow-neo-sm duration-100 group-hover:bg-neo-secondary group-hover:text-black">
                    explore <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
            </Reveal>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <Portal>
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70"
              onClick={closeProject}
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-neo-bg border-4 border-neo-ink shadow-neo-lg p-6 sm:p-10 relative"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              >
              <button
                onClick={closeProject}
                aria-label="Close"
                className="absolute -top-4 -right-3 w-12 h-12 border-4 border-neo-ink bg-neo-accent text-white flex items-center justify-center shadow-neo-sm duration-100 hover:bg-neo-secondary hover:text-black active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
              >
                <FiX size={20} />
              </button>

              <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-neo-ink leading-none">
                  <span className="text-neo-accent mr-3 tabular-nums">({selected.num})</span>
                  {selected.title}
                </h3>
                {selected.featured && (
                  <span className="bg-neo-accent border-4 border-neo-ink px-3 py-1.5 font-black text-[10px] uppercase tracking-widest shadow-neo-sm transform rotate-2 shrink-0 text-white">
                    ★ Featured
                  </span>
                )}
              </div>

              <div className="h-4 w-full bg-neo-ink mb-8" />

              <p className="text-neo-ink font-bold leading-snug">{selected.description}</p>

              <div className="mt-8">
                <h4 className="inline-block bg-neo-secondary border-2 border-neo-ink px-3 py-1.5 text-xs font-black uppercase tracking-widest shadow-neo-sm mb-4 text-black">Problem solved</h4>
                <p className="text-sm text-neo-ink font-bold leading-relaxed border-l-4 border-neo-accent pl-4">{selected.problem}</p>
              </div>

              <div className="mt-8">
                <h4 className="inline-block bg-neo-muted border-2 border-neo-ink px-3 py-1.5 text-xs font-black uppercase tracking-widest shadow-neo-sm mb-4">Key features</h4>
                <ul className="flex flex-wrap gap-2">
                  {selected.features.map((f) => (
                    <li key={f} className="bg-neo-white border-2 border-neo-ink px-3 py-1.5 text-xs font-black uppercase tracking-wide text-black">{f}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <h4 className="inline-block bg-neo-accent border-2 border-neo-ink px-3 py-1.5 text-xs font-black uppercase tracking-widest shadow-neo-sm mb-4 text-white">Technologies</h4>
                <div className="flex flex-wrap gap-2 text-sm text-neo-ink font-black">
                  {selected.tech.map((t) => (
                    <span key={t} className="mr-1">/{t}</span>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <a href={selected.github} target="_blank" rel="noreferrer" className="btn-primary px-6 py-4">
                  <FiGithub /> View on GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>
        </Portal>
      )}
      </AnimatePresence>
    </section>
  )
})