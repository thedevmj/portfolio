import React, { useRef } from 'react'

export default function SpotlightCard({ as: Tag = 'div', children, className = '', ...rest }) {
  const cardRef = useRef(null)

  const onMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--sx', `${((e.clientX - r.left) / r.width) * 100}%`)
    el.style.setProperty('--sy', `${((e.clientY - r.top) / r.height) * 100}%`)
  }

  return (
    <Tag
      ref={cardRef}
      className={`spotlight-card ${className}`}
      onMouseMove={onMove}
      {...rest}
    >
      {children}
    </Tag>
  )
}
