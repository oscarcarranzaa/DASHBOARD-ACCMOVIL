'use client'

import formaFromNowDate from '@/utils/formatFromNowDate'
import { Avatar } from '@heroui/react'
import dayjs from 'dayjs'
import { Clock } from 'lucide-react'
import sanitizeHtml from 'sanitize-html'

type TProps = {
  noteId: string
  content: string
  user: string
  date: string
  avatar?: string | null
}

export default function NotesHistory({ content, user, avatar, date }: TProps) {
  const safeHTML = sanitizeHtml(content, {
    allowedTags: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'li', 'ol', 'br'],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
    },
  })
  return (
    <div className=" flex w-full gap-3  ">
      <div className="dark:bg-emerald-950  w-full bg-emerald-100 p-2 rounded-r-xl rounded-bl-xl">
        <div>
          <p className=" font-semibold mb-2">{user}</p>
        </div>
        <div className="prose  dark:prose-invert min-w-full">
          <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
        </div>
        <div className="text-xs flex gap-1 justify-end">
          <Clock size={14} />
          <p>{formaFromNowDate(date)}</p>
        </div>
      </div>
    </div>
  )
}
