/* eslint-disable @next/next/no-img-element */
'use client'

import { getStores } from '@/api/config/stores'
import { addPickupData } from '@/api/order'
import SaveDiskSVG from '@/components/icons/saveDisk'
import Spinner from '@/components/icons/spinner'
import { createOrderState } from '@/store/order'
import { Button } from '@heroui/react'

import { useMutation, useQuery } from '@tanstack/react-query'
import { Factory } from 'lucide-react'
import { useEffect, useState } from 'react'

type TProps = {
  onBackTab?: (store: string) => void
}
export default function Shipment({ onBackTab }: TProps) {
  const [storeSeleted, setStoreSeleted] = useState<string | null>(null)
  const { data, isPending, error } = useQuery({
    queryKey: ['stores'],
    queryFn: () => getStores(),
    refetchOnWindowFocus: false,
    retry: false,
  })
  const {
    orderInfo,
    setOrderInfo,
    setCompletedNavegation,
    setShippingInfo,
    navegation,
  } = createOrderState((state) => state)
  const { mutate, isPending: isPendingMutation } = useMutation({
    mutationFn: addPickupData,
    onSuccess: (d) => {
      if (orderInfo) {
        setOrderInfo({
          ...orderInfo,
          deliveryMethod: d.deliveryMethod,
          subTotal: d.subTotal,
          discountTotal: d.discountTotal,
          couponDiscount: d.couponDiscount,
          totalAmount: d.totalAmount,
          pointsDiscount: d.pointsDiscount,
          branchId: d.branchId,
          shippingCost: d.shippingCost,
        })
      }
      navegation('finish')
      setShippingInfo(null)
      setCompletedNavegation('shipping')
    },
    onError: (error) => {
      console.log('error', error)
    },
  })

  useEffect(() => {
    if (!orderInfo) {
      return
    }
    if (orderInfo.deliveryMethod === 'pickup' && orderInfo.branchId) {
      setStoreSeleted(orderInfo.branchId)
    }
  }, [orderInfo])

  const handleSave = () => {
    if (!orderInfo) {
      return
    }
    if (storeSeleted) {
      mutate({ branchId: storeSeleted })
    }
  }
  return (
    <div className="flex flex-col gap-4 mt-5">
      <div>
        <p className="text-lg text-center font-medium">Seleccione una tienda</p>
      </div>
      {data?.map((store) => (
        <div
          key={store.id}
          className=" grid gap-4 mt-2"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          }}
        >
          <div
            className={`flex flex-col items-center border-2 ${storeSeleted === store.id ? 'border-primary ' : 'border-zinc-800/20 dark:border-zinc-300/20'} rounded-xl p-2 `}
          >
            <div className="aspect-square w-full h-full">
              {store.logo ? (
                <img
                  className="object-cover aspect-square w-full h-full rounded-lg"
                  src={store.logo}
                  alt=""
                />
              ) : (
                <div className="w-full h-full rounded-lg bg-zinc-300 dark:bg-zinc-800 aspect-square flex items-center justify-center">
                  <Factory size={100} />
                </div>
              )}
            </div>
            <div className="mt-1">
              <p className="text-center font-medium">{store.name}</p>
              <p className="text-center text-xs">{store.address}</p>
            </div>
            <div className="w-full mt-2">
              <Button
                className={`w-full hover:bg-primary hover:text-white ${storeSeleted === store.id ? 'bg-primary text-white' : ''}`}
                variant="bordered"
                color="primary"
                onPress={() => {
                  setStoreSeleted(store.id)
                }}
              >
                {storeSeleted === store.id ? 'Seleccionado' : 'Seleccionar'}
              </Button>
            </div>
          </div>
        </div>
      ))}
      {isPending && (
        <div className="flex flex-col items-center justify-center mt-5">
          <Spinner size={50} fill="#205af7" />
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center mt-5">
          <p className="text-center text-lg font-medium">
            Error al obtener las tiendas
          </p>
        </div>
      )}
      {data && data.length === 0 && !isPending && (
        <div className="flex flex-col items-center justify-center mt-5">
          <p className="text-center text-lg font-medium">
            No hay tiendas disponibles
          </p>
          <div className="mt-2">
            <p className="text-center  opacity-70">
              Puedes agregar tiendas desde los ajustes del panel de
              administrador
            </p>
          </div>
          <div className="mt-5">
            <Button
              variant="bordered"
              color="primary"
              onPress={() => onBackTab?.('shipping')}
            >
              Volver
            </Button>
          </div>
        </div>
      )}
      <div className=" flex justify-end items-end flex-col  fill-white">
        <div>
          <Button
            color="primary"
            type="submit"
            isDisabled={isPendingMutation || !storeSeleted}
            onPress={handleSave}
          >
            {isPendingMutation ? (
              <div className=" animate-spin">
                <Spinner size={12} fill="#fff" />
              </div>
            ) : (
              <SaveDiskSVG size={12} />
            )}
            Guardar y continuar
          </Button>
        </div>
      </div>
    </div>
  )
}
