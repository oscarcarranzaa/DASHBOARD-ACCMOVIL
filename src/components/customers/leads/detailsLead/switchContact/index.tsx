import { switchContactLead } from '@/api/crm'
import ContactInput from '@/components/customers/contacts/contactInput'
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
} from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

type TProps = {
  leadId: string
  button?: ButtonProps
}
export default function SwitchContact({ leadId, button }: TProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [contact, setContact] = useState<contactSchema | null>(null)
  const [newContact, setNewContact] = useState<string | null>(null)
  const [isNewContact, setIsNewContact] = useState<boolean>(false)

  const { mutate, isPending } = useMutation({
    mutationFn: switchContactLead,
    onSuccess: () => {
      onClose()
    },
    onError: () => {},
  })

  const handleClearContact = () => {
    setContact(null)
    setNewContact(null)
  }
  const handleSetContact = (contact: contactSchema) => {
    ;(setContact(contact), setIsNewContact(false))
  }
  const handleSetNewContact = (name: string) => {
    ;(setNewContact(name), setIsNewContact(true))
  }

  const handleSelectContact = () => {
    if (isNewContact) {
      if (!newContact) return
      mutate({ leadId, isNewContact, contactName: newContact })
    } else {
      if (!contact) return
      mutate({ leadId, isNewContact, contactId: contact.id })
    }
  }
  return (
    <>
      <Button onPress={onOpen} {...button}>
        Seleccionar contacto
      </Button>
      <Modal
        className="overflow-visible"
        isOpen={isOpen}
        size="lg"
        placement="top"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Seleccionar contacto</ModalHeader>
          <ModalBody>
            <div className="mb-5">
              <ContactInput
                onContactChange={(contact) => handleSetContact(contact)}
                onNewContactChange={(name) => handleSetNewContact(name)}
                onClear={() => handleClearContact()}
              />
              <p className="text-xs opacity-80 mt-3">
                {isNewContact
                  ? `Se creara un nuevo contacto (${newContact}) y se vinculará a este trato.`
                  : `Se vinculará a este trato el contacto existente (${contact?.name}).`}
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="bordered" onPress={onOpenChange}>
              Cancelar
            </Button>
            <Button color="primary" onPress={handleSelectContact}>
              Seleccionar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
