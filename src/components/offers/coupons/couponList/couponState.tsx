import { handleStateCoupon } from '@/api/offerts'
import Spinner from '@/components/icons/spinner'
import { Switch } from "@heroui/react"
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

export default function CouponState({
  status,
  id,
}: {
  status: boolean
  id: string
}) {
  const [selected, setSelected] = useState(status)
  const { mutate, isPending } = useMutation({
    mutationFn: handleStateCoupon,
    onSuccess: (coupon) => {
      const active = coupon.isActive ? 'ACTIVADO' : 'DESACTIVADO'
      setSelected(coupon.isActive)
      toast.success(`El cupón ${coupon.code} ha sido ${active}.`)
    },
    onError: () => {
      toast.error('Error al cambiar el estado del cupón.')
    },
  })
  return (
    <>
      <Switch
        color="success"
        isSelected={selected}
        thumbIcon={() => (isPending ? <Spinner size={18} fill="#000" /> : null)}
        isDisabled={isPending}
        onChange={() => mutate({ status: !selected, id })}
      />
    </>
  )
}
