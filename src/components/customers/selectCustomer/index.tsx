import { getAllCustomer } from '@/api/customer'
import CloseSVG from '@/components/icons/close'
import { CustomerProfileSVG } from '@/components/icons/customerProfile'
import Search from '@/components/UI/search'
import useOutsideClick from '@/hooks/useOutSideClick'
import { customerSchema } from '@/types/customer'
import { Avatar, Spinner } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useRef } from 'react'

interface IProps {
  closeModal: () => void
  setValue?: (customer: customerSchema) => void
  openModal: boolean
}

export default function SelectCustomer({
  openModal,
  closeModal,
  setValue,
}: IProps) {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const search = searchParams.get('cliente') || ''
  const ref = useRef<HTMLElement>(null)

  const { data, isPending, error } = useQuery({
    queryKey: ['customer', currentPage.toString(), search],
    queryFn: () => getAllCustomer(currentPage.toString(), '10', search),
    refetchOnWindowFocus: false,
    retry: false,
  })

  useOutsideClick(ref, () => closeModal())

  return (
    <div
      className={`fixed w-screen h-screen top-0 bottom-0 left-0 right-0 z-50 ${openModal ? 'hidden' : ''}`}
      style={{
        backgroundColor: 'var(--box-opacity)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <div
        className="dark:fill-white float-right w-[500px] border-l border-zinc-500 dark:bg-zinc-900 bg-zinc-100 h-full p-5 flex flex-col"
        ref={ref as React.MutableRefObject<HTMLDivElement>}
      >
        <div className="flex justify-between items-center mb-3">
          <p className="font-semibold text-lg">Seleccionar cliente</p>
          <button onClick={() => closeModal()}>
            <CloseSVG size={28} />
          </button>
        </div>
        <div className="w-full border-b border-zinc-500 pb-2 mb-3">
          <Search
            searchName="cliente"
            placeHolder="Buscar por nombre o correo"
            styles="w-full"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <ul>
            {data ? (
              data.data.map((results) => (
                <li key={results.id}>
                  <button
                    className="w-full"
                    onClick={() => {
                      if (setValue) setValue(results)
                      closeModal()
                    }}
                  >
                    <div className="flex gap-2 dark:bg-zinc-950 bg-white p-3 rounded-md mt-1 border-2 border-transparent hover:border-primary text-left">
                      <div className="flex-none">
                        <Avatar
                          src={results.avatar ?? undefined}
                          icon={<CustomerProfileSVG size={50} />}
                          isBordered
                          showFallback
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{`${results.firstName} ${results.lastName}`}</p>
                        <p className="text-xs opacity-70">{results.email}</p>
                      </div>
                    </div>
                  </button>
                </li>
              ))
            ) : (
              <div className="w-full mt-10 flex justify-center">
                <div className="flex flex-col items-center">
                  <Spinner />
                  <p className="text-xs opacity-70 mt-2">
                    Recuperando datos...
                  </p>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
