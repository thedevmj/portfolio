import React, { useEffect, useMemo, useState, useTransition } from 'react'
import { FiGithub, FiX, FiCpu, FiBook, FiTool, FiActivity, FiArrowUpRight, FiSmartphone, FiGlobe, FiShoppingBag } from 'react-icons/fi'
import { ProjectCardSkeleton } from './Skeleton'
import Portal from './Portal'
import { Reveal, Stagger, StaggerItem } from './Motion'
import { AnimatePresence, motion } from 'motion/react'
import SpotlightCard from './SpotlightCard'

const filters = ['All', 'Full Stack', 'AI', 'Developer Tools', 'E-Commerce', 'Mobile Apps']

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
    category: 'Mobile Apps',
    tags: ['Mobile Apps', 'Android'],
    num: '05',
    description: 'A React Native live wallpaper studio for Android with video, doodle, static, and dynamic wallpaper modes.',
    problem: 'Provides a native Android experience for creating, customizing, and applying live and dynamic wallpapers with real-time previews.',
    tech: ['React Native', 'TypeScript', 'Kotlin', 'react-native-video', 'Android Native'],
    features: ['Live video wallpapers', 'Dynamic battery/membrane wallpapers', 'Doodle animations', 'Color customization', 'Home/Lock screen apply'],
    featured: true,
    github: 'https://github.com/thedevmj/wall_e'
  },
  {
    id: 6,
    title: 'HK SPICES',
    category: 'E-Commerce',
    tags: ['Full Stack', 'E-Commerce'],
    num: '06',
    description: 'A live premium spice storefront with product catalog, cart and checkout, product search, B2B enquiries, and customer accounts.',
    problem: 'Gives a Udaipur spice brand a premium retail storefront and a practical B2B enquiry workflow, with clear pricing, stock, and product storytelling.',
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'JWT'],
    features: ['Product catalog', 'Cart & checkout', 'B2B enquiry dashboard', 'Product search', 'Mobile OTP login', 'Responsive UI'],
    featured: true,
    live: 'https://hkspices.in/',
    github: 'https://github.com/thedevmj'
  },
  {
    id: 7,
    title: 'Bellarro',
    category: 'E-Commerce',
    tags: ['Full Stack', 'E-Commerce'],
    num: '07',
    description: 'A live fashion and lifestyle storefront for handcrafted handbags, travel bags, messenger bags, and bespoke leather creations.',
    problem: 'Presents a premium leather-goods catalogue with timeless editorial styling and a smooth shopping journey across devices.',
    tech: ['React.js', 'Vite', 'JavaScript', 'REST APIs', 'Responsive UI'],
    features: ['Product catalogue', 'Editorial product pages', 'Responsive layout', 'Shopping workflow', 'Brand storytelling'],
    featured: false,
    live: 'https://bellarro.com/',
    github: 'https://github.com/thedevmj'
  }
]

const iconMap = {
  1: <FiCpu />,
  2: <FiBook />,
  3: <FiTool />,
  4: <FiActivity />,
  5: <FiSmartphone />,
  6: <FiGlobe />,
  7: <FiShoppingBag />
}

