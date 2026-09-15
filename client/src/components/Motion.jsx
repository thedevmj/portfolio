import { motion, useReducedMotion } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'

const EASE = [0.22, 1, 0.36, 1]

// Deterministic in-viewport detection driven by scroll/resize + a fixed safety
// check. getBoundingClientRect always reflects the actual layout regardless of
// browser zoom, display scaling, or embedding, so reveals can never get stuck hidden.
export function useInViewCheck(ref, threshold = 0.9) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let done = false

    const check = () => {
      if (done) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight || 800
      if (r.top <= vh * threshold && r.bottom >= 0) {
        done = true
        setInView(true)
      }
    }

    check()
    const idle = setTimeout(check, 1200)
    const safety = setInterval(() => check(), 5000)
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    window.addEventListener('orientationchange', check)

    return () => {
      done = true
      clearTimeout(idle)
      clearInterval(safety)
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      window.removeEventListener('orientationchange', check)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold])

  return inView
}

export function Reveal({ as = 'div', delay = 0, duration = 0.65, y = 36, threshold = 0.9, className, children, ...rest }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const shown = useInViewCheck(ref, threshold)
  const Tag = motion[as]
  return (
    <Tag
      ref={ref}
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      animate={shown ? (reduce ? { opacity: 1 } : { opacity: 1, y: 0 }) : (reduce ? { opacity: 0 } : { opacity: 0, y })}
      transition={{ duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function Stagger({ as = 'div', children, className, delay = 0, gap = 0.08, threshold = 0.9, ...rest }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const active = useInViewCheck(ref, threshold)
  const Tag = motion[as]
  return (
    <Tag
      ref={ref}
      className={className}
      variants={{ hidden: {}, show: { transition: reduce ? {} : { staggerChildren: gap, delayChildren: delay } } }}
      initial={active ? 'show' : 'hidden'}
      animate={active ? 'show' : 'hidden'}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function StaggerItem({ as = 'div', children, className, ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      variants={reduce
        ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
        : { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function Float({ children, className, duration = 6, distance = 14, rotate = 0, delay = 0, ...rest }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={false}
      animate={reduce ? {} : { y: [0, -distance, 0], rotate: [rotate, rotate + 4, rotate] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export const MotionDiv = motion.div
export default Reveal