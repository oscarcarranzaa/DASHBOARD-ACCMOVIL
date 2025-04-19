import { Skeleton } from '@heroui/react'

export default function SkeletonHistory() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-3 pb-6">
          <div>
            <Skeleton className="flex rounded-full w-8 h-8" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-4 w-4/5 rounded-lg" />
            <Skeleton className="h-3 w-3/5 rounded-lg" />
          </div>
        </div>
        <div className="flex gap-3 pb-6   ">
          <div>
            <Skeleton className="flex rounded-full w-8 h-8" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-20 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-2/5 rounded-lg" />
          </div>
        </div>
        <div className="flex gap-3 pb-6">
          <div>
            <Skeleton className="flex rounded-full w-8 h-8" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-4 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-1/5 rounded-lg" />
          </div>
        </div>
        <div className="flex gap-3 pb-6">
          <div>
            <Skeleton className="flex rounded-full w-8 h-8" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-4 w-4/5 rounded-lg" />
            <Skeleton className="h-3 w-2/5 rounded-lg" />
          </div>
        </div>
        <div className="flex gap-3 pb-6   ">
          <div>
            <Skeleton className="flex rounded-full w-8 h-8" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-40 w-4/5 rounded-lg" />
            <Skeleton className="h-3 w-2/5 rounded-lg" />
          </div>
        </div>
        <div className="flex gap-3 pb-6">
          <div>
            <Skeleton className="flex rounded-full w-8 h-8" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-4 w-5/5 rounded-lg" />
            <Skeleton className="h-3 w-3/5 rounded-lg" />
          </div>
        </div>
      </div>
    </>
  )
}
