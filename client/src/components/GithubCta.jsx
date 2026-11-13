import React from 'react'
import { FiGithub, FiArrowUpRight } from 'react-icons/fi'
import { Reveal } from './Motion'

export default React.memo(function GithubCta() {
  return (
    <section className="relative pb-6 pt-6 md:pb-10 md:pt-10">
      <div className="container-wide">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[2rem] border border-line bg-elev p-6 sm:p-10 md:p-12"
            style={{ backgroundImage: 'linear-gradient(120deg, rgba(67,83,255,0.10), rgba(255,77,28,0.08))' }}
          >
            <div className="absolute inset-0 grid-lines opacity-60" />
            <div className="relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
              <div className="flex items-start gap-5">
                <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line-strong bg-glass text-2xl text-fg backdrop-blur sm:flex">
                  <FiGithub />
                </span>
                <div>
                  <span className="eyebrow">GitHub</span>
                  <h3 className="display mt-3 text-3xl leading-none sm:text-4xl md:text-5xl">
                    Explore my <span className="italic text-accent">code.</span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                    Code, experiments, and developer projects.
                  </p>
                </div>
              </div>

              <a href="https://github.com/thedevmj" target="_blank" rel="noreferrer" className="btn btn-accent btn-lg shrink-0">
                <FiGithub /> Visit my GitHub <FiArrowUpRight />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
})
