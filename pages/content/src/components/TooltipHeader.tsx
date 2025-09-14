import { memo } from 'react'
import { useTranslationStore } from '../store'
import { ArrowRightOIcon, LoadingIcon } from './icons'
import { SourceLanguageSelect, TargetLanguageSelect } from './LanguageSelect'

const TooltipHeader = memo(() => {
  const loading = useTranslationStore((state) => state.loading)
  return (
    <div className="flex items-center justify-between gap-2">
      <SourceLanguageSelect />
      <ArrowRightOIcon className="text-gray-300" />
      <TargetLanguageSelect />
      <LoadingIcon
        className="ml-2"
        style={{ visibility: loading ? 'visible' : 'hidden' }}
      />
    </div>
  )
})

export default TooltipHeader
