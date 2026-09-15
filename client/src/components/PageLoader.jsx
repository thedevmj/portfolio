import React from 'react'
import { Skeleton } from './Skeleton'

// Neo-brutalist skeleton screen shown briefly as the preloader hands off to content
export default function PageLoader() {
  return (
    <div className="min-h-screen section-pad container-neo flex flex-col justify-center" aria-hidden="true">
      <Skeleton className="h-4 w-40 border-2 border-neo-ink" />
      <div className="mt-8 space-y-4">
        <Skeleton className="h-16 w-3/4 border-4 border-neo-ink shadow-neo-sm" />
        <Skeleton className="h-16 w-1/2 border-4 border-neo-ink shadow-neo-sm" />
      </div>
      <div className="mt-10 space-y-3">
        <Skeleton className="h-4 w-full max-w-md border-2 border-neo-ink" />
        <Skeleton className="h-4 w-5/6 max-w-md border-2 border-neo-ink" />
      </div>
      <div className="mt-10 flex gap-4">
        <Skeleton className="h-14 w-40 border-4 border-neo-ink shadow-neo-sm" />
        <Skeleton className="h-14 w-36 border-4 border-neo-ink shadow-neo-sm" />
      </div>
    </div>
  )
}