import SquareImage from '@/components/squareImage'
import { IUploads } from '@/types'
import { useSortable } from '@dnd-kit/sortable'

interface IProps extends IUploads {
  isLarge?: boolean
}
export default function SelectGalleryItem({ id, imgURI, isLarge }: IProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id })
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0 ) `
      : undefined,
    transition,
  }

  return (
    <div
      className={`${isLarge ? 'col-span-2 row-span-2' : ''} bg-zinc-200 rounded-md  border `}
    >
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className={isDragging && isLarge && !isOver ? 'opacity-50' : ''}
      >
        <SquareImage src={imgURI} />
      </div>
    </div>
  )
}
