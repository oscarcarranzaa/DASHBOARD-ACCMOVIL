import { changelogSchema } from '@/types/crm/leads'
import { MoveRight } from 'lucide-react'

type TProps = {
  oldValue?: string | null
  newValue?: string | null
  avatar?: string | null
  type: changelogSchema['field_key']
}
export const logKey: Record<changelogSchema['field_key'], string> = {
  CREATED: 'Cliente creado',
  STAGE: 'Etapa',
  STATUS: 'Estado',
  USER: 'Propietario',
  CONTACT: 'Contacto',
  DELETED: 'Eliminado',
  RESTORE: 'Restaurado',
  SYSTEM: 'Sistema',
}
export default function StatusHistory({ oldValue, newValue, type }: TProps) {
  return (
    <div>
      <div className="flex gap-2 items-center ">
        <div className="flex gap-1 items-center">
          <p className=" "> {logKey[type]}:</p>{' '}
          <p className=" text-sm">{oldValue}</p>
        </div>
        {oldValue && newValue ? <MoveRight size={16} /> : null}
        <p className=" text-sm"> {newValue}</p>
      </div>
    </div>
  )
}
