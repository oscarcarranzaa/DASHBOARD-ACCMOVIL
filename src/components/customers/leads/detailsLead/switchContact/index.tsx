import { switchContactLead } from '@/api/crm'
import ContactInput from '@/components/customers/contacts/contactInput'
import { cn } from '@/lib/utils'
import { contactSchema } from '@/types/customer'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  ButtonProps,
  addToast,
  Tooltip,
} from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useState, useMemo } from 'react'

type TProps = {
  leadId: string
  button?: ButtonProps
  buttonContent?: React.ReactNode
  isOpen?: boolean
  hideButton?: boolean
  activeTooltip?: boolean
  onClose: () => void
  onOpenChange: () => void
  onOpen: () => void
  tooltipContent?: React.ReactNode
}

export default function SwitchContact({
  leadId,
  button,
  buttonContent = 'Seleccionar contacto',
  isOpen = false,
  hideButton = false,
  activeTooltip = false,
  onClose,
  onOpenChange,
  onOpen,
  tooltipContent = 'Seleccionar contacto',
}: TProps) {
  const [contact, setContact] = useState<contactSchema | null>(null)
  const [newContact, setNewContact] = useState<string | null>(null)

  const queryClient = useQueryClient()
  const isNewContact = useMemo(
    () => !!newContact && !contact,
    [newContact, contact]
  )

  const { mutate, isPending } = useMutation({
    mutationFn: switchContactLead,
    onSuccess: (lead) => {
      addToast({
        color: 'success',
        title: 'Contacto cambiado exitosamente',
        variant: 'bordered',

        endContent: (
          <div className="ms-11 my-2 flex gap-x-2 float-end">
            <Button
              color={'success'}
              size="sm"
              variant="bordered"
              as={Link}
              href={`/dash/clientes/contactos/${lead.contactId}`}
            >
              Ver
            </Button>
          </div>
        ),
      })
      onClose()
    },
    onError: (error) => {
      addToast({ color: 'danger', title: error.message, variant: 'bordered' })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['oneLead', leadId] })
      queryClient.invalidateQueries({ queryKey: [leadId, 'history'] })
    },
  })

  const handleSelectContact = () => {
    if (isNewContact && newContact) {
      mutate({ leadId, isNewContact: true, contactName: newContact })
    } else if (contact) {
      mutate({ leadId, isNewContact: false, contactId: contact.id })
    }
  }

  const infoMessage = useMemo(() => {
    if (isNewContact)
      return `Se creará un nuevo contacto (${newContact}) y se vinculará a este trato.`
    if (contact?.name)
      return `Se vinculará a este trato el contacto existente (${contact.name}).`
    return 'Selecciona un contacto'
  }, [isNewContact, newContact, contact])

  return (
    <>
      <Tooltip
        content={tooltipContent}
        placement="top"
        offset={10}
        isDisabled={!activeTooltip}
      >
        {!hideButton && (
          <Button onPress={onOpen} {...button}>
            {buttonContent}
          </Button>
        )}
      </Tooltip>
      <Modal
        className="overflow-visible"
        isOpen={isOpen}
        size="lg"
        placement="top"
        classNames={{
          backdrop: 'z-100000',
          wrapper: 'z-100000',
        }}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Seleccionar contacto</ModalHeader>
          <ModalBody>
            <div className="mb-5">
              <ContactInput
                onContactChange={(c) => {
                  setContact(c)
                  setNewContact(null)
                }}
                onNewContactChange={(name) => {
                  setNewContact(name)
                  setContact(null)
                }}
                onClear={() => {
                  setContact(null)
                  setNewContact(null)
                }}
              />
              <p className="text-xs opacity-80 mt-3">{infoMessage}</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="bordered" onPress={onOpenChange}>
              Cancelar
            </Button>
            <Button
              color="primary"
              isLoading={isPending}
              onPress={handleSelectContact}
            >
              Seleccionar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
