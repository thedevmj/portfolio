import React, { useEffect, useRef } from 'react'

// Custom cursor inspired by noth.in — a dot + ring that shows an "explore" label
// over interactive work cards. Also applies a magnetic pull to [data-magnetic]
// elements. Disabled on touch devices and for reduced motion.
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let raf = null
    let x = -100, y = -100
    let rx = -100, ry = -100

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      dot.style.transform = `translate(${x - 3}px, ${y - 3}px)`
    }

    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`
      raf = requestAnimationFrame(loop)
    }

    const onOver = (e) => {
      const t = e.target.closest('[data-cursor="explore"]')
      if (t) {
        ring.textContent = 'explore'
        ring.style.opacity = '1'
        ring.style.width = '80px'
        ring.style.height = '80px'
        ring.style.transform = `translate(${x - 40}px, ${y - 40}px)`
        dot.style.opacity = '0'
      } else {
        ring.textContent = ''
        ring.style.opacity = '0'
        ring.style.width = '40px'
        ring.style.height = '40px'
        dot.style.opacity = '1'
      }
    }

    // Magnetic pull for [data-magnetic] elements
    const onMagneticMove = (e) => {
      const el = e.target.closest('[data-magnetic]')
      if (!el) return
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - (rect.left + rect.width / 2)
      const relY = e.clientY - (rect.top + rect.height / 2)
      el.style.transition = 'transform 0.15s cubic-bezier(0.22,1,0.36,1)'
      el.style.transform = `translate(${relX * 0.2}px, ${relY * 0.25}px)`
      el.dataset.magnetHover = '1'
    }

    const onMagneticLeave = (e) => {
      const el = e.target.closest('[data-magnetic]')
      if (!el) return
      el.dataset.magnetHover = ''
      el.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1)'
      el.style.transform = 'translate(0,0)'
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mousemove', onMagneticMove, true)
    document.addEventListener('mouseout', onMagneticLeave, true)
    raf = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mousemove', onMagneticMove, true)
      document.removeEventListener('mouseout', onMagneticLeave, true)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
