import { usePublishStore } from '@/store/publish'
import { Input } from '@heroui/react'

export default function ProductTitleInput() {
  const setTitle = usePublishStore((state) => state.setTitle)
  const title = usePublishStore((state) => state.title)

  return (
    <Input
      variant="bordered"
      isRequired
      label="Titulo"
      value={title}
      onChange={(event) => setTitle(event.target.value)}
    />
  )
}
