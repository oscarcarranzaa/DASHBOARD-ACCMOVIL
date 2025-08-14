'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyleKit } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Placeholder from '@tiptap/extension-placeholder'
import TipTapToolbar from './toolbar'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import { Button } from '@heroui/react'
import { SendHorizonal } from 'lucide-react'
import Spinner from '@/components/icons/spinner'
import { useEffect } from 'react'

type TProps = {
  placeholder?: string
  content?: string | null
  value?: string | null
  onChange?: (html: string) => void
  isSaved?: Boolean
  isCancel?: Boolean
  isLoading?: Boolean
  minTextSize?: number
  onSave?: (html: string) => void
}

export default function NoteTextEditor({
  placeholder,
  content,
  onChange,
  isCancel,
  isSaved = true,
  onSave,
  value,
  isLoading,
  minTextSize = 0,
}: TProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyleKit,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`)
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false
            }
            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')

            if (disallowedProtocols.includes(protocol)) {
              return false
            }
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === 'string' ? p : p.scheme
            )

            if (!allowedProtocols.includes(protocol)) {
              return false
            }
            const disallowedDomains = [
              'example-phishing.com',
              'malicious-site.net',
            ]
            const domain = parsedUrl.hostname

            if (disallowedDomains.includes(domain)) {
              return false
            }
            return true
          } catch {
            return false
          }
        },
        shouldAutoLink: (url) => {
          try {
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`https://${url}`)

            const disallowedDomains = [
              'example-no-autolink.com',
              'another-no-autolink.com',
            ]
            const domain = parsedUrl.hostname

            return !disallowedDomains.includes(domain)
          } catch {
            return false
          }
        },
      }),
    ],
    immediatelyRender: false,
    content,
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && value !== undefined && value !== null) {
      const currentContent = editor.getHTML()
      if (currentContent !== value) {
        editor.commands.setContent(value, { emitUpdate: false })
      }
    }
  }, [value, editor])

  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value)
    }
  }

  if (!editor) return null
  const handleSaved = () => {
    if (onSave) {
      onSave(editor.getHTML())
    }
  }

  const textSize = editor.getText()?.length
  return (
    <>
      <div className="tiptap-wrapper ">
        <div className="flex justify-center bg-zinc-50 dark:bg-zinc-900 ">
          <EditorContent
            className="prose dark:prose-invert w-full max-w-full p-2 overflow-y-auto max-h-52  dark:text-white"
            editor={editor}
          />
        </div>
        <div className="p-3 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900 ">
          <TipTapToolbar editor={editor} />
          <div className="flex gap-1 items-center">
            {isCancel && (
              <Button className="rounded" size="sm" variant="bordered">
                Cancelar
              </Button>
            )}
            {isSaved && (
              <Button
                className="bg-green-800 text-white rounded"
                size="sm"
                variant="flat"
                isDisabled={!!isLoading || textSize <= minTextSize}
                endContent={
                  isLoading ? (
                    <Spinner fill="#fff" size={18} />
                  ) : (
                    <SendHorizonal size={18} />
                  )
                }
                onPress={() => handleSaved()}
              >
                Enviar
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
