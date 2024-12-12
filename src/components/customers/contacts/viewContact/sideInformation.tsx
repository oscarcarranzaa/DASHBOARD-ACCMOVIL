import FireSVG from '@/components/icons/fire'
import { contactSchema } from '@/types/customer'
import formaFromNowDate from '@/utils/formatFromNowDate'
import { Button } from '@nextui-org/react'

export default function SideInformationContact({
  contact,
}: {
  contact: contactSchema
}) {
  return (
    <>
      <div className=" grid gap-y-5">
        <div className=" border border-zinc-300 dark:border-zinc-700 rounded-lg p-3">
          <p className=" font-medium opacity-75">Contacto</p>
          <div className="mt-5">
            <ul className="grid grid-cols-2 text-sm gap-y-3">
              <li>
                <p className=" font-medium ">Se unió</p>
                <p>{formaFromNowDate(contact.createdAt)}</p>
              </li>
              <li>
                <p className=" font-medium ">Ultima actualización</p>
                <p>{formaFromNowDate(contact.updatedAt)}</p>
              </li>
              <li>
                <p className=" font-medium ">¿Está sucrito(a)?</p>
                <p>{contact.isSuscribed ? 'Sí' : 'No'}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className=" border border-zinc-300 dark:border-zinc-700 rounded-lg p-3">
          <p>Zona peligrosa</p>
          <p className=" text-sm opacity-80 mt-1">
            Esta acción eliminará este contacto de forma permanente.
          </p>
          <div className=" stroke-white mt-3 float-right">
            <Button color="danger">
              <FireSVG size={20} /> Eliminar
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
