import React from 'react'
import { Skeleton } from './Skeleton'

// Minimal monochrome skeleton shown briefly as the preloader hands off to content
export default function PageLoader() {
  return (
    <div className="min-h-screen section-pad flex flex-col justify-center max-w-5xl mx-auto" aria-hidden="true">
      <Skeleton className="h-3 w-40" />
      <div className="mt-8 space-y-3">
        <Skeleton className="h-16 w-3/4" />
        <Skeleton className="h-16 w-1/2" />
      </div>
      <div className="mt-10 space-y-2">
        <Skeleton className="h-3 w-full max-w-md" />
        <Skeleton className="h-3 w-5/6 max-w-md" />
      </div>
      <div className="mt-10 flex gap-3">
        <Skeleton className="h-11 w-40 rounded-full" />
        <Skeleton className="h-11 w-32 rounded-full" />
      </div>
    </div>
  )
}
