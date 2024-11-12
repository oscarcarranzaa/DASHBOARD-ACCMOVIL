'use client'
import { getCountry, updateOrderData } from '@/api/order'
import Spinner from '@/components/icons/spinner'
import {
  billingInfoSchema,
  orderEditShema,
  shippingInfoSchema,
  ZOrderEdit,
} from '@/types/order'
import getCountrySelect from '@/utils/getCountrySelect'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Tab,
  Tabs,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'sonner'

type TProps = {
  shippingInfo?: shippingInfoSchema | null
  billingInfo?: billingInfoSchema | null
}
export default function OrderEdit({ shippingInfo, billingInfo }: TProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [withRtn, setWithRtn] = useState(false)
  const [stateSelect, setStateSelect] = useState<string>(
    shippingInfo?.state ?? ''
  )
  const [citySelect, setCitySelect] = useState<string>(shippingInfo?.city ?? '')
  const [zoneSelect, setZoneSelect] = useState<string>(shippingInfo?.zone ?? '')

  const queryClient = useQueryClient()

  const { data, isPending } = useQuery({
    queryFn: getCountry,
    queryKey: ['country'],
    refetchOnWindowFocus: false,
  })
  const defaultCountry = { states: [], cities: [], zones: [] }
  const { states, cities, zones } = data
    ? getCountrySelect({ country: data, state: stateSelect, city: citySelect })
    : defaultCountry

  const defaultValues = {
    shippingInfo: {
      name: shippingInfo?.name ?? '',
      documentNumber: shippingInfo?.documentNumber ?? '',
      phone: shippingInfo?.phone ?? '',
      country: 'Honduras',
      state: '',
      city: '',
      zone: '',
      street: shippingInfo?.street ?? '',
      reference: shippingInfo?.reference ?? '',
    },
    billingInfo: {
      firstName: billingInfo?.firstName ?? '',
      lastName: billingInfo?.lastName ?? '',
      email: billingInfo?.email,
      phone: billingInfo?.phone ?? '',
      documentNumber: billingInfo?.documentNumber ?? '',
      rtn: billingInfo?.rtn ?? '',
      companyName: billingInfo?.companyName ?? '',
      companyPhone: billingInfo?.companyPhone ?? '',
      company: billingInfo?.company ?? '',
    },
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<orderEditShema>({
    resolver: zodResolver(ZOrderEdit),
    defaultValues,
  })
  const { mutate, isPending: pendingUpdate } = useMutation({
    mutationFn: updateOrderData,
    onSuccess: () => {
      toast.success('Pedido actualizado.')
      onClose()
      if (billingInfo) {
        queryClient.invalidateQueries({
          queryKey: ['order', billingInfo.orderId, 'details'],
        })
      }
    },
    onError: () => {
      toast.error('Ocurrio un error al actualizar datos del pedido')
    },
  })
  const sendUpdateOrder = (form: orderEditShema) => {
    const { shippingInfo: shippingData } = form
    const shipping = {
      ...shippingData,
      state: stateSelect,
      city: citySelect,
      zone: zoneSelect,
    }
    const orderUpdateData = {
      shippingInfo: shipping,
      billingInfo: form.billingInfo,
    }
    if (billingInfo?.orderId) {
      mutate({ id: billingInfo.orderId, orderUpdate: orderUpdateData })
    }
  }
  return (
    <div>
      <Button color="primary" variant="flat" onPress={onOpen}>
        Editar pedido
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Editar orden</ModalHeader>
              <form onSubmit={handleSubmit(sendUpdateOrder)}>
                <div className="px-5  gap-y-3">
                  <Tabs
                    aria-label="Options"
                    fullWidth
                    color="primary"
                    variant="underlined"
                    className="text-red-500"
                  >
                    <Tab key="billing" title="Contacto">
                      <div className="flex flex-col gap-3">
                        <div>
                          <Controller
                            name="billingInfo.email"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Correo electronico"
                                label="Correo"
                                type="email"
                                readOnly
                                isDisabled
                                required
                                isRequired
                              />
                            )}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Controller
                            name="billingInfo.firstName"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Ej: Juan"
                                label="Nombres"
                                required
                                isRequired
                              />
                            )}
                          />
                          <Controller
                            name="billingInfo.lastName"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Ej: Cruz"
                                label="Apellidos"
                                required
                                isRequired
                              />
                            )}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Controller
                            name="billingInfo.documentNumber"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Ej: 0609199900123"
                                label="Cedula"
                                required
                                isRequired
                              />
                            )}
                          />
                          <Controller
                            name="billingInfo.phone"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Ej: 98158066"
                                label="Telefono"
                                errorMessage={
                                  errors.billingInfo?.phone?.message
                                }
                                isInvalid={!!errors.billingInfo?.phone}
                                required
                                isRequired
                              />
                            )}
                          />
                        </div>
                        <div className="mt-5 ">
                          <Switch
                            isSelected={withRtn}
                            onValueChange={setWithRtn}
                          >
                            <p className=" text-sm font-medium">
                              Facturar con RTN
                            </p>
                          </Switch>
                        </div>
                        <div
                          className={`${!withRtn && 'hidden'} flex flex-col gap-3`}
                        >
                          <div className="flex gap-2">
                            <Controller
                              name="billingInfo.company"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  label="Razon social"
                                  {...field}
                                  placeholder="Ej: Tecnología"
                                />
                              )}
                            />
                            <Controller
                              name="billingInfo.companyName"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  label="Nombre de la empresa"
                                  {...field}
                                  placeholder="Ej: ACME"
                                />
                              )}
                            />
                          </div>
                          <div className="flex gap-3">
                            <Controller
                              name="billingInfo.companyPhone"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  placeholder="Ej: 98158066"
                                  label="Teléfono de la empresa"
                                />
                              )}
                            />
                            <Controller
                              name="billingInfo.rtn"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  placeholder="Ej: 06091999001231"
                                  label="RTN"
                                />
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab key="shipping" title="Envío">
                      <div className="flex gap-4 justify-between">
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

                      <div className="mt-10 grid grid-cols-2 gap-7">
                        <div className="grid gap-2">
                          <Controller
                            name="shippingInfo.street"
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
                            name="shippingInfo.reference"
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
                          <p className=" font-semibold mb-3 ">
                            Contacto de quien recibe
                          </p>
                          <div className="grid gap-2">
                            <Controller
                              name="shippingInfo.name"
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
                              name="shippingInfo.phone"
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  placeholder="Ej: 98158066"
                                  label="Telefono"
                                  labelPlacement="outside"
                                  errorMessage={
                                    errors.shippingInfo?.phone?.message
                                  }
                                  isInvalid={!!errors.shippingInfo?.phone}
                                  variant="bordered"
                                  type="number"
                                  required
                                  isRequired
                                />
                              )}
                            />
                            <Controller
                              name="shippingInfo.documentNumber"
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
                    </Tab>
                  </Tabs>
                </div>
                <ModalFooter>
                  <Button className=" min-w-32" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    className=" min-w-32"
                    color="primary"
                    type="submit"
                    disabled={pendingUpdate}
                  >
                    {pendingUpdate ? (
                      <div className=" animate-spin">
                        <Spinner size={24} fill="#fff" />
                      </div>
                    ) : (
                      'Actualizar'
                    )}
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
