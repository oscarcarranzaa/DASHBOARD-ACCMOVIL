import SquareImage from '@/components/squareImage'

type TProps = {
  imageUrl?: string | null
}
export default function HistoryImage({ imageUrl }: TProps) {
  return (
    <>
      <div className="bg-zinc-50 dark:bg-black  inline-block border dark:border-zinc-600 border-zinc-200 rounded-lg w-10/12">
        <a
          href={imageUrl ?? '#'}
          target="_blank"
          download
          title="Descargar imagen"
        >
          <SquareImage src={imageUrl ?? undefined} />
        </a>
      </div>
    </>
  )
}
