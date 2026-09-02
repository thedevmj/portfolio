import React from 'react'
import { FiGithub, FiArrowRight } from 'react-icons/fi'

export default React.memo(function GithubCta() {
  return (
    <section className="relative px-6 sm:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="reveal border border-line-light dark:border-white/10 p-10 sm:p-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <span className="section-label">( github )</span>
            <h3 className="mt-4 text-3xl sm:text-4xl font-medium tracking-tight text-ink dark:text-white">
              Explore my code on GitHub
            </h3>
            <p className="mt-3 text-sm text-ink-muted dark:text-gray-400">
              Code, experiments, and developer projects.
            </p>
          </div>
          <a
            href="https://github.com/thedevmj"
            target="_blank"
            rel="noreferrer"
            className="btn-black group shrink-0"
          >
            <FiGithub /> Visit My GitHub <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
})
