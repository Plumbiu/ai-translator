import clsx from 'clsx'
import type { CSSProperties } from 'react'
import { memo } from 'react'
import SimpleBar from 'simplebar-react'
import { useTranslationStore } from '../store'
import CopyButton from './CopyButton'
import SpeechButton from './SpeechButton'

const SimpleBarStyle: CSSProperties = {
  margin: 2,
  maxHeight: '50vh',
  minHeight: 64,
  minWidth: 36,
  userSelect: 'text',
}

const panelWrapperClassName =
  'flex flex-col justify-between gap-2 w-1/2 shrink-1 grow-0'
const panelBottomClassName =
  'flex justify-end gap-2 px-[10px] pb-[12px] overflow-hidden'

export const LeftPanleItem = memo(() => {
  const selectedText = useTranslationStore((state) => state.selectedText)
  const sourceLanguage = useTranslationStore((state) => state.sourceLanguage)
  return (
    <div className={clsx(panelWrapperClassName, 'mr-1')}>
      <div>
        <SimpleBar style={SimpleBarStyle}>{selectedText}</SimpleBar>
      </div>
      <div className={panelBottomClassName}>
        <SpeechButton lang={sourceLanguage} text={selectedText} />
        <CopyButton text={selectedText} />
      </div>
    </div>
  )
})

export const RightPanleItem = memo(() => {
  const slotStyle = useTranslationStore((state) => state.slotStyle)
  const translation = useTranslationStore((state) => state.translation)
  const targetLanguage = useTranslationStore((state) => state.targetLanguage)

  return (
    <div className={clsx(panelWrapperClassName, 'ml-1')}>
      <div style={slotStyle}>
        <SimpleBar style={SimpleBarStyle}>{translation}</SimpleBar>
      </div>
      <div className={panelBottomClassName}>
        <SpeechButton lang={targetLanguage} text={translation} />
        <CopyButton text={translation} />
      </div>
    </div>
  )
})
