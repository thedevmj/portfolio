import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import TorsionText from './TorsionText'

export default React.memo(function CtaBanner() {
  const scrollTo = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative px-6 sm:px-10 lg:px-16 py-24 md:py-32 border-t border-line-light dark:border-white/10">
      <div className="max-w-5xl mx-auto">
        <div className="reveal text-center">
          <span className="section-label">( cta )</span>
          <TorsionText maxX={9} maxY={5} maxSkew={3} wobble={0.5}>
            <h2 className="mt-8 text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight leading-[0.95] text-ink dark:text-white">
              Let&rsquo;s start<br />
              <span className="italic text-accent">from scratch.</span>
            </h2>
          </TorsionText>
          <p className="mt-8 max-w-xl mx-auto text-ink-muted dark:text-gray-400 leading-relaxed">
            Web, mobile, and AI — let&rsquo;s build something.
          </p>
          <button onClick={scrollTo} className="btn-black group mt-10">
            Start a Conversation <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
})
