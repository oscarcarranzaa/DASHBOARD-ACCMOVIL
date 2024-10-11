import ArrowSVG from '@/components/icons/arrow'
import { Input, Button } from '@nextui-org/react'

export default function RendeemCoupon() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Input
          placeholder="Escribe tu cupón"
          variant="bordered"
          className="w-full  stroke-white"
          endContent={
            <Button
              isIconOnly
              className="  rounded-full w-8 h-8"
              variant="flat"
            >
              <div className="rotate-180">
                <ArrowSVG size={20} />
              </div>
            </Button>
          }
        />
      </div>
    </>
  )
}
