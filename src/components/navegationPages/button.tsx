import { useRouter } from 'next/navigation'
import ArrowSVG from '../icons/arrow'

export default function ButtonBack() {
  const router = useRouter()
  const handleCLick = () => {
    router.back()
  }
  return (
    <>
      <div className="flex-none">
        <button
          title="Atrás"
          onClick={handleCLick}
          aria-label="prev page"
          className="rounded-xl stroke-black bg-zinc-200 w-10 h-10 dark:stroke-white dark:bg-zinc-700 flex items-center justify-center hover:bg-zinc-300 dark:hover:bg-zinc-600"
        >
          <ArrowSVG size={20} />
        </button>
      </div>
    </>
  )
}