const tones = [
  'linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.01))',
  'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(0,0,0,0.02))',
  'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))',
  'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(0,0,0,0.04))',
  'linear-gradient(135deg, rgba(255,255,255,0.11), rgba(255,255,255,0.01))',
  'linear-gradient(135deg, rgba(255,255,255,0.09), rgba(0,0,0,0.03))',
  'linear-gradient(135deg, rgba(255,255,255,0.13), rgba(255,255,255,0.02))'
]

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
    <section id="projects" className="section relative border-t border-line">
      <div className="container-wide">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">03 / Selected work</span>
            <h2 className="display mt-5 max-w-2xl text-4xl leading-[1.02] sm:text-5xl md:text-6xl">
              Selected web, mobile &amp; AI{' '}
              <em className="italic text-accent">projects.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm font-medium leading-relaxed text-muted md:text-base">
            Full-stack applications, AI-integrated tools, e-commerce platforms, and
            developer tooling.
          </p>
        </Reveal>

        {/* Filters */}
        <Reveal className="mt-10 flex flex-wrap items-center gap-2.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              aria-pressed={filter === f}
              className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                filter === f
                  ? 'border-fg bg-fg text-bg'
                  : 'border-line-strong text-muted hover:border-fg hover:text-fg'
              }`}
            >
              {f}
            </button>
          ))}
          {isPending && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">filtering…</span>
          )}
        </Reveal>

        {/* Grid */}
        <div className="mt-8 md:mt-10">
          {loading ? (
            <ProjectCardSkeleton />
          ) : (
            <Stagger className="grid gap-5 md:grid-cols-2" gap={0.06}>
              {filtered.map((p, i) => (
                <StaggerItem key={p.id}>
                  <SpotlightCard
                    as="article"
                    id={`project-${p.id}`}
                    onClick={() => openProject(p)}
                    data-cursor="explore"
                    className="card card-hover group flex h-full cursor-pointer flex-col overflow-hidden"
                  >
                    {/* Visual band */}
                    <div
                      className="relative h-44 overflow-hidden border-b border-line bg-elev md:h-52"
                      style={{ backgroundImage: tones[i % tones.length] }}
                    >
                      <div className="absolute inset-0 grid-lines opacity-50" />
                      <span className="absolute left-6 top-6 font-mono text-[11px] tracking-widest text-muted">
                        / {p.num}
                      </span>
                      {p.featured && (
                        <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-on-accent">
                          ★ Featured
                        </span>
                      )}
                      {p.live && (
                        <span className="absolute right-6 top-14 rounded-full border border-line-strong bg-glass px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-fg backdrop-blur">
                          Live
                        </span>
                      )}
                      <span className="absolute bottom-5 left-6 text-4xl text-fg transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-accent">
                        {iconMap[p.id]}
                      </span>
                      <span className="text-outline pointer-events-none absolute -bottom-3 right-4 select-none font-serif text-7xl italic leading-none">
                        {p.num}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6 md:p-7">
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span key={t} className="chip">
                            {t}
                          </span>
                        ))}
                      </div>

                      <h3 className="display mt-4 text-2xl leading-tight transition-colors duration-300 group-hover:text-accent md:text-[2rem]">
                        {p.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {p.tech.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-line px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                          <a
                            href={`#project-${p.id}`}
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              openProject(p)
                            }}
                            className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-accent"
                          >
                            View case study for {p.title}
                          </a>
                          {p.live && (
                            <a
                              href={p.live}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent transition-opacity hover:opacity-70"
                            >
                              Visit live site for {p.title}
                            </a>
                          )}
                        </div>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong text-muted transition-all duration-300 group-hover:border-accent group-hover:text-accent">
                          <FiArrowUpRight size={14} />
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <Portal>
            <motion.div
              className="fixed inset-0 z-[60] overflow-y-auto bg-black/65 p-4 backdrop-blur-sm sm:p-6"
              onClick={closeProject}
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex min-h-full items-center justify-center py-6">
                <motion.div
                  className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-line bg-elev shadow-lift"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, y: 36, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                >
                  <div
                    className="relative h-36 border-b border-line md:h-40"
                    style={{ backgroundImage: tones[(selected.id - 1) % tones.length] }}
                  >
                    <div className="absolute inset-0 grid-lines opacity-50" />
                    <span className="absolute bottom-5 left-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                      Case study — {selected.num}
                    </span>
                    <span className="absolute bottom-4 right-6 text-5xl text-fg opacity-80">
                      {iconMap[selected.id]}
                    </span>
                    <button
                      onClick={closeProject}
                      aria-label="Close"
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-glass text-fg backdrop-blur transition-colors hover:border-fg"
                    >
                      <FiX size={18} />
                    </button>
                  </div>

                  <div className="p-6 sm:p-9">
                    <div className="flex flex-wrap items-center gap-2">
                      {selected.tags.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                      {selected.featured && (
                        <span className="rounded-full bg-accent px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-on-accent">
                          ★ Featured
                        </span>
                      )}
                    </div>

                    <h2 className="display mt-4 text-3xl leading-tight sm:text-4xl">{selected.title}</h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[15px]">
                      {selected.description}
                    </p>

                    <div className="mt-8 border-t border-line pt-6">
                      <span className="eyebrow">Problem solved</span>
                      <p className="mt-3 text-sm leading-relaxed text-fg">{selected.problem}</p>
                    </div>

                    <div className="mt-7 border-t border-line pt-6">
                      <span className="eyebrow">Key features</span>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {selected.features.map((f) => (
                          <li key={f} className="chip">
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-7 border-t border-line pt-6">
                      <span className="eyebrow">Technologies</span>
                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                        {selected.tech.map((t) => (
                          <span key={t} className="font-mono text-xs text-muted">
                            / {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-9 flex flex-wrap gap-3">
                      {selected.live && (
                        <a href={selected.live} target="_blank" rel="noreferrer" className="btn btn-ghost">
                          <FiGlobe /> Visit live site
                        </a>
                      )}
                      <a href={selected.github} target="_blank" rel="noreferrer" className="btn btn-accent">
                        <FiGithub /> View GitHub profile
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </section>
  )
})
