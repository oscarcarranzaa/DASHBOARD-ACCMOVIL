'use client'
import NavegationPages from '@/components/navegationPages'
import { Button } from '@heroui/react'
import { Plus } from 'lucide-react'
import Link from 'next/link'

/* eslint-disable @next/next/no-img-element */
export default function StartPipeline() {
  return (
    <div>
      <div className="flex  gap-5 flex-col items-center justify-center text-center">
        <img
          src="/static/funnel-1.svg"
          alt="Funnel Illustration"
          className="w-full aspect-square min-w-64 max-w-72 h-auto"
        />
        <div>
          <h1 className="text-2xl font-bold mb-1 dark:text-white">
            ¡Comencemos con tu embudo!
          </h1>
          <p className="text-base">
            Crea un embudo nuevo con etapas efectivas para aumentar tus ventas.
          </p>
        </div>
        <Button
          href="/dash/embudo/nuevo"
          as={Link}
          color="primary"
          variant="bordered"
          className=" min-w-48 mt-5"
        >
          <Plus /> Ir a crear
        </Button>
      </div>
    </div>
  )
}
