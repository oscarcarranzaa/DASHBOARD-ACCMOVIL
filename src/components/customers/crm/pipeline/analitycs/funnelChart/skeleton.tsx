import { Skeleton } from '@heroui/react'

export default function FunnelChartSkeleton() {
  return (
    <div className="aspect-auto h-[250px] p-4">
      <Skeleton className="aspect-square w-5/12 m-auto rounded-full" />
      <Skeleton className="h-4 m-auto w-4/12 mt-2 rounded-lg" />
    </div>
  )
}
