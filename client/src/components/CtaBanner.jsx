import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { Reveal } from './Motion'

export default React.memo(function CtaBanner() {
  const scrollTo = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative overflow-hidden border-y border-line bg-elev-2">
      <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-[0.09] blur-[100px]" />
      <div className="section container-wide relative text-center">
        <Reveal className="mx-auto max-w-4xl">
          <span className="eyebrow">( Next )</span>
          <h2 className="display mt-6 text-5xl leading-[0.92] sm:text-7xl md:text-8xl">
            Let&rsquo;s start
            <br />
            <em className="italic text-accent">from scratch.</em>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-sm font-medium leading-relaxed text-muted md:text-base">
            Web, mobile, and AI — let&rsquo;s build something.
          </p>
          <button onClick={scrollTo} className="btn btn-accent btn-lg group mt-9">
            Start a conversation
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
        </Reveal>
      </div>
    </section>
  )
})
