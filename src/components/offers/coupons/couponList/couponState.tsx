import { handleStateCoupon } from '@/api/offerts'
import Spinner from '@/components/icons/spinner'
import { addToast, Switch } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

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
      addToast({
        color: 'success',
        variant: 'bordered',
        timeout: 5000,
        title: 'Éxito',
        description: `El cupón ${coupon.code} ha sido ${active}`,
      })
    },
    onError: () => {
      addToast({
        color: 'danger',
        variant: 'bordered',
        timeout: 5000,
        title: 'Error al cambiar el estado del cupón',
      })
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
