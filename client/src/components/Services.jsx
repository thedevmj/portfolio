import React from 'react'
import { Reveal, Stagger, StaggerItem } from './Motion'

const services = [
  { title: 'Web Development', desc: 'Responsive, scalable full-stack web applications using React.js, Node.js, Express.js, MongoDB, Java, Spring Boot, Python, and PHP.' },
  { title: 'Mobile App Development', desc: 'Cross-platform mobile applications using React Native for iOS and Android.' },
  { title: 'UI/UX Development', desc: 'Modern, responsive, user-focused interfaces with clean layouts, reusable components, and strong visual hierarchy.' },
  { title: 'AI Integration', desc: 'Integrate AI and LLM-powered functionality into web applications to create intelligent and automated user experiences.' },
  { title: 'API & Backend Development', desc: 'Build REST APIs, authentication systems, database integrations, and scalable backend architectures.' },
  { title: 'AI & Developer Tools', desc: 'Developer-focused tools such as MCP servers, code analyzers, project automation tools, dependency visualizers, and AI-assisted utilities.' }
]

const cardTones = [
  'bg-neo-white text-black',
  'bg-neo-muted text-neo-ink',
  'bg-neo-white text-black',
  'bg-neo-secondary text-black',
  'bg-neo-white text-black',
  'bg-neo-muted text-neo-ink'
]

export default React.memo(function Services() {
  return (
    <section id="services" className="relative border-b-4 border-neo-ink">
      <div className="section-pad container-neo">
        <Reveal className="section-head max-w-3xl">
          <span className="section-label">( services )</span>
          <h2 className="section-title">
            What I build <span className="text-neo-accent">:</span>
          </h2>
        </Reveal>

        <Stagger className="mt-10 md:mt-14 grid md:grid-cols-2 gap-6 md:gap-8" gap={0.08}>
          {services.map((s, i) => (
            <StaggerItem key={s.title}>
              <article
                className={`${cardTones[i]} border-4 border-neo-ink shadow-neo-md card-lift p-6 md:p-9 relative h-full`}
              >
                <span className="absolute -top-4 -right-3 bg-neo-accent border-4 border-neo-ink w-12 h-12 rotate-6 flex items-center justify-center font-black text-lg text-white shadow-neo-sm tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm md:text-base font-bold leading-snug opacity-70">
                  {s.desc}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
})