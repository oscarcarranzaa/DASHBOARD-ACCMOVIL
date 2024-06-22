import SelectProduct from '@/components/products/selectProduct'
import { usePublishStore } from '@/store/publish'
import { getProductImageSchema } from '@/types/poducts'
import { get } from 'http'
import { useEffect, useState } from 'react'

type TProps = {
  terms: {
    id: string
    name: string
  }[]
  termGroupID: string
}
export default function DisplayItemsVariations({ terms, termGroupID }: TProps) {
  const getVariations = usePublishStore((state) => state.variations)
  const getAttribute = usePublishStore((state) => state.attributes)
  console.log(getVariations)
  const setVariation = usePublishStore((state) => state.setVariation)

  const initialProduct =
    getVariations?.find((variation) => {
      const variationsAtt = variation.attributes.sort()
      const termsAtt = terms.map((term) => term.id).sort()

      return variationsAtt.every((att, index) => att === termsAtt[index])
    })?.product ?? null
  const [openSelect, setOpenSelect] = useState(false)
  const [selectedProduct, setSelectedProduct] =
    useState<getProductImageSchema | null>(initialProduct)

  useEffect(() => {
    document.body.style.overflow = openSelect ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [openSelect])

  /*function saveVariation(value: getProductImageSchema) {
    setSelectedProduct(value)
    const attribute = terms.map((term) => term.id)
    if (initialProduct) {
      const newVariation =
        getVariations?.map((variation) => {
          const variationsAtt = variation.attributes.sort()
          const termsAtt = terms.map((term) => term.id).sort()
          if (variationsAtt.every((att, index) => att === termsAtt[index])) {
            return { product: value, attributes: attribute }
          }
          return variation
        }) ?? []  
      setVariation(newVariation)
      return
    }
    const setVariationsValues = getVariations
      ? [...getVariations, { product: value, attributes: attribute }]
      : [{ product: value, attributes: attribute }]
    setVariation(setVariationsValues)
    return
  }*/

  return (
    <>
      {openSelect && (
        <SelectProduct
          open={setOpenSelect}
          selectedProduct={selectedProduct ? selectedProduct : undefined}
          onSelectProduct={(value) => {
            //saveVariation(value)
          }}
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
