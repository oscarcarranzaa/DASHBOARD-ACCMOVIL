'use client'
import SelectMedia from '@/components/media/selectMedia'
import NavegationPages from '@/components/navegationPages'
import {
  Button,
  DateRangePicker,
  Input,
  Switch,
  Textarea,
} from '@nextui-org/react'
import { useState } from 'react'

import { useForm } from 'react-hook-form'

export default function NewProduct() {
  const [selectDate, setSelectDate] = useState(false)
  const initialValues = {
    name: '',
    code: '',
    barCode: '',
    stock: '',
    minStock: '',
    price: '',
    salesPrice: '',
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues })

  return (
    <>
      <NavegationPages text="Agregar un nuevo producto" />
      <form>
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
              />
              <Input
                label="Código de barras"
                variant="bordered"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
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
              />
              <Input
                label="Cantidad mínina"
                variant="bordered"
                type="number"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
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
              />

              <Input
                label="Precio oferta"
                variant="bordered"
                type="number"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>
            <div className=" mt-10 gap-8">
              <p className="text-lg font-medium mb-5">Opciones</p>
              <div className="flex mb-7">
                <Switch color="success" size="sm" defaultSelected />
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
                  label="Inico de oferta"
                  variant="underlined"
                />
              </div>
            </div>
          </div>
          <div className="pt-10">
            <Button className="w-full font-semibold mb-8 " color="primary">
              Guardar
            </Button>
            <p className="text-lg font-medium mb-5">Imagen del producto</p>
            <SelectMedia select="only" />

            <div className="mt-5">
              <p className="text-lg font-medium mb-5">Notas</p>
              <Textarea label="Agregar nota" variant="faded" />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
