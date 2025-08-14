'use client'

import { assignedToNewUser } from '@/api/crm'

import useGetUsers from '@/hooks/getData/useUsers'
import { getOneLeadShema } from '@/types/crm/leads'
import { addToast } from '@heroui/react'
import { Select, SelectItem, Avatar } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

type TProps = {
  leadId: string
  assinedToId?: string | null
}
export default function AssingUserLead({ leadId, assinedToId }: TProps) {
  const [value, setValue] = useState<string | undefined | null>(assinedToId)

  const queryClient = useQueryClient()
  const leadQueryKey = ['oneLead', leadId]

  const { mutate, isPending: isPendingSave } = useMutation({
    mutationFn: assignedToNewUser,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['oneLead'] })
      const previousLeads = queryClient.getQueryData(leadQueryKey)
      queryClient.setQueryData(leadQueryKey, (oldLead: getOneLeadShema) => {
        if (!oldLead) return oldLead
        return {
          ...oldLead,
          assignedToId: newData.userId,
        }
      })
      return { previousLeads }
    },
    onError: (_err, _newData, context) => {
      if (context?.previousLeads) {
        queryClient.setQueryData(leadQueryKey, context.previousLeads)
      }
      addToast({
        color: 'danger',
        variant: 'bordered',
        timeout: 5000,
        title: 'Ocurrio un error',
        description: _err.message,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: leadQueryKey,
      })
      queryClient.invalidateQueries({ queryKey: [leadId, 'history'] })
    },
  })
  const handleUserChange = (userId: string | undefined) => {
    mutate({
      leadId: leadId,
      userId: userId ?? null,
    })
    setValue(userId)
  }

  useEffect(() => {
    if (assinedToId !== value) {
      setValue(assinedToId)
    }
  }, [assinedToId, value])

  const { users, isPending } = useGetUsers()
  return (
    <Select
      isDisabled={isPendingSave}
      className="max-w-xs min-w-52 bg-transparent"
      classNames={{
        base: 'bg-transparent data-[hover=true]:bg-transparent',
        label: 'group-data-[filled=true]:-translate-y-5',
        trigger: 'min-h-16 bg-transparent data-[hover=true]:bg-transparent',
        listboxWrapper: 'max-h-[400px]',
        innerWrapper: 'min-h-8',
      }}
      items={users}
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
                className="shrink-0"
                size="sm"
                src={user.avatar ? `${user.avatar}-thumb.webp` : undefined}
              />
              <div className="flex flex-col">
                <span className="text-small">{shortName}</span>
                <span className="text-tiny text-default-400">{user.job}</span>
              </div>
            </div>
          </SelectItem>
        )
      }}
    </Select>
  )
}
