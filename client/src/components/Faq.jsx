import React from 'react'
import { Reveal, Stagger, StaggerItem } from './Motion'

const faqs = [
  {
    q: 'What does Junaid build?',
    a: 'Full-stack web applications and websites, plus Android and iOS apps with React Native. His work spans React and Next.js frontends, Node.js and Express APIs, relational databases such as MySQL and PostgreSQL, MongoDB and Supabase, AI integrations, and developer tools.'
  },
  {
    q: 'How much professional experience does Junaid have?',
    a: 'He has worked for 1+ year as a full-stack developer at Brainmatrix Solutions in Udaipur, building web apps and websites.'
  },
  {
    q: 'Which degrees does Junaid hold?',
    a: 'He has a BSc in Computer Science from Mohanlal Sukhadia University Science College and has studied MCA at Aravali Institute of Technical Studies.'
  },
  {
    q: 'Which projects are in the portfolio?',
    a: 'AI Resume Analyzer, Online Book Shopping Center, Scaffold Generator, MCP Code Project Analyzer, Wall-E, and live client sites HK SPICES and Bellarro.'
  },
  {
    q: 'Is Junaid available for freelance or remote work?',
    a: 'Yes. Junaid is based in India and open to remote freelance work.'
  },
  {
    q: 'How can I contact Junaid?',
    a: 'Email junaidmansuri71@gmail.com, call or message +91 9649354858, connect on GitHub at github.com/thedevmj, or download the resume from the contact section.'
  }
]

export default React.memo(function Faq() {
  return (
    <section id="faq" className="section relative border-t border-line">
      <div className="container-wide">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">08 / FAQ</span>
            <h2 className="display mt-5 text-5xl leading-none sm:text-6xl md:text-7xl">
              Frequently asked questions<span className="text-accent">.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm font-medium leading-relaxed text-muted md:text-base">
            Stack, experience, projects, and availability.
          </p>
        </Reveal>

        <Stagger className="mt-12 border-t border-line" gap={0.05}>
          {faqs.map((faq) => (
            <StaggerItem key={faq.q}>
              <details className="faq-item group border-b border-line py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left">
                  <h3 className="display text-xl leading-snug transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                    {faq.q}
                  </h3>
                  <span className="faq-icon text-2xl leading-none text-muted transition-transform duration-300" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted md:text-[15px]">{faq.a}</p>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
})
