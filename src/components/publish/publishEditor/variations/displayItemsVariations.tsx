import { TVariations, usePublishStore } from '@/store/publish'
import ProductEditor from '../productEditor'
import TrashSVG from '@/components/icons/trahs'
import { Button } from '@nextui-org/react'

type TProps = {
  variation: TVariations
  termName: string
}

export default function DisplayItemsVariations({
  variation,
  termName,
}: TProps) {
  const deleteVariation = usePublishStore((state) => state.deleteVariation)

  return (
    <>
      <div className="dark:bg-zinc-950 p-1 flex  justify-between items-center border-t dark:border-zinc-700 border-zinc-300 ">
        <ProductEditor
          name={termName}
          value={variation.product}
          variationId={variation.id}
        />
        <Button
          className="text-sm text-red-500 hover:cursor-pointer   stroke-red-500 ml-1"
          isIconOnly
          size="sm"
          onClick={() => deleteVariation(variation.id)}
          variant="flat"
          color="danger"
          title="Eliminar variación"
        >
          <TrashSVG size={18} />
        </Button>
      </div>
    </>
  )
}
