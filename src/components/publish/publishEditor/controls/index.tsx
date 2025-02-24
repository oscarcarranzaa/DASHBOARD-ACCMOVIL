import { Select, SelectItem } from '@heroui/react'

export default function ControlsPost() {
  const statusOptions = [
    {
      key: 'draft',
      label: 'Borrador',
    },
    {
      key: 'publish',
      label: 'Publicado',
    },
  ]
  return (
    <>
      <div className="p-2 dark:bg-zinc-950 bg-white rounded-xl mb-5">
        <div className="flex items-center">
          <p className="mr-2">Estado:</p>
          <p className="mr-2">Borrador</p>
        </div>
        <div className="mt-5 flex gap-x-3 justify-end"></div>
      </div>
    </>
  )
}
