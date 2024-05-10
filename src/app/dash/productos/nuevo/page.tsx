'use client'
import { createProduct } from '@/api/products'
import Spinner from '@/components/icons/spinner'
import WarningInfo from '@/components/icons/warningInfo'
import SelectMedia from '@/components/media/selectMedia'
import NavegationPages from '@/components/navegationPages'
import { newProduct, product } from '@/types/poducts'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  DateRangePicker,
  DateValue,
  Input,
  RangeValue,
  Switch,
  Textarea,
} from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form'
import CheckSVG from '@/components/icons/check'
import ToastInfo from '@/components/toast'

export default function NewProduct() {
  const [selectDate, setSelectDate] = useState(false)
  const [visibleSite, setVisibleSite] = useState(true)
  const [date, setDate] = useState<RangeValue<DateValue> | null>(null)
  const [discount, setDiscount] = useState<number>(0)
  const {
    register,
    handleSubmit,
    setValue,
    unregister,
    reset,
    getValues,
    formState: { isSubmitSuccessful },
  } = useForm<newProduct>({ resolver: zodResolver(product) })
  const { mutate, isPending, error, data } = useMutation({
    mutationFn: createProduct,
    onSuccess: (success) => {
      toast(
        <ToastInfo
          text="Guardado Correctamente"
          url="/"
          label="Ver Producto"
        />,
        {
          icon: <CheckSVG size={20} />,
        }
      )
      reset()
    },
  })
  const handleForm = (formData: newProduct) => {
    formData.active = visibleSite
    mutate(formData)
  }
  const getRangeDate = (e: RangeValue<DateValue>) => {
    const { start } = e
    const { end } = e
    const startDate = dayjs(
      `${start.year}-${start.month}-${start.day}`
    ).toISOString()
    const endDate = dayjs(`${end.year}-${end.month}-${end.day}`).toISOString()
    if (selectDate) {
      setValue('priceDiscount.start', startDate)
      setValue('priceDiscount.end', endDate)
    }
  }
  useEffect(() => {
    if (!selectDate) {
      setDate(null)
      unregister('priceDiscount.start')
      unregister('priceDiscount.end')
      return
    }
    if (date) {
      getRangeDate(date)
      return
    }
  }, [selectDate, date])

  return (
    <>
      <NavegationPages text="Agregar un nuevo producto" />
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
                {...(register('minStock'),
                {
                  onChange: (e) => {
                    const value = e.target.valueAsNumber
                    const valueNumber = Number.isNaN(value) ? undefined : value
                    setValue('minStock', valueNumber)
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
                {...(register('priceDiscount'),
                {
                  onChange: (e) => {
                    const value = e.target.valueAsNumber
                    const valueNumber = Number.isNaN(value) ? undefined : value
                    setDiscount(Number(e.target.value))
                    setValue('priceDiscount.price', valueNumber)
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
                  {...register('active', { value: visibleSite })}
                  onChange={() => setVisibleSite(!visibleSite)}
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
              <div className="mb-8">
                <DateRangePicker
                  isRequired
                  isDisabled={!selectDate}
                  className={`max-w-[284px] ${selectDate ? '' : 'hidden'}`}
                  value={date}
                  label="Fecha"
                  variant="underlined"
                  onChange={setDate}
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
                  <Spinner size={24} fill="#fff" />{' '}
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
              select="only"
              setValue={setValue}
              reset={isSubmitSuccessful}
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
      <span className="stroke-green-600 fill-green-600">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          stacked
          //theme="dark"
        />
      </span>
    </>
  )
}
