'use client'
import { newAttribute } from '@/api/attributes'
import { newAttributeSchema, ZNewAttribute } from '@/types/attributes'
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
} from "@heroui/react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import Spinner from '../icons/spinner'

export default function NewAttribute() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const defaultValues = {
    name: '',
  }
  const { handleSubmit, control, reset, setValue } =
    useForm<newAttributeSchema>({
      resolver: zodResolver(ZNewAttribute),
      defaultValues,
    })
  const queryClient = useQueryClient()
  const { mutate, isPending, error } = useMutation({
    mutationFn: newAttribute,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['Attributes'] })
      reset()
      onOpenChange()
    },
  })
  const selectOptions = [
    {
      key: 'image',
      label: 'Imagen',
    },
    {
      key: 'color',
      label: 'Color',
    },
    {
      key: 'option',
      label: 'Opción',
    },
  ]

  const submitNewAtt = (form: newAttributeSchema) => {
    mutate(form)
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
                        className="mt-5 "
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

                  <div className="mb-14 text-sm font-semibold text-red-500">
                    {error && <p>{error.message}</p>}
                  </div>
                </div>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" type="submit" isDisabled={isPending}>
                    {isPending ? (
                      <div className=" animate-spin">
                        <Spinner size={24} fill="#fff" />
                      </div>
                    ) : (
                      'Crear atributo'
                    )}
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
