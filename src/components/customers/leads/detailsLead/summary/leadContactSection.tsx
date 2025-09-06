import ContactDetails from '@/components/customers/contacts/viewContact/details'
import ContactSummary from '@/components/customers/contacts/viewContact/summary'
import {
  Alert,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from '@heroui/react'
import { getOneLeadShema } from '@/types/crm/leads'
import { Contact, EllipsisVertical } from 'lucide-react'

import { cn } from '@/lib/utils'

import Link from 'next/link'
import SwitchContact from '../switchContact'

type LeadContactSectionProps = {
  contact: getOneLeadShema['contact']

  leadId: string
}

export default function LeadContactSection({
  contact,
  leadId,
}: LeadContactSectionProps) {
  const disclosure = useDisclosure()
  if (!contact) {
    return (
      <>
        <SwitchContact leadId={leadId} hideButton {...disclosure} />
        <Alert
          color="warning"
          classNames={{
            base: cn([
              'bg-default-50 dark:bg-background shadow-sm',
              'border-1 border-default-200 dark:border-default-100',
            ]),
          }}
          title="Contacto eliminado"
          description="Este contacto fue eliminado, pero aun puedes seguir con este trato o cambiar a otro contacto."
        >
          <div className=" w-full flex justify-end mt-2">
            <Button onPress={disclosure.onOpen} color="warning" variant="flat">
              Agregar contacto
            </Button>
          </div>
        </Alert>
      </>
    )
  }

  return (
    <>
      <SwitchContact leadId={leadId} hideButton {...disclosure} />
      <div className="flex justify-between items-center bg-green-600/10 p-2 px-4 rounded-lg">
        <div className="flex items-center gap-2">
          <Contact size={16} className="flex-none" />
          <p className="text-sm font-medium">{contact.name}</p>
        </div>
        <Dropdown
          size="sm"
          placement="bottom-end"
          showArrow
          classNames={{
            base: 'before:bg-default-200',
            content:
              'py-1 px-1 border border-default-200 bg-linear-to-br from-white to-default-200 dark:from-default-50 dark:to-black',
          }}
        >
          <DropdownTrigger>
            <Button variant="faded" size="sm" isIconOnly>
              <EllipsisVertical size={16} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="change" onPress={() => disclosure.onOpen()}>
              Cambiar contacto
            </DropdownItem>
            <DropdownItem
              key="view"
              as={Link}
              href={`/dash/clientes/contactos/${contact.id}`}
              target="_blank"
            >
              Ver contacto
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <ContactDetails contact={contact} />
      <ContactSummary contact={contact} />
    </>
  )
}
