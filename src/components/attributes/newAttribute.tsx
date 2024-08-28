'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  ModalFooter,
} from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

type TNewAttribute = {
  name: string
  type: 'image' | 'option' | 'colors'
}
export default function NewAttribute() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const selectOptions = [
    {
      key: 'image',
      label: 'Imagen',
    },
    {
      key: 'colors',
      label: 'Color',
    },
    {
      key: 'option',
      label: 'Opción',
    },
  ]
  const defaultValues = {
    name: '',
  }
  const { handleSubmit, control, reset, setValue } = useForm<TNewAttribute>({
    resolver: zodResolver(
      z.object({
        name: z.string(),
        type: z.enum(['image', 'option', 'colors']),
      })
    ),
    defaultValues,
  })
  const submitNewAtt = (form: TNewAttribute) => {
    console.log(form)
  }
  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Crear atributo
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Crear nuevo atributo</ModalHeader>

              <form onSubmit={handleSubmit(submitNewAtt)}>
                <div className="px-5">
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        isRequired
                        required
                        placeholder="Nombre del atributo"
                        label="Atributo"
                        autoComplete="off"
                        variant="bordered"
                      />
                    )}
                  />
                  <Controller
                    name="type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        items={selectOptions}
                        isRequired
                        required
                        className="mt-5 mb-14"
                        label="Tipo de attributo"
                        placeholder="Seleccione un tipo"
                        variant="bordered"
                      >
                        {(op) => (
                          <SelectItem key={op.key}>{op.label}</SelectItem>
                        )}
                      </Select>
                    )}
                  />
                </div>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" type="submit">
                    Crear atributo
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
