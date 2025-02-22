/* eslint-disable react-hooks/exhaustive-deps */
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { CLEAR_HISTORY_COMMAND, $getRoot, $createParagraphNode } from 'lexical'
import { useEffect, useRef } from 'react'

export const SetInitialValuePlugin: React.FC<{ initHtml?: string | null }> = ({
  initHtml,
}) => {
  const [editor] = useLexicalComposerContext()
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (!editor || !initHtml || hasInitialized.current) return

    editor.update(() => {
      const root = $getRoot()
      root.clear()
      const content = $generateHtmlFromNodes(editor, null)

      if (content !== initHtml) {
        const parser = new DOMParser()
        const dom = parser.parseFromString(initHtml, 'text/html')
        const nodes = $generateNodesFromDOM(editor, dom)

        if (nodes.length > 0) {
          root.append(...nodes)
          console.log('Insertando contenido inicial')
        } else {
          root.append($createParagraphNode())
        }

        editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined)
        hasInitialized.current = true
      }
    })
  }, [editor])

  return null
}
