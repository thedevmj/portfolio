import React, { useEffect, useRef } from 'react'

// Mouse-tracking "torsion" wrapper: applies a smooth 3D perspective twist
// (rotateY + rotateX + skewX + scale) to its content, following the cursor
// over the element with an idle wobble so it reads as alive even at rest.
// Active for all pointer devices; only skips on devices with no hover.
export default function TorsionText({
  children,
  className = '',
  maxX = 12,   // degrees of horizontal twist
  maxY = 7,    // degrees of vertical twist
  maxSkew = 6, // degrees of shear
  wobble = 0.8 // idle secondary motion intensity
}) {
  const outerRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return
    if (window.matchMedia('(hover: none)').matches) return

    let raf
    let cur = { x: 0, y: 0, s: 1 }
    let tgt = { x: 0, y: 0, s: 1 }
    const start = performance.now()

    const onMove = (e) => {
      const rect = outer.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
      tgt.x = inside ? nx : nx * 0.25
      tgt.y = inside ? ny : ny * 0.25
      tgt.s = inside ? 1.03 : 1
    }

    const loop = (now) => {
      const t = (now - start) / 1000
      cur.x += (tgt.x - cur.x) * 0.09
      cur.y += (tgt.y - cur.y) * 0.09
      cur.s += (tgt.s - cur.s) * 0.09
      const idleX = Math.sin(t * 0.9) * wobble
      const idleY = Math.cos(t * 0.7 + 1.3) * wobble * 0.6
      const rx = (cur.x * maxX) + idleX
      const ry = (-cur.y * maxY) + idleY
      const skew = cur.x * maxSkew
      inner.style.transform =
        `perspective(900px) rotateY(${rx.toFixed(2)}deg) rotateX(${ry.toFixed(2)}deg) skewX(${skew.toFixed(2)}deg) scale(${cur.s.toFixed(3)})`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [maxX, maxY, maxSkew, wobble])

  return (
    <div ref={outerRef} style={{ perspective: '900px' }} className={className}>
      <div ref={innerRef} style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>
        {children}
      </div>
    </div>
  )
}
