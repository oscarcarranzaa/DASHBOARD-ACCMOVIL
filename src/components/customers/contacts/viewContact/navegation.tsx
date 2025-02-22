import { contactSchema } from '@/types/customer'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import ContactEmails from './emails'
import ContactOrders from './orders'
import ContactLead from './leads'

export default function ContactNavegation({
  contact,
}: {
  contact: contactSchema
}) {
  const params = useSearchParams()
  const path = params.get('path')

  const renderNavegationItems = useCallback(() => {
    switch (path) {
      case 'emails':
        return <ContactEmails />
      case 'orders':
        return <ContactOrders />
      case 'lead':
        return <ContactLead />
      default:
        return <ContactEmails />
    }
  }, [path])

  const navegationItems = [
    {
      name: 'Correos',
      path: 'emails',
    },
    {
      name: 'Compras',
      path: 'orders',
    },
    {
      name: 'Negocios',
      path: 'lead',
    },
  ]

  return (
    <>
      <div className="flex border-b border-zinc-300 dark:border-zinc-700 pb-3">
        <ul className="flex gap-5">
          {navegationItems.map((n, index) => {
            const active =
              path === n.path
                ? 'border-primary'
                : !path && index === 0
                  ? 'border-primary'
                  : 'border-transparent'

            return (
              <li key={n.path} className="list-none">
                <Link
                  href={`?path=${n.path}`}
                  className={`py-3 px-2 text-sm border-b-2 ${active} hover:text-primary`}
                >
                  {n.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="mt-5 min-h-96">{renderNavegationItems()}</div>
    </>
  )
}
