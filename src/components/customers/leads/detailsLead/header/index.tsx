'use client'

import { assignedToNewUser } from '@/api/crm'
import { getAllUsers } from '@/api/users'
import { leadSchema } from '@/types/crm/leads'
import { addToast, Button } from '@heroui/react'
import { Select, SelectItem, Avatar } from '@heroui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Ellipsis } from 'lucide-react'
import { useState } from 'react'

type TProps = {
  lead: leadSchema
}
export default function LeadDetailsHeader({ lead }: TProps) {
  const [prevValue, setPrevValue] = useState<string | undefined>(
    lead.assignedTo?.id
  )
  const [value, setValue] = useState<string | undefined>(lead.assignedTo?.id)
  const queryClient = useQueryClient()
  const { mutate, isPending: isPendingSave } = useMutation({
    mutationFn: assignedToNewUser,
    onSuccess: (succ) => {
      if (prevValue !== value) {
        setPrevValue(value)
      }
    },
    onError: (error) => {
      setValue(prevValue)
      addToast({
        title: 'Ocurrio un error',
        variant: 'bordered',
        description: error.message,
        color: 'danger',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [lead.id, 'history'] })
    },
  })

  const { data, isPending, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers('1', '200'),
    refetchOnWindowFocus: false,
    retry: false,
  })
  const userData = data?.data ?? []

  const handleUserChange = (userId: string | undefined) => {
    mutate({
      leadId: lead.id,
      userId: userId ?? null,
    })
    setValue(userId)
  }
  return (
    <>
      <div className=" flex justify-between items-center px-5 border-2 border-zinc-200 dark:border-zinc-900 rounded-lg py-2">
        <h2 className="text-lg font-medium line-clamp-2">{lead.title}</h2>
        <div className=" flex gap-4 items-center">
          <Select
            isDisabled={isPendingSave}
            className="max-w-xs min-w-52 bg-transparent"
            classNames={{
              base: 'bg-transparent data-[hover=true]:bg-transparent',
              label: 'group-data-[filled=true]:-translate-y-5',
              trigger:
                'min-h-16 bg-transparent data-[hover=true]:bg-transparent',
              listboxWrapper: 'max-h-[400px]',
              innerWrapper: 'min-h-8',
            }}
            items={userData}
            selectedKeys={value ? [value] : []}
            isLoading={isPending || isPendingSave}
            onSelectionChange={(key) => {
              handleUserChange(key.currentKey)
            }}
            label="Propietario asignado"
            placeholder="Asignar propietario"
            listboxProps={{
              itemClasses: {
                base: [
                  'rounded-md',
                  'text-default-500',
                  'transition-opacity',
                  'data-[hover=true]:text-foreground',
                  'data-[hover=true]:bg-default-100',
                  'dark:data-[hover=true]:bg-default-50',
                  'data-[selectable=true]:focus:bg-default-50',
                  'data-[pressed=true]:opacity-70',
                  'data-[focus-visible=true]:ring-default-500',
                ],
              },
            }}
            popoverProps={{
              shouldBlockScroll: false,
              classNames: {
                base: 'before:bg-default-200',
                content: 'p-0 border-small border-divider bg-background',
              },
            }}
            size="sm"
            renderValue={(items) => {
              return items.map((item) => {
                const shortName = `${item?.data?.firstName.split(' ')[0]} ${item?.data?.lastName.split(' ')[0]}`
                return (
                  <div key={item.key} className="flex items-center gap-2">
                    <Avatar
                      alt={shortName}
                      size="sm"
                      className=" border border-zinc-300 dark:border-zinc-700"
                      src={
                        item?.data?.avatar
                          ? `${item?.data?.avatar}-thumb.webp`
                          : undefined
                      }
                    />
                    <div className="flex flex-col">
                      <span>{shortName}</span>
                    </div>
                  </div>
                )
              })
            }}
            variant="bordered"
          >
            {(user) => {
              const shortName = `${user.firstName.split(' ')[0]} ${user.lastName.split(' ')[0]}`
              return (
                <SelectItem key={user.id} textValue={user.firstName}>
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={shortName}
                      className="flex-shrink-0"
                      size="sm"
                      src={
                        user.avatar ? `${user.avatar}-thumb.webp` : undefined
                      }
                    />
                    <div className="flex flex-col">
                      <span className="text-small">{shortName}</span>
                      <span className="text-tiny text-default-400">
                        {user.job}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              )
            }}
          </Select>
          <div className=" flex gap-2">
            <Button className="bg-primary text-white rounded-md">Ganado</Button>
            <Button className="rounded-md" color="danger" variant="bordered">
              Perdido
            </Button>
          </div>
          <Button isIconOnly variant="bordered">
            <Ellipsis />
          </Button>
        </div>
      </div>
    </>
  )
}
