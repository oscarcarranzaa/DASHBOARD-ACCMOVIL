'use client'
import { Chip } from '@nextui-org/react'
import Link from 'next/link'

type TProps = {
  id: string
  name: string
  type: string
  terms: string
}
export default function ItemsAttributes({ name, type, terms, id }: TProps) {
  return (
    <>
      <div className="">
        <Link href={`atributos/${id}`}>
          <div className="bg-white dark:bg-zinc-900 p-5 py-5 rounded-lg hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 border border-zinc-200">
            <div className="mb-10">
              <p className=" text-lg font-semibold">{name}</p>
              <p className=" text-xs dark:text-zinc-300 text-zinc-700">
                Tipo: {type}
              </p>
            </div>
            <Chip variant="flat">{terms} </Chip>
          </div>
        </Link>
      </div>
    </>
  )
}
