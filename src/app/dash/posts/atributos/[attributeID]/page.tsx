'use client'
import { getOneAttribute } from '@/api/attributes'
import FormTerms from '@/components/attributes/terms/formTerms'
import ListTerms from '@/components/attributes/terms/listTerms'
import NavegationPages from '@/components/navegationPages'

export default function AttributeID() {
  return (
    <>
      <NavegationPages text="Atributos" />

      <div className="grid grid-cols-2">
        <FormTerms />
        <div>
          <ListTerms />
        </div>
      </div>
    </>
  )
}
