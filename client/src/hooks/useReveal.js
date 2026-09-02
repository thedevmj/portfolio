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

    const els = document.querySelectorAll('.reveal:not(.revealed)')
    els.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, deps)
}
