'use client'
import Spinner from '@/components/icons/spinner'
import WarningInfo from '@/components/icons/warningInfo'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  DateRangePicker,
  Input,
  Switch,
  Textarea,
} from '@nextui-org/react'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getLocalTimeZone, parseAbsoluteToLocal } from '@internationalized/date'
import { IUploads } from '@/types'
import SelectImage from '@/components/media/selectImage'
import { newProductSchema, productSchema, ZProductNew } from '@/types/products'
import { RangeValue } from '@react-types/shared'
import { DateValue } from '@react-types/datepicker'
import dayjs from 'dayjs'

type TProps = {
  productValues?: productSchema
  handleForm: (formData: newProductSchema) => void
  isPending: boolean
  error?: {
    message: string
  } | null
}
export default function ProductEditor({
  productValues,
  handleForm,
  isPending,
  error,
}: TProps) {
  const [getImages, setGetImages] = useState<IUploads[] | undefined>()
  const [defaultImage, setDefaultImage] = useState<IUploads[] | undefined>()
  const startDate = productValues?.startDiscount
  const endDate = productValues?.endDiscount
  const isDate = startDate && endDate ? true : false
  // Verifica si hay una fecha
  const defaultDateCalendar =
    startDate && endDate
      ? {
          start: parseAbsoluteToLocal(startDate),
          end: parseAbsoluteToLocal(endDate),
        }
      : undefined
  const discountDefault = productValues?.discountPrice ?? 0

  const [calendarDate, setCalendarDate] = useState<
    RangeValue<DateValue> | undefined
  >(defaultDateCalendar)

  const [selectDate, setSelectDate] = useState(isDate)
  const [discount, setDiscount] = useState<number>(discountDefault)
  const [visibleSite, setVisibleSite] = useState(
    productValues?.isActive ?? true
  )

  const {
    register,
    handleSubmit,
    setValue,
    unregister,
    getValues,
    formState: { errors },
  } = useForm<newProductSchema>({
    resolver: zodResolver(ZProductNew),
    defaultValues: productValues,
  })

  useEffect(() => {
    if (getImages && getImages.length > 0) {
      setValue('image', getImages[0].id)
    } else {
      setValue('image', undefined)
    }
  }, [getImages, setValue])

  const setDate = useCallback(() => {
    const initDate = calendarDate?.start
      ? calendarDate.start.toDate(getLocalTimeZone())
      : false
    const finallyDate = calendarDate?.end
      ? calendarDate.end.toDate(getLocalTimeZone())
      : false

    if (initDate && finallyDate) {
      setValue('startDiscount', initDate.toISOString())
      setValue('endDiscount', finallyDate.toISOString())
    }
  }, [calendarDate, setValue])
  useEffect(() => {
    if (!selectDate) {
      unregister('startDiscount')
      unregister('endDiscount')
      return
    }
    setDate()
  }, [selectDate, unregister, setDate])

  useEffect(() => {
    setValue('isActive', visibleSite)
  }, [visibleSite, setValue])

  useEffect(() => {
    const defaultMediaValues = productValues?.media?.qualities
      ? [
          {
            id: productValues?.media.id,
            imgURI: productValues?.media?.qualities[3].src,
            name: productValues?.media?.title,
            urlMedia: productValues.media?.url,
          },
        ]
      : []
    setDefaultImage(defaultMediaValues)
  }, [productValues])

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)}>
        <div className="mt-10 grid grid-cols-3 gap-10 max-w-[1200px] m-auto ">
          <div className="col-span-2 ">
            <p className="text-lg font-medium mb-5">Información del producto</p>
            <Input
              label="Nombre del producto"
              variant="bordered"
              size="lg"
              isRequired
              required
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              {...register('name', {
                required: 'El nombre es obligatorio',
              })}
            />
            <div className="flex mt-5 gap-8">
              <Input
                label="SKU"
                variant="bordered"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                {...register('sku')}
              />
              <Input
                label="Código de barras"
                variant="bordered"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                {...register('barCode')}
              />
            </div>
            <div className="flex mt-5 gap-8">
              <Input
                label="Cantidad"
                variant="bordered"
                isRequired
                required
                type="number"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                {...register('stock', {
                  required: 'La cantidad es obligatoria',
                  valueAsNumber: true,
                })}
              />
              <Input
                label="Cantidad mínina"
                placeholder="Defecto (1)"
                variant="bordered"
                type="number"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                {...register('minStock', {
                  setValueAs: (value) => {
                    if (value === '') {
                      return undefined
                    }
                    const numberValue = Number(value)
                    return isNaN(numberValue) ? undefined : numberValue
                  },
                })}
              />
            </div>
            <div className="flex mt-5 gap-8">
              <Input
                label="Precio"
                variant="bordered"
                isRequired
                required
                type="number"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                {...register('price', {
                  required: 'El precio es obligatorio',
                  valueAsNumber: true,
                })}
              />
              <Input
                label="Precio oferta"
                variant="bordered"
                type="number"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                isInvalid={getValues('price') <= discount}
                errorMessage={'No puede ser mayor o igual al precio'}
                {...register('discountPrice', {
                  setValueAs: (value) => {
                    if (value === '') {
                      return undefined
                    }
                    const numberValue = Number(value)
                    return isNaN(numberValue) ? undefined : numberValue
                  },
                  onChange: (e: ChangeEvent<HTMLInputElement>) => {
                    setDiscount(Number(e.target.value))
                  },
                })}
              />
            </div>
            <div className=" mt-10 gap-8">
              <p className="text-lg font-medium mb-5">Opciones</p>
              <div className="flex mb-7">
                <Switch
                  color="success"
                  size="sm"
                  isSelected={visibleSite}
                  onValueChange={(s) => {
                    setVisibleSite(s)
                  }}
                />
                <p className="ml-1">Mostrar en el sitio</p>
              </div>
              <div className="flex mb-5">
                <Switch
                  color="success"
                  size="sm"
                  isSelected={selectDate}
                  onChange={() => setSelectDate(!selectDate)}
                />
                <p className="ml-1">Programar fecha de la oferta</p>
              </div>
              <div className="mb-8 flex w-full max-w-96">
                <DateRangePicker
                  isRequired
                  labelPlacement="outside"
                  hideTimeZone
                  calendarWidth={320}
                  granularity="minute"
                  isDisabled={!selectDate}
                  className={` ${selectDate ? '' : 'hidden'}`}
                  label="Fecha"
                  variant="underlined"
                  value={calendarDate}
                  onChange={setCalendarDate}
                  calendarProps={{
                    classNames: {
                      base: 'bg-background',
                      headerWrapper: 'pt-4 bg-background',
                      prevButton: 'border-1 border-default-200 rounded-small',
                      nextButton: 'border-1 border-default-200 rounded-small',
                      gridHeader:
                        'bg-background shadow-none border-b-1 border-default-100',
                      cellButton: [
                        'data-[today=true]:bg-default-100 data-[selected=true]:bg-transparent rounded-small',
                        'data-[range-start=true]:before:rounded-l-small',
                        'data-[selection-start=true]:before:rounded-l-small',
                        'data-[range-end=true]:before:rounded-r-small',
                        'data-[selection-end=true]:before:rounded-r-small',
                        'data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:rounded-small',
                        'data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:rounded-small',
                      ],
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div className="pt-10">
            <Button
              className="w-full font-semibold  "
              color="primary"
              type="submit"
              isDisabled={isPending}
            >
              {isPending ? (
                <span className=" animate-spin">
                  <Spinner size={24} fill="#fff" />
                </span>
              ) : (
                'Guardar'
              )}
            </Button>
            <p
              className={` text-xs text-red-500 font-bold mt-2 fill-red-500 stroke-red-500 ${error?.message ? 'flex' : 'hidden'} items-center gap-1`}
            >
              <WarningInfo size={20} /> {error?.message}
            </p>
            <p className="text-lg font-medium mb-5 mt-8">Imagen del producto</p>
            <SelectImage
              iconSize={128}
              select="only"
              setValue={setGetImages}
              defaultMedias={defaultImage}
            />
            <div className="mt-5">
              <p className="text-lg font-medium mb-5">Notas</p>
              <Textarea
                label="Agregar nota de venta"
                variant="faded"
                {...register('salesNote')}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
