'use client'
import NewLead from '@/components/customers/leads/newLead'
import NavegationPages from '@/components/navegationPages'

export default function Leads() {
  return (
    <div>
      <NavegationPages text="Clientes prospectos" />
      <NewLead />
    </div>
  )
}
