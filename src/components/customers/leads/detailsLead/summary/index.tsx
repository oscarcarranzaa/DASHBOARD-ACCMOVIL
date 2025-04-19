import ContactDetails from '@/components/customers/contacts/viewContact/details'
import ContactSummary from '@/components/customers/contacts/viewContact/summary'
import { Accordion, AccordionItem } from '@heroui/react'
import LeadSummaryValues from './summary'
import { getOneLeadShema } from '@/types/crm/leads'
import { Fingerprint } from 'lucide-react'
import LeadDetailsSummary from './details'

type TProps = {
  lead: getOneLeadShema
}
export default function LeadSummary({ lead }: TProps) {
  return (
    <>
      <div className="border border-zinc-300 mb-10 dark:border-zinc-700 rounded-lg p-2 ">
        <Accordion
          defaultExpandedKeys={['1', '2', '3']}
          selectionMode="multiple"
          itemClasses={{ title: 'font-semibold' }}
        >
          <AccordionItem key="1" title="Resumen">
            <div className="mb-5 flex gap-3">
              <Fingerprint size={18} /> <p>ID: {lead.id}</p>
            </div>
            <LeadSummaryValues lead={lead} />
          </AccordionItem>
          <AccordionItem key="2" title="Persona">
            <div className="mb-5">
              <ContactDetails contact={lead.contact} />
              <ContactSummary contact={lead.contact} />
            </div>
          </AccordionItem>
          <AccordionItem key="3" title="Detalles">
            <div className="mb-5">
              <LeadDetailsSummary lead={lead} />
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}
