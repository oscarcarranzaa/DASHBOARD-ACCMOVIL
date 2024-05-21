import DropDown from '@/components/UI/dropDown/dropDown'
import Edit from '@/components/icons/edit'
import OpenSVG from '@/components/icons/open'
import TrashSVG from '@/components/icons/trahs'
import Link from 'next/link'

type TProps = {
  id: string
  modal: (id: string) => void
}
export default function ProductActions({ id, modal }: TProps) {
  return (
    <>
      <div className="relative flex justify-end items-center gap-2 stroke-white">
        <DropDown label="Acciones">
          <Link
            href={`/dash/productos/${id}`}
            className="flex p-2 items-center dark:hover:bg-gray-700 hover:bg-gray-200 w-full rounded-md"
          >
            <OpenSVG size={20} />
            <p className="ml-2">Abrir</p>
          </Link>
          <Link
            href={`/dash/productos/${id}/editar`}
            className="flex p-2 items-center dark:hover:bg-gray-700 hover:bg-gray-200 w-full rounded-md"
          >
            <Edit size={20} />
            <p className="ml-2">Editar</p>
          </Link>
          <button
            className=" stroke-red-500 flex items-center  text-red-500 w-full p-2 rounded-md hover:bg-red-500 hover:text-white hover:stroke-white disabled:cursor-not-allowed disabled:bg-red-700"
            onClick={() => modal(id)}
          >
            <TrashSVG size={20} />
            <p className="ml-2">Eliminar producto</p>
          </button>
        </DropDown>
      </div>
    </>
  )
}
