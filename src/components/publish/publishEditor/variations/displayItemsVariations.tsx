import SelectProduct from '@/components/products/selectProduct'
import { getProductImageSchema } from '@/types/poducts'
import { useEffect, useState } from 'react'

type TProps = {
  terms: {
    id: string
    name: string
  }[]
  termGroupID: string
}
export default function DisplayItemsVariations({ terms, termGroupID }: TProps) {
  const [openSelect, setOpenSelect] = useState(false)
  const [selectedProduct, setSelectedProduct] =
    useState<getProductImageSchema | null>(null)
  useEffect(() => {
    document.body.style.overflow = openSelect ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [openSelect])
  console.log(selectedProduct)
  return (
    <>
      {openSelect && (
        <SelectProduct
          open={setOpenSelect}
          onSelectProduct={(value) => setSelectedProduct(value)}
        />
      )}
      <div
        className="bg-zinc-800 border-b border-zinc-700  p-3 text-zinc-300"
        onClick={() => setOpenSelect(true)}
      >
        <div className=" ml-2 flex  items-center">
          {terms.map((term, index) => {
            const isGroupTerm = term.id === termGroupID
            if (isGroupTerm) {
              return null
            }

            return (
              <div key={term.id} className=" flex">
                <p>{term.name}</p>
                {index === terms.length - 1 ? null : (
                  <p className=" px-2"> • </p>
                )}
              </div>
            )
          })}
        </div>
        {selectedProduct && (
          <div className="flex items-center">
            <p className="text-xs text-green-500 line-clamp-1">
              {selectedProduct.code}
            </p>
          </div>
        )}
      </div>
    </>
  )
}
