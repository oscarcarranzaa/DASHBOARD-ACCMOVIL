import { updateTrackUrl } from '@/api/order'
import Edit from '@/components/icons/edit'
import SendSVG from '@/components/icons/send'
import Smartphone from '@/components/icons/smartphone'
import Spinner from '@/components/icons/spinner'
import UbicationSVG from '@/components/icons/ubication'
import { shippingInfoSchema, ZUpdateTrackUrl } from '@/types/order'
import { zodResolver } from '@hookform/resolvers/zod'
import { addToast, Button, Input } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type TProps = {
  shippingInfo?: shippingInfoSchema | null
  trackUrl?: string | null
  orderId: string
  orderStatus: string
}
type TUrl = {
  url: string
}
export default function OrderTrackDetails({
  shippingInfo,
  orderId,
  orderStatus,
}: TProps) {
  const [trackingUrl, setTrackingUrl] = useState(shippingInfo?.orderTrackingUrl)
  const [updatedUrl, setUpdatedUrl] = useState<string>()
  const [openEditor, setOpenEditor] = useState(!shippingInfo?.orderTrackingUrl)
  const queryClient = useQueryClient()
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TUrl>({
    resolver: zodResolver(ZUpdateTrackUrl),
    defaultValues: {
      url: trackingUrl ?? '',
    },
  })
  const { mutate, isPending } = useMutation({
    mutationFn: updateTrackUrl,
    onSuccess: () => {
      setOpenEditor(false)
      if (updatedUrl) {
        setTrackingUrl(updatedUrl)
      }
      queryClient.invalidateQueries({ queryKey: ['order', orderId, 'details'] })
      addToast({
        color: 'success',
        variant: 'bordered',
        timeout: 5000,
        title: 'Se actualizó la URL de seguimiento',
      })
    },
    onError: (err) => {
      addToast({
        color: 'danger',
        variant: 'bordered',
        timeout: 5000,
        title: 'Ocurrió un error',
        description: err.message,
      })

      reset({ url: trackingUrl ?? '' })
    },
  })

  const sendUrl = ({ url }: TUrl) => {
    if (shippingInfo) {
      mutate({ id: shippingInfo.orderId, url })
      setUpdatedUrl(url)
    }
  }
  const isDisabled = orderStatus !== 'completed'
  return (
    <div>
      <div className="">
        <p className=" font-semibold mb-1">Dirección de envío:</p>
        <div className="flex gap-3 items-center fill-black dark:fill-white mb-2">
          <Smartphone size={32} />
          <div>
            {shippingInfo && (
              <div>
                <p>{shippingInfo.name}</p>
                <p className=" text-sm">
                  {shippingInfo.documentNumber} - {shippingInfo.phone}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-3 items-center  stroke-black dark:stroke-white max-w-sm">
          <div className="flex-none">
            <UbicationSVG size={32} />
          </div>
          <div>
            {shippingInfo && (
              <div>
                <p>
                  {shippingInfo.state}, {shippingInfo.city}, {shippingInfo.zone}
                </p>
                <p className=" text-sm">
                  {shippingInfo.street}, {shippingInfo.reference}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5 flex-none">
        <p className=" font-medium">URL de seguimiento:</p>
        {trackingUrl && (
          <div className="flex items-center">
            <a
              href={trackingUrl}
              target="_blank"
              className=" hover:underline text-primary text-sm line-clamp-1 max-w-xl"
            >
              {trackingUrl}
            </a>
            <div className="dark:stroke-white stroke-black ml-2">
              <Button
                isIconOnly
                variant="ghost"
                size="sm"
                onPress={() => setOpenEditor(!openEditor)}
                title="Editar Url de seguimiento"
              >
                <Edit size={16} />
              </Button>
            </div>
          </div>
        )}
        {openEditor && (
          <form onSubmit={handleSubmit(sendUrl)} className=" flex gap-3 mt-3">
            <Controller
              name="url"
              control={control}
              render={({ field }) => (
                <Input
                  isRequired
                  {...field}
                  isDisabled={isDisabled}
                  variant="bordered"
                  placeholder="http://acme.com/tracking/"
                  label={isDisabled ? 'Primero completa el pedido' : 'URL'}
                  isInvalid={!!errors.url}
                  errorMessage={errors.url?.message}
                  labelPlacement="outside"
                />
              )}
            />
            <div className="mt-6 stroke-black ">
              <Button
                color="success"
                disabled={(!shippingInfo && isPending) || isDisabled}
                type="submit"
              >
                {isPending ? (
                  <Spinner size={24} fill="#000" />
                ) : (
                  <SendSVG size={24} />
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
