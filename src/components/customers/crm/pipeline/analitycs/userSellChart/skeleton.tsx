import { Skeleton } from '@heroui/react'

export default function UserSellChartSkeleton() {
  return (
    <div className=" h-[300px] w-full grid gap-2">
      <Skeleton className=" h-10 w-full rounded-lg" />
      <Skeleton className=" h-10 w-11/12 rounded-lg" />
      <Skeleton className=" h-10 w-10/12 rounded-lg" />
      <Skeleton className=" h-10 w-8/12 rounded-lg" />
      <Skeleton className=" h-10 w-6/12 rounded-lg" />
      <Skeleton className=" h-10 w-3/12 rounded-lg" />
    </div>
  )
}
