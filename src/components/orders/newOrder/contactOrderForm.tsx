'use client'
import { createOrder, updateContactOrder, updateOrder } from '@/api/order'
import SaveDiskSVG from '@/components/icons/saveDisk'
import Spinner from '@/components/icons/spinner'
import { createOrderState } from '@/store/order'
import { newBillingInfoSchema, ZNewBillingInfo } from '@/types/order'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Switch } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

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
        firstName: success.firstName,
        email: success.email,
        lastName: success.lastName,
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
      toast.error(err.message)
    },
  })

  const defaultValues = {
    firstName: contactOrder.firstName ?? '',
    lastName: contactOrder.lastName ?? '',
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
      firstName: form.firstName ?? '',
      lastName: form.lastName ?? '',
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
        className="flex flex-col gap-3 mt-5"
        onSubmit={handleSubmit(submitForm)}
      >
        <div>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Correo electronico"
                label="Correo"
                type="email"
                readOnly={contactOrder.typeContact === 'customer'}
                isDisabled={contactOrder.typeContact === 'customer'}
                required
                isRequired
              />
            )}
          />
        </div>
        <div className="flex gap-2">
          <Controller
            name="firstName"
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
            name="lastName"
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
            name="documentNumber"
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
            name="phone"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Ej: 98158066"
                label="Telefono"
                errorMessage={errors.phone?.message}
                isInvalid={!!errors.phone}
                required
                isRequired
              />
            )}
          />
        </div>
        <div className="mt-5 ">
          <Switch isSelected={withRtn} onValueChange={setWithRtn}>
            <p className=" text-sm font-medium">Facturar con RTN</p>
          </Switch>
        </div>
        <div className={`${!withRtn && 'hidden'} flex flex-col gap-3`}>
          <div className="flex gap-2">
            <Controller
              name="company"
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
              name="companyName"
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
              name="companyPhone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  errorMessage={errors.companyPhone?.message}
                  isInvalid={!!errors.companyPhone}
                  placeholder="Ej: 98158066"
                  label="Teléfono de la empresa"
                />
              )}
            />
            <Controller
              name="rtn"
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
        <div className=" flex justify-end items-end flex-col  fill-white">
          <div>
            <Button onClick={() => resetContact()} className="mr-2">
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
