import { SelectAutoDetectValue } from '@libs/constants'
import { useMemo } from 'react'
import { useTranslationStore } from '../store'
import { getLocalName, supportsLanguages } from '../utils/locale'

// 生成目标语言选项
const targetLanguageOptions = [navigator.language, ...supportsLanguages].map(
  (language) => ({
    label: `${getLocalName(language)} (${language})`,
    value: language,
  }),
)

const targetLanguageOptionDom = targetLanguageOptions.map((item) => (
  <option key={item.value} value={item.value}>
    {item.label}
  </option>
))

export const SourceLanguageSelectId = '__ai_translator_source_language_select__'

export function SourceLanguageSelect() {
  const sourceLanguage = useTranslationStore((state) => state.sourceLanguage)
  const setSourceLanguage = useTranslationStore(
    (state) => state.setSourceLanguage,
  )
  const detecResult = useTranslationStore((state) => state.detectResult)

  const detectedLanguage = useMemo(
    () => detecResult[0].detectedLanguage,
    [detecResult],
  )

  const sourceLanguageOptionDom = useMemo(
    () =>
      [
        {
          label: `Auto${detectedLanguage ? ` (${getLocalName(detectedLanguage)})` : ''}`,
          value: SelectAutoDetectValue,
        },
        ...targetLanguageOptions,
      ].map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      )),
    [detectedLanguage],
  )
  return (
    <select
      className="select"
      onChange={(e) => setSourceLanguage(e.target.value)}
      style={{
        width: 200,
      }}
      value={sourceLanguage}
    >
      {sourceLanguageOptionDom}
    </select>
  )
}

export const TargetLanguageSelectId = '__ai_translator_target_language_select__'

export function TargetLanguageSelect() {
  const targetLanguage = useTranslationStore((state) => state.targetLanguage)
  const setTargetLanguage = useTranslationStore(
    (state) => state.setTargetLanguage,
  )
  return (
    <select
      className="select"
      onChange={(e) => {
        setTargetLanguage(e.target.value)
      }}
      style={{
        width: 200,
      }}
      value={targetLanguage}
    >
      {targetLanguageOptionDom}
    </select>
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
