import { checkCouponCode } from '@/api/offerts'
import ArrowSVG from '@/components/icons/arrow'
import Coupon from '@/components/icons/coupon'
import { createOrderState } from '@/store/order'
import { Input, Button } from '@nextui-org/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type TCode = {
  code: string
}
export default function RendeemCoupon() {
  const defaultValues = {
    code: '',
  }
  const addCoupon = createOrderState((state) => state.addCoupon)
  const removeCoupon = createOrderState((state) => state.removeCoupon)
  const coupon = createOrderState((state) => state.coupon)
  const { handleSubmit, control, reset } = useForm<TCode>({
    defaultValues,
  })
  const { mutate, error } = useMutation({
    mutationFn: checkCouponCode,
    onSuccess: (success) => {
      addCoupon({
        code: success.code,
        discount: success.discount,
        minimumExpense: success.minimumExpense ?? null,
        maximumExpense: success.maximumExpense ?? null,
      })
      reset()
      toast.success(`Se aplicó el código ${success.code} a su pedido.`)
    },
    onError: () => {
      reset()
    },
  })
  const submitCode = (form: TCode) => {
    mutate(form)
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <form onSubmit={handleSubmit(submitCode)}>
          <Controller
            name="code"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                isClearable
                placeholder="Escribe tu cupón"
                label="Cupón"
                labelPlacement="outside"
                isDisabled={!!coupon}
                variant="bordered"
                className="w-full  stroke-white"
                endContent={
                  <Button
                    isIconOnly
                    type="submit"
                    className="  rounded-full w-8 h-8"
                    variant="flat"
                  >
                    <div className="rotate-180">
                      <ArrowSVG size={20} />
                    </div>
                  </Button>
                }
              />
            )}
          />
          {coupon && (
            <div className=" flex w-full justify-between border-2 dark:border-zinc-700  border-zinc-300 p-1 px-2 mt-3">
              <div className=" flex items-center">
                <div className=" fill-green-500 mr-1">
                  <Coupon size={20} />
                </div>
                <p className=" font-medium">
                  {coupon.code} (- {coupon.discount} %)
                </p>
              </div>
              <button className=" text-red-500 text-sm" onClick={removeCoupon}>
                Remover
              </button>
            </div>
          )}
          {error && (
            <p className="text-xs mt-2 ml-2 text-red-500 font-semibold">
              {error.message}
            </p>
          )}
        </form>
      </div>
    </>
  )
}
