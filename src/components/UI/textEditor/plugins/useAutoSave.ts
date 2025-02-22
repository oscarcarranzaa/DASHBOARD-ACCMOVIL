'use client'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $generateHtmlFromNodes } from '@lexical/html'
import { $getRoot } from 'lexical'
import { useEffect, useState } from 'react'

export function useAutoSave() {
  const [editor] = useLexicalComposerContext()
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    const unsubscribe = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null)
        setHtmlContent(htmlString)
      })
    })

    return () => {
      unsubscribe()
    }
  }, [editor])

  return htmlContent
}
