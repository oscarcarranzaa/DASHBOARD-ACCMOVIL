import RichTextEditor from '@/components/UI/RichTextEditor'
import { usePublishStore } from '@/store/publish'

type TProps = {
  content?: string | null
}
export default function DescriptionProduct({ content }: TProps) {
  const description = usePublishStore((state) => state.description)
  const setDescription = usePublishStore((state) => state.setDescription)

  const handleDescription = (newContent: string) => {
    if (newContent !== description) {
      setDescription(newContent)
    }
  }
  return (
    <>
      <p className="text-sm mb-1">Descripción</p>

      <div className="mt-5">
        <RichTextEditor
          placeholder="Comienza agregar una descripcion"
          content={content}
          onChange={handleDescription}
        />
      </div>
    </>
  )
}
