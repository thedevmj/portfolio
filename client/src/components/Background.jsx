import React from 'react'

// Flat neo-brutalist page texture: halftone dots + faint blueprint grid.
// No blur, no gradients — consistent with the design system.
export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 halftone" />
      <div className="absolute inset-0 grid-paper" />
    </div>
  )
}