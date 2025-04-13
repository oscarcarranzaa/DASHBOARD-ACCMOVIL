'use client'

import { leadAddNote } from '@/api/crm'
import NoteTextEditor from '@/components/UI/editorNote'
import { addToast } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

type TProps = {
  leadId: string
}
export default function LeadNotes({ leadId }: TProps) {
  const [note, setNote] = useState('')
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: leadAddNote,
    onSuccess: () => {
      setNote('')
    },
    onError: (_err) => {
      addToast({
        color: 'danger',
        variant: 'bordered',
        timeout: 5000,
        title: 'Ocurrio un error',
        description: _err.message,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [leadId, 'history'] })
    },
  })
  return (
    <>
      <NoteTextEditor
        isLoading={isPending}
        value={note}
        onChange={(html) => setNote(html)}
        placeholder="Escribe una nota"
        onSave={(html) => mutate({ leadId, note })}
      />
    </>
  )
}
