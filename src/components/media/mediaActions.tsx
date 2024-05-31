import useClipboard from '@/hooks/useClipBoard'
import DownloadSVG from '../icons/download'
import LinkSVG from '../icons/link'
import OpenSVG from '../icons/open'
import TrashSVG from '../icons/trahs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteMedia } from '@/api/media'
import { SetStateAction, useState } from 'react'
import Link from 'next/link'
interface IProps {
  url: string
  name: string
  mediaID: string
  setIsDeletingChild: React.Dispatch<SetStateAction<boolean>>
}

export default function MediaAction({
  url,
  mediaID,
  setIsDeletingChild,
}: IProps) {
  const { isCopied, copyToClipboard } = useClipboard()
  const [isDeleting, setIsDeleting] = useState(false)

  const { mutate } = useMutation({
    mutationFn: deleteMedia,
    onSuccess: (data) => {
      console.log(data)
    },
    onSettled: () => {
      setIsDeletingChild(true)
      setIsDeleting(false)
    },
  })
  const handleCopy = (string: string) => {
    return () => {
      copyToClipboard(string)
    }
  }
  const handleDelete = () => {
    setIsDeleting(true)
    mutate(mediaID)
  }
  return (
    <>
      <Link
        href={`/dash/multimedia/${mediaID}`}
        className="flex p-2 items-center dark:hover:bg-gray-700 hover:bg-gray-200 w-full rounded-md"
      >
        <OpenSVG size={20} />
        <p className="ml-2">Abrir</p>
      </Link>
      <button
        className="flex p-2 items-center dark:hover:bg-gray-700 hover:bg-gray-200 w-full rounded-md"
        onClick={handleCopy(url)}
      >
        <LinkSVG size={20} />
        <p className="ml-2">
          {isCopied ? '¡Enlace copiado!' : 'Copiar enlace'}
        </p>
      </button>
      <a
        className="flex p-2 items-center dark:hover:bg-gray-700 hover:bg-gray-200 w-full rounded-md"
        href={url}
        download={true}
        target="_blank"
      >
        <DownloadSVG size={20} />
        <p className="ml-2">Descargar</p>
      </a>
      <button
        className=" stroke-red-500 flex items-center  text-red-500 w-full p-2 rounded-md hover:bg-red-500 hover:text-white hover:stroke-white disabled:cursor-not-allowed disabled:bg-red-700"
        onClick={() => handleDelete()}
        disabled={isDeleting}
      >
        <TrashSVG size={20} />
        <p className="ml-2">{isDeleting ? 'Eliminando' : 'Eliminar medio'}</p>
      </button>
    </>
  )
}
