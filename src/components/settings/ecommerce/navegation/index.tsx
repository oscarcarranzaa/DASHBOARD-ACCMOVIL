'use client'
import Link from 'next/link'
import ecommerceMenuObjects from './menuObjects'
import { usePathname } from 'next/navigation'

export default function EcommerceNavegation() {
  const currentPath = usePathname()
  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700">
      {ecommerceMenuObjects().map((item) => (
        <Link
          className={`px-6 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${currentPath === item.href ? 'border-b-2 border-blue-500' : ''}`}
          key={item.name}
          href={item.href}
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}
