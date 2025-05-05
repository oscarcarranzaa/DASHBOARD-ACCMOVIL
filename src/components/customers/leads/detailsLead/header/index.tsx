'use client'

import { leadSchema } from '@/types/crm/leads'
import { Button } from '@heroui/react'
import { Ellipsis } from 'lucide-react'
import AssingUserLead from './assingUser'
import LostLeadAction from './lostLead'
import WonLeadAction from './wonLead'
import ReOpenLeadAction from './reOpen'

type TProps = {
  lead: leadSchema
}
export default function LeadDetailsHeader({ lead }: TProps) {
  return (
    <>
      <div className=" flex justify-between items-center px-5 border-2 border-zinc-200 dark:border-zinc-900 rounded-lg py-2">
        <h2 className="text-lg font-medium line-clamp-2">{lead.title}</h2>
        <div className=" flex gap-4 items-center">
          <AssingUserLead leadId={lead.id} assinedToId={lead.assignedToId} />
          <div className=" flex gap-2">
            {lead.status === 'ACTIVE' ? (
              <>
                <WonLeadAction leadId={lead.id} />
                <LostLeadAction leadId={lead.id} />
              </>
            ) : (
              <ReOpenLeadAction leadId={lead.id} status={lead.status} />
            )}
          </div>
          <Button isIconOnly variant="bordered">
            <Ellipsis />
          </Button>
        </div>
      </div>
    </>
  )
}
