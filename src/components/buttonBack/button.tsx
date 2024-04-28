import { useRouter } from 'next/navigation'
import ArrowSVG from '../icons/arrow'

interface IProps {
  text: string
}
export default function ButtonBack({ text }: IProps) {
  const router = useRouter()
  const handleCLick = () => {
    router.back()
  }
  return (
    <>
      <div className="flex items-center">
        <button
          onClick={handleCLick}
          className="rounded-full stroke-black bg-zinc-200 w-10 h-10 dark:stroke-white dark:bg-zinc-700 flex items-center justify-center hover:bg-zinc-300 dark:hover:bg-zinc-600"
        >
          <ArrowSVG size={20} />
        </button>
        <h1 className="text-2xl font-semibold ml-3">{text}</h1>
      </div>
    </>
  )
}
