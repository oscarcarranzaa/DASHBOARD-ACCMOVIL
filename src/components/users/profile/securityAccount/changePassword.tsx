'use client'
import ArrowAngleSVG from '@/components/icons/arrowAngle'
import ChangePasswordForm from './changePasswordForm'
import { Button } from '@heroui/react'
import { Modal, ModalContent, ModalHeader, useDisclosure } from '@heroui/react'

export default function ChangePassword() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <>
      <Button
        className="dark:bg-neutral-950 border dark:border-zinc-600 border-zinc-300 h-20 bg-white rounded-xl flex justify-between items-center w-full"
        onPress={onOpen}
      >
        <div className="px-5 py-5 ">
          <p className="font-semibold">Cambiar contraseña</p>
          <p className=" text-left">********</p>
        </div>
        <div className="-rotate-90 dark:fill-white">
          <ArrowAngleSVG size={32} />
        </div>
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Cambiar contraseña</ModalHeader>
              <div className="p-5">
                <ChangePasswordForm onSuccessForm={onClose} />
                <Button className="w-full mt-2" onPress={onClose}>
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
