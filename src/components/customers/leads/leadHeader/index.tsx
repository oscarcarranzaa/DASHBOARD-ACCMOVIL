'use client'

import { Button, Select, SelectItem, Tooltip } from '@heroui/react'
import NewLead from '../newLead'
import Link from 'next/link'
import { Bolt, ChartLine, List, Pencil, Plus, Settings } from 'lucide-react'
import PipelineSVG from '@/components/icons/pipeline'
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getPipelines } from '@/api/crm'
import { use, useEffect, useMemo, useState } from 'react'

type TProps = {
  isRequired?: boolean
  type: 'pipeline' | 'list'
  value?: string | undefined
  onChange?: (value: string | undefined) => void
}

export default function LeadHeader({
  isRequired,
  type,
  value,
  onChange,
}: TProps) {
  const { data, isPending } = useQuery({
    queryKey: ['pipelines'],
    queryFn: () => getPipelines(),
    refetchOnWindowFocus: false,
    retry: false,
  })

  const pipelines = data ?? []
  const defaultValue = value ?? pipelines[0]?.id

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="flex">
          <Tooltip content="Lista" placement="bottom">
            <Button
              variant="bordered"
              as={Link}
              color={type === 'list' ? 'primary' : 'default'}
              href={`/dash/embudo`}
              isIconOnly
              className="rounded-e-none"
            >
              <List size={18} />
            </Button>
          </Tooltip>
          <Tooltip content="Embudo" placement="bottom">
            <Button
              isDisabled={!defaultValue}
              isIconOnly
              variant="bordered"
              href={`/dash/embudo/${defaultValue}`}
              as={Link}
              color={type === 'pipeline' ? 'primary' : 'default'}
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
      <div className="flex items-center gap-2">
        <Select
          label="Embudo"
          selectedKeys={value ? [value] : []}
          onChange={(e) => {
            const valueKeyFunnel = e.target.value
            if (!isRequired) {
              onChange?.(valueKeyFunnel)
            }
            if (valueKeyFunnel.length > 0) {
              if (isRequired) {
                onChange?.(valueKeyFunnel)
              }
              return
            }

            onChange?.(undefined)
          }}
          isRequired={isRequired}
          labelPlacement="inside"
          isLoading={isPending}
          className="min-w-60 "
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
                <Tooltip content="Editar embudo" placement="top">
                  <Button
                    isIconOnly
                    variant="bordered"
                    href={`/dash/embudo/${item.id}/editar`}
                    as={Link}
                    size="sm"
                    color="default"
                    className="w-8 h-8"
                  >
                    <Pencil size={12} />
                  </Button>
                </Tooltip>
              </div>
            </SelectItem>
          ))}
        </Select>
        <Tooltip content="Nuevo embudo" placement="top">
          <Button
            isDisabled={!value}
            isIconOnly
            variant="bordered"
            href="/dash/embudo/nuevo"
            as={Link}
            color="default"
          >
            <Plus size={18} />
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}
