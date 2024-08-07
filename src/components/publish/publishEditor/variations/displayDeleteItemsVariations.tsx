import SquareImage from '@/components/squareImage'
import { ItemsVariations, usePublishStore } from '@/store/publish'

type TProps = {
  termGroupID: string
  variation: ItemsVariations
}
const VariationStatus = {
  NEW: 'new',
  DRAFT: 'draft',
} as const

export default function DisplayDeleteItemsVariations({
  termGroupID,
  variation,
}: TProps) {
  const getVariations = usePublishStore((state) => state.variations)
  const setVariations = usePublishStore((state) => state.setVariation)

  const termsValue = variation.attributesTerms.map((term) => {
    return {
      id: term.id,
      name: term.name,
    }
  })

  const restoreVariation = () => {
    const { status, ...getDelete } = variation

    if (getVariations) {
      setVariations([...getVariations, getDelete])
    }
  }

  return (
    <>
      <div className="dark:bg-zinc-800 dark:hover:bg-zinc-900 bg-zinc-50 hover:bg-zinc-100 p-2  flex  justify-between items-center">
        <div className="flex   w-full">
          <div className="w-8 h-8">
            <SquareImage src="/static/trash-icon.jpg" />
          </div>
          <div>
            <div className="ml-2 flex items-center">
              {termsValue.map((term, index) => {
                const isGroupTerm = term.id === termGroupID
                if (isGroupTerm) {
                  return null
                }
                return (
                  <div key={term.id} className="flex line-through text-sm">
                    <p>{term.name}</p>
                    {index === termsValue.length - 1 ? null : (
                      <span className="px-2"> • </span>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="flex items-center ml-2 ">
              <p className="text-xs  line-clamp-1">
                Esta variación no se creará
              </p>
            </div>
          </div>
        </div>
        <button
          className="text-sm text-zinc-500 hover:cursor-pointer hover:underline p-2"
          onClick={restoreVariation}
        >
          Restaurar
        </button>
      </div>
    </>
  )
}
