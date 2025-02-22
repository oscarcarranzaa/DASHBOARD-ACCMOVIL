import { getAllCustomer } from '@/api/customer'
import { getAllProducts } from '@/api/products'
import DisplayPrice from '@/components/displayPrice'
import CloseSVG from '@/components/icons/close'
import { CustomerProfileSVG } from '@/components/icons/customerProfile'
import SquareImage from '@/components/squareImage'
import Search from '@/components/UI/search'
import useOutsideClick from '@/hooks/useOutSideClick'
import { customerSchema } from '@/types/customer'
import { addProductOrderSchema } from '@/types/order'
import { productSchema } from '@/types/products'
import { Avatar, Spinner } from "@heroui/react"
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

interface IProps {
  closeModal: () => void
  setValue?: (product: productSchema) => void
  openModal: boolean
}

export default function ProductSelect({
  openModal,
  closeModal,
  setValue,
}: IProps) {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const search = searchParams.get('SearchProduct') || ''
  const ref = useRef<HTMLElement>(null)

  const { data, isPending, error } = useQuery({
    queryKey: ['product', currentPage.toString(), search],
    queryFn: () => getAllProducts(currentPage.toString(), '30', search),
    refetchOnWindowFocus: false,
    retry: false,
  })

  useEffect(() => {
    if (openModal) {
      document.body.classList.add('overflow-hidden')
      return
    }
    document.body.classList.remove('overflow-hidden')
  }, [openModal])
  useOutsideClick(ref, () => closeModal())

  return (
    <div
      className={`fixed w-screen h-screen top-0 bottom-0 left-0 right-0 z-50 ${openModal ? '' : 'hidden'}`}
      style={{
        backgroundColor: 'var(--box-opacity)',
      }}
    >
      <div
        className="dark:fill-white float-right w-[500px] border-l border-zinc-500 dark:bg-zinc-900 bg-zinc-100 h-full p-5 flex flex-col"
        ref={ref as React.MutableRefObject<HTMLDivElement>}
      >
        <div className="flex justify-between items-center mb-3">
          <p className="font-semibold text-lg">Seleccionar productos</p>
          <button onClick={() => closeModal()}>
            <CloseSVG size={18} />
          </button>
        </div>
        <div className="w-full border-b border-zinc-500 pb-2 mb-3">
          <Search
            searchName="SearchProduct"
            placeHolder="Buscar producto"
            styles="w-full"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <ul>
            {data && data.data.length === 0 ? (
              <div className="w-full mt-10 flex justify-center">
                <div className="flex flex-col items-center">
                  <p className="text-xs opacity-70 mt-2">
                    No se encontraron resultados...
                  </p>
                </div>
              </div>
            ) : (
              ''
            )}
            {data?.data.map((results) => (
              <li key={results.id}>
                <button
                  className="w-full"
                  onClick={() => {
                    if (setValue) setValue(results)
                    closeModal()
                  }}
                >
                  <div className="flex gap-3 justify-between items-center dark:bg-zinc-950 bg-white p-1 rounded-md mt-1 border-2 border-transparent hover:border-primary text-left">
                    <div className="flex gap-2">
                      <div className="flex-none w-20">
                        <SquareImage src={results.media?.qualities[0].src} />
                      </div>
                      <div>
                        <p className="text-sm font-medium line-clamp-2">
                          {results.name}
                        </p>
                        <p className="text-xs opacity-70">
                          SKU: {results.sku ?? 'N/D'}
                        </p>
                        <p
                          className={`text-xs opacity-70 ${results.stock === 0 ? 'text-red-500' : 'text-green-700'}`}
                        >
                          Disponible: {results.stock} UND
                        </p>
                      </div>
                    </div>
                    <div>
                      <DisplayPrice
                        price={results.price}
                        discountPrice={results.discountPrice}
                        startDate={results.startDiscount}
                        endDate={results.endDiscount}
                      />
                    </div>
                  </div>
                </button>
              </li>
            ))}
            {isPending && (
              <div className="w-full mt-10 flex justify-center">
                <div className="flex flex-col items-center">
                  <Spinner />
                  <p className="text-xs opacity-70 mt-2">
                    Recuperando datos...
                  </p>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
