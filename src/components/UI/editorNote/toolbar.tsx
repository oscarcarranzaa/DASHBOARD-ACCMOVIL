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
} from '@heroui/react'
import { Editor } from '@tiptap/react'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
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
  Strikethrough,
  Text,
  Underline,
} from 'lucide-react'
import { ReactNode, useCallback, useState } from 'react'

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
      isDividier: false,
    },
  ]

  return (
    <>
      <ul className="flex gap-x-1 gap-y-2 flex-wrap">
        {buttons.map((btn) => {
          return (
            <li className=" list-none flex" key={btn.name}>
              <Button
                aria-label={btn.label}
                title={btn.label}
                size="sm"
                isIconOnly
                variant="light"
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
