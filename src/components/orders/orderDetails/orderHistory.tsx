import HistortyView from '@/components/historyView'
import ClipSVG from '@/components/icons/clip'
import SendMessageSVG from '@/components/icons/sendMessage'
import { Button, Input } from '@nextui-org/react'

export default function OrderHistory() {
  return (
    <>
      <div>
        <div className="border-2 rounded-xl relative overflow-hidden bg-white dark:bg-zinc-950">
          <p>Trabajando en el historial de la orden. ⚒👷‍♂️</p>
          <div className="h-[580px] menu-content overflow-y-scroll">
            <div className="scrollbar">
              <HistortyView />
            </div>
          </div>
          <div className="absolute bg-white dark:bg-black py-1 px-2 bottom-0 w-full flex gap-3">
            <Input
              placeholder="Escribir comentario"
              endContent={
                <button className=" rounded-full p-1 dark:fill-white">
                  <ClipSVG size={20} />
                </button>
              }
            />
            <Button isIconOnly color="success" className=" rounded-full p-1">
              <SendMessageSVG size={20} />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
