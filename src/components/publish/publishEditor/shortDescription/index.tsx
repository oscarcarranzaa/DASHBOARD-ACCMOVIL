import RichTextEditor from '@/components/UI/RichTextEditor'
import { usePublishStore } from '@/store/publish'

type TProps = {
  content?: string | null
}
export default function ShortDescriptionProduct({ content }: TProps) {
  const shortDescription = usePublishStore((state) => state.shortDescription)
  const setShortDescription = usePublishStore(
    (state) => state.setShortDescription
  )
  const handleShortDescription = (newContent: string) => {
    if (newContent !== shortDescription) {
      setShortDescription(newContent)
    }
  }

  return (
    <>
      <p className="text-sm mb-1">Descripción corta</p>
      <RichTextEditor
        onChange={handleShortDescription}
        placeholder="Agrega una descripcion corta del producto"
        content={content}
      />
    </>
  )
}
