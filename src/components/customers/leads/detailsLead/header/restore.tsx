'use client'

import { addToast, Button, Chip, useDisclosure } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { changeLeadStatus } from '@/api/crm'
import Spinner from '@/components/icons/spinner'
import { getOneLeadShema } from '@/types/crm/leads'
import AlertRestoreLead from './alertRestoreLead'

type TProps = {
  leadId: string
  title: string
  deletedAt?: string | null
}

export default function RestoreLeadAction({
  leadId,
  title,
  deletedAt,
}: TProps) {
  const disclosure = useDisclosure()
  return (
    <>
      <AlertRestoreLead
        leadId={leadId}
        {...disclosure}
        title={title}
        deletedAt={deletedAt}
      />
      <div className="flex gap-2 items-center">
        <Chip color="danger" variant="flat">
          Eliminado
        </Chip>
        <Button className=" rounded-md w-20" onPress={disclosure.onOpen}>
          Restaurar
        </Button>
      </div>
    </>
  )
}
