import React from 'react'

// Base skeleton block
export function Skeleton({ className = '', style }) {
  return <div className={`animate-pulse rounded-lg bg-elev-2 ${className}`} style={style} aria-hidden="true" />
}

// Project card skeleton — mirrors the new two-column card grid
export function ProjectCardSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2" aria-hidden="true">
      {[0, 1].map((k) => (
        <div key={k} className="card overflow-hidden">
          <Skeleton className="h-44 w-full rounded-none md:h-52" />
          <div className="space-y-3 p-6 md:p-7">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-5 w-14" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Skill category skeleton
export function SkillCardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2" aria-hidden="true">
      {[0, 1, 2, 3].map((k) => (
        <div key={k} className="card p-6 md:p-7">
          <Skeleton className="h-5 w-32" />
          <div className="mt-5 flex flex-wrap gap-2">
            {['w-16', 'w-24', 'w-20', 'w-28', 'w-16'].map((w, i) => (
              <Skeleton key={i} className={`h-6 rounded-full ${w}`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Service card skeleton
export function ServiceCardSkeleton() {
  return (
    <div className="card p-6 md:p-9" aria-hidden="true">
      <Skeleton className="h-4 w-12" />
      <Skeleton className="mt-4 h-7 w-56" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full max-w-sm" />
        <Skeleton className="h-4 w-4/5 max-w-sm" />
      </div>
    </div>
  )
}

// Contact row skeleton
export function StatCardSkeleton() {
  return (
    <div className="flex items-center justify-between border-b border-line py-5" aria-hidden="true">
      <div className="space-y-2">
        <Skeleton className="h-2.5 w-16" />
        <Skeleton className="h-4 w-44" />
      </div>
      <Skeleton className="h-9 w-9 rounded-full" />
    </div>
  )
}
