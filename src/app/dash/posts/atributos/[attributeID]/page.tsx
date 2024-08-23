import FormTerms from '@/components/attributes/formTerms'
import ListTerms from '@/components/attributes/listTerms'
import NavegationPages from '@/components/navegationPages'

export default function AttributeID() {
  return (
    <div>
      <NavegationPages text="Atributos" />
      <p>Aca es el attributoID</p>
      <ListTerms />
      <FormTerms />
    </div>
  )
}
