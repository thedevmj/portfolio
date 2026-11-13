import React from 'react'
import { Skeleton } from './Skeleton'

// Minimal skeleton screen shown briefly as the preloader hands off to content.
export default function PageLoader() {
  return (
    <div className="container-wide flex min-h-screen flex-col justify-center pt-28" aria-hidden="true">
      <Skeleton className="h-4 w-32" />
      <div className="mt-7 space-y-4">
        <Skeleton className="h-20 w-3/4 max-w-2xl" />
        <Skeleton className="h-20 w-1/2 max-w-md" />
      </div>
      <div className="mt-9 space-y-3">
        <Skeleton className="h-4 w-full max-w-md" />
        <Skeleton className="h-4 w-5/6 max-w-md" />
      </div>
      <div className="mt-9 flex gap-3">
        <Skeleton className="h-12 w-36 rounded-full" />
        <Skeleton className="h-12 w-32 rounded-full" />
      </div>
    </div>
  )
}
