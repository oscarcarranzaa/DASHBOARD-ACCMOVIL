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
} from '@heroui/react'
import { Copy, Ellipsis, Trash } from 'lucide-react'
import AssingUserLead from './assingUser'
import LostLeadAction from './lostLead'
import WonLeadAction from './wonLead'
import ReOpenLeadAction from './reOpen'
import AlertDeleteLead from './alertDeleteLead'

type TProps = {
  lead: leadSchema
}
export default function LeadDetailsHeader({ lead }: TProps) {
  const disclosure = useDisclosure()
  return (
    <>
      <AlertDeleteLead leadId={lead.id} {...disclosure} title={lead.title} />
      <div className=" flex justify-between items-center px-5 border-2 border-zinc-200 dark:border-zinc-900 rounded-lg py-2">
        <h2 className="text-lg font-medium line-clamp-2">{lead.title}</h2>
        <div className=" flex gap-4 items-center">
          <AssingUserLead leadId={lead.id} assinedToId={lead.assignedToId} />
          <div className=" flex gap-2">
            {lead.status === 'ACTIVE' ? (
              <>
                <WonLeadAction leadId={lead.id} />
                <LostLeadAction leadId={lead.id} />
              </>
            ) : (
              <ReOpenLeadAction leadId={lead.id} status={lead.status} />
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
            <DropdownMenu>
              <DropdownSection title={'Acciones'}>
                <DropdownItem
                  key="clone"
                  className=""
                  color="default"
                  description="Crear un nuevo cliente potencial a base de este"
                  startContent={<Copy />}
                  closeOnSelect={false}
                >
                  Clonar
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
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
