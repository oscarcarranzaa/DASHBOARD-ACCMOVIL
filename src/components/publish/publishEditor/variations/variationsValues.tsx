import { StatePublish, VariationStatus, usePublishStore } from '@/store/publish'
import DisplayGroupVariations from './displayGroupVariations'
import { useEffect, useState } from 'react'
import DisplayItemsVariations from './displayItemsVariations'
import DisplayDeleteItemsVariations from './displayDeleteItemsVariations'

type TCartesianProduct = {
  name: string
  id: string
}[][]

export default function VariationsValues() {
  const attributes = usePublishStore((state) => state.attributes)
  const getVariations = usePublishStore((state) => state.variations)
  const setVariation = usePublishStore((state) => state.setVariation)

  const groupAtt = attributes ? attributes[0] : null
  const childAtt = attributes ? attributes[1] : null
  const isChildTerms = childAtt ? childAtt?.terms.length > 0 : false

  const terms =
    attributes
      ?.filter((attribute) => attribute.terms && attribute.terms.length > 0)
      .map((attribute) => attribute.terms) ?? null

  useEffect(() => {
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

        return {
          id: Math.random().toString(),
          status: VariationStatus.NEW,
          product: null,
          attributesTerms: terms,
        }
      }) ?? getVariations

    setVariation(varItems)
  }, [attributes])
  console.log(getVariations)
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
            const totalVariations =
              getVariations?.filter((att) => {
                return att.attributesTerms[0].id === termGroup.id
              }) ?? []
            return (
              <DisplayGroupVariations
                termGroup={termGroup}
                key={index}
                variations={getVariations}
              />
            )
          })}
        {!isChildTerms &&
          groupAtt &&
          getVariations?.map((att, index) => {
            const termsValue = att.attributesTerms.map((term) => {
              return {
                id: term.id,
                name: term.name,
              }
            })
            if (att.status === VariationStatus.NEW) {
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
                terms={termsValue}
                termGroupID={groupAtt.id}
              />
            )
          })}
      </div>
    </div>
  )
}
