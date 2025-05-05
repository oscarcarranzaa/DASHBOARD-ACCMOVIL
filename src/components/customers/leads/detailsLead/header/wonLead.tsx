'use client'

import { addToast, Button } from '@heroui/react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { changeLeadStatus } from '@/api/crm'
import Spinner from '@/components/icons/spinner'
import { launchConfetti } from '@/utils/fireConfetti'
import { getOneLeadShema } from '@/types/crm/leads'
type TProps = {
  leadId: string
}
export default function WonLeadAction({ leadId }: TProps) {
  const queryClient = useQueryClient()
  const leadQueryKey = ['oneLead', leadId]

  const { mutate, isPending } = useMutation({
    mutationFn: changeLeadStatus,
    onSuccess: async (success) => {
      await queryClient.cancelQueries({ queryKey: ['oneLead'] })
      queryClient.setQueryData(leadQueryKey, (oldLead: getOneLeadShema) => {
        if (!oldLead) return oldLead
        return success
      })
      launchConfetti()
      addToast({
        title: '¡Buen trabajo!',
        variant: 'flat',
        timeout: 4000,
        color: 'success',
      })
    },
    onError: (err) => {
      addToast({
        title: 'Ocurrió un error',
        variant: 'bordered',
        timeout: 5000,
        color: 'danger',
        description: err.message,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: leadQueryKey,
      })
      queryClient.invalidateQueries({ queryKey: [leadId, 'history'] })
    },
  })

  const handleWon = () => {
    mutate({ leadId, status: 'WON' })
  }
  return (
    <Button
      className="bg-primary text-white rounded-md w-20"
      onPress={handleWon}
      isDisabled={isPending}
    >
      {isPending ? <Spinner fill="#fff" size={18} /> : 'Ganado'}
    </Button>
  )
}
