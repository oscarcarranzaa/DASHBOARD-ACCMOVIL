'use client'

import { useQuery } from '@tanstack/react-query'
import { Autocomplete, AutocompleteItem, Avatar, Button } from '@heroui/react'
import { SearchIcon } from 'lucide-react'
import { useAuthStore } from '@/store/auth'
import { getPipelines } from '@/api/crm'

type TProps = {
  placeholder?: string
  label?: string
  value?: string | null
  onChange?: (userID: string | null) => void
}
export default function SelectPipeline({
  placeholder = 'Embudo',
  label,
  onChange,
  value,
}: TProps) {
  const { data, isPending } = useQuery({
    queryKey: ['pipelines'],
    queryFn: () => getPipelines(),
    refetchOnWindowFocus: false,
    retry: false,
  })
  const users = data ?? []

  return (
    <>
      <Autocomplete
        selectedKey={value}
        label={label}
        isRequired
        onSelectionChange={(key) => {
          if (onChange) {
            onChange(key ? key.toString() : null)
          }
        }}
        labelPlacement="outside"
        isLoading={isPending}
        aria-label={placeholder}
        classNames={{
          selectorButton: 'text-default-500',
        }}
        defaultItems={users}
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
        placeholder={placeholder}
        popoverProps={{
          offset: 10,
          classNames: {
            base: 'rounded-large',
            content: 'p-1 border-small border-default-100 bg-background',
          },
        }}
        radius="full"
        startContent={
          <SearchIcon
            className="text-default-400"
            size={20}
            strokeWidth={2.5}
          />
        }
        variant="bordered"
      >
        {users?.map((item) => (
          <AutocompleteItem key={item.id} textValue={item.name}>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">{item.name}</div>
              <Button
                className="border-small mr-0.5 font-medium shadow-small"
                radius="full"
                size="sm"
                variant="bordered"
              >
                Añadir
              </Button>
            </div>
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </>
  )
}
