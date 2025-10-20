'use client'

import { leadSchema } from '@/types/crm/leads'
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  DropdownSection,
  useDisclosure,
  addToast,
  Spinner,
} from '@heroui/react'
import { Copy, Ellipsis, Recycle, Trash } from 'lucide-react'
import AssingUserLead from './assingUser'
import LostLeadAction from './lostLead'
import WonLeadAction from './wonLead'
import ReOpenLeadAction from './reOpen'
import { useMutation } from '@tanstack/react-query'
import { duplicateLead } from '@/api/crm'
import { useRouter } from 'next/navigation'
import AlertRestoreLead from './alertRestoreLead'
import AlertDeleteLead from './alertDeleteLead'
import RestoreLeadAction from './restore'

type TProps = {
  lead: leadSchema
}
export default function LeadDetailsHeader({ lead }: TProps) {
  const disclosure = useDisclosure()
  const restoreDisclosure = useDisclosure()
  const router = useRouter()
  const { mutate, isPending } = useMutation({
    mutationFn: duplicateLead,
    onSuccess: (success) => {
      addToast({
        color: 'success',
        variant: 'bordered',
        title: `Cliente potencial ${lead.title} duplicado`,
        description: 'Se duplicó correctamente.',
      })
      router.push(`/dash/embudo/${success.pipelineId}/${success.id}`)
    },
    onError: () => {
      addToast({
        color: 'danger',
        variant: 'bordered',
        title: `Error al duplicar cliente potencial ${lead.title}`,
        description: 'No se pudo duplicar el cliente potencial.',
      })
    },
  })
  return (
    <>
      <AlertDeleteLead leadId={lead.id} {...disclosure} title={lead.title} />
      <AlertRestoreLead
        leadId={lead.id}
        {...restoreDisclosure}
        title={lead.title}
        deletedAt={lead.deletedAt}
      />
      <div className=" flex justify-between items-center px-5 border-2 border-zinc-200 dark:border-zinc-900 rounded-lg py-2">
        <h2 className="text-lg font-medium line-clamp-2">{lead.title}</h2>
        <div className=" flex gap-4 items-center">
          <AssingUserLead leadId={lead.id} assinedToId={lead.assignedToId} />
          <div className=" flex gap-2">
            {lead.status === 'ACTIVE' && lead.visibility === 'ACTIVE' ? (
              <>
                <WonLeadAction leadId={lead.id} />
                <LostLeadAction leadId={lead.id} />
              </>
            ) : (
              lead.visibility === 'ACTIVE' && (
                <ReOpenLeadAction leadId={lead.id} status={lead.status} />
              )
            )}
            {lead.visibility === 'DELETED' && (
              <RestoreLeadAction
                leadId={lead.id}
                title={lead.title}
                deletedAt={lead.deletedAt}
              />
            )}
          </div>
          <Dropdown
            placement="bottom-end"
            offset={10}
            showArrow
            size="sm"
            closeOnSelect={false}
          >
            <DropdownTrigger>
              <Button isIconOnly variant="bordered">
                <Ellipsis />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disabledKeys={
                lead.visibility !== 'ACTIVE' ? ['clone', 'delete'] : ['restore']
              }
            >
              <DropdownSection title={'Acciones'}>
                <DropdownItem
                  key="clone"
                  className=""
                  color="default"
                  description="Crear un nuevo cliente potencial a base de este."
                  startContent={isPending ? <Spinner size="sm" /> : <Copy />}
                  closeOnSelect={false}
                  onPress={() => mutate({ id: lead.id })}
                >
                  Duplicar
                </DropdownItem>
                <DropdownItem
                  key="restore"
                  className=""
                  color="primary"
                  hidden={lead.visibility === 'ACTIVE'}
                  description="Restaurar el cliente potencial"
                  startContent={<Recycle />}
                  closeOnSelect={false}
                  onPress={restoreDisclosure.onOpen}
                >
                  Restaurar
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  hidden={lead.visibility !== 'ACTIVE'}
                  color="danger"
                  description="Se enviará a la papelera"
                  startContent={<Trash />}
                  closeOnSelect={true}
                  onPress={disclosure.onOpen}
                >
                  Eliminar
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </>
  )
}
