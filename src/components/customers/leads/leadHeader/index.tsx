'use client'

import { Button, Select, SelectItem, Tooltip } from '@heroui/react'
import NewLead from '../newLead'
import Link from 'next/link'
import { Bolt, ChartLine, List, Plus, Settings } from 'lucide-react'
import PipelineSVG from '@/components/icons/pipeline'
import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getPipelines } from '@/api/crm'
import { use, useEffect, useState } from 'react'
import { on } from 'events'

type TProps = {
  isRequired?: boolean
  onChange?: (url: string | undefined) => void
  onEmpty?: (isEmpty: boolean) => void
  valueKey?: string
}
export default function LeadHeader({
  isRequired,
  valueKey,
  onChange,
  onEmpty,
}: TProps) {
  const [value, setValue] = useState<string>('')
  const [funnelUrl, setFunnelUrl] = useState<string | undefined>()

  const { data, isPending } = useQuery({
    queryKey: ['pipelines'],
    queryFn: () => getPipelines(),
    refetchOnWindowFocus: false,
    retry: false,
  })
  const pipelines = data ?? []
  const params = useParams<{ funnel: string; type_funnel: string }>()
  const getFunnel = params.funnel

  const handleFunnelUrl = (url?: string) => {
    setFunnelUrl(url)
    if (onChange) {
      onChange(url)
    }
  }
  useEffect(() => {
    if (data && data.length > 0 && !funnelUrl) {
      setFunnelUrl(data[0].id)
    }
  }, [data, funnelUrl])

  useEffect(() => {
    setValue(valueKey ?? '')
  }, [valueKey])

  useEffect(() => {
    if (data && data.length === 0) {
      onEmpty?.(true)
      return
    }
    onEmpty?.(false)
    if (data && data.length > 0 && !funnelUrl) {
      setFunnelUrl(data[0].id)
    }
  }, [data, onEmpty, setFunnelUrl, funnelUrl])
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="flex">
          <Tooltip content="Lista" placement="bottom">
            <Button
              variant="bordered"
              as={Link}
              color={!getFunnel ? 'primary' : 'default'}
              href="/dash/embudo/"
              isIconOnly
              className="rounded-e-none"
            >
              <List size={18} />
            </Button>
          </Tooltip>
          <Tooltip content="Embudo" placement="bottom">
            <Button
              isDisabled={!funnelUrl}
              isIconOnly
              variant="bordered"
              href={`/dash/embudo/${funnelUrl ?? ''}`}
              as={Link}
              color={getFunnel ? 'primary' : 'default'}
              className=" rounded-s-none "
            >
              <PipelineSVG size={18} />
            </Button>
          </Tooltip>
        </div>
        <Tooltip content="Analisis">
          <Button
            as={Link}
            href="/dash/embudo/analisis"
            isIconOnly
            variant="bordered"
          >
            <ChartLine />
          </Button>
        </Tooltip>
        <NewLead isDisabled={data && data.length === 0} />
      </div>
      <div>
        <Select
          label="Embudo"
          selectedKeys={[value]}
          onChange={(e) => {
            const valueKeyFunnel = e.target.value
            if (!isRequired) {
              setValue(e.target.value)
            }
            if (valueKeyFunnel.length > 0) {
              if (isRequired) {
                setValue(e.target.value)
              }
              handleFunnelUrl(valueKeyFunnel)
              return
            }

            handleFunnelUrl(undefined)
          }}
          isRequired={isRequired}
          labelPlacement="outside"
          isLoading={isPending}
          className="min-w-60"
          aria-label={'Embudo'}
          items={pipelines}
          listboxProps={{
            hideSelectedIcon: true,
            itemClasses: {
              base: [
                'rounded-medium',
                'text-default-500',
                'transition-opacity',
                'data-[hover=true]:text-foreground',
                'dark:data-[hover=true]:bg-default-50',
                'data-[pressed=true]:opacity-70',
                'data-[hover=true]:bg-default-200',
                'data-[selectable=true]:focus:bg-default-100',
                'data-[focus-visible=true]:ring-default-500',
              ],
            },
          }}
          placeholder={'Todos'}
          popoverProps={{
            offset: 10,
            classNames: {
              base: 'rounded-large',
              content: 'p-1 border-small border-default-100 bg-background',
            },
          }}
          radius="full"
          variant="bordered"
        >
          {pipelines?.map((item) => (
            <SelectItem key={item.id} textValue={item.name}>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">{item.name}</div>
              </div>
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  )
}
