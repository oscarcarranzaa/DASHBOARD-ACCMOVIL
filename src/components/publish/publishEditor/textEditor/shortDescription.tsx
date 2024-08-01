'use client'
import 'react-quill/dist/quill.snow.css'
import './theme.css'
import { usePublishStore } from '@/store/publish'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import cleanText from './cleanText'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function ShortDescriptionPost() {
  const { shortDescription } = usePublishStore((store) => store.postData)
  const setShortDescription = usePublishStore(
    (state) => state.setShortDescription
  )
  const [text, setText] = useState(() => cleanText(shortDescription || ''))
  const theme = 'snow'
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      ['link'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
    ],
  }
  const placeholder = 'Añadir descripción corta...'
  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'list',
    'indent',
    'background',
    'color',
    'link',
  ]
  useEffect(() => {
    const cleanedText = cleanText(shortDescription || '')
    if (cleanedText !== text) {
      setText(cleanedText)
    }
  }, [shortDescription])
  const handleChange = (value: string) => {
    setText(value)
    setShortDescription(value)
  }

  return (
    <>
      <div className="border border-zinc-500 rounded-lg w-full min-h-52">
        <ReactQuill
          theme={theme}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          value={text}
          onChange={handleChange}
        />
      </div>
    </>
  )
}
