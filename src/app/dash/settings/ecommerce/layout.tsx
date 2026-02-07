import NavegationPages from '@/components/navegationPages'
import EcommerceNavegation from '@/components/settings/ecommerce/navegation'

export default function EcommerceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <NavegationPages text="Tienda en línea" />
      <EcommerceNavegation />
      {children}
    </div>
  )
}
