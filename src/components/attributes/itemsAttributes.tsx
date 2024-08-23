'use client'
import { Chip } from '@nextui-org/react'
import Link from 'next/link'

export default function ItemsAttributes() {
  return (
    <>
      <div className="p-2 ">
        <Link href={'atributos/quierochiches'}>
          <div className="bg-white dark:bg-zinc-900 p-5 py-5 rounded-lg hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 border border-zinc-200">
            <div className="mb-10">
              <p className=" text-lg font-semibold">Colores</p>
              <p className=" text-xs dark:text-zinc-300 text-zinc-700">
                Tipo: Imagen
              </p>
            </div>
            <Chip variant="flat">+200 terms </Chip>
          </div>
        </Link>
      </div>
    </>
  )
}
