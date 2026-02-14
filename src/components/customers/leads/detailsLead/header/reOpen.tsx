'use client'

import { addToast, Button, Chip } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { changeLeadStatus } from '@/api/crm'
import Spinner from '@/components/icons/spinner'
import { getOneLeadShema } from '@/types/crm/leads'
import { launchConfetti } from '@/utils/fireConfetti'
import { useEffect } from 'react'

type TProps = {
  leadId: string
  status: getOneLeadShema['status']
}

const statusLead: Record<getOneLeadShema['status'], string> = {
  WON: 'Ganado',
  LOST: 'Perdido',
  ACTIVE: 'Activo',
}

export default function ReOpenLeadAction({ leadId, status }: TProps) {
  const queryClient = useQueryClient()
  const leadQueryKey = ['oneLead', leadId]

  const { mutate, isPending } = useMutation({
    mutationFn: changeLeadStatus,
    onSuccess: async (dat) => {
      await queryClient.cancelQueries({ queryKey: ['oneLead'] })
      queryClient.setQueryData(leadQueryKey, (oldLead: getOneLeadShema) => {
        if (!oldLead) return oldLead
        return dat
      })
    },
    onError: (_err) => {
      addToast({
        title: 'Ocurrió un error',
        variant: 'bordered',
        timeout: 5000,
        color: 'danger',
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

  const handleReOpen = () => {
    mutate({ leadId, status: 'ACTIVE' })
  }

  return (
    <div className="flex gap-2 items-center">
      <Chip color={status === 'LOST' ? 'danger' : 'success'}>
        {statusLead[status]}
      </Chip>
      <Button
        className=" rounded-md w-20"
        onPress={handleReOpen}
        isDisabled={isPending}
      >
        {isPending ? <Spinner fill="#fff" size={18} /> : 'Reabrir '}
      </Button>
    </div>
  )
}
