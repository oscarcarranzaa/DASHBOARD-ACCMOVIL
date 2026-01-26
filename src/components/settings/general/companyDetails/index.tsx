'use client'
import { Button } from '@heroui/react'
import { Inbox, MapPin, Pencil } from 'lucide-react'
import Image from 'next/image'

export default function CompanyDetails() {
  return (
    <>
      <div>
        <h4 className="font-semibold">Detalles de la compañía</h4>
        <div className="dark:bg-zinc-900 bg-white p-3 mt-2 px-5 rounded-lg border dark:border-zinc-700 border-zinc-200 flex justify-between gap-5">
          <div>
            <div className="flex gap-3">
              <div className=" ">
                <Image
                  src={'/static/ACCMOVIL-LOGO.png'}
                  width={70}
                  className="aspect-square object-contain p-2 bg-white/5 rounded-lg"
                  height={70}
                  alt="Accmovil Logo"
                  priority
                />
              </div>
              <div>
                <h2 className="font-medium mb-1 ">Accmovil Honduras </h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs">
                    <MapPin size={16} />
                  </span>
                  <p className="text-xs">Calle vicente williams, Choluteca</p>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs">
                    <Inbox size={16} />
                  </span>
                  <p className="text-xs">accmovil@gmail.com | +504 98158066</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs mt-3 opacity-70">
                Ser la empresa líder en la comercialización de accesorios y
                tecnología, satisfaciendo las necesidades de nuestros clientes
                al brindarles productos de alta calidad y un servicio excelente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
