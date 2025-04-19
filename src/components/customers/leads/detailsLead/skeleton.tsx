import { Skeleton } from '@heroui/react'
import SkeletonHistory from './history/skeleton'
import { ReactNode } from 'react'

type TProps = {
  children?: ReactNode
}
export default function LeadDetailsSkeleton({ children }: TProps) {
  return (
    <div className=" h-full overflow-hidden">
      <Skeleton className="w-full h-20 rounded-lg" />
      <div className="mt-3 grid gap-2 grid-cols-4">
        <Skeleton className="h-8 rounded-lg w-full" />
        <Skeleton className="h-8 rounded-lg w-full" />
        <Skeleton className="h-8 rounded-lg w-full" />
        <Skeleton className="h-8 rounded-lg w-full" />
      </div>
      <div className="grid gap-3 h-full grid-cols-6 mt-8 overflow-auto">
        <Skeleton className=" col-span-2  rounded-xl" />
        <div className="col-span-4">
          <Skeleton className="  h-48 px-2 rounded-xl" />
          <div className="mt-5 flex gap-1 mb-5">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
