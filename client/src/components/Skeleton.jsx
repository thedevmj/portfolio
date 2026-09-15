import React from 'react'

// Base skeleton block
export function Skeleton({ className = '', style }) {
  return (
    <div
      className={`animate-pulse bg-neo-panel ${className}`}
      style={style}
      aria-hidden="true"
    />
  )
}

// Reusable project card skeleton (neo-brutalist card style)
export function ProjectCardSkeleton() {
  return (
    <div className="border-4 border-neo-ink shadow-neo-md bg-neo-panel p-6 md:p-9" aria-hidden="true">
      <div className="grid md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-1">
          <Skeleton className="h-16 w-16 border-4 border-neo-ink shadow-neo-sm" />
        </div>
        <div className="md:col-span-9 space-y-3">
          <Skeleton className="h-10 w-2/3 border-2 border-neo-ink" />
          <Skeleton className="h-4 w-full max-w-md border-2 border-neo-ink" />
          <Skeleton className="h-4 w-3/4 max-w-md border-2 border-neo-ink" />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <Skeleton className="h-10 w-24 border-2 border-neo-ink" />
        </div>
      </div>
    </div>
  )
}

// Reusable skill category skeleton
export function SkillCardSkeleton() {
  return (
    <div className="border-4 border-neo-ink shadow-neo-sm bg-neo-panel p-5 md:p-6" aria-hidden="true">
      <div className="grid md:grid-cols-12 gap-4">
        <Skeleton className="h-8 w-32 md:col-span-3 border-2 border-neo-ink" />
        <div className="md:col-span-9 flex flex-wrap gap-x-6 gap-y-2">
          {['w-20', 'w-28', 'w-24', 'w-32', 'w-20'].map((w, i) => (
            <Skeleton key={i} className={`h-6 ${w} border-2 border-neo-ink`} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Reusable service card skeleton
export function ServiceCardSkeleton() {
  return (
    <div className="border-4 border-neo-ink shadow-neo-md bg-neo-panel p-6 md:p-9" aria-hidden="true">
      <Skeleton className="h-12 w-12 border-2 border-neo-ink" />
      <Skeleton className="h-8 w-56 mt-4 border-2 border-neo-ink" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full max-w-sm border-2 border-neo-ink" />
        <Skeleton className="h-4 w-4/5 max-w-sm border-2 border-neo-ink" />
      </div>
    </div>
  )
}

// Reusable contact info skeleton
export function StatCardSkeleton() {
  return (
    <div className="border-4 border-neo-ink shadow-neo-sm bg-neo-panel p-4 flex items-center justify-between mb-4" aria-hidden="true">
      <div className="space-y-2">
        <Skeleton className="h-3 w-16 border-2 border-neo-ink" />
        <Skeleton className="h-4 w-40 border-2 border-neo-ink" />
      </div>
      <Skeleton className="h-10 w-10 border-2 border-neo-ink" />
    </div>
  )
}