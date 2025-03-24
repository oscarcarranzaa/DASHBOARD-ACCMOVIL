import {
  NumberInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
} from '@heroui/react'
import { HelpCircle } from 'lucide-react'
import { ChangeEvent, useState } from 'react'

type TProps = {
  value?: number | null
  onChange: (days?: number | ChangeEvent<HTMLInputElement>) => void
}
export default function RottenDays({ value, onChange }: TProps) {
  const [isSelected, setIsSelected] = useState(!!value)

  return (
    <div>
      <div className="flex gap-2 items-center">
        <Switch
          isSelected={isSelected}
          aria-label="Estancado en dias"
          onValueChange={(select) => {
            setIsSelected(select)
            if (!select) {
              onChange(undefined)
            }
          }}
          color="success"
          size="sm"
        >
          <p className="text-sm opacity-80">Estancado en días</p>
        </Switch>
        <Popover showArrow placement="right">
          <PopoverTrigger className=" opacity-70">
            <HelpCircle size={18} />
          </PopoverTrigger>
          <PopoverContent className="max-w-60">
            El estancamiento de clientes te alerta de clientes inactivos
            coloreándolos en rojo. Define aquí el período de estancamiento.
          </PopoverContent>
        </Popover>
      </div>
      {isSelected && (
        <NumberInput
          aria-label="Estancamiendo en dias"
          className="mt-1"
          value={value ?? undefined}
          labelPlacement="outside"
          onValueChange={(n) => {
            const valueNumber = Number.isNaN(n) ? undefined : n
            console.log(valueNumber)
            onChange(valueNumber)
          }}
          variant="faded"
          size="sm"
        />
      )}
    </div>
  )
}
