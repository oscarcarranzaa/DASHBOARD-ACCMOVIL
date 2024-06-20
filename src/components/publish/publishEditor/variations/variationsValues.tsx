import { usePublishStore } from '@/store/publish'

type TCartesianProduct = {
  name: string
  id: string
}[][]

export default function VariationsValues() {
  // Suscríbete a los cambios de estado usando el hook usePublishStore
  const attributes = usePublishStore((state) => state.attributes)
  console.log(attributes)

  const groupAtt = attributes ? attributes[0] : null
  const childrenAtt = attributes
    ? attributes.length > 1
      ? attributes.slice(1).map((att) => att.terms)
      : null
    : null

  const terms = attributes?.map((term) => term.terms)

  function cartesianProduct(arrays: TCartesianProduct) {
    let result = [[]] as TCartesianProduct
    for (const array of arrays) {
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
  console.log(terms && cartesianProduct(terms))
  return (
    <div>
      <p>Variaciones xd</p>
      {groupAtt &&
        groupAtt.terms.map((term) => {
          return (
            <div key={term.id} className="mt-5">
              <p>{term.name}</p>
              {childrenAtt &&
                childrenAtt.map((att, index) => {
                  return (
                    <div key={index} className="mt-1">
                      {att.map((term) => {
                        return <p key={term.id}>{term.name}</p>
                      })}
                    </div>
                  )
                })}
            </div>
          )
        })}
      {/*attributes &&
        attributes.map((att) => {
          return (
            <div key={att.id} className="mb-5">
              {att.terms.map((term) => {
                return <p key={term.id}>{term.name}</p>
              })}
            </div>
          )
        })*/}
    </div>
  )
}
