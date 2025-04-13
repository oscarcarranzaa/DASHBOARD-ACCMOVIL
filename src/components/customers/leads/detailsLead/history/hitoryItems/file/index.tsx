/* eslint-disable @next/next/no-img-element */
'use client'
import 'react-photo-view/dist/react-photo-view.css'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { Button } from '@heroui/react'
import {
  ArrowDownToLine,
  File,
  ImageIcon,
  Music,
  Type,
  Video,
} from 'lucide-react'
import Link from 'next/link'
import { formatFileSize } from '@/utils/formatFileSize'

type TProps = {
  fileType: string
  url: string
  fileName: string
  fileSize: number
  date: string
}
export default function FileHistory({
  fileName,
  fileSize,
  fileType,
  url,
  date,
}: TProps) {
  const type = fileType.split('/')[0]
  const ICON_SIZE = 16
  const extension = fileName.split('.').pop()
  const fileTypeIcon = [
    { type: 'image', icon: <ImageIcon size={ICON_SIZE} />, name: 'imagen' },
    {
      type: 'audio',
      icon: <Music size={ICON_SIZE} />,
      name: 'audio',
    },
    {
      type: 'video',
      icon: <Video size={ICON_SIZE} />,
      name: 'video',
    },
    {
      type: 'text',
      icon: <Type size={ICON_SIZE} />,
      name: 'texto',
    },
  ]
  const selectIcon = fileTypeIcon.find((f) => f.type === type)
  return (
    <div className="py-1">
      {type === 'image' ? (
        <div className=" flex gap-3 items-center  border border-zinc-400 dark:border-zinc-700  p-2 rounded-lg">
          <PhotoProvider
            toolbarRender={() => {
              return (
                <Button
                  size="sm"
                  variant="light"
                  href={`${url}&direct_download=1`}
                  as={Link}
                  target="_blank"
                  className="text-white"
                  isIconOnly
                >
                  <ArrowDownToLine size={18} />
                </Button>
              )
            }}
          >
            <PhotoView src={url}>
              <img
                className=" w-32 aspect-[1/1] object-cover rounded-lg cursor-pointer"
                decoding="async"
                loading="lazy"
                src={`${url}&w=300`}
                alt="Image"
              />
            </PhotoView>
          </PhotoProvider>
          <div>
            <div>
              <p className=" line-clamp-1">{fileName}</p>
              <div className="flex items-center gap-2 text-sm">
                <p>{formatFileSize(fileSize)}</p>
                <span>•</span>
                <div className="flex items-center gap-1">
                  {selectIcon ? selectIcon.icon : <File size={ICON_SIZE} />}
                  <p> {selectIcon ? selectIcon.name.toUpperCase() : type}</p>
                  <span>-</span>
                  <p>{extension?.toUpperCase()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" overflow-hidden bg-white border border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 p-2 rounded-lg">
          <div className="flex gap-2 items-center ">
            <Button
              isIconOnly
              variant="bordered"
              href={`${url}&direct_download=1`}
              as={Link}
              target="_blank"
            >
              <ArrowDownToLine size={18} />
            </Button>
            <div>
              <p className=" line-clamp-1">{fileName}</p>
              <div className="flex items-center gap-2 text-sm">
                <p>{formatFileSize(fileSize)}</p>
                <span>•</span>
                <div className="flex items-center gap-1">
                  {selectIcon ? selectIcon.icon : <File size={ICON_SIZE} />}
                  <p> {selectIcon ? selectIcon.name.toUpperCase() : type}</p>
                  <span>-</span>
                  <p>{extension?.toUpperCase()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
