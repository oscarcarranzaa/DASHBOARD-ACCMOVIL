import { ItemsVariations, TVariations, usePublishStore } from '@/store/publish'
import DisplayGroupVariations from './displayGroupVariations'
import { useEffect, useState } from 'react'
import DisplayItemsVariations from './displayItemsVariations'
import DisplayDeleteItemsVariations from './displayDeleteItemsVariations'

type TCartesianProduct = {
  name: string
  id: string
}[][]

const VariationStatus = {
  NEW: 'new',
  DRAFT: 'draft',
} as const

export default function VariationsValues() {
  const attributes = usePublishStore((state) => state.attributes)
  const deletedVariations = usePublishStore((state) => state.deletedVariations)
  const setDeletedVariations = usePublishStore(
    (state) => state.setDeleteVariations
  )
  const getVariations = usePublishStore((state) => state.variations)
  const setVariation = usePublishStore((state) => state.setVariation)

  const [variationsItems, setVariationsItems] = useState<ItemsVariations[]>()

  console.log(getVariations, deletedVariations)
  const groupAtt = attributes ? attributes[0] : null
  const childAtt = attributes ? attributes[1] : null
  const isChildTerms = childAtt ? childAtt?.terms.length > 0 : false

  const terms =
    attributes
      ?.filter((attribute) => attribute.terms && attribute.terms.length > 0)
      .map((attribute) => attribute.terms) ?? null

  useEffect(() => {
    const getCartesianVariations = cartesianVariations()
    const filterDeleted = getCartesianVariations?.filter(
      (varia) => !getVariations?.some((v) => v.id === varia.id)
    )
    const variationsStore = getVariations?.map((vs) => {
      return { ...vs, status: VariationStatus.NEW }
    })
    const variationsDraft = filterDeleted?.map((f) => {
      return { ...f, status: VariationStatus.DRAFT }
    })

    const allVariations =
      variationsStore && variationsDraft
        ? [...variationsStore, ...variationsDraft]
        : variationsDraft ?? variationsStore

    setVariationsItems(allVariations)
    setDeletedVariations(variationsDraft)
  }, [getVariations, attributes])

  const cartesianVariations = () => {
    if (!terms) return
    if (terms.length === 0) return
    let result = [[]] as TCartesianProduct
    for (const array of terms) {
      if (!array) {
        continue
      }
      const temp = []
      for (const res of result) {
        for (const item of array) {
          temp.push([...res, item])
        }
      }
      result = temp
    }

    const varItems =
      result.map((terms) => {
        const existingVariation =
          getVariations?.find((variation) => {
            const variationsAtt = variation.attributesTerms
              .map((s) => s.id)
              .sort()
            const termsAtt = terms.map((term) => term.id).sort()
            return variationsAtt.every((att, index) => att === termsAtt[index])
          }) ?? null

        if (existingVariation) {
          existingVariation.attributesTerms = terms
          return existingVariation
        }
        const id = terms.map((t) => t.id).join()
        return {
          id,
          product: null,
          attributesTerms: terms,
        }
      }) ?? getVariations

    return varItems
  }

  useEffect(() => {
    const variations = cartesianVariations()
    if (variations) {
      const findDeleted = variations.filter(
        (args) => !deletedVariations?.some((d) => d.id === args.id)
      )
      setVariation(findDeleted)
    }
  }, [attributes])

  return (
    <div className="mt-5">
      <p>Variaciones:</p>
      <div className={isChildTerms ? ' rounded-md mt-2' : ''}>
        <p className={!groupAtt ? 'text-xs text-zinc-500' : 'hidden'}>
          Comienza agregando atributos para generar las variaciones.
        </p>
        {groupAtt?.terms &&
          isChildTerms &&
          groupAtt.terms.map((termGroup, index) => {
            return (
              <DisplayGroupVariations
                termGroup={termGroup}
                key={index}
                variations={variationsItems}
              />
            )
          })}
        {!isChildTerms &&
          groupAtt &&
          variationsItems?.map((att, index) => {
            const termsValue = att.attributesTerms.map((term) => {
              return {
                id: term.id,
                name: term.name,
              }
            })

            if (att.status === 'new') {
              return (
                <DisplayItemsVariations
                  key={index}
                  terms={termsValue}
                  termGroupID={groupAtt.id}
                />
              )
            }
            return (
              <DisplayDeleteItemsVariations
                key={index}
                variation={att}
                termGroupID={groupAtt.id}
              />
            )
          })}
      </div>
    </div>
  )
}
