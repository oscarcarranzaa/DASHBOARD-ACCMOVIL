import { getAllsContacts } from '@/api/contact'
import { CustomerProfileSVG } from '@/components/icons/customerProfile'
import Search from '@/components/UI/search'
import { contactSchema } from '@/types/customer'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Avatar,
  Button,
  useDisclosure,
  Spinner,
  ButtonProps,
} from '@heroui/react'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

interface IProps {
  setValue?: (contact: contactSchema) => void
  buttonProps?: ButtonProps
  buttonName?: string
}

export default function SelectContact({
  setValue,
  buttonProps,
  buttonName = 'Seleccionar',
}: IProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [searchData, setSearchData] = useState('')

  const { data, isPending, error } = useQuery({
    queryKey: ['contacts', '1', searchData],
    queryFn: () =>
      getAllsContacts({
        page: '1',
        limit: '10',
        query: searchData,
      }),
    refetchOnWindowFocus: false,
    retry: false,
  })

  return (
    <div>
      <Button {...buttonProps} onPress={onOpen}>
        {buttonName}
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Buscar contacto
              </DrawerHeader>
              <DrawerBody>
                <div className="w-full border-b border-zinc-500 pb-2 mb-3">
                  <Search
                    onSearch={(search) => setSearchData(search)}
                    isParamsUrl={false}
                    searchName="cliente"
                    placeHolder="Buscar por nombre o correo"
                    styles="w-full"
                  />
                </div>
                <div className="flex-1 overflow-y-auto">
                  <ul>
                    {data ? (
                      data.data.map((results) => (
                        <li key={results.id}>
                          <button
                            className="w-full"
                            onClick={() => {
                              if (setValue) setValue(results)
                              onClose()
                            }}
                          >
                            <div className="flex gap-2 dark:bg-zinc-950 bg-white p-3 rounded-md mt-1 border-2 border-transparent hover:border-primary text-left">
                              <div className="flex-none">
                                <Avatar
                                  src={results.avatar ?? undefined}
                                  icon={<CustomerProfileSVG size={50} />}
                                  isBordered
                                  showFallback
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{`${results.name}`}</p>
                                <p className="text-xs opacity-70">
                                  {results.email || 'Sin correo'}
                                </p>
                              </div>
                            </div>
                          </button>
                        </li>
                      ))
                    ) : (
                      <div className="w-full mt-10 flex justify-center">
                        <div className="flex flex-col items-center">
                          <Spinner />
                          <p className="text-xs opacity-70 mt-2">
                            Recuperando datos...
                          </p>
                        </div>
                      </div>
                    )}
                  </ul>
                </div>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  )
}
