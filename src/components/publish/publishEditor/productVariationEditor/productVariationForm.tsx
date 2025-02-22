import ClockSVG from '@/components/icons/clock'
import SelectImage from '@/components/media/selectImage'
import { IUploads } from '@/types'
import { newProductSchema, ZProductNew } from '@/types/products'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  DateRangePicker,
  Input,
  Tooltip,
  DateValue,
  RangeValue,
} from "@heroui/react"
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { getLocalTimeZone, parseAbsoluteToLocal } from '@internationalized/date'
import { usePublishStore } from '@/store/publish'

type TProps = {
  variationId?: string
  value?: newProductSchema | null
  onClose?: () => void
}
export default function ProductVariationForm({
  variationId,
  value,
  onClose,
}: TProps) {
  const startDate = value?.startDiscount
  const endDate = value?.endDiscount
  const defaultDateCalendar: RangeValue<DateValue> | null =
    startDate && endDate
      ? {
          start: parseAbsoluteToLocal(startDate),
          end: parseAbsoluteToLocal(endDate),
        }
      : null

  const [defaultImage, setDefaultImage] = useState<IUploads[] | undefined>(
    value?.image && [value.image]
  )
  const [openClock, setOpenClock] = useState(!!value?.startDiscount)
  const [calendarDate, setCalendarDate] =
    useState<RangeValue<DateValue> | null>(defaultDateCalendar)

  const setProductVariation = usePublishStore(
    (state) => state.setProductVariation
  )

  const defaultValues = {
    sku: value?.sku ?? '',
    barCode: value?.barCode ?? '',
    price: value?.price ?? '',
    discountPrice: value?.discountPrice ?? '',
    startDiscount: value?.startDiscount ?? '',
    endDiscount: value?.endDiscount ?? '',
    stock: value?.stock ?? '',
    image: value?.image,
  }

  const {
    handleSubmit,
    setValue,
    unregister,
    control,
    formState: { errors },
  } = useForm<newProductSchema>({
    resolver: zodResolver(ZProductNew),
    defaultValues,
  })

  const handleSetDateDiscount = () => {
    setOpenClock(!openClock)
    if (openClock) {
      setValue('startDiscount', undefined)
      setValue('endDiscount', undefined)
      return
    }
    if (calendarDate) {
      setValue(
        'startDiscount',
        calendarDate.start.toDate(getLocalTimeZone()).toISOString()
      )
      setValue(
        'endDiscount',
        calendarDate.end.toDate(getLocalTimeZone()).toISOString()
      )
    }
  }
  const sendProduct = (form: newProductSchema) => {
    if (onClose) {
      onClose()
    }
    if (variationId) setProductVariation({ variationId, product: form })
  }
  return (
    <>
      <form onSubmit={handleSubmit(sendProduct)} className="max-w-3xl">
        <p className="  font-semibold">Información</p>
        <div className=" grid grid-cols-2 gap-10 border-t border-zinc-500 pt-5">
          <div className="max-w-40 max-h-40 min-w-28 flex-none">
            <SelectImage
              iconSize={60}
              defaultMedias={defaultImage}
              setValue={(val) => {
                if (val) {
                  setValue('image', val[0])
                  return
                }
                setValue('image', undefined)
              }}
            />
          </div>

          <div className=" flex flex-col gap-5 w-full    ">
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Precio"
                  placeholder="0.00"
                  labelPlacement="outside"
                  type="number"
                  autoComplete="off"
                  startContent={<p className=" text-zinc-500 text-sm">L</p>}
                  variant="bordered"
                />
              )}
            />
            <div className="flex gap-3 items-end">
              <Controller
                name="discountPrice"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Precio Descuento"
                    placeholder="0.00"
                    labelPlacement="outside"
                    autoComplete="off"
                    isInvalid={!!errors.discountPrice}
                    errorMessage={errors.discountPrice?.message}
                    type="number"
                    startContent={<p className=" text-zinc-500 text-sm">L</p>}
                    variant="bordered"
                  />
                )}
              />
              <div className=" stroke-white">
                <Tooltip content="Temporizador" size="sm">
                  <Button
                    isIconOnly
                    onPress={handleSetDateDiscount}
                    color={openClock ? 'primary' : 'default'}
                  >
                    <ClockSVG size={24} />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        {openClock && (
          <div className="mt-2">
            <DateRangePicker
              labelPlacement="outside"
              isDisabled={!openClock}
              hideTimeZone
              onChange={(d) => {
                setCalendarDate(d)
                if (d) {
                  setValue(
                    'startDiscount',
                    d.start.toDate(getLocalTimeZone()).toISOString()
                  )
                  setValue(
                    'endDiscount',
                    d.end.toDate(getLocalTimeZone()).toISOString()
                  )
                  return
                }
                unregister('startDiscount')
                unregister('endDiscount')
              }}
              value={calendarDate}
              calendarWidth={320}
              label="Programar fecha de descuento"
              variant="bordered"
            />
          </div>
        )}
        <p className="mt-8 font-semibold">Detalles</p>
        <div className="border-t border-zinc-500">
          <div className="grid grid-cols-2 gap-x-10 gap-y-5 mt-5">
            <Controller
              name="sku"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="SKU"
                  autoComplete="off"
                  placeholder="Ingrese el SKU"
                  labelPlacement="outside"
                  variant="bordered"
                />
              )}
            />
            <Controller
              name="barCode"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  label="Código de barras"
                  placeholder="Ingrese el código de barras"
                  labelPlacement="outside"
                  variant="bordered"
                />
              )}
            />
            <Controller
              name="stock"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  label="Cantidad"
                  placeholder="0.00"
                  type="number"
                  labelPlacement="outside"
                  variant="bordered"
                  endContent={<p className=" text-zinc-500 text-sm">UNI</p>}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-5 w-full">
          <Button type="submit" color="primary" className="w-full">
            Listo
          </Button>
        </div>
      </form>
    </>
  )
}
