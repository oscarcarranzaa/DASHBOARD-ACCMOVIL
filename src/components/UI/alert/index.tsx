import Spinner from '@/components/icons/spinner'
import TrashColor from '@/components/icons/trashColor'
import useOutsideClick from '@/hooks/useOutSideClick'
import { Button } from '@nextui-org/button'
import { UseMutateFunction } from '@tanstack/react-query'
import { useRef } from 'react'

type TProps = {
  modalClosed: (id: null) => void
  title: string
  id: string
  description: string
  actionFn: UseMutateFunction<any, Error, string, unknown>
  pending: boolean
}
export default function Alert({
  modalClosed,
  title,
  description,
  id,
  pending,
  actionFn,
}: TProps) {
  const ref = useRef<HTMLElement>(null)
  useOutsideClick(ref, () => modalClosed(null))
  return (
    <>
      <div
        className="fixed top-0 bg-[var(--box-opacity)] left-0 right-0 bottom-0 min-h-screen min-w-[100vw] z-50 flex justify-center items-center"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <div
          ref={ref as React.MutableRefObject<HTMLDivElement>}
          className="bg-zinc-200 border border-zinc-400 dark:bg-zinc-950 min-w-60 min-h-40 max-w-80 rounded-xl"
        >
          <div className=" flex flex-col justify-center items-center text-center p-1 pt-5">
            <span>
              <TrashColor size={80} />
            </span>
            <h3 className=" font-semibold text-xl mt-4">{title}</h3>
            <p className="mt-2">{description}</p>
          </div>
          <div className="w-full flex gap-2 p-2">
            <Button className="w-full" onClick={() => modalClosed(null)}>
              Cancelar
            </Button>
            <Button
              className=" bg-rose-600 w-full text-white"
              onClick={() => actionFn(id)}
            >
              {pending ? (
                <div className=" animate-spin">
                  <Spinner size={20} fill="#fff" />
                </div>
              ) : (
                'Eliminar'
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
