import React from 'react'
import { FiArrowRight, FiArrowDown, FiDownload } from 'react-icons/fi'
import { Reveal, Stagger, StaggerItem, Float } from './Motion'
import SplitText from './SplitText'

const focus = ['Full-Stack Apps', 'Websites', 'Android Apps', 'iOS Apps', 'REST APIs', 'AI / LLM']

export default React.memo(function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    if (window.location.hash !== `#${id}`) window.history.replaceState(null, '', `#${id}`)
  }

  const onAnchor = (event, id) => {
    event.preventDefault()
    scrollTo(id)
  }

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-14 pt-28 md:pt-32">
      {/* Oversized outline type */}
      <span
        className="pointer-events-none absolute -right-6 top-24 hidden select-none font-serif text-[20vw] leading-none text-outline opacity-70 lg:block"
        aria-hidden="true"
      >
        DEV
      </span>

      <div className="container-wide relative z-10">
        {/* Meta row */}
        <Reveal className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Available for work
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">India · Remote · 2026</span>
        </Reveal>

        <div className="mt-8 grid items-end gap-12 lg:mt-10 lg:grid-cols-12 lg:gap-10">
          {/* Name + intro */}
          <div className="lg:col-span-7">
            <span className="eyebrow">Full-Stack &amp; Mobile Developer — Websites · Android + iOS</span>
            <h1 className="display mt-5 select-none text-[clamp(4.2rem,12.5vw,11rem)] leading-[0.82]">
              <span className="block"><SplitText text="Junaid" delay={0.1} stagger={0.11} /></span>
              <span className="block italic text-accent"><SplitText text="Mansoori" delay={0.21} stagger={0.11} /></span>
            </h1>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-fg md:text-xl">
                Building full-stack applications and websites end to end — polished{' '}
                <span className="text-accent">React interfaces</span>, secure Node.js APIs, and reliable data models.{' '}
                Also shipping Android and iOS apps with React Native.
              </p>
            </Reveal>

            <Stagger className="mt-9 flex flex-wrap gap-3" gap={0.08}>
              <StaggerItem>
                <a href="#projects" onClick={(e) => onAnchor(e, 'projects')} data-magnetic className="btn btn-accent btn-lg">
                  View full-stack projects <FiArrowRight />
                </a>
              </StaggerItem>
              <StaggerItem>
                <a href="#contact" onClick={(e) => onAnchor(e, 'contact')} data-magnetic className="btn btn-ghost btn-lg">
                  Contact Junaid
                </a>
              </StaggerItem>
              <StaggerItem>
                <a
                  href="/junaidMansoori_Resume.pdf"
                  download="junaidMansoori_Resume.pdf"
                  data-magnetic
                  className="btn btn-ghost btn-lg"
                >
                  <FiDownload /> Download resume (PDF)
                </a>
              </StaggerItem>
            </Stagger>

            <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2">
              {focus.map((f, i) => (
                <React.Fragment key={f}>
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-line-strong" aria-hidden="true" />}
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{f}</span>
                </React.Fragment>
              ))}
            </Reveal>
          </div>

          {/* Monogram panel */}
          <Reveal className="lg:col-span-5" delay={0.15}>
            <div className="relative mx-auto w-full max-w-md">
              <Float className="absolute -left-4 top-10 z-20 hidden sm:block" distance={10} rotate={-4} duration={7}>
                <span className="rounded-full border border-line bg-glass px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg backdrop-blur-xl shadow-soft">
                  Web / Full Stack
                </span>
              </Float>
              <Float className="absolute -right-3 bottom-28 z-20 hidden sm:block" distance={12} rotate={5} duration={6}>
                <span className="rounded-full border border-line bg-glass px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg backdrop-blur-xl shadow-soft">
                  Android / iOS
                </span>
              </Float>

              <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-elev">
                <img
                  src="/heroimg.jpeg"
                  alt="Black-and-white portrait of Junaid Mansoori"
                  width="1086"
                  height="1448"
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_35%] grayscale contrast-105"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%)',
                    maskImage: 'linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%)'
                  }}
                />
                <div className="absolute inset-0 grid-lines opacity-40" />

                <div className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Portfolio / 2026
                </div>
                <div className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  WEB → API → APPS
                </div>

                <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 flex items-center justify-between gap-3 border border-white/20 bg-black/55 px-4 py-3 text-white backdrop-blur-xl">
                  <div className="flex min-w-0 items-center gap-3">
                    <svg className="h-7 w-7 shrink-0" viewBox="0 0 38 32" fill="none" aria-hidden="true">
                      <path d="M2 28 18 3l3 24H2Z" fill="currentColor" />
                      <path d="M21 28 36 19 23 5l-2 23Z" fill="currentColor" fillOpacity=".6" />
                    </svg>
                    <div className="min-w-0">
                      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
                        Full-Stack & Mobile Developer
                      </div>
                      <div className="mt-1 truncate text-sm font-semibold tracking-tight">Junaid Mansoori</div>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">India</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Scroll row */}
        <div className="mt-16 flex items-center justify-between border-t border-line pt-6">
          <span className="eyebrow">Scroll to explore</span>
          <button
            onClick={() => scrollTo('about')}
            aria-label="Scroll to about section"
            className="icon-btn"
          >
            <FiArrowDown className="bounce-down" size={16} />
          </button>
        </div>
      </div>
    </section>
  )
})
