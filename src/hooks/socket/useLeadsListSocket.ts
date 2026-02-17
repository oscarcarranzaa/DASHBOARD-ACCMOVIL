// hooks/useLeadSocket.ts
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { socket } from '@/lib/socket'
import { allLeadShema, leadSchema } from '@/types/crm/leads'

export function useLeadListSocket(queryKey: (string | undefined)[]) {
  const queryClient = useQueryClient()

  useEffect(() => {
    const handleStageChanged = (data: { lead: leadSchema }) => {
      queryClient.setQueryData(queryKey, (oldData: allLeadShema) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          data: oldData.data.map((lead) =>
            lead.id === data.lead.id ? data.lead : lead
          ),
        }
      })
    }

    // Suscribirse a todos los eventos relevantes
    socket.on('lead:stageChanged', handleStageChanged)
    socket.on('lead:assingTo', handleStageChanged)
    socket.on('lead:statusChanged', handleStageChanged)
    socket.on('lead:edited', handleStageChanged)

    return () => {
      socket.off('lead:stageChanged', handleStageChanged)
      socket.off('lead:assingTo', handleStageChanged)
      socket.off('lead:statusChanged', handleStageChanged)
      socket.off('lead:edited', handleStageChanged)
    }
  }, [queryClient, queryKey])
  return null
}
