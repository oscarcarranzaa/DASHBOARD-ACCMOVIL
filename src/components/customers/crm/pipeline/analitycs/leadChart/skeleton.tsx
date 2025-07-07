import { Skeleton, Spinner } from '@heroui/react'

export default function LeadChartSkeleton() {
  return (
    <div className="aspect-auto h-[250px] w-full">
      <div className="flex flex-col justify-center">
        <Spinner variant="wave" label="Cargando métricas..." />
        <Skeleton className="aspect-auto m-auto h-[40px] w-10/12 rounded-lg" />
      </div>
    </div>
  )
}
