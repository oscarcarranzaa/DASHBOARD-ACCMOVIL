import useClipboard from '@/hooks/useClipBoard'
import DownloadSVG from '../icons/download'
import LinkSVG from '../icons/link'
import CheckSVG from '../icons/check'

interface IProps {
  url: string
  width: number
  height: number
}

export default function CardImageDetails({ url, width, height }: IProps) {
  const { isCopied, copyToClipboard } = useClipboard()
  const handleCopy = (string: string) => {
    return () => {
      copyToClipboard(string)
    }
  }
  return (
    <>
      <div className="w-full bg-zinc-200 rounded-lg p-1 pr-2 pl-2 dark:bg-zinc-700 mt-1">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-sm">Resolución:</p>
            <p className="text-xs">
              {width}x{height}
            </p>
          </div>
          <div className="stroke-black fill-black dark:stroke-white flex dark:fill-white  ">
            <button
              className="p-1  dark:bg-zinc-900 bg-zinc-300 rounded-md"
              onClick={handleCopy(url)}
            >
              {isCopied ? <CheckSVG size={20} /> : <LinkSVG size={20} />}
            </button>
            <div className="stroke-white flex  ml-2">
              <a
                href={url}
                className="p-1  bg-blue-600  rounded-md"
                target="_blank"
                download
              >
                <DownloadSVG size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
