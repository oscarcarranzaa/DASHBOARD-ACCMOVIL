import ExampleTheme from './theme'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'

import ToolbarPlugin from './plugins/toolbarPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { ListItemNode, ListNode } from '@lexical/list'
import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { TRANSFORMERS } from '@lexical/markdown'

import ListMaxIndentLevelPlugin from './plugins/listMaxIndentlevels'
import CodeHighlightPlugin from './plugins/codeHighlight'
import AutoLinkPlugin from './plugins/autoLink'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect } from 'react'

type EditorProps = {
  placeholder?: string
  onChange?: (html: string) => void
  initialValue?: string | null
}

// Plugin para eliminar el autofocus
const RemoveEditorFocusPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    setTimeout(() => {
      const activeElement = document.activeElement as HTMLElement
      if (activeElement?.tagName === 'DIV') {
        activeElement.blur()
      }
    }, 100) // Pequeño delay para asegurar que Lexical no vuelva a enfocar
  }, [])

  return null
}

const editorConfig = {
  theme: ExampleTheme,

  onError(error: Error) {
    throw error
  },

  namespace: 'React.js Demo',
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
}

export default function Editor({
  initialValue,
  placeholder,
  onChange,
}: EditorProps) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin
          onChange={(htm) => {
            if (onChange) {
              onChange(htm)
            }
          }}
          content={initialValue}
        />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="editor-input" tabIndex={-1} />
            }
            placeholder={
              <div className="editor-placeholder">
                {placeholder ?? 'Comienza a escribir algo'}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <RemoveEditorFocusPlugin />
          <HistoryPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  )
}
