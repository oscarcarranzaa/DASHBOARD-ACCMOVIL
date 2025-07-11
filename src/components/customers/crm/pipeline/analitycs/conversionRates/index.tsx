'use client'
import { TParamsMetrics, getResumeLeadsMetrics } from '@/api/CRM/analitycs'
import { Chip } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { ArrowDown, ArrowUp, Equal } from 'lucide-react'
import ConversionRatesSkeleton from './skeleton'
import ConversionRatesError from './error'

type TProps = {
  filters?: TParamsMetrics | null
}
export default function FunnelConversionRates({ filters }: TProps) {
  const { data, isPending, error, isError } = useQuery({
    queryKey: ['resumeLeadsMetrics', filters],
    queryFn: () => getResumeLeadsMetrics(filters || {}),
    refetchOnWindowFocus: false,
    retry: 1,
  })

  return (
    <>
      {isError && !data ? (
        <ConversionRatesError message={error.message} />
      ) : (
        <div className="flex flex-col mt-5">
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns:
                'repeat(auto-fit, minmax(200px,  max-content))',
            }}
          >
            {isPending ? (
              <ConversionRatesSkeleton />
            ) : (
              data?.map((item) => (
                <div className="flex flex-col" key={item.title}>
                  <div className=" flex flex-col gap-2 max-w-52">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className=" text-3xl font-semibold">
                      {item.isCurrency
                        ? item.current.toLocaleString('es-HN', {
                            style: 'currency',
                            currency: 'HNL',
                          })
                        : item.current}
                    </p>
                    <Chip
                      color={
                        item.trend === 'up'
                          ? 'success'
                          : item.trend === 'down'
                            ? 'danger'
                            : 'warning'
                      }
                      variant="flat"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span>
                          {item.trend === 'up' ? (
                            <ArrowUp size={15} />
                          ) : item.trend === 'down' ? (
                            <ArrowDown size={15} />
                          ) : (
                            <Equal size={15} />
                          )}
                        </span>
                        <p className="text-xs font-semibold">
                          {item.percent} ({' '}
                          {item.isCurrency
                            ? item.difference.toLocaleString('es-HN', {
                                style: 'currency',
                                currency: 'HNL',
                              })
                            : item.difference}
                          )
                        </p>
                      </div>
                    </Chip>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  )
}
