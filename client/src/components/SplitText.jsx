import React from 'react'
import { motion, useReducedMotion } from 'motion/react'

export default function SplitText({ text, className = '', itemClassName = '', delay = 0, stagger = 0.08 }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className={`inline-block align-baseline leading-[inherit] ${itemClassName}`}>
          <motion.span
            className="inline-block"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{
              duration: reduce ? 0 : 0.9,
              delay: reduce ? 0 : delay + i * stagger,
              ease: [0.22, 1, 0.36, 1]
            }}
            aria-hidden="true"
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
