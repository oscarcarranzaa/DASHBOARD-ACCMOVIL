import UpdateSVG from '@/components/icons/update'
import SquareImage from '@/components/squareImage'
import { usePublishStore } from '@/store/publish'
import { Button } from '@heroui/button'

type TProps = {
  variationId: string
  termName: string
}

export default function DisplayDeleteItemsVariations({
  variationId,
  termName,
}: TProps) {
  const restoreVariation = usePublishStore((state) => state.restoreVariation)
  return (
    <>
      <div className="dark:bg-zinc-800 bg-zinc-100 p-2  flex  justify-between items-center">
        <div className="flex   w-full">
          <div className="w-8 h-8">
            <SquareImage src="/static/trash-icon.jpg" />
          </div>
          <div>
            <div className="ml-2 flex items-center">
              <p className="flex line-through text-sm">{termName.toString()}</p>
            </div>
            <div className="flex items-center ml-2 ">
              <p className="text-xs  line-clamp-1">
                Esta variación fué eliminada
              </p>
            </div>
          </div>
        </div>
        <Button
          className="text-sm text-zinc-500 hover:cursor-pointer fill-zinc-500"
          variant="bordered"
          size="sm"
          onPress={() => restoreVariation(variationId)}
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
