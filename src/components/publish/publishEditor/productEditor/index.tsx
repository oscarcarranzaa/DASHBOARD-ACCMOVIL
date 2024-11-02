import ClockSVG from '@/components/icons/clock'
import SelectImage from '@/components/media/selectImage'
import { IUploads } from '@/types'
import { newProductSchema, ZProductNew } from '@/types/products'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, DateRangePicker, Input, Tooltip } from '@nextui-org/react'
import { useState } from 'react'
import { RangeValue } from '@react-types/shared'
import { DateValue } from '@react-types/datepicker'
import { Controller, useForm } from 'react-hook-form'
import { getLocalTimeZone } from '@internationalized/date'

export default function ProductEditor() {
  const [defaultImage, setDefaultImage] = useState<IUploads[] | undefined>()
  const [openClock, setOpenClock] = useState(false)
  const [calendarDate, setCalendarDate] = useState<
    RangeValue<DateValue> | undefined
  >()

  const defaultValues = {
    sku: '',
    barCode: '',
    price: '',
    discountPrice: '',
    startDiscount: '',
    endDiscount: '',
    stock: '',
    image: '',
  }

  const {
    register,
    handleSubmit,
    setValue,
    unregister,
    getValues,
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
    console.log(form)
  }
  return (
    <>
      <form onSubmit={handleSubmit(sendProduct)} className="max-w-3xl">
        <p className="  font-semibold">Información</p>
        <div className=" grid grid-cols-2 gap-10 border-t border-zinc-500 pt-5">
          <div className="max-w-40 max-h-40 min-w-28 flex-none">
            <SelectImage
              select="only"
              iconSize={60}
              setValue={(val) => {
                if (val) {
                  setValue('image', val[0].id)
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
                    isInvalid={!!errors.discountPrice}
                    errorMessage={errors.discountPrice?.message}
                    type="number"
                    startContent={<p className=" text-zinc-500 text-sm">L</p>}
                    variant="bordered"
                  />
                )}
              />
              <div className=" stroke-zinc-400">
                <Tooltip content="Temporizador" size="sm">
                  <Button
                    isIconOnly
                    onClick={handleSetDateDiscount}
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
                setValue(
                  'startDiscount',
                  d.start.toDate(getLocalTimeZone()).toISOString()
                )
                setValue(
                  'endDiscount',
                  d.end.toDate(getLocalTimeZone()).toISOString()
                )
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
                  label="Cantidad"
                  placeholder="0.00"
                  labelPlacement="outside"
                  variant="bordered"
                  endContent={<p className=" text-zinc-500 text-sm">UNI</p>}
                />
              )}
            />
          </div>
        </div>
        <Button type="submit">Enviar</Button>
      </form>
    </>
  )
}
