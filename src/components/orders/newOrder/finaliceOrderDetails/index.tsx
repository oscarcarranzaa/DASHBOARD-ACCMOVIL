'use client'
import { getOrderSuccess } from '@/api/order'
import ArrowAngleSVG from '@/components/icons/arrowAngle'
import SuccessAnimation from '@/components/icons/successAnimation'
import { createOrderState } from '@/store/order'
import { Button, Skeleton } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

export default function FinaliceOrderDetail({ id }: { id?: string | null }) {
  const { data, isPending, error } = useQuery({
    queryKey: ['order', id, 'success'],
    queryFn: () => getOrderSuccess(id ?? ''),
    refetchOnWindowFocus: false,
  })
  const setNavegation = createOrderState((state) => state.navegation)
  return (
    <>
      <div className=" w-full h-full flex  justify-center min-h-screen ">
        <div className=" mt-14">
          <div className="  flex justify-center flex-col  dark:bg-zinc-950 bg-white shadow-2xl p-10 relative">
            <div className="absolute top-5 left-5">
              <Button
                className=" "
                isIconOnly
                variant="bordered"
                title="Regresar"
                onPress={() => setNavegation('details')}
              >
                <div className=" rotate-90 dark:stroke-white">
                  <ArrowAngleSVG size={24} />
                </div>
              </Button>
            </div>
            <SuccessAnimation />
            <p className="mt-5 text-xl font-bold text-center min-w-[400px]">
              {data
                ? ' ¡Su pedido ha sido enviado!'
                : !isPending && error
                  ? 'Error al obtener una repuesta'
                  : 'Cargando...'}
            </p>
            {data ? (
              <div className=" mt-5">
                <p className="  text-center ">
                  A continuación el resumen de su pedido:
                </p>
                <div className=" flex gap-5 justify-between mt-4">
                  <p className=" font-medium">Número de pedido:</p>
                  <p>#{data.orderId}</p>
                </div>
                <div className=" flex  gap-5 justify-between mt-1">
                  <p className=" font-medium">Nombre del cliente:</p>
                  <p>
                    {data.billingInfo?.firstName} {data.billingInfo?.lastName}
                  </p>
                </div>
                <div className=" flex gap-5 justify-between mt-1">
                  <p className=" font-medium">Correo electrónico:</p>
                  <p>{data.billingInfo?.email}</p>
                </div>
                <div className=" flex gap-5 justify-between mt-1">
                  <p className=" font-medium">Teléfono:</p>
                  <p>{data.billingInfo?.phone}</p>
                </div>
                <div className=" flex gap-5 justify-between mt-1">
                  <p className=" font-medium">Estado de pago:</p>
                  <p>
                    {data.transaction?.paymentStatus === 'COMPLETED'
                      ? 'Pago exitoso'
                      : 'Pendiente pago'}
                  </p>
                </div>
                <div className=" flex gap-5 justify-between mt-1">
                  <p className=" font-medium">Total del pedido:</p>
                  <p>
                    {data.totalAmount.toLocaleString('es-HN', {
                      style: 'currency',
                      currency: 'HNL',
                    })}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <Skeleton className="h-6 w-full rounded-lg mt-5"></Skeleton>
                <div className="grid  grid-cols-6 gap-3 w-full">
                  <Skeleton className="h-6 rounded-lg mt-1 col-span-4"></Skeleton>
                  <Skeleton className="h-6  rounded-lg mt-1 col-span-2 "></Skeleton>
                </div>

                <div className="grid  grid-cols-6 gap-3 w-full">
                  <Skeleton className="h-6 rounded-lg mt-1 col-span-3"></Skeleton>
                  <Skeleton className="h-6  rounded-lg mt-1 col-span-3 "></Skeleton>
                </div>
                <div className="grid  grid-cols-6 gap-3 w-full">
                  <Skeleton className="h-6 rounded-lg mt-1 col-span-5"></Skeleton>
                  <Skeleton className="h-6  rounded-lg mt-1 "></Skeleton>
                </div>
                <div className="grid  grid-cols-6 gap-3 w-full">
                  <Skeleton className="h-6 rounded-lg mt-1 col-span-4"></Skeleton>
                  <Skeleton className="h-6  rounded-lg mt-1 col-span-2"></Skeleton>
                </div>
                <div className="grid  grid-cols-6 gap-3 w-full">
                  <Skeleton className="h-6 rounded-lg mt-1 col-span-2"></Skeleton>
                  <Skeleton className="h-6  rounded-lg mt-1 col-span-4"></Skeleton>
                </div>
                <div className="grid  grid-cols-6 gap-3 w-full">
                  <Skeleton className="h-6 rounded-lg mt-1 col-span-5"></Skeleton>
                  <Skeleton className="h-6  rounded-lg mt-1 col-span-1"></Skeleton>
                </div>
              </>
            )}

            <Button
              className=" w-full mt-10"
              color="success"
              href="/dash/pedidos"
              as={Link}
              onPress={() => setNavegation('details')}
            >
              Pedidos
            </Button>
            {data && (
              <Button
                className=" w-full mt-3"
                color="success"
                variant="bordered"
                isDisabled={!data}
                href={data.id}
                as={Link}
                onPress={() => setNavegation('details')}
              >
                Detalles
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
