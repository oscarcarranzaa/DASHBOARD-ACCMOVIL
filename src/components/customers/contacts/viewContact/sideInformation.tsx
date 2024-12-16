import FireSVG from '@/components/icons/fire'
import { contactSchema } from '@/types/customer'
import formaFromNowDate from '@/utils/formatFromNowDate'
import { Accessibility } from '@dnd-kit/core/dist/components/Accessibility'
import { Accordion, AccordionItem, Button } from '@nextui-org/react'
import ContactSummary from './summary'
import ContactDetails from './details'

export default function SideInformationContact({
  contact,
}: {
  contact: contactSchema
}) {
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
            </AccordionItem>
            <AccordionItem key="4" title="Zona peligrosa">
              <div className=" mb-20">
                <p className=" text-sm opacity-80 mt-1">
                  Esta acción eliminará este contacto de forma permanente.
                </p>
                <div className=" stroke-white mt-3 float-right">
                  <Button color="danger">
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
