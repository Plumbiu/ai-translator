import { Select } from 'antd'
import { getLocalName, supportsLanguages } from '../utils/locale'
import { useTranslationStore } from '../store'
import { SelectAutoDetectValue } from '@ai-translator/constants'

// 生成目标语言选项
const targetLanguageOptions = [navigator.language, ...supportsLanguages].map(
  (language) => ({
    value: language,
    label: `${getLocalName(language)} (${language})`,
  }),
)

const sourceLanguageOptions = [
  { value: SelectAutoDetectValue, label: 'Auto' },
  ...targetLanguageOptions,
]

export const SourceLanguageSelectId = '__ai_translator_source_language_select__'

export function SourceLanguageSelect() {
  const sourceLanguage = useTranslationStore((state) => state.sourceLanguage)
  const setSourceLanguage = useTranslationStore(
    (state) => state.setSourceLanguage,
  )
  return (
    <Select
      classNames={{
        popup: {
          root: SourceLanguageSelectId,
        },
      }}
      style={{
        width: 200,
      }}
      value={sourceLanguage}
      onChange={setSourceLanguage}
      options={sourceLanguageOptions}
    />
  )
}

export const TargetLanguageSelectId = '__ai_translator_target_language_select__'

export function TargetLanguageSelect() {
  const targetLanguage = useTranslationStore((state) => state.targetLanguage)
  const setTargetLanguage = useTranslationStore(
    (state) => state.setTargetLanguage,
  )
  return (
    <Select
      classNames={{
        popup: {
          root: TargetLanguageSelectId,
        },
      }}
      style={{
        width: 200,
      }}
      value={targetLanguage}
      onChange={(value) => {
        setTargetLanguage(value)
      }}
      options={targetLanguageOptions}
    />
  )
}

export function getLanguageSelectDom() {
  return {
    sourceLanguageSelectDom: document.querySelector(
      '.' + SourceLanguageSelectId,
    ),
    targetLanguageSelectDom: document.querySelector(
      '.' + TargetLanguageSelectId,
    ),
  }
}
