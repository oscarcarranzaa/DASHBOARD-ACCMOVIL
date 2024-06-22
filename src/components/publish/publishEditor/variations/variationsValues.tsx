import { usePublishStore } from '@/store/publish'
import DisplayGroupVariations from './displayGroupVariations'
import DisplayItemsVariations from './displayItemsVariations'
import { set } from 'zod'

type TCartesianProduct = {
  name: string
  id: string
}[][]

export default function VariationsValues() {
  const attributes = usePublishStore((state) => state.attributes)

  const groupAtt = attributes ? attributes[0] : null

  const terms = attributes?.map((term) => term.terms)

  const setVariation = usePublishStore((state) => state.setVariation)
  const getVariations = usePublishStore((state) => state.variations)

  function cartesianProduct(arrays: TCartesianProduct) {
    let result = [[]] as TCartesianProduct
    for (const array of arrays) {
      if (!array.length) {
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
    if (result.length === 0) {
      result.map((att) => {
        const setVariationsValues = getVariations
          ? [...getVariations, { product: null, attributesTerms: att }]
          : [{ product: null, attributesTerms: att }]
        setVariation(setVariationsValues)
      })
    }
    return result
  }
  const variations = terms ? cartesianProduct(terms) : null
  const childrenAtt = variations?.map((att) => att)
  console.log(childrenAtt)
  return (
    <div className=" mt-5">
      <p>Varaciones:</p>
      <div className=" border border-zinc-700 rounded-md mt-2">
        {groupAtt &&
          groupAtt.terms.map((termGroup) => {
            return (
              <DisplayGroupVariations name={termGroup.name} key={termGroup.id}>
                {getVariations &&
                  getVariations.map((att, index) => {
                    const isTerm = att.attributesTerms[0].id === termGroup.id
                    if (!isTerm || att.attributesTerms.length === 1) {
                      return null
                    }
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
      </div>
    </div>
  )
}
