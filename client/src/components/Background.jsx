import React from 'react'

// Ambient fixed backdrop: two soft accent glows, a masked blueprint grid and
// a faint film grain. Everything is pointer-events-none and sits behind content.
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-accent opacity-[0.03] blur-[130px]" />
      <div className="absolute -bottom-56 -right-40 h-[40rem] w-[40rem] rounded-full bg-accent-2 opacity-[0.03] blur-[130px]" />
      <div className="absolute inset-0 grid-lines opacity-60" />
      <div className="absolute inset-0 grain" />
    </div>
  )
}
