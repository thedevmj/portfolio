import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { Reveal } from './Motion'

export default React.memo(function CtaBanner() {
  const scrollTo = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative border-b-4 border-neo-ink bg-neo-ink">
      <div className="section-pad container-neo text-center">
        <Reveal className="max-w-4xl mx-auto">
          <span className="inline-block bg-neo-secondary border-4 border-neo-ink px-4 py-2 font-black text-xs uppercase tracking-widest shadow-neo-sm transform rotate-1 text-black">
            ( cta )
          </span>
          <h2 className="mt-8 text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-[0.95] text-neo-bg" style={{ textShadow: '7px 7px 0 #FF6B6B' }}>
            Let&rsquo;s start
            <br />
            <span className="text-neo-accent">from scratch.</span>
          </h2>
          <p className="mt-8 max-w-xl mx-auto text-base md:text-lg font-bold text-neo-bg opacity-80">
            Web, mobile, and AI — let&rsquo;s build something.
          </p>
          <button onClick={scrollTo} className="btn-secondary group mt-10 px-8 py-4 md:px-10 md:py-5">
            Start a Conversation <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </Reveal>
      </div>
    </section>
  )
})