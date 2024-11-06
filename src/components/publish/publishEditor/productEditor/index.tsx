'use client'

import ClockSVG from '@/components/icons/clock'
import { newProductSchema, newProductSingleSchema } from '@/types/products'
import { Button, DateRangePicker, Input, Tooltip } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { RangeValue } from '@react-types/shared'
import { DateValue } from '@react-types/datepicker'
import { Controller, useForm } from 'react-hook-form'
import { getLocalTimeZone, parseAbsoluteToLocal } from '@internationalized/date'
import { usePublishStore } from '@/store/publish'

export default function ProductEditor() {
  const { product } = usePublishStore((state) => state.postData)
  const startDate = product?.startDiscount
  const endDate = product?.endDiscount
  const defaultDateCalendar =
    startDate && endDate
      ? {
          start: parseAbsoluteToLocal(startDate),
          end: parseAbsoluteToLocal(endDate),
        }
      : undefined

  const [openClock, setOpenClock] = useState(!!product?.startDiscount)
  const [calendarDate, setCalendarDate] = useState<
    RangeValue<DateValue> | undefined
  >(defaultDateCalendar)

  const setProduct = usePublishStore((state) => state.setProduct)

  const defaultValues = {
    sku: product?.sku ?? '',
    barCode: product?.barCode ?? '',
    price: product?.price ?? '',
    discountPrice: product?.discountPrice ?? '',
    startDiscount: product?.startDiscount ?? '',
    endDiscount: product?.endDiscount ?? '',
    stock: product?.stock ?? '',
  }

  const {
    setValue,
    unregister,
    control,
    watch,
    formState: { errors },
  } = useForm<newProductSingleSchema>({
    defaultValues,
  })
  const formValues = watch()
  const invalidDiscount =
    Number(formValues.discountPrice) > Number(formValues.price)

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

  useEffect(() => {
    const suscribeWatch = watch((data) => {
      const discoutPriceValid =
        Number(data.discountPrice) > Number(data.price)
          ? ''
          : data.discountPrice
      setProduct({ ...data, discountPrice: discoutPriceValid })
    })
    return () => {
      suscribeWatch.unsubscribe()
    }
  }, [watch, setProduct, invalidDiscount])

  return (
    <>
      <p className="  font-semibold">Precios</p>
      <div className=" grid grid-cols-2 gap-10 border-t border-zinc-500 pt-5">
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
                isInvalid={invalidDiscount}
                onBlur={() => {
                  if (invalidDiscount) {
                    setValue('discountPrice', '')
                  }
                }}
                errorMessage="El precio de descuento no puede ser mayor que el precio"
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
                onClick={handleSetDateDiscount}
                color={openClock ? 'primary' : 'default'}
              >
                <ClockSVG size={24} />
              </Button>
            </Tooltip>
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
    </>
  )
}
