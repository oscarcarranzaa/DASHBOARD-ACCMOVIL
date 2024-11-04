'use client'
import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import MediaAction from './mediaActions'
import { CircularProgress } from '@nextui-org/progress'
import Link from 'next/link'
import { Checkbox } from '@nextui-org/react'
import DropDown from '../UI/dropDown/dropDown'
import { IUploads } from '@/types'
import style from './style.module.css'

interface IProps {
  id: string
  image: string
  isNew?: boolean
  url: string
  name: string
  load?: number
  mediaID: string
  isSelect?: 'only' | 'multiple'
  check: boolean
  selectItem?: React.Dispatch<SetStateAction<IUploads[] | undefined>>
}

export default function ContentImages({
  image,
  url,
  name,
  isNew,
  load,
  mediaID,
  id,
  isSelect,
  check,
  selectItem,
}: IProps) {
  const [isDeletingChild, setIsDeletingChild] = useState(false)
  const [select, setSelect] = useState(check)

  useEffect(() => {
    setSelect(check)
  }, [check])

  const isLoading = useMemo(() => (load ? load > 100 : true), [load])

  const handleSelect = useCallback(() => {
    if (!isLoading) return
    setSelect((prevSelect) => !prevSelect)

    const mediaInfo: IUploads = {
      urlMedia: url,
      id: id,
      imgURI: image,
      name: name,
    }

    if (selectItem) {
      if (!select && isSelect === 'multiple') {
        selectItem((prev) => (prev ? [...prev, mediaInfo] : [mediaInfo]))
      } else if (!select && isSelect === 'only') {
        selectItem([mediaInfo])
      } else {
        selectItem((prev) =>
          prev ? prev.filter((item) => item.id !== mediaID) : undefined
        )
      }
    }
  }, [isLoading, select, id, url, mediaID, image, name, isSelect, selectItem])

  return (
    <div
      className={`max-w-80 max-h-80 ${isDeletingChild ? 'hidden' : ''} ${isSelect && isLoading ? 'cursor-pointer' : ''}`}
      onClick={handleSelect}
    >
      <div
        className={`p-3  rounded-md relative border select-none ${select && isSelect ? ' bg-zinc-100 dark:bg-zinc-700 border-zinc-400 dark:border-zinc-800' : 'border-transparent'} ${style.media_container}`}
      >
        {isSelect ? (
          <div className="absolute z-10 right-3 top-3 p-1 rounded-md">
            <Checkbox isSelected={select} onChange={handleSelect} />
          </div>
        ) : (
          <div
            className={`absolute z-50  right-4 top-3 p-1 rounded-md ${style.media_menu}`}
          >
            <DropDown label={name}>
              <MediaAction
                url={url}
                name={name}
                mediaID={mediaID}
                setIsDeletingChild={setIsDeletingChild}
              />
            </DropDown>
          </div>
        )}
        {isNew && (
          <div className="bg-red-500 font-medium text-white absolute top-5 z-10 text-[0.6rem] left-3 px-2  rounded-lg">
            New
          </div>
        )}
        <div
          className="rounded-md overflow-hidden relative border dark:border-zinc-700 border-zinc-200"
          style={{ paddingTop: '100%' }}
        >
          <div
            className="absolute h-full w-full overflow-hidden"
            style={{
              transform: 'translate(-50%, -50%)',
              top: '50%',
              left: '50%',
            }}
          >
            <picture>
              <img
                src={image}
                loading="lazy"
                decoding="async"
                alt="Imagen de covertor"
                className="rounded-md w-full h-full object-contain m-auto"
              />
            </picture>
          </div>

          {load && load <= 100 && (
            <div
              className="absolute z-50 top-0 bottom-0 right-0 left-0 flex justify-center items-center text-white"
              style={{ background: 'rgba(0,0,0,0.7)' }}
            >
              <CircularProgress
                value={load === 100 ? undefined : load}
                aria-label="Loading..."
                size="lg"
                color="success"
                showValueLabel={true}
              />
            </div>
          )}
        </div>
        {isSelect ? (
          <p className="text-xs line-clamp-1 mt-1">{name}</p>
        ) : (
          <Link
            href={`/dash/multimedia/${load && load <= 100 ? '' : mediaID}`}
            className="text-xs line-clamp-1 mt-1 hover:underline"
          >
            {name}
          </Link>
        )}
      </div>
    </div>
  )
}
