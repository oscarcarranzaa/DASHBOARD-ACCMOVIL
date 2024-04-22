import useClipboard from '@/hooks/useClipBoard'
import DownloadSVG from '../icons/download'
import LinkSVG from '../icons/link'
import OpenSVG from '../icons/open'
import TrashSVG from '../icons/trahs'

export default function MediaAction() {
  const { isCopied, copyToClipboard } = useClipboard()

  const handleCopy = (string: string) => {
    return () => {
      copyToClipboard(string)
    }
  }
  return (
    <>
      <div
        className=" p-2 rounded-md min-w-52 text-white"
        style={{ background: 'rgba(0,0,0,0.8' }}
      >
        <p className="text-sm line-clamp-1 font-medium">
          Supcase-15-pro-max.jpg dgbehzeshdgjnfxncx
        </p>
        <hr className=" opacity-40 mt-3" />
        <div className="mt-2 text-sm font-medium">
          <button className="stroke-white flex p-2 hover:bg-gray-700 w-full rounded-md">
            <OpenSVG size={20} />
            <p className="ml-2">Abrir</p>
          </button>
          <button
            className="stroke-white flex p-2 hover:bg-gray-700 w-full rounded-md"
            onClick={handleCopy('Hola')}
          >
            <LinkSVG size={20} />
            <p className="ml-2">
              {isCopied ? '¡Enlace copiado!' : 'Copiar enlace'}
            </p>
          </button>
          <a
            className="stroke-white flex p-2 hover:bg-gray-700 w-full rounded-md"
            href="https://media.oscarcarranza.com/15-6-7-UB-BLACK.jpg"
            download={true}
          >
            <DownloadSVG size={20} />
            <p className="ml-2">Descargar</p>
          </a>
          <button className="stroke-red-500 flex text-red-500 w-full p-2 rounded-md hover:bg-red-500 hover:text-white hover:stroke-white">
            <TrashSVG size={20} />
            <p className="ml-2">Mover a papelera</p>
          </button>
        </div>
      </div>
    </>
  )
}
