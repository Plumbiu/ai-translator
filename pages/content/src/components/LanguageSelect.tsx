import { SelectAutoDetectValue } from '@libs/constants'
import { Select } from 'antd'
import { useTranslationStore } from '../store'
import { getLocalName, supportsLanguages } from '../utils/locale'

// 生成目标语言选项
const targetLanguageOptions = [navigator.language, ...supportsLanguages].map(
  (language) => ({
    label: `${getLocalName(language)} (${language})`,
    value: language,
  }),
)

const sourceLanguageOptions = [
  { label: 'Auto', value: SelectAutoDetectValue },
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
      onChange={setSourceLanguage}
      options={sourceLanguageOptions}
      style={{
        width: 200,
      }}
      value={sourceLanguage}
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
      onChange={(value) => {
        setTargetLanguage(value)
      }}
      options={targetLanguageOptions}
      style={{
        width: 200,
      }}
      value={targetLanguage}
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
