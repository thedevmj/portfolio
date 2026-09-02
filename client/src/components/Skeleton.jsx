import React from 'react'

// Base skeleton block
export function Skeleton({ className = '', style }) {
  return (
    <div
      className={`animate-pulse rounded-sm bg-line-light dark:bg-white/10 ${className}`}
      style={style}
      aria-hidden="true"
    />
  )
}

// Reusable project card skeleton (noth.in list style)
export function ProjectCardSkeleton() {
  return (
    <div className="py-10 border-t border-line-light dark:border-white/10" aria-hidden="true">
      <div className="grid md:grid-cols-12 gap-6 items-start">
        <Skeleton className="h-3 w-12 md:col-span-2" />
        <div className="md:col-span-7 space-y-3">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-3 w-full max-w-md" />
          <Skeleton className="h-3 w-3/4 max-w-md" />
        </div>
      </div>
    </div>
  )
}

// Reusable skill category skeleton
export function SkillCardSkeleton() {
  return (
    <div className="py-7 border-t border-line-light dark:border-white/10" aria-hidden="true">
      <div className="grid md:grid-cols-12 gap-4">
        <Skeleton className="h-3 w-32 md:col-span-3" />
        <div className="md:col-span-9 flex flex-wrap gap-x-6 gap-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  )
}

// Reusable service card skeleton
export function ServiceCardSkeleton() {
  return (
    <div className="py-8 border-t border-line-light dark:border-white/10" aria-hidden="true">
      <div className="grid md:grid-cols-12 gap-4">
        <Skeleton className="h-3 w-12 md:col-span-2" />
        <Skeleton className="h-8 w-56 md:col-span-4" />
        <div className="md:col-span-6 space-y-2">
          <Skeleton className="h-3 w-full max-w-sm" />
          <Skeleton className="h-3 w-4/5 max-w-sm" />
        </div>
      </div>
    </div>
  )
}

// Reusable contact info skeleton
export function StatCardSkeleton() {
  return (
    <div className="py-5 border-t border-line-light dark:border-white/10 flex items-center justify-between" aria-hidden="true">
      <div className="space-y-2">
        <Skeleton className="h-2 w-16" />
        <Skeleton className="h-4 w-40" />
      </div>
      <Skeleton className="h-4 w-4" />
    </div>
  )
}
