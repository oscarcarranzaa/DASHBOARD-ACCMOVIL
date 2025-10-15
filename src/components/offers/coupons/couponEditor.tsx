'use client'
import { createCoupon } from '@/api/offerts'
import Spinner from '@/components/icons/spinner'
import {
  createCouponSchema,
  createCouponSchemaInput,
  ZCreateCoupon,
} from '@/types/offers'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarDate, getLocalTimeZone } from '@internationalized/date'
import {
  Button,
  DatePicker,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
  DateValue,
} from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

type createCouponFormSchema = {
  code: string
  discount: string
  minimumExpense?: string
  maximumExpense?: string
  usageLimit?: string
  userLimit?: string
  expiresAt?: string
}
const defaultValues = {
  code: '',
  discount: 0, // number
  expiresAt: null, // string | null
  minimumExpense: null, // number | null
  maximumExpense: null, // number | null
  usageLimit: null, // number | null
  userLimit: null, // number | null
}
export default function CouponEditor() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [expires, setExpires] = useState<DateValue | null>()

  const queryClient = useQueryClient()
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<createCouponSchemaInput>({
    resolver: zodResolver(ZCreateCoupon),
    defaultValues,
  })
  const { mutate, isPending, error } = useMutation({
    mutationFn: createCoupon,
    onSuccess: (data) => {
      reset()
      setExpires(undefined)
      queryClient.invalidateQueries({ queryKey: ['coupons'] })
      onClose()
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const submitCoupon = (form: createCouponSchemaInput) => {
    const processed = {
      ...form,
      discount: Number(form.discount),
      minimumExpense:
        form.minimumExpense != null ? Number(form.minimumExpense) : null,
      maximumExpense:
        form.maximumExpense != null ? Number(form.maximumExpense) : null,
      usageLimit: form.usageLimit != null ? Number(form.usageLimit) : null,
      userLimit: form.userLimit != null ? Number(form.userLimit) : null,
    }
    if (
      processed.minimumExpense != null &&
      processed.maximumExpense != null &&
      processed.minimumExpense >= processed.maximumExpense
    ) {
      setError('minimumExpense', {
        type: 'manual',
        message: 'El gasto mínimo no puede ser mayor o igual que el máximo',
      })
      return
    }

    if (
      processed.userLimit != null &&
      processed.usageLimit != null &&
      processed.userLimit >= processed.usageLimit
    ) {
      setError('userLimit', {
        type: 'manual',
        message:
          'El límite por usuario no puede ser mayor o igual que el límite de uso',
      })
      return
    }

    mutate(processed)
  }

  return (
    <div>
      <Button color="primary" onPress={onOpen}>
        Nuevo Cupon
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center"
        isDismissable={false}
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Crear nuevo cupon</ModalHeader>
              <form onSubmit={handleSubmit(submitCoupon)}>
                <div className="px-5  gap-y-3">
                  <Tabs
                    aria-label="Options"
                    fullWidth
                    color="primary"
                    variant="underlined"
                    className="text-red-500"
                  >
                    <Tab key="general" title="General">
                      <div className="mt-11">
                        <Controller
                          name="code"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              isInvalid={!!errors.code?.message}
                              errorMessage={errors.code?.message}
                              label="Codigo de descuento."
                              labelPlacement="outside"
                              placeholder="Ej: PROMO1"
                              maxLength={20}
                              variant="bordered"
                              isRequired
                              required
                            />
                          )}
                        />
                        <div className=" flex gap-5 mt-5">
                          <Controller
                            name="discount"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, ...field } }) => (
                              <Input
                                {...field}
                                value={value ? value.toString() : ''}
                                errorMessage={errors.discount?.message}
                                isInvalid={!!errors.discount?.message}
                                placeholder="Ej: 20"
                                label="Importe en porcentaje (%)"
                                variant="bordered"
                                labelPlacement="outside"
                                type="number"
                                isRequired
                                required
                              />
                            )}
                          />
                          <DatePicker
                            value={expires}
                            onChange={(val) => {
                              if (val) {
                                const date = val.toDate(getLocalTimeZone())
                                setValue('expiresAt', date.toISOString())
                                setExpires(val)
                              } else {
                                setValue('expiresAt', undefined)
                                setExpires(null)
                              }
                            }}
                            label="Fecha de expiración"
                            variant="bordered"
                            labelPlacement="outside"
                          />
                        </div>
                      </div>
                    </Tab>
                    <Tab key="restric" title="Restricciones">
                      <div className=" flex gap-5 mt-5">
                        <Controller
                          name="minimumExpense"
                          control={control}
                          render={({ field: { value, ...field } }) => (
                            <Input
                              {...field}
                              value={value ? value.toString() : ''}
                              placeholder="Ej: 399"
                              isInvalid={!!errors.minimumExpense?.message}
                              errorMessage={errors.minimumExpense?.message}
                              label="Gasto mínimo (HNL)"
                              variant="bordered"
                              labelPlacement="outside"
                              type="number"
                            />
                          )}
                        />
                        <Controller
                          name="maximumExpense"
                          control={control}
                          render={({ field: { value, ...field } }) => (
                            <Input
                              {...field}
                              value={value ? value.toString() : ''}
                              placeholder="Ej: 10,000"
                              label="Gastos máximo (HNL)"
                              labelPlacement="outside"
                              type="number"
                              variant="bordered"
                            />
                          )}
                        />
                      </div>
                      <div className=" flex gap-5 mt-5">
                        <Controller
                          name="usageLimit"
                          control={control}
                          render={({ field: { value, ...field } }) => (
                            <Input
                              {...field}
                              value={value ? value.toString() : ''}
                              placeholder="Ej: 50"
                              label="Cantidad a canjear (Veces)"
                              labelPlacement="outside"
                              type="number"
                              variant="bordered"
                            />
                          )}
                        />
                        <Controller
                          name="userLimit"
                          control={control}
                          render={({ field: { value, ...field } }) => (
                            <Input
                              {...field}
                              value={value ? value.toString() : ''}
                              isInvalid={!!errors.userLimit?.message}
                              errorMessage={errors.userLimit?.message}
                              placeholder="1 vez por defecto"
                              label="Canje por usuario (Veces)"
                              labelPlacement="outside"
                              variant="bordered"
                              type="number"
                            />
                          )}
                        />
                      </div>
                    </Tab>
                  </Tabs>
                  {error && (
                    <p className="text-xs mt-2 ml-2 text-red-500 font-semibold">
                      {error.message}
                    </p>
                  )}
                </div>
                <ModalFooter>
                  <Button className=" min-w-32" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    className=" min-w-32"
                    color="primary"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <div className=" animate-spin">
                        <Spinner size={24} fill="#fff" />
                      </div>
                    ) : (
                      'Crear'
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
