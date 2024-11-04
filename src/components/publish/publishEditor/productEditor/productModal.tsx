'use client'
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import ProductEditor from '.'
import { ReactNode } from 'react'
import ProductForm from './productForm'
import { newProductSchema } from '@/types/products'

export default function ProductModalEditor({
  children,
  title,
  value,
  variationId,
}: {
  children?: ReactNode
  title?: string
  value?: newProductSchema | null
  variationId?: string
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <div
        color="primary"
        onClick={onOpen}
        className="w-full cursor-pointer dark:hover:bg-zinc-900 rounded-lg hover:bg-zinc-100"
      >
        {children}
      </div>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center"
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Editar {title}</ModalHeader>
              <div className="p-5">
                <ProductForm
                  value={value}
                  variationId={variationId}
                  onClose={onClose}
                />
                <Button className="w-full mt-2" onClick={onClose}>
                  Cancelar
                </Button>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
