// hooks/useLeadSocket.ts
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { socket } from '@/lib/socket'
import { getOneLeadShema } from '@/types/crm/leads'

export function useLeadSocket(leadId: string) {
  const queryClient = useQueryClient()

  useEffect(() => {
    const handleStageChange = (data: { lead: getOneLeadShema }) => {
      if (data.lead.id !== leadId) return

      // Actualiza queries relacionadas
      queryClient.setQueryData(['oneLead', leadId], data.lead)

      // Invalida queries derivadas
      queryClient.invalidateQueries({
        queryKey: [leadId, 'history'],
        exact: false,
      })
    }

    // Suscribirse a todos los eventos relevantes
    socket.on('lead:stageChanged', handleStageChange)
    socket.on('lead:assingTo', handleStageChange)
    socket.on('lead:statusChanged', handleStageChange)
    socket.on('lead:edited', handleStageChange)

    return () => {
      socket.off('lead:stageChanged', handleStageChange)
      socket.off('lead:assingTo', handleStageChange)
      socket.off('lead:statusChanged', handleStageChange)
      socket.off('lead:edited', handleStageChange)
    }
  }, [leadId, queryClient])
  return null
}
