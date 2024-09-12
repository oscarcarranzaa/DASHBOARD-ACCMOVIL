import Link from 'next/link'
import NavegationPages from '../navegationPages'
import WarningInfo from '../icons/warningInfo'
import NoneIconSVG from '../icons/none'

type TProps = {
  message: string
}
export default function AccessDenied({ message }: TProps) {
  return (
    <>
      <NavegationPages text="Volver atrás" />
      <div className="w-full flex justify-center items-center mt-20">
        <div className="text-center">
          <picture className="flex justify-center">
            <img
              src="/static/ansiedad.webp"
              alt="Ansiedad"
              className="max-w-56"
            />
          </picture>
          <div className=" text-red-500 text-xl font-semibold mt-5 flex justify-center items-center">
            <div className="mr-1 fill-red-500 ">
              <NoneIconSVG size={20} />
            </div>
            <p> Acceso denegado</p>
          </div>
          <div className=" text-zinc-700 dark:text-zinc-400 text-sm font-medium  mt-1 flex items-center">
            <p className=" max-w-96">{message}</p>
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
