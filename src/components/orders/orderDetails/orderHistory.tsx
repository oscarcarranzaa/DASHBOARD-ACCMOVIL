import { addCommentFromOrder } from '@/api/order'
import HistortyView from '@/components/historyView'
import ClipSVG from '@/components/icons/clip'
import SendMessageSVG from '@/components/icons/sendMessage'
import { historyCommentSchema, ZComment } from '@/types/history'
import { orderDetailsRead } from '@/types/order'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ORDER_STATUS } from './orderStatus'

type TProps = {
  history?: orderDetailsRead['OrderHistory']
  orderId: string
}

export default function OrderHistory({ history, orderId }: TProps) {
  const ref = useRef<HTMLElement>(null)
  const queryClient = useQueryClient()
  const orderRecords = history?.map((r) => {
    const isUser = r.user
      ? {
          id: r.user.id,
          name: `${r.user.firstName.split(' ')[0]} ${r.user.lastName.split(' ')[0]}`,
          avatar: r.user.avatar,
        }
      : null

    return {
      id: r.id,
      image: r.url,
      message: r.message,
      orderId: r.orderId,
      status: ORDER_STATUS.find((s) => s.key === r.status)?.label ?? 'N/D',
      type: r.type,
      file: r.url,
      info: r.message,
      date: r.createdAt,
      user: isUser,
    }
  })
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm<historyCommentSchema>({
    resolver: zodResolver(ZComment),
    defaultValues: {
      comment: '',
    },
  })

  const { mutate } = useMutation({
    mutationFn: addCommentFromOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order', orderId, 'details'] })
    },
    onError: () => {
      toast.error('Error al enviar comentario.')
    },
  })

  const submitComment = (form: historyCommentSchema) => {
    if (isDirty) {
      mutate({ id: orderId, comment: form.comment })
      reset({ comment: '' })
    }
  }
  useEffect(() => {
    if (ref.current && history) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [history])

  return (
    <>
      <div>
        <div className="border-2 dark:border-zinc-700 rounded-xl relative overflow-hidden bg-white dark:bg-zinc-950">
          <div
            className="h-[580px] menu-content overflow-y-scroll scroll-smooth"
            ref={ref as React.MutableRefObject<HTMLDivElement>}
          >
            <div className="scrollbar">
              <HistortyView history={orderRecords} />
            </div>
          </div>
          <div className="absolute py-1 px-3 bottom-0 right-2 w-full bg-white dark:bg-zinc-900 z-10 ">
            <form
              className="w-full flex gap-3"
              onSubmit={handleSubmit(submitComment)}
            >
              <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                  <Input
                    autoComplete="off"
                    {...field}
                    placeholder="Escribir comentario"
                    endContent={
                      <button className=" rounded-full p-1 dark:fill-white">
                        <ClipSVG size={20} />
                      </button>
                    }
                  />
                )}
              />
              <Button
                isIconOnly
                color="success"
                className=" rounded-full p-1"
                type="submit"
                isDisabled={!isDirty}
              >
                <SendMessageSVG size={20} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
