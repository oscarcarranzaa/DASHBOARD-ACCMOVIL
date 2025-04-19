'use client'

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
  addToast,
} from '@heroui/react'
import { TPropsHistory } from '.'
import HistoryImage from './typeHistory/image'
import HistoryInfo from './typeHistory/info'
import HistoryMessage from './typeHistory/message'
import HistoryPdf from './typeHistory/pdf'
import HistoryStatus from './typeHistory/status'
import dayjs from 'dayjs'
import MenuDotsSVG from '../icons/menuDots'
import TrashSVG from '../icons/trahs'
import { useAuthStore } from '@/store/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCommentFromOrder } from '@/api/order'

export default function HistoryItem({
  id,
  type,
  image,
  message,
  status,
  info,
  date,
  user,
  orderId,
  file,
}: TPropsHistory) {
  const userSession = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteCommentFromOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order', orderId, 'details'] })
    },
    onError: () => {
      addToast({
        color: 'danger',
        variant: 'bordered',
        timeout: 5000,
        title: 'Ocurrio un error',
        description: 'Error al eliminar el comentario',
      })
    },
  })
  const renderHistoty = () => {
    switch (type) {
      case 'IMAGE':
        return <HistoryImage imageUrl={image} />
      case 'MESSAGE':
        return <HistoryMessage message={message} />
      case 'STATUS':
        return <HistoryStatus status={status} />
      case 'INFO':
        return <HistoryInfo info={info} />
      case 'FILE':
        return <HistoryPdf />
    }
  }
  const userData = {
    avatar: !user
      ? '/static/bot-default.webp'
      : user.avatar
        ? user.avatar
        : '/static/default-profile.png',
    name: user?.name ?? 'Sistema',
  }
  const sendDeleteComment = (id: string) => {
    mutate(id)
  }
  return (
    <>
      <div className="flex justify-between pt-2 pb-1 border border-transparent containerHover px-3 py-1 hover:bg-zinc-50 dark:hover:bg-zinc-900">
        <div className="w-full  ">
          <div className="w-11/12">{renderHistoty()}</div>
          <div className="flex gap-1 mt-1 ">
            {user && (
              <Avatar
                className="w-6 h-6 text-tiny"
                src={userData.avatar}
                alt={`Imagen de perfil de ${userData.name}`}
              />
            )}
            <div className="mt-1 flex gap-2 items-center mb-2">
              <p className=" text-xs font-medium">
                {userData.name}
                {user?.id === userSession?.id && ' (Tú)'}
              </p>
              <p className=" text-xs opacity-70">
                {dayjs(date).format('DD/MM/YY h:mm A')}
              </p>
            </div>
          </div>
        </div>

        <div className=" min-w-8">
          {type === 'MESSAGE' && user?.id === userSession?.id && (
            <div className="">
              <Dropdown
                placement="bottom-end"
                size="sm"
                classNames={{
                  content: 'p-0 border-small border-divider bg-background',
                }}
              >
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    className="dark:fill-white"
                  >
                    <MenuDotsSVG size={20} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    key="Eliminar"
                    onPress={() => sendDeleteComment(id)}
                    startContent={
                      <div className="stroke-red-500">
                        <TrashSVG size={20} />
                      </div>
                    }
                  >
                    <p className="text-red-500">Eliminar</p>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
