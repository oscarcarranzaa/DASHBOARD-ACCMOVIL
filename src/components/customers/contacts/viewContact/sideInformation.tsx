'use client'
import FireSVG from '@/components/icons/fire'
import { contactSchema } from '@/types/customer'
import formatFromNowDate from '@/utils/formatFromNowDate'
import { Accordion, AccordionItem, Button } from "@heroui/react"
import ContactSummary from './summary'
import ContactDetails from './details'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteOneContact } from '@/api/contact'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function SideInformationContact({
  contact,
}: {
  contact: contactSchema
}) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: deleteOneContact,
    onSuccess: (succ) => {
      queryClient.invalidateQueries({ queryKey: ['contact'] })
      toast.success(succ)
      router.push('/dash/pipe/contactos')
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
  const handleDeleteContact = () => {
    mutate(contact.id)
  }
  return (
    <>
      <div className="">
        <div className=" border border-zinc-300 dark:border-zinc-700 rounded-lg p-2 ">
          <Accordion
            defaultExpandedKeys={['1', '2']}
            selectionMode="multiple"
            itemClasses={{ title: 'font-semibold' }}
          >
            <AccordionItem key="1" title="Resumen">
              <div className="mb-5">
                <ContactSummary contact={contact} />
              </div>
            </AccordionItem>
            <AccordionItem key="2" title="Detalles">
              <div className="mb-5">
                <ContactDetails contact={contact} />
              </div>
            </AccordionItem>
            <AccordionItem key="3" title="Informacion extra">
              <ul className="grid grid-cols-2 text-sm gap-y-3 mb-10">
                <li>
                  <p className=" font-medium ">Se unió</p>
                  <p>{formatFromNowDate(contact.createdAt)}</p>
                </li>
                <li>
                  <p className=" font-medium ">Ultima actualización</p>
                  <p>{formatFromNowDate(contact.updatedAt)}</p>
                </li>
                <li>
                  <p className=" font-medium ">¿Está sucrito(a)?</p>
                  <p>{contact.isSuscribed ? 'Sí' : 'No'}</p>
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem key="4" title="Zona peligrosa">
              <div className=" mb-20">
                <p className=" text-sm opacity-80 mt-1">
                  Esta acción eliminará este contacto de forma permanente.
                </p>
                <div className=" stroke-white mt-3 float-right">
                  <Button color="danger" onPress={handleDeleteContact}>
                    <FireSVG size={20} /> Eliminar
                  </Button>
                </div>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  )
}
