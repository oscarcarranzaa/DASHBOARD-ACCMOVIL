import { StatePublish, usePublishStore } from '@/store/publish'
import DisplayGroupVariations from './displayGroupVariations'
import { useEffect, useState } from 'react'
import DisplayItemsVariations from './displayItemsVariations'
import { get } from 'http'

type TCartesianProduct = {
  name: string
  id: string
}[][]

export default function VariationsValues() {
  const attributes = usePublishStore((state) => state.attributes)
  const setVariation = usePublishStore((state) => state.setVariation)
  const getVariations = usePublishStore((state) => state.variations)

  const groupAtt = attributes ? attributes[0] : null
  const childAtt = attributes ? attributes[1] : null
  const isChildTerms = childAtt ? childAtt?.terms.length > 0 : false

  const terms =
    attributes
      ?.filter((attribute) => attribute.terms && attribute.terms.length > 0)
      .map((attribute) => attribute.terms) ?? null

  useEffect(() => {
    if (!terms) return
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
        const isExist =
          getVariations?.find((variation) => {
            const variationsAtt = variation.attributesTerms
              .map((s) => s.id)
              .sort()
            const termsAtt = terms.map((term) => term.id).sort()
            return variationsAtt.every((att, index) => att === termsAtt[index])
          }) ?? null
        if (isExist) {
          isExist.attributesTerms = terms
          return isExist
        }
        return {
          id: Math.random().toString(),
          product: null,
          attributesTerms: terms,
        }
      }) ?? getVariations
    setVariation(varItems)
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
          groupAtt.terms.map((termGroup) => {
            const totalVariations =
              getVariations?.filter((att) => {
                return att.attributesTerms[0].id === termGroup.id
              }) ?? []
            return (
              <DisplayGroupVariations
                name={termGroup.name}
                key={termGroup.id}
                total={totalVariations.length}
              >
                {getVariations?.map((att, index) => {
                  const isTerm = att.attributesTerms[0].id === termGroup.id

                  if (!isTerm || att.attributesTerms.length === 1) return null

                  const termsValue = att.attributesTerms.map((term) => {
                    return {
                      id: term.id,
                      name: term.name,
                    }
                  })

                  return (
                    <DisplayItemsVariations
                      key={index}
                      terms={termsValue}
                      termGroupID={termGroup.id}
                    />
                  )
                })}
              </DisplayGroupVariations>
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
            if (termsValue.length === 0) return null
            return (
              <DisplayItemsVariations
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
