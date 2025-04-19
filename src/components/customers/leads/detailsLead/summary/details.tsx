import FunnnelSVG from '@/components/icons/funnel'
import { getOneLeadShema } from '@/types/crm/leads'
import { User } from '@heroui/react'
import dayjs from 'dayjs'
import { Clock, ExternalLink, UserIcon } from 'lucide-react'
import Link from 'next/link'

type TProps = {
  lead: getOneLeadShema
}
export default function LeadDetailsSummary({ lead }: TProps) {
  const { user } = lead
  const shortName = `${user.firstName.split(' ')[0]} ${user.lastName.split(' ')[0]}`
  return (
    <div>
      <ul className="flex flex-col gap-5">
        <li className="list-none">
          <div className="flex gap-2">
            <FunnnelSVG size={18} />
            <p className="text-sm font-medium mb-1">Embudo:</p>
          </div>
          <Link
            href={`/dash/embudo/${lead.pipelineId}`}
            className="text-sm text-blue-500 flex gap-1 hover:underline"
          >
            {lead.pipeline.name}
            <ExternalLink size={18} />
          </Link>
        </li>
        <li className="list-none">
          <div className="flex gap-2">
            <UserIcon size={18} />
            <p className="text-sm font-medium mb-2">Creador:</p>
          </div>
          <User
            avatarProps={{
              src: `${user.avatar}-thumb.webp`,
            }}
            description={user.job}
            name={shortName}
          />
        </li>
        <li className="list-none ">
          <div className="flex gap-2 items-center">
            <Clock size={18} />
            <p className=" font-medium mb-1">Fecha de creación:</p>
          </div>
          <p className="text-sm">
            {dayjs(lead.createdAt).format('MMM DD, hh:mm A, YYYY')}
          </p>
          <p className="text-xs"> {dayjs(lead.createdAt).fromNow()}</p>
        </li>
      </ul>
    </div>
  )
}
