'use client'
import CloseSVG from '@/components/icons/close'
import Media from '@/components/media/'
import NavegationPages from '@/components/navegationPages'
import { DateRangePicker, Input, Switch } from '@nextui-org/react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { useForm } from 'react-hook-form'

export default function NewProduct() {
  const [selectDate, setSelectDate] = useState(false)
  const [isModalMedia, setIsModalMedia] = useState(false)

  return (
    <>
      <NavegationPages text="Agregar un nuevo producto" />
      <div className="mt-20 grid grid-cols-3 gap-5 max-w-[1000px] m-auto">
        <div className="col-span-2">
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
            <div className="flex mb-5">
              <Switch
                color="success"
                size="sm"
                isSelected={selectDate}
                onChange={() => setSelectDate(!selectDate)}
              />
              <p className="ml-1">Programar fecha de la oferta</p>
            </div>
            <DateRangePicker
              isRequired
              isDisabled={!selectDate}
              className="max-w-[284px]"
              label="Inico de oferta"
              variant="underlined"
            />
          </div>
        </div>
        <div onClick={() => setIsModalMedia(!isModalMedia)}>
          <div className="bg-black w-full h-80 col-span-1">
            <p>Imagen del producto</p>
          </div>
        </div>
      </div>
      <div
        className={`fixed  top-0 bottom-0 left-0 right-0 min-w-full z-50 p-5 ${isModalMedia ? 'block' : 'hidden'} `}
        style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
      >
        <div className="bg-zinc-950 p-5  dark:fill-white">
          <div className="mb-10 flex justify-between">
            <p>Selector de medios</p>
            <button onClick={() => setIsModalMedia(false)}>
              <CloseSVG size={20} />
            </button>
          </div>
          <div className="overflow-y-scroll max-h-screen">
            <div className="mb-40">
              <Media select="only" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
