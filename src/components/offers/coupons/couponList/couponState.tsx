import { handleStateCoupon } from '@/api/offerts'
import Spinner from '@/components/icons/spinner'
import { Switch } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'

export default function CouponState({
  status,
  id,
}: {
  status: boolean
  id: string
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: handleStateCoupon,
    onSuccess: () => {
      console.log('success')
    },
  })
  return (
    <>
      <Switch
        color="success"
        isSelected={status}
        thumbIcon={() => (isPending ? <Spinner size={18} fill="#000" /> : null)}
        isDisabled={isPending}
        onChange={() => mutate({ status: !status, id })}
      />
    </>
  )
}
