'use client'
import SelectUser from '@/components/users/selectUser'
import {
  Button,
  Modal,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Input,
  DatePicker,
  NumberInput,
} from '@heroui/react'
import { Plus } from 'lucide-react'
import SelectSourceLead from './selectSource'
import ContactInput from '../../contacts/contactInput'

export default function NewLead() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  return (
    <>
      <div>
        <Button onPress={onOpen} color="primary">
          <Plus /> Prospecto
        </Button>
        <Modal
          backdrop="opaque"
          isDismissable={false}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top"
          size="2xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Añadir prospecto</ModalHeader>
                <div className=" grid grid-cols-2">
                  <div className="px-3 flex flex-col gap-4">
                    <ContactInput />
                    <Input
                      placeholder="titulo"
                      labelPlacement="outside"
                      variant="bordered"
                      label="Titulo"
                    />

                    <NumberInput
                      labelPlacement="outside"
                      variant="bordered"
                      placeholder="0.00"
                      aria-label="Valor"
                      minValue={0}
                      label="Valor"
                      aria-labelledby="Valor"
                      startContent={
                        <span className="text-default-400 text-small">L. </span>
                      }
                      endContent={
                        <span className="text-default-400 text-small">HNL</span>
                      }
                    />
                    <DatePicker
                      aria-label="Fecha"
                      aria-labelledby="fecha"
                      label="Fecha prevista de cierre"
                      labelPlacement="outside"
                      variant="bordered"
                    />

                    <SelectUser
                      label="Seleccionar propietario"
                      placeholder="Buscar propietario"
                      isThisUser
                      onChange={(id) => console.log(id)}
                    />
                    <SelectSourceLead onChange={(e) => console.log(e)} />
                  </div>
                  <div></div>
                </div>
                <ModalFooter className="dark:bg-zinc-800 bg-zinc-100 p-2 mt-10">
                  <Button className=" min-w-32" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button className=" min-w-32" color="primary" type="submit">
                    Crear
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}
