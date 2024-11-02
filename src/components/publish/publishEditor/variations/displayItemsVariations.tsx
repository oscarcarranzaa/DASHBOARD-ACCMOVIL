import SelectProduct from '@/components/products/selectProduct'
import SquareImage from '@/components/squareImage'
import { usePublishStore } from '@/store/publish'
import { productSchema } from '@/types/products'
import { useEffect, useState, useCallback } from 'react'

type TProps = {
  terms: {
    id: string
    name: string
  }[]
  termGroupID: string
}

export default function DisplayItemsVariations({ terms, termGroupID }: TProps) {
  const getVariations = usePublishStore((state) => state.variations)
  const setVariations = usePublishStore((state) => state.setVariation)

  const product: productSchema | null =
    getVariations?.find((variation) => {
      const variationsAtt = variation.attributesTerms.map((s) => s.id).sort()
      const termsAtt = terms.map((term) => term.id).sort()
      return variationsAtt.every((att, index) => att === termsAtt[index])
    })?.Product ?? null

  const [openSelect, setOpenSelect] = useState(false)

  useEffect(() => {
    document.body.style.overflow = openSelect ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [openSelect])

  const saveProduct = useCallback(
    (value: productSchema) => {
      const newVariation =
        getVariations?.map((variation) => {
          const variationsAtt = variation.attributesTerms
            .map((s) => s.id)
            .sort()
          const termsAtt = terms.map((term) => term.id).sort()
          if (variationsAtt.every((att, index) => att === termsAtt[index])) {
            return {
              productId: value.id,
              Product: value,
              attributesTerms: terms,
              id: variation.id,
            }
          }
          return variation
        }) ?? []
      setVariations(newVariation)
    },
    [product, getVariations, setVariations, terms]
  )
  const handleDeleteVariation = useCallback(() => {
    const changeStatus =
      getVariations?.filter((variation) => {
        const variationsAtt = variation.attributesTerms
          .map((s) => s.id)
          .sort()
          .toString()
        const termsAtt = terms
          .map((term) => term.id)
          .sort()
          .toString()
        if (variationsAtt === termsAtt) {
          return false
        }
        return true
      }) ?? []
    setVariations(changeStatus)
  }, [terms, getVariations])
  return (
    <>
      {openSelect && (
        <SelectProduct
          open={setOpenSelect}
          selectedProduct={product ? product : undefined}
          onSelectProduct={(value) => {
            saveProduct(value)
          }}
          title={terms.map((term) => term.name).join(' • ')}
        />
      )}
      <div className="dark:bg-zinc-800 dark:hover:bg-zinc-900 hover:bg-zinc-100 p-3  flex  justify-between items-center">
        <div
          className="flex  cursor-pointer w-full"
          onClick={() => setOpenSelect(true)}
        >
          <div className="w-12 h-12">
            {product?.media?.qualities ? (
              <SquareImage src={product.media.qualities[0].src} />
            ) : (
              <SquareImage src="/static/product.webp" />
            )}
          </div>
          <div>
            <div className="ml-2 flex items-center">
              {terms.map((term, index) => {
                const isGroupTerm = term.id === termGroupID
                if (isGroupTerm) {
                  return null
                }
                return (
                  <div key={term.id} className="flex">
                    <p>{term.name}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <button
          className="text-sm text-red-500 hover:cursor-pointer hover:underline p-2"
          onClick={() => handleDeleteVariation()}
        >
          Eliminar
        </button>
      </div>
    </>
  )
}
