'use client'
import { Skeleton } from '@nextui-org/react'

export default function OrderDetailSkeleton() {
  return (
    <div className="mb-10">
      <div className="w-full h-[152px]">
        <Skeleton className="w-full h-full rounded-2xl" />
      </div>
      <div className="mt-5 grid grid-cols-12 gap-5">
        <div className=" col-span-8">
          <div className="h-[300px]">
            <Skeleton className="w-full h-full rounded-2xl" />
          </div>
          <div className="h-[150px] mt-10">
            <Skeleton className="w-full h-full rounded-2xl" />
          </div>
        </div>
        <div className=" col-span-4  h-[600px]">
          <Skeleton className="w-full h-full rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
