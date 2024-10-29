'use client'
import 'react-quill/dist/quill.snow.css'
import './theme.css'
import { usePublishStore } from '@/store/publish'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function DescriptionPost() {
  const { description } = usePublishStore((store) => store.postData)
  const setDescription = usePublishStore((state) => state.setDescription)

  const theme = 'snow'
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['link'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
    ],
  }
  const PLACEHOLDER = 'Agrega una descripción más detallada'
  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'list',
    'indent',
    'link',
  ]

  return (
    <>
      <div className="border border-zinc-500 rounded-lg w-full min-h-52">
        <ReactQuill
          theme={theme}
          modules={modules}
          formats={formats}
          placeholder={PLACEHOLDER}
          value={description ?? undefined}
          onChange={(text) => setDescription(text)}
        />
      </div>
    </>
  )
}
