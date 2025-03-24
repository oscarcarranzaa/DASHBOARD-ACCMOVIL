'use client'

import { Button, Autocomplete, Tooltip, AutocompleteItem } from '@heroui/react'
import NewLead from '../newLead'
import Link from 'next/link'
import { List, Plus } from 'lucide-react'
import PipelineSVG from '@/components/icons/pipeline'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getPipelines } from '@/api/crm'
import { useState } from 'react'

type TProps = {
  isRequired?: boolean
  onChange?: (url: string | undefined) => void
}
export default function LeadHeader({ isRequired, onChange }: TProps) {
  const [funnelUrl, setFunnelUrl] = useState('all')
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
    setFunnelUrl(url || 'all')
    if (onChange) {
      onChange(url)
    }
  }
  return (
    <div className="flex justify-between">
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
              isIconOnly
              variant="bordered"
              href={`/dash/embudo/${funnelUrl}`}
              as={Link}
              color={getFunnel ? 'primary' : 'default'}
              className=" rounded-s-none "
            >
              <PipelineSVG size={18} />
            </Button>
          </Tooltip>
        </div>
        <NewLead />
      </div>
      <div>
        <Autocomplete
          label="Embudo"
          onSelectionChange={(e) => {
            if (e) {
              handleFunnelUrl(e.toString())
              return
            }
            handleFunnelUrl(undefined)
          }}
          isRequired={isRequired}
          labelPlacement="outside-left"
          isLoading={isPending}
          aria-label={'Embudo'}
          classNames={{
            selectorButton: 'text-default-500',
          }}
          defaultItems={pipelines}
          inputProps={{
            classNames: {
              input: 'ml-1',
            },
          }}
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
            <AutocompleteItem key={item.id} textValue={item.name}>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">{item.name}</div>
              </div>
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
    </div>
  )
}
