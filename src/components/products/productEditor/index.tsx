'use client'
import Spinner from '@/components/icons/spinner'
import WarningInfo from '@/components/icons/warningInfo'
import SelectMedia from '@/components/media/selectMedia'
import { getProductImageSchema, newProduct, product } from '@/types/poducts'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  DateRangePicker,
  Input,
  Switch,
  Textarea,
} from '@nextui-org/react'
import dayjs from 'dayjs'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { parseAbsoluteToLocal } from '@internationalized/date'
import { IUploads } from '@/types'

type TProps = {
  productValues?: getProductImageSchema
  handleForm: (formData: newProduct) => void
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
  const [getImages, setGetImages] = useState<string[] | undefined>()
  const [defaultImage, setDefaultImage] = useState<IUploads[] | undefined>()
  const startDate = productValues?.priceDiscount?.start
  const endDate = productValues?.priceDiscount?.end
  const isDate = startDate && endDate ? true : false
  // Verifica si hay una fecha
  const starCalendarDate = isDate ? dayjs(startDate).toISOString() : undefined
  const endCalendarDate = isDate ? dayjs(endDate).toISOString() : undefined
  const defaultDateCalendar =
    starCalendarDate && endCalendarDate
      ? {
          start: parseAbsoluteToLocal(starCalendarDate),
          end: parseAbsoluteToLocal(endCalendarDate),
        }
      : null
  const discountDefault = productValues?.priceDiscount?.price ?? 0
  // states
  const [calendarDate, setCalendarDate] = useState(defaultDateCalendar)
  const [selectDate, setSelectDate] = useState(isDate)
  const [discount, setDiscount] = useState<number>(discountDefault)
  const [visibleSite, setVisibleSite] = useState(productValues?.active ?? true)

  const initialValues = {
    name: productValues?.name,
    active: productValues?.active,
    code: productValues?.code,
    barCode: productValues?.barCode,
    stock: productValues?.stock,
    minStock: productValues?.minStock,
    price: productValues?.price,
    image: productValues?.image?._id,
    priceDiscount: {
      price: productValues?.priceDiscount?.price,
      start: productValues?.priceDiscount?.start,
      end: productValues?.priceDiscount?.end,
    },
    note: productValues?.note,
  }
  const { register, handleSubmit, setValue, unregister, getValues } =
    useForm<newProduct>({
      resolver: zodResolver(product),
      defaultValues: initialValues,
    })

  useEffect(() => {
    if (getImages) {
      setValue('image', getImages[0])
    } else {
      unregister('image')
    }
  }, [getImages])

  const setDate = useCallback(() => {
    const intDate = calendarDate?.start ? calendarDate.start.toDate() : false
    const finallyDate = calendarDate?.end ? calendarDate.end.toDate() : false
    if (intDate && finallyDate) {
      setValue('priceDiscount.start', dayjs(intDate).toISOString())
      setValue('priceDiscount.end', dayjs(finallyDate).toISOString())
    }
  }, [calendarDate, setValue])
  useEffect(() => {
    if (!selectDate) {
      unregister('priceDiscount.start')
      unregister('priceDiscount.end')
      return
    }
    setDate()
  }, [selectDate, unregister, setDate])

  useEffect(() => {
    const defaultMediaValues = productValues?.image?.images
      ? [
          {
            mediaIDItem: productValues?.image._id,
            id: productValues?.image?.mediaId,
            imgURI: productValues.image.images[3].src,
            name: productValues?.image?.title,
            urlMedia: productValues.image.images[6].src,
          },
        ]
      : []
    setDefaultImage(defaultMediaValues)
  }, [productValues])
  console.log(getImages)
  return (
    <>
      <form onSubmit={handleSubmit(handleForm)}>
        <div className="mt-10 grid grid-cols-3 gap-10 max-w-[1200px] m-auto ">
          <div className="col-span-2 p-8 ">
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
                label="Código"
                variant="bordered"
                isRequired
                required
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                {...register('code', {
                  required: 'El códogo es obligatorio',
                })}
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
                {...register('priceDiscount.price', {
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
                    setValue('active', s)
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
            <SelectMedia
              iconSize={128}
              select="only"
              setValue={setGetImages}
              defaultMedias={defaultImage}
            />
            <div className="mt-5">
              <p className="text-lg font-medium mb-5">Notas</p>
              <Textarea
                label="Agregar nota"
                variant="faded"
                {...register('note')}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
