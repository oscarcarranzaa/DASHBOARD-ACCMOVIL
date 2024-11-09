import InformationSVG from '@/components/icons/information'

type TProps = {
  info?: string
}
export default function HistoryInfo({ info }: TProps) {
  return (
    <>
      <div className="bg-primary-100  py-2 px-3  border  border-primary-200 rounded-lg flex items-center gap-3 mb-1">
        <div className=" fill-primary-400">
          <InformationSVG size={32} />
        </div>
        <p className="text-sm">{info ?? 'Error al mostrar la informacion'}</p>
      </div>
    </>
  )
}
