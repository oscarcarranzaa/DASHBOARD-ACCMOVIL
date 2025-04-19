/* eslint-disable @next/next/no-img-element */
import FunnnelSVG from '@/components/icons/funnel'
import { Button } from '@heroui/react'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

type TProps = {
  type: 'error' | 'new' | 'access'
  title: string
  description?: string
}
export default function EmptyPipeline({ type, title, description }: TProps) {
  return (
    <>
      <div className="mt-20 flex justify-center items-center flex-col">
        <p className="text-2xl font-semibold text-danger">{title}</p>
        <p className=" text-sm mt-2 opacity-70 max-w-2xl text-center">
          {description}
        </p>
        <div className=" w-32 h-32 mt-10">
          <img
            src={
              type === 'new'
                ? '/static/add_funnel.webp'
                : '/static/funnel_404.webp'
            }
            alt={title}
          />
        </div>
        <div className="mt-10">
          <Button
            variant="bordered"
            color="primary"
            href="/dash/embudo/"
            as={Link}
          >
            <FunnnelSVG size={20} />
            Ir a clientes potenciales
          </Button>
        </div>
      </div>
    </>
  )
}
