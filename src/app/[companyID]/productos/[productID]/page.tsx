'use client'
import { getOneProduct } from '@/api/products'
import ErrorsPages from '@/components/errorsPages'
import NotFound from '@/components/errorsPages/notFound'
import NavegationPages from '@/components/navegationPages'
import ViewProduct from '@/components/products/viewProduct/'
import ViewProductSkeleton from '@/components/products/viewProduct/skeleton'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export default function ProductDetails() {
  const params = useParams()
  const { productID } = params as { productID: string }
  const { data, error, isPending } = useQuery({
    queryKey: [productID],
    queryFn: () => getOneProduct(productID),
    retry: false,
    refetchOnWindowFocus: false,
  })

  if (error)
    return <ErrorsPages message={error.message} errorRef={error.cause} />

  return (
    <>
      <NavegationPages text="Detalles del producto" />
      {isPending && <ViewProductSkeleton />}
      {data && <ViewProduct data={data} />}
    </>
  )
}
