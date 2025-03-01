import {
  Button,
  Divider,
  Modal,
  ModalFooter,
  ModalContent,
  ModalBody,
  ModalHeader,
  useDisclosure,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
} from '@heroui/react'
import { Editor } from '@tiptap/react'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Check,
  ChevronDown,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  HelpCircleIcon,
  Italic,
  Link,
  List,
  ListOrdered,
  QuoteIcon,
  Redo2Icon,
  RedoIcon,
  Strikethrough,
  Text,
  Underline,
  Undo2Icon,
} from 'lucide-react'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'

type TProps = {
  editor: Editor
}
const ICON_SIZE = 18
type blockType = {
  name: string
  icon: ReactNode
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'paragraph'
  format: () => void
}

export default function TipTapToolbar({ editor }: TProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [urlInput, setUrlInput] = useState('')
  const [typeBlock, setTypeBlock] = useState<blockType['type']>('paragraph')

  const setLink = useCallback(
    (url: string) => {
      if (url === null) {
        return
      }
      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run()

        return
      }

      try {
        editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: url })
          .run()
      } catch (e) {
        alert(e)
      }
    },
    [editor]
  )

  const openLink = useCallback(() => {
    setUrlInput(editor.getAttributes('link').href)
    onOpen()
  }, [editor, onOpen])

  const buttons = [
    {
      name: 'bold',
      label: 'Negrita',
      fx: () => editor.chain().focus().toggleBold().run(),
      isDisabled: !editor.isActive('bold'),
      icon: <Bold width={ICON_SIZE} height={ICON_SIZE} />,
      isDividier: false,
    },
    {
      name: 'italic',
      label: 'Cursiva',
      fx: () => editor.chain().focus().toggleItalic().run(),
      isDisabled: !editor.isActive('italic'),
      icon: <Italic width={ICON_SIZE} height={ICON_SIZE} />,
      isDividier: false,
    },
    {
      name: 'underline',
      label: 'Subrayado',
      fx: () => editor.chain().focus().toggleUnderline().run(),
      isDisabled: !editor.isActive('underline'),
      icon: <Underline width={ICON_SIZE} height={ICON_SIZE} />,
      isDividier: false,
    },
    {
      name: 'strike',
      label: 'Tachado',
      fx: () => editor.chain().focus().toggleStrike().run(),
      isDisabled: !editor.isActive('strike'),
      icon: <Strikethrough width={ICON_SIZE} height={ICON_SIZE} />,
      isDividier: false,
    },
    {
      name: 'link',
      label: 'Enlace',
      fx: () => openLink(),
      isDisabled: !editor.isActive('link'),
      icon: <Link width={ICON_SIZE} height={ICON_SIZE} />,
      isDividier: false,
    },
    {
      name: 'code',
      label: 'Código',
      fx: () => editor.chain().focus().toggleCode().run(),
      isDisabled: !editor.isActive('code'),
      icon: <Code width={ICON_SIZE} height={ICON_SIZE} />,
      isDividier: true,
    },
    {
      name: 'blockquote',
      label: 'Cita en bloque',
      fx: () => editor.chain().focus().toggleBlockquote().run(),
      isDisabled: !editor.isActive('blockquote'),
      icon: <QuoteIcon width={ICON_SIZE} height={ICON_SIZE} />,
      isDividier: false,
    },
    {
      name: 'bulletList',
      label: 'Lista',
      fx: () => editor.chain().focus().toggleBulletList().run(),
      isDisabled: !editor.isActive('bulletList'),
      icon: <List width={ICON_SIZE} height={ICON_SIZE} />,
      isDividier: false,
    },
    {
      name: 'orderedList',
      label: 'Lista ordenada',
      fx: () => editor.chain().focus().toggleOrderedList().run(),
      isDisabled: !editor.isActive('orderedList'),
      icon: <ListOrdered width={ICON_SIZE} height={ICON_SIZE} />,
      isDividier: true,
    },

    {
      name: 'left',
      label: 'Alinear a la izquierda',
      fx: () => editor.chain().focus().setTextAlign('left').run(),
      isDisabled: !editor.isActive({ textAlign: 'left' }),
      icon: <AlignLeft width={ICON_SIZE} height={ICON_SIZE} />,
      isDividier: false,
    },
    {
      name: 'center',
      label: 'Alinear al centro',
      fx: () => editor.chain().focus().setTextAlign('center').run(),
      isDisabled: !editor.isActive({ textAlign: 'center' }),
      icon: <AlignCenter width={ICON_SIZE} height={ICON_SIZE} />,
      isDividier: false,
    },
    {
      name: 'right',
      label: 'Alinear a la izquierda',
      fx: () => editor.chain().focus().setTextAlign('right').run(),
      isDisabled: !editor.isActive({ textAlign: 'right' }),
      icon: <AlignRight width={ICON_SIZE} height={ICON_SIZE} />,
      isDividier: false,
    },

    {
      name: 'justify',
      label: 'Justificado',
      fx: () => editor.chain().focus().setTextAlign('justify').run(),
      isDisabled: !editor.isActive({ textAlign: 'justify' }),
      icon: <AlignJustify width={ICON_SIZE} height={ICON_SIZE} />,
      isDividier: false,
    },
  ]

  const blockTypeToBlockName: blockType[] = [
    {
      name: 'Párrafo',
      icon: <Text width={ICON_SIZE} height={ICON_SIZE} />,
      type: 'paragraph',
      format: () => editor.chain().focus().setParagraph().run(),
    },
    {
      name: 'Título 1',
      icon: <Heading1 width={ICON_SIZE} height={ICON_SIZE} />,
      type: 'h1',
      format: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      name: 'Título 2',
      icon: <Heading2 width={ICON_SIZE} height={ICON_SIZE} />,
      type: 'h2',
      format: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      name: 'Título 3',
      icon: <Heading3 width={ICON_SIZE} height={ICON_SIZE} />,
      type: 'h3',
      format: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      name: 'Título 4',
      icon: <Heading4 width={ICON_SIZE} height={ICON_SIZE} />,
      type: 'h4',
      format: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    },
    {
      name: 'Título 5',
      icon: <Heading5 width={ICON_SIZE} height={ICON_SIZE} />,
      type: 'h5',
      format: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
    },
  ]
  useEffect(() => {
    const updateBlockType = () => {
      if (editor.isActive('heading', { level: 1 })) return setTypeBlock('h1')
      if (editor.isActive('heading', { level: 2 })) return setTypeBlock('h2')
      if (editor.isActive('heading', { level: 3 })) return setTypeBlock('h3')
      if (editor.isActive('heading', { level: 4 })) return setTypeBlock('h4')
      if (editor.isActive('heading', { level: 5 })) return setTypeBlock('h5')
      setTypeBlock('paragraph')
    }

    // Escucha cambios en el estado del editor
    editor.on('selectionUpdate', updateBlockType)

    // Limpia el evento cuando el componente se desmonta
    return () => {
      editor.off('selectionUpdate', updateBlockType)
    }
  }, [editor])
  console.log(typeBlock)

  return (
    <>
      <ul className="flex gap-x-1 gap-y-2 flex-wrap">
        <li className=" list-none flex">
          <Button
            aria-label="Deshacer"
            title="Deshacer"
            size="sm"
            isIconOnly
            onPress={() => editor.chain().focus().undo().run()}
            isDisabled={!editor.can().undo()}
          >
            <Undo2Icon width={ICON_SIZE} height={ICON_SIZE} />
          </Button>
        </li>
        <li className=" list-none flex">
          <Button
            aria-label="Deshacer"
            title="Deshacer"
            size="sm"
            isIconOnly
            onPress={() => editor.chain().focus().redo().run()}
            isDisabled={!editor.can().redo()}
          >
            <Redo2Icon width={ICON_SIZE} height={ICON_SIZE} />
          </Button>
          <div className="px-2 -mr-1 ">
            <Divider orientation="vertical" />
          </div>
        </li>
        <li className=" list-none flex">
          <div>
            <Dropdown shouldBlockScroll={false}>
              <DropdownTrigger>
                <Button
                  size="sm"
                  className=" w-32"
                  aria-label="Formatting Options"
                >
                  <span className="mr-1">
                    {blockTypeToBlockName.find((f) => f.type === typeBlock)
                      ?.icon ?? <Text width={ICON_SIZE} height={ICON_SIZE} />}
                  </span>
                  <span className="text">
                    {blockTypeToBlockName.find((f) => f.type === typeBlock)
                      ?.name ?? 'Párrafo'}
                  </span>
                  <ChevronDown width={ICON_SIZE} height={ICON_SIZE} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu items={blockTypeToBlockName} variant="faded">
                {(item) => (
                  <DropdownItem
                    startContent={item.icon}
                    key={item.type}
                    onPress={() => {
                      item.format() // Ejecuta la acción de cambio de bloque
                      setTypeBlock(item.type) // Actualiza el tipo de bloque seleccionado
                    }}
                  >
                    <div className="item flex justify-between items-center gap-1">
                      <span className="text">{item.name}</span>
                      {typeBlock === item.type && (
                        <Check width={15} height={15} />
                      )}
                    </div>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="px-2 -mr-1 ">
            <Divider orientation="vertical" />
          </div>
        </li>
        {buttons.map((btn) => {
          return (
            <li className=" list-none flex" key={btn.name}>
              <Button
                aria-label={btn.label}
                title={btn.label}
                size="sm"
                isIconOnly
                onPress={btn.fx}
                color={btn.isDisabled ? 'default' : 'primary'}
              >
                {btn.icon}
              </Button>
              {btn.isDividier && (
                <div className="px-2 -mr-1 ">
                  <Divider orientation="vertical" />
                </div>
              )}
            </li>
          )
        })}
      </ul>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Insertar enlace
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder="https://accmovilh.com/"
                  variant="bordered"
                  value={urlInput}
                  isClearable
                  onClear={() => {
                    setUrlInput('')
                  }}
                  label="Enlace"
                  startContent={
                    <span className=" opacity-70">
                      <Link width={ICON_SIZE} height={ICON_SIZE} />
                    </span>
                  }
                  labelPlacement="outside"
                  onChange={(e) => setUrlInput(e.target.value)}
                />
                <div className="flex gap-2 items-center opacity-70 text-sm ">
                  <HelpCircleIcon width={ICON_SIZE} height={ICON_SIZE} />
                  <p>Inserta un enlace en tus textos</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    setLink(urlInput)
                    onClose()
                  }}
                >
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
