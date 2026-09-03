import React from 'react'
import TorsionText from './TorsionText'

const services = [
  { title: 'Web Development', desc: 'Responsive, scalable full-stack web applications using React.js, Node.js, Express.js, MongoDB, Java, Spring Boot, Python, and PHP.' },
  { title: 'Mobile App Development', desc: 'Cross-platform mobile applications using React Native for iOS and Android.' },
  { title: 'UI/UX Development', desc: 'Modern, responsive, user-focused interfaces with clean layouts, reusable components, strong visual hierarchy, and responsive behavior.' },
  { title: 'AI Integration', desc: 'Integrate AI and LLM-powered functionality into web applications to create intelligent and automated user experiences.' },
  { title: 'API & Backend Development', desc: 'Build REST APIs, authentication systems, database integrations, and scalable backend architectures.' },
  { title: 'AI & Developer Tools', desc: 'Developer-focused tools such as MCP servers, code analyzers, project automation tools, dependency visualizers, and AI-assisted development utilities.' }
]

export default React.memo(function Services() {
  return (
    <section id="services" className="relative">
      <div className="section-pad">
        <div className="reveal mb-8 sm:mb-12 md:mb-16">
          <span className="section-label">( services )</span>
          <TorsionText maxX={7} maxY={4} maxSkew={2} wobble={0.4}>
            <h2 className="section-title mt-4">What I build :</h2>
          </TorsionText>
        </div>

        <div className="flex flex-col">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="reveal group border-t border-line-light dark:border-white/10 py-8 grid md:grid-cols-12 gap-4"
              style={{ transitionDelay: `${i * 0.04}s` }}
            >
              <span className="md:col-span-2 text-sm text-ink-muted dark:text-gray-500 tabular-nums">
                /{String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="md:col-span-4 text-2xl sm:text-3xl font-medium tracking-tight text-ink dark:text-white">
                {s.title}
              </h3>
              <p className="md:col-span-6 text-sm leading-relaxed text-ink-muted dark:text-gray-400 max-w-md">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})
