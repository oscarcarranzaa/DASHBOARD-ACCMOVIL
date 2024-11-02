import UpdateSVG from '@/components/icons/update'
import SquareImage from '@/components/squareImage'
import { ItemsVariations, usePublishStore } from '@/store/publish'
import { Button } from '@nextui-org/button'

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
  const termName = termsValue.map((term, index) => term.name).join('/')
  return (
    <>
      <div className="dark:bg-zinc-800 bg-zinc-100 p-2  flex  justify-between items-center">
        <div className="flex   w-full">
          <div className="w-8 h-8">
            <SquareImage src="/static/trash-icon.jpg" />
          </div>
          <div>
            <div className="ml-2 flex items-center">
              <p className="flex line-through text-sm">{termName}</p>
            </div>
            <div className="flex items-center ml-2 ">
              <p className="text-xs  line-clamp-1">
                Esta variación no se creará
              </p>
            </div>
          </div>
        </div>
        <Button
          className="text-sm text-zinc-500 hover:cursor-pointer fill-zinc-500"
          variant="bordered"
          size="sm"
          onClick={restoreVariation}
        >
          <div>
            <UpdateSVG size={18} />
          </div>
          <p className="text-sm">Restaurar</p>
        </Button>
      </div>
    </>
  )
}
