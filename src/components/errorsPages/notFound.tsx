import Link from 'next/link'
import NavegationPages from '../navegationPages'
import WarningInfo from '../icons/warningInfo'

type TProps = {
  message: string
}
export default function NotFound({ message }: TProps) {
  return (
    <>
      <NavegationPages text="Volver atrás" />
      <div className="w-full flex justify-center items-center mt-20">
        <div className="text-center">
          <picture className="flex justify-center">
            <img
              src="/static/404.svg"
              alt="404 image"
              className="max-w-60"
              decoding="async"
            />
          </picture>
          <div className=" text-red-500 text-xl font-semibold mt-5 flex justify-center items-center">
            <div className="mr-1 stroke-red-500 ">
              <WarningInfo size={24} />
            </div>
            <p>Página no encontrada</p>
          </div>
          <div className=" text-zinc-700 dark:text-zinc-400 text-sm font-medium  mt-1 flex items-center text-center w-full">
            <p className=" max-w-96 m-auto">{message}</p>
          </div>
          <div className="mt-5">
            <Link href={'/dash/dashboard'} className="text-sky-600 underline ">
              Llévame al inicio
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
