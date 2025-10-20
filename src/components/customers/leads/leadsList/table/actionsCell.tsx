import { duplicateLead } from '@/api/crm'
import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  CardHeader,
  Card,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  addToast,
  useDisclosure,
} from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Copy, Ellipsis, Trash } from 'lucide-react'
import DeleteLeadModal from '../../leadActions/deleteModal'
import AlertDeleteLead from '../../detailsLead/header/alertDeleteLead'

type TProps = {
  leadId: string
  title: string
  funnelId: string | undefined
  currentPage: number
}
export default function ActionCellLeadList({
  leadId,
  title,
  funnelId,
  currentPage,
}: TProps) {
  const { onOpen, onClose, isOpen, onOpenChange } = useDisclosure()
  const {
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
    isOpen: isOpenDelete,
  } = useDisclosure()

  const queryClient = useQueryClient()
  const queryKey = ['leads', currentPage.toString(), funnelId]

  const { mutate, isPending } = useMutation({
    mutationFn: duplicateLead,
    onSuccess: () => {
      addToast({
        title: 'Éxito',
        description: 'Se creó el cliente potencial duplicado exitosamente.',
        variant: 'bordered',
        color: 'success',
      })

      queryClient.invalidateQueries({
        queryKey: ['leads', currentPage.toString(), funnelId],
      })
    },
    onError: (error) => {
      addToast({
        title: 'Error al duplicar el cliente potencial',
        description: error.message,
        variant: 'bordered',
        color: 'danger',
      })
    },
    onSettled: () => {
      onClose()
    },
  })

  return (
    <div className="relative flex justify-end items-center gap-2">
      <Dropdown
        shouldBlockScroll={false}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DropdownTrigger>
          <Button
            isIconOnly
            variant="flat"
            color="default"
            className="w-8 h-8"
            size="sm"
          >
            <Ellipsis size={12} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          closeOnSelect={false}
          variant="faded"
          aria-label="Acciones"
          disabledKeys={isPending ? ['copy'] : []}
        >
          <DropdownItem
            key="copy"
            className="flex p-0"
            onPress={() => mutate({ id: leadId })}
          >
            <div className="flex  px-4 h-10 items-center gap-2">
              {isPending ? <Spinner size="sm" /> : <Copy size={18} />}
              Duplicar
            </div>
          </DropdownItem>
          <DropdownItem
            key="delete"
            tabIndex={-1}
            className="text-danger p-0 "
            color="danger"
            onPress={onOpenDelete}
          >
            <div className="flex  px-4 h-10 items-center gap-2">
              <Trash size={18} />
              Eliminar
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <AlertDeleteLead
        leadId={leadId}
        title={title}
        onOpenChange={onOpenDelete}
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        currentPage={currentPage}
        funnelId={funnelId}
      />
    </div>
  )
}
