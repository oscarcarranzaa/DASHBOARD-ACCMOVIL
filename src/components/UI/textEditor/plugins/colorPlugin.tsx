'use client'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import {
  $patchStyleText,
  $getSelectionStyleValueForProperty,
} from '@lexical/selection'
import { Baseline, PaintBucket } from 'lucide-react'
import ColorPicker from '../../colorPicker'
import { useEffect, useState } from 'react'
import { mergeRegister } from '@lexical/utils'
import { LowPriority } from './toolbarPlugin'

type colorProperty = {
  property: 'background' | 'color'
  color: string
}
export default function ColorPlugin() {
  const [editor] = useLexicalComposerContext()
  const [{ color, bgColor }, setColors] = useState({
    color: '#000',
    bgColor: '#fff',
  })

  const updateToolbar = () => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const color = $getSelectionStyleValueForProperty(
        selection,
        'color',
        '#000'
      )
      const bgColor = $getSelectionStyleValueForProperty(
        selection,
        'background',
        '#fff'
      )
      setColors({ color, bgColor })
    }
  }
  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar()
          return false
        },
        LowPriority
      )
    )
  }, [editor])

  const updateColor = ({ property, color }: colorProperty) => {
    editor.update(() => {
      const selection = $getSelection()
      if (selection) $patchStyleText(selection, { [property]: color })
    })
  }

  return (
    <>
      <ColorPicker
        color={color}
        icon={<Baseline />}
        onChange={(color) => updateColor({ property: 'color', color })}
      />
      <ColorPicker
        color={bgColor}
        icon={<PaintBucket />}
        onChange={(color) => updateColor({ property: 'background', color })}
      />
    </>
  )
}
