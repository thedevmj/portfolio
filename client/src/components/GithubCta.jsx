import React from 'react'
import { FiGithub, FiArrowRight } from 'react-icons/fi'
import { Reveal } from './Motion'

export default React.memo(function GithubCta() {
  return (
    <section className="relative">
      <div className="container-neo py-8 sm:py-14 md:py-16">
        <Reveal className="bg-neo-muted border-4 border-neo-ink shadow-neo-md card-lift p-6 sm:p-10 md:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8">
          <div className="flex items-start gap-5">
            <span className="hidden sm:flex w-16 h-16 shrink-0 border-4 border-neo-ink bg-neo-panel items-center justify-center text-3xl text-neo-ink shadow-neo-sm transform -rotate-3">
              <FiGithub />
            </span>
            <div>
              <span className="inline-block bg-neo-secondary border-2 border-neo-ink px-3 py-1.5 text-xs font-black uppercase tracking-widest shadow-neo-sm text-black">
                ( github )
              </span>
              <h3 className="mt-4 text-3xl sm:text-5xl font-black uppercase tracking-tighter text-neo-ink">
                Explore my code
              </h3>
              <p className="mt-3 text-sm md:text-base font-bold text-neo-ink opacity-70 dark:opacity-90">
                Code, experiments, and developer projects.
              </p>
            </div>
          </div>
          <a
            href="https://github.com/thedevmj"
            target="_blank"
            rel="noreferrer"
            className="btn-primary group shrink-0 px-6 py-4 md:px-8 md:py-5"
          >
            <FiGithub /> Visit My GitHub <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </Reveal>
      </div>
    </section>
  )
})