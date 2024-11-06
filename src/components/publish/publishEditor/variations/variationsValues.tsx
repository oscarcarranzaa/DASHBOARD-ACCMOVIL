/* eslint-disable react-hooks/exhaustive-deps */
import { usePublishStore } from '@/store/publish'
import DisplayGroupVariations from './displayGroupVariations'
import { useEffect } from 'react'
import DisplayItemsVariations from './displayItemsVariations'
import DisplayDeleteItemsVariations from './displayDeleteItemsVariations'
import { useCartesianVariations } from '@/hooks/useCartesianVariations'

export default function VariationsValues() {
  const { id, attributes, variations, setVariation } = usePublishStore(
    (state) => ({
      id: state.postData.id,
      attributes: state.attributes,
      variations: state.variations,
      setVariation: state.setVariation,
    })
  )

  const groupAtt = attributes ? attributes[0] : null
  const childAtt = attributes ? attributes[1] : null
  const isChildTerms = childAtt
    ? childAtt?.terms.length > 0 &&
      groupAtt?.terms &&
      groupAtt?.terms.length > 0
    : false
  const terms =
    attributes
      ?.filter((attribute) => attribute.terms && attribute.terms.length > 0)
      .map((attribute) => attribute.terms) ?? null

  const variationsCart = useCartesianVariations({
    terms: terms,
    variations: variations,
  })

  useEffect(() => {
    setVariation(variationsCart)
  }, [attributes])

  return (
    <div className="mt-5">
      <p className=" font-semibold text-sm">Variaciones:</p>
      <div className=" rounded-md mt-2">
        <p className={!groupAtt ? 'text-xs text-zinc-500' : 'hidden'}>
          Comienza agregando atributos para generar las variaciones.
        </p>
        {groupAtt?.terms &&
          groupAtt.terms.length > 0 &&
          isChildTerms &&
          groupAtt.terms.map((termGroup, index) => {
            return (
              <DisplayGroupVariations
                termGroup={termGroup}
                key={index}
                variations={variations}
              />
            )
          })}
        {groupAtt &&
          !isChildTerms &&
          variations?.map((att, index) => {
            const terName = att.attributesTerms
              .map((term) => term.name)
              .join('/')

            if (!att.isDeleted) {
              return (
                <DisplayItemsVariations
                  key={index}
                  termName={terName}
                  variation={att}
                />
              )
            }
            return null
          })}
        {!isChildTerms &&
          variations?.map((att, index) => {
            const terName = att.attributesTerms
              .map((term) => term.name)
              .join('/')

            if (att.isDeleted) {
              return (
                <DisplayDeleteItemsVariations
                  key={index}
                  termName={terName}
                  variationId={att.id}
                />
              )
            }
            return null
          })}
      </div>
    </div>
  )
}
