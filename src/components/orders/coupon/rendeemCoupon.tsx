import { checkCouponCode, removeOrderCoupon } from '@/api/offerts'
import ArrowSVG from '@/components/icons/arrow'
import Coupon from '@/components/icons/coupon'
import Spinner from '@/components/icons/spinner'
import { createOrderState } from '@/store/order'
import { Input, Button, addToast } from '@heroui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'

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
  const setOrderInfo = createOrderState((state) => state.setOrderInfo)

  const { handleSubmit, control, reset } = useForm<TCode>({
    defaultValues,
  })
  const { mutate, isPending, error } = useMutation({
    mutationFn: checkCouponCode,
    onSuccess: (success) => {
      addCoupon({
        code: success.coupon.code,
        discount: success.coupon.discount,
        minimumExpense: success.coupon.minimumExpense ?? null,
        maximumExpense: success.coupon.maximumExpense ?? null,
      })
      setOrderInfo(success.order)
      reset()
      addToast({
        color: 'success',
        variant: 'bordered',
        timeout: 5000,
        title: 'Éxito',
        description: `Se aplicó el código ${success.coupon.code} a su pedido`,
      })
    },
    onError: () => {
      reset()
    },
  })
  const { mutate: mutateCoupon, isPending: isPendingCoupon } = useMutation({
    mutationFn: removeOrderCoupon,
    onSuccess: (order) => {
      setOrderInfo(order)
      removeCoupon()
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
  const submitCode = (form: TCode) => {
    mutate(form)
  }
  const deleteCoupon = () => {
    mutateCoupon()
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
                    isDisabled={isPending}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <div>
                        <Spinner size={18} fill="#777" />
                      </div>
                    ) : (
                      <div className="rotate-180">
                        <ArrowSVG size={20} />
                      </div>
                    )}
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
              <button
                className=" text-red-500 text-sm"
                onClick={deleteCoupon}
                disabled={isPendingCoupon}
              >
                {isPendingCoupon ? (
                  <div>
                    <Spinner size={18} fill="#777" />
                  </div>
                ) : (
                  'Remover'
                )}
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
