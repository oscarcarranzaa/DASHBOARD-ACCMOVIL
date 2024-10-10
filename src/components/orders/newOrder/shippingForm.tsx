'use client'
import { addShippingData, getCountry } from '@/api/order'
import SaveDiskSVG from '@/components/icons/saveDisk'
import Spinner from '@/components/icons/spinner'
import { createOrderState } from '@/store/order'
import { createShippingInfoSchema, ZCreateShippingInfo } from '@/types/order'
import getCountrySelect from '@/utils/getCountrySelect'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Textarea,
} from '@nextui-org/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function ShippingOrderForm() {
  const [stateSelect, setStateSelect] = useState<string>('')
  const [citySelect, setCitySelect] = useState<string>('')
  const [zoneSelect, setZoneSelect] = useState<string>('')
  const setOrderNavegation = createOrderState((state) => state.navegation)
  const {
    mutate,
    isPending: savingShipping,
    error,
  } = useMutation({
    mutationFn: addShippingData,
    onSuccess: (d) => {
      setOrderNavegation('finish')
    },
  })
  console.log(error)
  const { data, isPending } = useQuery({
    queryFn: getCountry,
    queryKey: ['country'],
    refetchOnWindowFocus: false,
  })

  const shippingInfo = createOrderState((state) => state.shippingInfo)
  const orderId = createOrderState((state) => state.orderId)
  const contactOrder = createOrderState((state) => state.contact)
  const setShippingInfo = createOrderState((state) => state.setShippingInfo)
  const clientName = contactOrder.firstName
    ? `${contactOrder.firstName} ${contactOrder.lastName}`
    : ''
  console.log(shippingInfo, contactOrder)

  const defaultValues = {
    name: shippingInfo.name ?? clientName,
    documentNumber:
      shippingInfo.documentNumber ?? contactOrder.documentNumber ?? '',
    phone: shippingInfo.phone ?? contactOrder.phone ?? '',
    country: 'Honduras',
    state: '',
    city: '',
    zone: '',
    street: '',
    reference: '',
  }
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<createShippingInfoSchema>({
    resolver: zodResolver(ZCreateShippingInfo),
    defaultValues,
  })

  const defaultCountry = { states: [], cities: [], zones: [] }
  const { states, cities, zones } = data
    ? getCountrySelect({ country: data, state: stateSelect, city: citySelect })
    : defaultCountry

  const submitShipping = (form: createShippingInfoSchema) => {
    const shippingData = {
      ...form,
      state: stateSelect,
      city: citySelect,
      zone: zoneSelect,
    }
    setShippingInfo(shippingData)
    if (!orderId) {
      toast.error('No se encontro la orden.')
      return
    }
    mutate({ id: orderId, form: shippingData })
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitShipping)}>
        <p className="font-semibold">Datos de envío</p>
        <div className="mt-5 flex gap-4 flex-wrap">
          <div>
            <Autocomplete
              label="Departamento"
              placeholder="Seleccione el departamento"
              className="max-w-xs"
              labelPlacement="outside"
              variant="bordered"
              isLoading={isPending}
              selectedKey={stateSelect}
              onSelectionChange={(st) => {
                setStateSelect(st?.toString() ?? '')
              }}
              required
              isRequired
            >
              {states.map((st) => (
                <AutocompleteItem key={st} value={st}>
                  {st}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
          <div>
            <Autocomplete
              label="Municipio"
              placeholder="Seleccione el municipio"
              className="max-w-xs"
              labelPlacement="outside"
              variant="bordered"
              selectedKey={citySelect}
              onSelectionChange={(ct) => {
                setCitySelect(ct?.toString() ?? '')
              }}
              required
              isRequired
            >
              {cities.map((st) => (
                <AutocompleteItem key={st} value={st}>
                  {st}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
          <div>
            <Autocomplete
              label="Zona o poblado"
              placeholder="Seleccione el problado"
              className="max-w-xs"
              labelPlacement="outside"
              variant="bordered"
              selectedKey={zoneSelect}
              onSelectionChange={(zn) => {
                setZoneSelect(zn?.toString() ?? '')
              }}
              required
              isRequired
            >
              {zones.map((st) => (
                <AutocompleteItem key={st} value={st}>
                  {st}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-5">
          <div className="grid gap-2">
            <Controller
              name="street"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Nombre de tu barrio o colonia."
                  label="Dirección exacta"
                  variant="bordered"
                  labelPlacement="outside"
                  required
                  isRequired
                />
              )}
            />
            <Controller
              name="reference"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Casa x color, frente a edificio x."
                  label="Punto de referencia"
                  labelPlacement="outside"
                  variant="bordered"
                />
              )}
            />
          </div>
          <div>
            <p className="text-sm font-semibold mb-2 ">
              Contacto de quien recibe
            </p>
            <div className="grid gap-2">
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Ej: Maria"
                    label="Nombre"
                    labelPlacement="outside"
                    variant="bordered"
                    required
                    isRequired
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Ej: 98158066"
                    label="Telefono"
                    labelPlacement="outside"
                    variant="bordered"
                    type="number"
                    required
                    isRequired
                  />
                )}
              />
              <Controller
                name="documentNumber"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Ej: 0609199900123"
                    label="Cedula"
                    labelPlacement="outside"
                    variant="bordered"
                    type="number"
                    required
                    isRequired
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className=" flex justify-end items-end flex-col  fill-white mt-5">
          <Button color="primary" type="submit">
            {savingShipping ? (
              <div className=" animate-spin">
                <Spinner size={16} fill="#fff" />
              </div>
            ) : (
              <SaveDiskSVG size={16} />
            )}
            Guardar y continuar
          </Button>
        </div>
      </form>
    </>
  )
}
