/* eslint-disable react-hooks/exhaustive-deps */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Code,
  Heading1,
  Heading2,
  Italic,
  Link2,
  List,
  ListOrdered,
  PaintBucket,
  Pencil,
  Quote,
  Redo2,
  Strikethrough,
  Text,
  Underline,
  Undo2,
} from 'lucide-react/icons'
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $getNodeByKey,
  LexicalEditor,
  RangeSelection,
  LexicalNode,
  EditorState,
  $getRoot,
} from 'lexical'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import {
  $isParentElementRTL,
  $wrapNodes,
  $isAtNodeEnd,
} from '@lexical/selection'
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils'
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
} from '@lexical/list'
import { createPortal } from 'react-dom'
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from '@lexical/rich-text'
import {
  $createCodeNode,
  $isCodeNode,
  getDefaultCodeLanguage,
  getCodeLanguages,
} from '@lexical/code'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
  Tooltip,
} from '@heroui/react'
import ColorPlugin from './colorPlugin'
import { useAutoSave } from './useAutoSave'
import { SetInitialValuePlugin } from './useInsertHTML'
import { $generateNodesFromDOM } from '@lexical/html'

export const LowPriority = 1

type BlockType = 'paragraph' | 'quote' | 'code' | 'h1' | 'h2' | 'ul' | 'ol'

const ICON_SIZE = 20
type blockType = {
  name: string
  icon: ReactNode
  type: BlockType
  format: () => void
}

