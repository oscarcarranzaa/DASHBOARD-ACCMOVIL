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
import { useDebouncedCallback } from 'use-debounce'

type TProps = {
  placeholder?: string
  content?: string | null
  onChange?: (html: string) => void
}

export default function RichTextEditor({
  placeholder,
  content,
  onChange,
}: TProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5],
        },
      }),
      TextStyleKit,
      Underline,
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
      debounceChange(editor.getHTML())
    },
  })
  const debounceChange = useDebouncedCallback((value: string) => {
    if (onChange) {
      onChange(value)
    }
    console.log(value)
  }, 300)
  if (!editor) return null

  return (
    <>
      <div className="tiptap-wrapper">
        <div className="p-3">
          <TipTapToolbar editor={editor} />
        </div>

        <div className="flex justify-center bg-white dark:bg-zinc-900">
          <EditorContent
            className="prose prose-md dark:prose-invert w-full"
            editor={editor}
          />
        </div>
      </div>
    </>
  )
}
