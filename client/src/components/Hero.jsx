import React from 'react'
import { FiArrowRight, FiDownload, FiChevronDown } from 'react-icons/fi'
import { Reveal, Stagger, StaggerItem, Float } from './Motion'

const tech = ['React', 'Node.js', 'MongoDB', 'Express', 'AI / LLM', 'React Native', 'TypeScript', 'REST APIs', 'UI/UX', 'MCP']

export default React.memo(function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Giant outlined background texture */}
        <div className="absolute -right-6 top-24 text-[26vw] lg:text-[22rem] font-black text-stroke opacity-20 leading-none select-none">
          DEV
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center container-neo pt-28 pb-14 lg:pt-24 lg:pb-16">
          {/* Left: text */}
          <Reveal>
            {/* Subtitle badge */}
            <span className="inline-block bg-neo-secondary border-4 border-neo-ink px-4 py-2 md:px-5 md:py-3 font-black text-xs md:text-sm uppercase tracking-widest shadow-neo-sm transform -rotate-1 text-black">
              Full Stack Developer
            </span>

            {/* Main headline */}
            <h1 className="mt-6 md:mt-8 leading-[0.92] select-none">
              <span className="mask-line-wrap">
                <span className="mask-line block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-neo-ink">
                  Junaid
                </span>
              </span>
              <span className="mask-line-wrap">
                <span className="mask-line block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-neo-accent transform rotate-1 translate-x-1" style={{ animationDelay: '0.15s' }}>
                  Mansoori
                </span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl font-bold mt-6 md:mt-8 max-w-md leading-tight text-neo-ink">
              Building bold, unapologetic web &amp; mobile experiences with
              AI baked in — MERN, React Native, and the latest LLM tooling.
            </p>

            {/* CTA buttons */}
            <Stagger className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 md:gap-5" gap={0.12}>
              <StaggerItem>
                <button onClick={() => scrollTo('projects')} data-magnetic className="btn-primary px-8 py-4 md:px-9 md:py-5">
                  View Projects <FiArrowRight />
                </button>
              </StaggerItem>
              <StaggerItem>
                <button onClick={() => scrollTo('contact')} data-magnetic className="btn-outline px-8 py-4 md:px-9 md:py-5">
                  Get in Touch
                </button>
              </StaggerItem>
              <StaggerItem>
                <a
                  href="/junaidMansoori_Resume.pdf"
                  download="junaidMansoori_Resume.pdf"
                  data-magnetic
                  className="btn-outline px-8 py-4 md:px-9 md:py-5"
                >
                  <FiDownload /> Resume
                </a>
              </StaggerItem>
            </Stagger>
          </Reveal>

          {/* Right: floating shapes / decorative */}
          <Reveal className="relative h-[340px] mt-10 md:mt-0 sm:h-[360px] lg:h-[480px]" delay={0.15}>
            {/* Floating shape 1 — yellow */}
            <Float className="absolute top-0 right-0 w-32 h-32 sm:w-44 sm:h-44 lg:w-44 lg:h-44 bg-neo-secondary border-4 border-neo-ink shadow-neo-lg" duration={6} rotate={-3}>
              <span className="flex items-center justify-center h-full w-full font-black uppercase text-center text-sm sm:text-base text-black px-4">
                Open to work
              </span>
            </Float>

            {/* Floating shape 2 — violet */}
            <Float className="absolute top-24 left-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-32 lg:h-32 bg-neo-muted border-4 border-neo-ink shadow-neo-md" duration={5} distance={18} rotate={6}>
              <span className="w-full h-full flex items-center justify-center font-black text-lg">✦</span>
            </Float>

            {/* Centre sticker — red box with text */}
            <div className="absolute bottom-0 left-10 lg:left-16 w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60 bg-neo-accent border-4 border-neo-ink shadow-neo-lg transform -rotate-2 flex items-center justify-center">
              <span className="font-black text-3xl lg:text-5xl uppercase text-center leading-none text-white" style={{ textShadow: '4px 4px 0 #000' }}>
                Bold
                <br />
                Builds
              </span>
            </div>

            {/* Small badge sticker */}
            <div className="absolute bottom-16 right-0 lg:right-6 bg-neo-panel border-4 border-neo-ink px-4 py-3 shadow-neo-sm transform rotate-3">
              <p className="font-black text-xs uppercase tracking-widest">
                Est. 2023 <span className="text-neo-accent">✶</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={() => scrollTo('about')}
        aria-label="Scroll to about section"
        className="relative z-10 flex mx-auto mb-8 w-10 h-10 border-4 border-neo-ink bg-neo-panel shadow-neo-sm items-center justify-center duration-100 hover:bg-neo-secondary hover:text-black active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
      >
        <FiChevronDown className="bounce-down" />
      </button>

      {/* Tech marquee */}
      <div className="relative z-10 border-y-4 border-neo-ink bg-neo-secondary">
        <div className="marquee-mask overflow-hidden py-4 md:py-5">
          <div className="flex w-max whitespace-nowrap marquee-track marquee-pause"
            style={{ animation: 'marquee 30s linear infinite' }}
          >
            {[0, 1].map((k) => (
              <div key={k} className="flex items-center font-black uppercase tracking-tight">
                {tech.map((t) => (
                  <span key={t} className="flex items-center text-lg md:text-2xl px-4 md:px-6 text-black">
                    {t} <span className="ml-8 text-black text-xl md:text-2xl">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})