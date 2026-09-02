import React from 'react'

// Ambient animated aurora + subtle grain. Deepens the page without distracting.
// Blobs tint toward the accent in dark mode and stay soft in light mode.
export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Aurora blobs */}
      <div className="aurora w-[46vw] h-[46vw] -top-[15vw] -left-[10vw] bg-accent/25 dark:bg-accent/40" />
      <div className="aurora w-[38vw] h-[38vw] top-[30%] -right-[12vw] bg-fuchsia-500/15 dark:bg-fuchsia-500/25" style={{ animationDelay: '-6s' }} />
      <div className="aurora w-[40vw] h-[40vw] bottom-[-12vw] left-[20%] bg-cyan-500/15 dark:bg-cyan-500/25" style={{ animationDelay: '-12s' }} />
      {/* Grain */}
      <div className="absolute inset-0 noise opacity-60" />
    </div>
  )
}
