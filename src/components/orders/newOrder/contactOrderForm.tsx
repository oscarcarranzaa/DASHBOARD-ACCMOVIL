'use client'
import { createOrder, updateContactOrder, updateOrder } from '@/api/order'
import SaveDiskSVG from '@/components/icons/saveDisk'
import Spinner from '@/components/icons/spinner'
import { createOrderState } from '@/store/order'
import { newBillingInfoSchema, ZNewBillingInfo } from '@/types/order'
import { zodResolver } from '@hookform/resolvers/zod'
import { addToast, Button, Input, Switch } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function ContactOrderForm() {
  const contactOrder = createOrderState((state) => state.contact)
  const setContactOrder = createOrderState((state) => state.setContact)
  const setNavegationOrder = createOrderState((state) => state.navegation)
  const resetContact = createOrderState((state) => state.resetContact)
  const setCompletedNavegation = createOrderState(
    (state) => state.setCompletedNavegation
  )
  const orderNavegation = createOrderState((state) => state.orderNavegation)

  const [withRtn, setWithRtn] = useState(!!contactOrder.rtn)

  const { mutate, isPending } = useMutation({
    mutationFn: updateContactOrder,
    onSuccess: (success) => {
      setContactOrder({
        name: success.name,
        email: success.email,
        documentNumber: success.documentNumber,
        phone: success.phone,
        rtn: success.rtn,
        companyName: success.companyName,
        companyPhone: success.companyPhone,
        company: success.company,
        withRtn,
        typeContact: contactOrder.typeContact,
      })
      setNavegationOrder('shipping')
      setCompletedNavegation(orderNavegation)
    },
    onError: (err) => {
      addToast({
        color: 'danger',
        variant: 'bordered',
        timeout: 5000,
        title: 'Ocurrió un error',
        description: err.message,
      })
    },
  })

  const defaultValues = {
    name: contactOrder.name ?? '',
    email: contactOrder.email,
    phone: contactOrder.phone ?? '',
    documentNumber: contactOrder.documentNumber ?? '',
    rtn: contactOrder.rtn ?? '',
    companyName: contactOrder.companyName ?? '',
    companyPhone: contactOrder.companyPhone ?? '',
    company: contactOrder.company ?? '',
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<newBillingInfoSchema>({
    resolver: zodResolver(ZNewBillingInfo),
    defaultValues,
  })

  const submitForm = (form: newBillingInfoSchema) => {
    const billingInfo = {
      customerId: contactOrder.customerId,
      name: form.name,
      email: form.email,
      documentNumber: form.documentNumber ?? '',
      phone: form.phone ?? '',
      rtn: form.rtn,
      companyPhone: form.companyPhone,
      companyName: form.companyName,
      company: form.company,
    }
    mutate(billingInfo)
  }

  return (
    <>
      <form
        className="flex flex-col gap-5 mt-5"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="flex gap-2">
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Ej: Juan"
                label="Nombre"
                labelPlacement="outside"
                required
                variant="bordered"
                isRequired
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                labelPlacement="outside"
                label="Correo electrónico"
                variant="bordered"
                value={field.value ?? ''}
                placeholder="Correo electronico"
                type="email"
              />
            )}
          />
        </div>

        <div className="flex gap-2">
          <Controller
            name="documentNumber"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                labelPlacement="outside"
                label="Cedula"
                variant="bordered"
                placeholder="Ej: 0609199900123"
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
                labelPlacement="outside"
                label="Telefono"
                variant="bordered"
                value={field.value ?? ''}
                placeholder="Ej: 98158066"
                errorMessage={errors.phone?.message}
                isInvalid={!!errors.phone}
              />
            )}
          />
        </div>
        <div className="mt-10 ">
          <Switch isSelected={withRtn} onValueChange={setWithRtn}>
            <p className=" text-sm font-medium">Facturar con RTN</p>
          </Switch>
        </div>
        {withRtn && (
          <div className={`flex flex-col gap-3`}>
            <div className="flex gap-2">
              <Controller
                name="rtn"
                control={control}
                render={({ field }) => (
                  <Input
                    isRequired
                    variant="bordered"
                    {...field}
                    placeholder="Ej: 06091999001231"
                    label="RTN"
                    labelPlacement="outside"
                  />
                )}
              />
              <Controller
                name="company"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Razon social"
                    labelPlacement="outside"
                    {...field}
                    variant="bordered"
                    placeholder="Ej: Tecnología"
                  />
                )}
              />
            </div>
            <div className="flex gap-3">
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Nombre de la empresa"
                    labelPlacement="outside"
                    variant="bordered"
                    {...field}
                    placeholder="Ej: ACME"
                  />
                )}
              />
              <Controller
                name="companyPhone"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Teléfono de la empresa"
                    labelPlacement="outside"
                    variant="bordered"
                    {...field}
                    errorMessage={errors.companyPhone?.message}
                    isInvalid={!!errors.companyPhone}
                    placeholder="Ej: 98158066"
                  />
                )}
              />
            </div>
          </div>
        )}
        <div className=" flex justify-end items-end flex-col  fill-white">
          <div>
            <Button onPress={() => resetContact()} className="mr-2">
              Regresar
            </Button>
            <Button color="primary" type="submit" isDisabled={isPending}>
              {isPending ? (
                <div className=" animate-spin">
                  <Spinner size={12} fill="#fff" />
                </div>
              ) : (
                <SaveDiskSVG size={12} />
              )}
              Guardar y continuar
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}
