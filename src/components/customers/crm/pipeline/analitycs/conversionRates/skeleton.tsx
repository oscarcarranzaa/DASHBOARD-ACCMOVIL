'use client'

import { Skeleton } from '@heroui/react'

export default function ConversionRatesSkeleton() {
  return (
    <>
      <div className="flex flex-col items-start justify-start p-3">
        <Skeleton className="aspect-auto h-[40px] w-10/12 rounded-lg" />
        <Skeleton className="aspect-auto h-[28px] mt-2 w-5/12 rounded-lg" />
      </div>
      <div className="flex flex-col items-start justify-start p-3">
        <Skeleton className="aspect-auto h-[40px] w-10/12 rounded-lg" />
        <Skeleton className="aspect-auto h-[28px] mt-2 w-5/12 rounded-lg" />
      </div>
      <div className="flex flex-col items-start justify-start p-3">
        <Skeleton className="aspect-auto h-[40px] w-10/12 rounded-lg" />
        <Skeleton className="aspect-auto h-[28px] mt-2 w-5/12 rounded-lg" />
      </div>
      <div className="flex flex-col items-start justify-start p-3">
        <Skeleton className="aspect-auto h-[40px] w-10/12 rounded-lg" />
        <Skeleton className="aspect-auto h-[28px] mt-2 w-5/12 rounded-lg" />
      </div>
    </>
  )
}
