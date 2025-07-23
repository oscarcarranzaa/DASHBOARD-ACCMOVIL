'use client'
import NavegationPages from '@/components/navegationPages'
import Search from '@/components/UI/search'
import NewUserForm from '@/components/users/newUser'
import AccessComponent from '@/components/users/roles/accessComponent'
import UserList from '@/components/users/userList'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from '@heroui/react'
import { ChevronDown } from 'lucide-react'
import { Suspense } from 'react'
import { useState } from 'react'

export const statusOptions = [
  { name: 'Activos', uid: 'ACTIVE' },
  { name: 'Inactivos', uid: 'INACTIVE' },
]
export default function ClientPage() {
  const [status, setStatus] = useState<string | undefined>('ACTIVE')
  const [statusFilter, setStatusFilter] = useState<Selection>(
    new Set(['ACTIVE'])
  )
  return (
    <>
      <NavegationPages text="Usuarios" />
      <div>
        <div className="mb-3 flex justify-between">
          <Suspense>
            <Search placeHolder="Buscar usuario..." />
          </Suspense>
          <div className="flex gap-2">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDown className="text-small" />}
                  variant="flat"
                >
                  {statusOptions.find((s) => s.uid === status)?.name}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="single"
                onSelectionChange={(e) => {
                  setStatusFilter(e)
                  setStatus(e.currentKey?.toString())
                }}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <AccessComponent keys={['admin']}>
              <NewUserForm />
            </AccessComponent>
          </div>
        </div>
        <div className="mb-16">
          <Suspense>
            <UserList status={status} />
          </Suspense>
        </div>
      </div>
    </>
  )
}
