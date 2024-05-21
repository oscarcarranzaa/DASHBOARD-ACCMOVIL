'use client'
import { getOneProduct } from '@/api/products'
import NotFound from '@/components/errorsPages/notFound'
import NavegationPages from '@/components/navegationPages'
import ViewProduct from '@/components/products/viewProduct/'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export default function ProductDetails() {
  const params = useParams()
  const { productID } = params as { productID: string }
  const { data, error } = useQuery({
    queryKey: [productID],
    queryFn: () => getOneProduct(productID),
    retry: false,
    refetchOnWindowFocus: false,
  })
  if (error) return <NotFound message={error.message} />

  return (
    <>
      <NavegationPages text="Detalles del producto" />
      {data && <ViewProduct data={data} />}
    </>
  )
}
