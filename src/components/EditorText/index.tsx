'use client'
import { Editor } from '@tinymce/tinymce-react'
import { useRef } from 'react'
import type { Editor as TinyMCEEditor } from 'tinymce'
export default function EditorText() {
  return (
    <>
      <Editor
        onInit={(evt, editor) => {}}
        tinymceScriptSrc={'/assets/js/tinymce/tinymce.min.js'}
        licenseKey="gpl"
        init={{
          height: 500,
          placeholder: 'Descripcion del producto',
          menubar: false,
          branding: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'anchor',
            'searchreplace',
            'visualblocks',
            'fullscreen',
            'media',
            'table',
            'wordcount',
          ],
          toolbar:
            'undo redo | ' +
            'fontsize fontfamily | bold italic forecolor underline | alignleft aligncenter ' +
            'alignright alignjustify lineheightselect	 | bullist numlist outdent indent | ' +
            'removeformat | link image media table | charmap fullscreen',
          toolbar_mode: 'sliding',
          image_advtab: true,
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px, };',
          language: 'es',
          language_url: '/assets/js/tinymce/langs/es.js',
        }}
      />
    </>
  )
}
