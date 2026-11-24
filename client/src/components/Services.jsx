import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { Reveal, Stagger, StaggerItem } from './Motion'

const services = [
  { title: 'Websites & Full-Stack Apps', desc: 'Websites and MERN apps using React/Next.js, Node/Express APIs, MongoDB, Java, Spring Boot, Python, and PHP.' },
  { title: 'Android + iOS Apps', desc: 'React Native apps for Android and iOS, including native features and shared code.' },
  { title: 'UI/UX Development', desc: 'Responsive interfaces with clear layouts, reusable components, and readable type.' },
  { title: 'AI Integration', desc: 'Add AI and LLM features to web apps.' },
  { title: 'API & Backend Development', desc: 'Build REST APIs, auth, and database integrations for relational and NoSQL stores.' },
  { title: 'AI & Developer Tools', desc: 'Developer-focused tools such as MCP servers, code analyzers, project automation tools, dependency visualizers, and AI-assisted utilities.' }
]

export default React.memo(function Services() {
  return (
    <section id="services" className="section relative border-t border-line">
      <div className="container-wide">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">05 / Services</span>
            <h2 className="display mt-5 text-5xl leading-none sm:text-6xl md:text-7xl">
              What I build<span className="text-accent">.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm font-medium leading-relaxed text-muted md:text-base">
            I build websites, full-stack apps, and Android/iOS apps from start to finish.
          </p>
        </Reveal>

        <Stagger className="mt-12 border-t border-line" gap={0.05}>
          {services.map((s, i) => (
            <StaggerItem key={s.title}>
              <article className="group grid cursor-default items-baseline gap-x-6 gap-y-2 border-b border-line py-6 transition-colors duration-300 hover:border-line-strong md:grid-cols-12 md:py-7">
                <span className="font-mono text-[11px] tracking-widest text-muted md:col-span-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="display text-2xl leading-tight transition-colors duration-300 group-hover:text-accent md:col-span-4 md:text-3xl">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted md:col-span-6 md:text-[15px]">
                  {s.desc}
                </p>
                <FiArrowUpRight className="hidden justify-self-end text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:col-span-1 md:block" />
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
})
