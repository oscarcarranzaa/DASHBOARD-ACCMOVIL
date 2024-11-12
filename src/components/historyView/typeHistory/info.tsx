import InformationSVG from '@/components/icons/information'

type TProps = {
  info?: string | null
}
export default function HistoryInfo({ info }: TProps) {
  const urlPattern = /(https?:\/\/[^\s]+)/g

  const renderMessage = () => {
    if (!info) return 'Info no disponible'

    return info.split(urlPattern).map((part, index) =>
      urlPattern.test(part) ? (
        <a
          key={index}
          href={part.startsWith('http') ? part : `https://${part}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {part}
        </a>
      ) : (
        part
      )
    )
  }
  return (
    <>
      <div className="bg-primary-100  py-2 px-2 w-full  border  border-primary-200 rounded-lg flex items-center gap-3 mb-1">
        <div className=" fill-primary-400">
          <InformationSVG size={24} />
        </div>
        <div>
          <p className="text-sm w-10/12  break-words">{renderMessage()}</p>
        </div>
      </div>
    </>
  )
}