function positionEditorElement(
  editor: HTMLDivElement,
  rect: DOMRect | null
): void {
  if (rect === null) {
    editor.style.opacity = '0'
    editor.style.top = '-1000px'
    editor.style.left = '-1000px'
  } else {
    editor.style.opacity = '1'
    editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`
    editor.style.left = `${
      rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2
    }px`
  }
}

interface FloatingLinkEditorProps {
  editor: LexicalEditor
}

function FloatingLinkEditor({ editor }: FloatingLinkEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const mouseDownRef = useRef(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [isEditMode, setEditMode] = useState(false)
  const [lastSelection, setLastSelection] = useState<RangeSelection | null>(
    null
  )

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL())
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL())
      } else {
        setLinkUrl('')
      }
    }
    const editorElem = editorRef.current
    const nativeSelection = window.getSelection()
    const activeElement = document.activeElement

    if (editorElem === null) {
      return
    }

    const rootElement = editor.getRootElement()
    if (
      selection !== null &&
      nativeSelection &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection.getRangeAt(0)
      let rect: DOMRect
      if (nativeSelection.anchorNode === rootElement) {
        let inner = rootElement
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild as HTMLElement
        }
        rect = inner.getBoundingClientRect()
      } else {
        rect = domRange.getBoundingClientRect()
      }

      if (!mouseDownRef.current) {
        positionEditorElement(editorElem, rect)
      }
      setLastSelection(selection as RangeSelection)
    } else if (!activeElement || activeElement.className !== 'link-input') {
      positionEditorElement(editorElem, null)
      setLastSelection(null)
      setEditMode(false)
      setLinkUrl('')
    }

    return true
  }, [editor])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor()
        })
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor()
          return true
        },
        LowPriority
      )
    )
  }, [editor, updateLinkEditor])

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor()
    })
  }, [editor, updateLinkEditor])

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditMode])

  return (
    <div ref={editorRef} className="link-editor">
      {isEditMode ? (
        <input
          ref={inputRef}
          className="link-input"
          value={linkUrl}
          onChange={(event) => {
            setLinkUrl(event.target.value)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              if (lastSelection !== null) {
                if (linkUrl !== '') {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl)
                }
                setEditMode(false)
              }
            } else if (event.key === 'Escape') {
              event.preventDefault()
              setEditMode(false)
            }
          }}
        />
      ) : (
        <>
          <div className="link-input">
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              {linkUrl}
            </a>
            <div
              className="link-edit"
              role="button"
              tabIndex={0}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setEditMode(true)
              }}
            >
              <Pencil />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

interface SelectProps {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  className: string
  options: string[]
  value: string
}

function Select({ onChange, className, options, value }: SelectProps) {
  return (
    <select className={className} onChange={onChange} value={value}>
      <option hidden={true} value="" />
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

function getSelectedNode(selection: RangeSelection): LexicalNode {
  const anchor = selection.anchor
  const focus = selection.focus
  const anchorNode = selection.anchor.getNode()
  const focusNode = selection.focus.getNode()
  if (anchorNode === focusNode) {
    return anchorNode
  }
  const isBackward = selection.isBackward()
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode
  }
}

type ToolbarProps = {
  onChange?: (html: string) => void
  content?: string | null
}
export default function ToolbarPlugin({ onChange, content }: ToolbarProps) {
  const [editor] = useLexicalComposerContext()
  const toolbarRef = useRef<HTMLDivElement>(null)
  const [canUndo, setCanUndo] = useState<boolean>(false)
  const [canRedo, setCanRedo] = useState<boolean>(false)
  const [blockType, setBlockType] = useState<string>('paragraph')
  const [selectedElementKey, setSelectedElementKey] = useState<string | null>(
    null
  )

  const [codeLanguage, setCodeLanguage] = useState<string>('')
  const [isLink, setIsLink] = useState<boolean>(false)
  const [isBold, setIsBold] = useState<boolean>(false)
  const [isItalic, setIsItalic] = useState<boolean>(false)
  const [isUnderline, setIsUnderline] = useState<boolean>(false)
  const [isStrikethrough, setIsStrikethrough] = useState<boolean>(false)
  const [isCode, setIsCode] = useState<boolean>(false)

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode()
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow()
      const elementKey = element.getKey()
      const elementDOM = editor.getElementByKey(elementKey)
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey)
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode)
          const type = parentList ? parentList.getTag() : element.getTag()
          setBlockType(type)
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType()
          setBlockType(type)
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage())
          }
        }
      }

      setIsBold(selection.hasFormat('bold'))
      setIsItalic(selection.hasFormat('italic'))
      setIsUnderline(selection.hasFormat('underline'))
      setIsStrikethrough(selection.hasFormat('strikethrough'))
      setIsCode(selection.hasFormat('code'))

      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true)
      } else {
        setIsLink(false)
      }
    }
  }, [editor])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(
        ({ editorState }: { editorState: EditorState }) => {
          editorState.read(() => {
            updateToolbar()
          })
        }
      ),
      editor.registerCommand<boolean>(
        SELECTION_CHANGE_COMMAND,
        (_payload: boolean, newEditor: LexicalEditor) => {
          updateToolbar()
          return false
        },
        LowPriority
      ),
      editor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload: boolean) => {
          setCanUndo(payload)
          return false
        },
        LowPriority
      ),
      editor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload: boolean) => {
          setCanRedo(payload)
          return false
        },
        LowPriority
      )
    )
  }, [editor, updateToolbar])

  const codeLanguges = useMemo(() => getCodeLanguages(), [])
  const onCodeLanguageSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey)
          if (node && $isCodeNode(node)) {
            node.setLanguage(e.target.value)
          }
        }
      })
    },
    [editor, selectedElementKey]
  )

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://')
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
  }, [editor, isLink])

  const formatParagraph = () => {
    if (blockType !== 'paragraph') {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode())
        }
      })
    }
  }

  const formatLargeHeading = () => {
    if (blockType !== 'h1') {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode('h1'))
        }
      })
    }
  }

  const formatSmallHeading = () => {
    if (blockType !== 'h2') {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode('h2'))
        }
      })
    }
  }

  const formatBulletList = () => {
    if (blockType !== 'ul') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const formatNumberedList = () => {
    if (blockType !== 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode())
        }
      })
    }
  }

  const formatCode = () => {
    if (blockType !== 'code') {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createCodeNode())
        }
      })
    }
  }

  const blockTypeToBlockName: blockType[] = [
    {
      name: 'Párrafo',
      icon: <Text width={ICON_SIZE} height={ICON_SIZE} />,
      type: 'paragraph',
      format: formatParagraph,
    },
    {
      name: 'Encabezado grande',
      icon: <Heading1 width={ICON_SIZE} height={ICON_SIZE} />,
      type: 'h1',
      format: formatLargeHeading,
    },
    {
      name: 'Encabezado pequeño',
      icon: <Heading2 width={ICON_SIZE} height={ICON_SIZE} />,
      type: 'h2',
      format: formatSmallHeading,
    },
    {
      name: 'Lista de numero',
      icon: <ListOrdered width={ICON_SIZE} height={ICON_SIZE} />,
      type: 'ol',
      format: formatNumberedList,
    },
    {
      name: 'Lista con viñetas',
      icon: <List width={ICON_SIZE} height={ICON_SIZE} />,
      type: 'ul',
      format: formatBulletList,
    },
    {
      name: 'Cita de bloque',
      icon: <Quote width={ICON_SIZE} height={ICON_SIZE} />,
      type: 'quote',
      format: formatQuote,
    },

    {
      name: 'Bloque de código',
      icon: <Code width={ICON_SIZE} height={ICON_SIZE} />,
      type: 'code',
      format: formatCode,
    },
  ]
  const html = useAutoSave()

  SetInitialValuePlugin({ initHtml: content ?? '' })

  useEffect(() => {
    if (onChange) {
      onChange(html)
    }
  }, [onChange, html])
  return (
    <div
      className="flex gap-3 flex-wrap bg-zinc-100 dark:bg-zinc-900 p-3"
      ref={toolbarRef}
    >
      <div className="flex gap-1">
        <Button
          isIconOnly
          size="sm"
          isDisabled={!canUndo}
          onPress={() => {
            editor.dispatchCommand(UNDO_COMMAND, undefined)
          }}
          className="toolbar-item spaced"
          aria-label="Undo"
        >
          <Undo2 width={ICON_SIZE} height={ICON_SIZE} />
        </Button>
        <Button
          size="sm"
          isIconOnly
          isDisabled={!canRedo}
          onPress={() => {
            editor.dispatchCommand(REDO_COMMAND, undefined)
          }}
          className="toolbar-item"
          aria-label="Redo"
        >
          <Redo2 width={ICON_SIZE} height={ICON_SIZE} />
        </Button>
      </div>

      <div className="flex gap-1">
        <Dropdown shouldBlockScroll={false}>
          <DropdownTrigger className="flex flex-wrap flex-">
            <Button
              size="sm"
              disableAnimation
              className=" "
              aria-label="Formatting Options"
            >
              <span className="mr-1">
                {blockTypeToBlockName.find((f) => f.type === blockType)?.icon}
              </span>
              <span className="text">
                {blockTypeToBlockName.find((f) => f.type === blockType)?.name}
              </span>
              <ChevronDown width={ICON_SIZE} height={ICON_SIZE} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu items={blockTypeToBlockName}>
            {(item) => (
              <DropdownItem key={item.type}>
                <button className="item flex gap-1" onClick={item.format}>
                  <span className="mr-1">{item.icon}</span>
                  <span className="text">{item.name}</span>
                  {blockType === item.type && <span className="active" />}
                </button>
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </div>

      {blockType === 'code' ? (
        <>
          <Select
            className="toolbar-item code-language"
            onChange={onCodeLanguageSelect}
            options={codeLanguges}
            value={codeLanguage}
          />
          <ChevronDown width={ICON_SIZE} height={ICON_SIZE} />
        </>
      ) : (
        <>
          <div className="flex gap-1">
            <Button
              isIconOnly
              size="sm"
              onPress={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
              }}
              color={isBold ? 'primary' : 'default'}
              aria-label="Format Bold"
            >
              <Bold width={ICON_SIZE} height={ICON_SIZE} strokeWidth={3} />
            </Button>

            <Button
              size="sm"
              isIconOnly
              onPress={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
              }}
              aria-label="Format Italics"
              color={isItalic ? 'primary' : 'default'}
            >
              <Italic width={ICON_SIZE} height={ICON_SIZE} />
            </Button>

            <Button
              size="sm"
              isIconOnly
              onPress={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
              }}
              color={isUnderline ? 'primary' : 'default'}
              aria-label="Format Underline"
            >
              <Underline width={ICON_SIZE} height={ICON_SIZE} />
            </Button>

            <Button
              size="sm"
              isIconOnly
              color={isStrikethrough ? 'primary' : 'default'}
              onPress={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
              }}
              aria-label="Format Strikethrough"
            >
              <Strikethrough width={ICON_SIZE} height={ICON_SIZE} />
            </Button>

            <Button
              size="sm"
              color={isCode ? 'primary' : 'default'}
              isIconOnly
              onPress={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')
              }}
              aria-label="Insert Code"
            >
              <Code width={ICON_SIZE} height={ICON_SIZE} />
            </Button>

            <Button
              size="sm"
              color={isLink ? 'primary' : 'default'}
              isIconOnly
              onPress={insertLink}
              className={`toolbar-item spaced ${isLink ? 'active' : ''}`}
              aria-label="Insert Link"
            >
              <Link2 width={ICON_SIZE} height={ICON_SIZE} />
            </Button>

            {isLink &&
              createPortal(
                <FloatingLinkEditor editor={editor} />,
                document.body
              )}
          </div>
          <div className="flex gap-1">
            <Button
              isIconOnly
              size="sm"
              onPress={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
              }}
              className="toolbar-item spaced"
              aria-label="Left Align"
            >
              <AlignLeft width={ICON_SIZE} height={ICON_SIZE} />
            </Button>

            <Button
              isIconOnly
              size="sm"
              onPress={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
              }}
              className="toolbar-item spaced"
              aria-label="Center Align"
            >
              <AlignCenter width={ICON_SIZE} height={ICON_SIZE} />
            </Button>

            <Button
              isIconOnly
              size="sm"
              onPress={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
              }}
              className="toolbar-item spaced"
              aria-label="Right Align"
            >
              <AlignRight width={ICON_SIZE} height={ICON_SIZE} />
            </Button>

            <Button
              isIconOnly
              size="sm"
              onPress={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')
              }}
              className="toolbar-item"
              aria-label="Justify Align"
            >
              <AlignJustify width={ICON_SIZE} height={ICON_SIZE} />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
