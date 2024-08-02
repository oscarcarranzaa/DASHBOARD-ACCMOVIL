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
          <picture>
            <img src="/static/404.svg" alt="404 image" className="max-w-60" />
          </picture>
          <div className="text-xl font-semibold mt-5  ">
            <p> Página no encontrada :(</p>
          </div>
          <div className="stroke-red-500  text-red-500  mt-1 flex items-center">
            <span className="mr-1">
              <WarningInfo size={20} />
            </span>
            <p>{message}</p>
          </div>
          <div className="mt-5">
            <Link href={'/dash'} className="text-sky-600 underline ">
              Llévame al inicio
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
