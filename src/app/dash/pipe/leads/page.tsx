import NavegationPages from '@/components/navegationPages'
import { Button } from '@heroui/button'
import { Plus } from 'lucide-react'

export default function Leads() {
  return (
    <div>
      <NavegationPages text="Clientes prospectos" />
      <div className="flex justify-between items-center pt-2 px-2">
        <Button color="primary">
          <Plus /> Nuevo prospecto
        </Button>
      </div>
    </div>
  )
}
