import { changelogSchema } from '@/types/crm/leads'
import dayjs from 'dayjs'
import { ArrowBigLeft, MoveRight } from 'lucide-react'

type TProps = {
  oldValue?: string | null
  newValue?: string | null
  type: changelogSchema['field_key']
}
const logKey: Record<changelogSchema['field_key'], string> = {
  CREATED: 'Cliente creado',
  STAGE: 'Etapa',
  STATUS: 'Estado',
  USER: 'Propietario',
}
export default function StatusHistory({ oldValue, newValue, type }: TProps) {
  return (
    <div>
      <div className="flex gap-2 items-center">
        <div className="flex gap-1">
          <p className="font-medium "> {logKey[type]}:</p> <p>{oldValue}</p>
        </div>
        {oldValue && newValue ? <MoveRight size={18} /> : null}
        <p> {newValue}</p>
      </div>
    </div>
  )
}
