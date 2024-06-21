import { usePublishStore } from '@/store/publish'
import DisplayGroupVariations from './displayGroupVariations'
import DisplayItemsVariations from './displayItemsVariations'

type TCartesianProduct = {
  name: string
  id: string
}[][]

export default function VariationsValues() {
  const attributes = usePublishStore((state) => state.attributes)

  const groupAtt = attributes ? attributes[0] : null

  const terms = attributes?.map((term) => term.terms)

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
    return result
  }
  const variations = terms ? cartesianProduct(terms) : null
  const childrenAtt = variations?.map((att) => att)

  return (
    <div className=" mt-5">
      <p>Varaciones:</p>
      <div className=" border border-zinc-700 rounded-md mt-2">
        {groupAtt &&
          groupAtt.terms.map((termGroup) => {
            return (
              <DisplayGroupVariations name={termGroup.name} key={termGroup.id}>
                {childrenAtt &&
                  childrenAtt.map((att, index) => {
                    const isTerm = att[0].id === termGroup.id
                    if (!isTerm || att.length === 1) {
                      return null
                    }
                    const termsValue = att.map((term) => {
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
