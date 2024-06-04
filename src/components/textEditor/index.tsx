import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import './theme.css'

export default function TextEditor() {
  const theme = 'snow'
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['link'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
    ],
  }
  const placeholder = 'Añadir descripción...'
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
  const { quillRef } = useQuill({ theme, modules, formats, placeholder })
  return (
    <>
      <div
        style={{ width: 500, height: 300, overflow: 'hidden' }}
        className="border border-zinc-500 rounded-lg"
      >
        <div ref={quillRef} />
      </div>
    </>
  )
}
