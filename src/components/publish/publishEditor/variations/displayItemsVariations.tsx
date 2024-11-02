import SelectProduct from '@/components/products/selectProduct'
import SquareImage from '@/components/squareImage'
import { usePublishStore } from '@/store/publish'
import { productSchema } from '@/types/products'
import { useEffect, useState, useCallback } from 'react'
import ProductEditor from '../productEditor'
import TrashSVG from '@/components/icons/trahs'
import { Button } from '@nextui-org/react'

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

  const termName = terms.map((term, index) => term.name).join('/')

  return (
    <>
      <div className="dark:bg-zinc-800 p-3  flex  justify-between items-center">
        <ProductEditor name={termName} />
        <Button
          className="text-sm text-red-500 hover:cursor-pointer   stroke-red-500 ml-1"
          onClick={() => handleDeleteVariation()}
          isIconOnly
          size="sm"
          variant="flat"
          color="danger"
          title="Eliminar variación"
        >
          <TrashSVG size={18} />
        </Button>
      </div>
    </>
  )
}
