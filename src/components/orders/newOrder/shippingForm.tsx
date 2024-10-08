import { getCountry } from '@/api/order'
import { useQuery } from '@tanstack/react-query'

export default function ShippingOrderForm() {
  const { data, isPending } = useQuery({
    queryFn: getCountry,
    queryKey: ['country'],
  })

  return (
    <>
      <div>
        <p className="font-semibold">Datos de envío</p>
      </div>
    </>
  )
}
