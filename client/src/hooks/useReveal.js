import { useEffect } from 'react'

export default function useReveal(deps = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    const observe = () => {
      document.querySelectorAll('.reveal:not(.revealed)').forEach((el) => {
        if (!observer._observed?.has(el)) {
          observer.observe(el)
          observer._observed = observer._observed || new WeakSet()
          observer._observed.add(el)
        }
      })
    }

    observe()

    const mutationObs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue
          if (node.classList?.contains('reveal')) observe()
          if (node.querySelector?.('.reveal')) observe()
        }
      }
    })
    mutationObs.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObs.disconnect()
    }
  }, deps)
}
