'use client'
import { createCoupon } from '@/api/offerts'
import Spinner from '@/components/icons/spinner'
import { createCouponSchema, ZCreateCoupon } from '@/types/offers'
import { zodResolver } from '@hookform/resolvers/zod'
import { getLocalTimeZone } from '@internationalized/date'
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
} from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
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
  discount: '',
  expiresAt: '',
  minimumExpense: '',
  maximumExpense: '',
  usageLimit: '',
  userLimit: '',
}
export default function CouponEditor() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<createCouponFormSchema>({
    resolver: zodResolver(ZCreateCoupon),
    defaultValues,
  })
  const { mutate, isPending } = useMutation({
    mutationFn: createCoupon,
    onSuccess: (data) => {
      console.log(data)
      reset()
      onClose()
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const submitCoupon = (form: createCouponFormSchema) => {
    const processedForm: createCouponSchema = {
      ...form,
      discount: Number(form.discount),
      minimumExpense: form.minimumExpense
        ? Number(form.minimumExpense)
        : undefined,
      maximumExpense: form.maximumExpense
        ? Number(form.maximumExpense)
        : undefined,
      usageLimit: form.usageLimit ? Number(form.usageLimit) : undefined,
      userLimit: form.userLimit ? Number(form.userLimit) : undefined,
    }
    mutate(processedForm)
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
                              isClearable
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
                            render={({ field }) => (
                              <Input
                                {...field}
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
                          <Controller
                            name="expiresAt"
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                onChange={(val) => {
                                  setValue(
                                    'expiresAt',
                                    val.toDate(getLocalTimeZone()).toISOString()
                                  )
                                }}
                                label="Fecha de expiración"
                                variant="bordered"
                                labelPlacement="outside"
                              />
                            )}
                          />
                        </div>
                      </div>
                    </Tab>
                    <Tab key="restric" title="Restricciones">
                      <div className=" flex gap-5 mt-5">
                        <Controller
                          name="minimumExpense"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
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
                          render={({ field }) => (
                            <Input
                              {...field}
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
                          render={({ field }) => (
                            <Input
                              {...field}
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
                          render={({ field }) => (
                            <Input
                              {...field}
                              isInvalid={!!errors.userLimit?.message}
                              errorMessage={errors.userLimit?.message}
                              placeholder="Ej: 1"
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
