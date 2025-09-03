import { getSelectionInfo } from '../utils/selection'
import { useTranslationStore } from '../store'
import { getTooltipPosition } from '../utils/dom'
import { setRootElementPosition } from '../utils/dom'
import { useRef } from 'react'
import { TranslatorApi } from '../utils/translator'
import { SelectAutoDetectValue } from '@ai-translator/constants'

function useTransltor() {
  const sourceLanguage = useTranslationStore((state) => state.sourceLanguage)
  const targetLanguage = useTranslationStore((state) => state.targetLanguage)
  const setButtonVisible = useTranslationStore(
    (state) => state.setButtonVisible,
  )
  const setSlotVisible = useTranslationStore((state) => state.setSlotVisible)
  const setTranslation = useTranslationStore((state) => state.setTranslation)
  const setSlotStyle = useTranslationStore((state) => state.setSlotStyle)
  const setLoading = useTranslationStore((state) => state.setLoading)
  const setDetectResult = useTranslationStore((state) => state.setDetectResult)
  const setSelectedText = useTranslationStore((state) => state.setSelectedText)

  const selectionInfoCache = useRef<{
    text: string
    selection: Selection
  } | null>(null)

  function catchHandler(error: any) {
    setTranslation(error.message || 'Unknown error')
    setSlotStyle({
      color: '#f88585',
    })
  }

  async function translateWithMonitor(text: string) {
    setLoading(true)
    try {
      let finalSourceLanguage = sourceLanguage
      if (sourceLanguage === SelectAutoDetectValue) {
        const detectResult = await TranslatorApi.detectLanguage(text)
        setDetectResult(detectResult)
        if (detectResult[0].detectedLanguage) {
          finalSourceLanguage = detectResult[0].detectedLanguage
        }
      }
      const result = await TranslatorApi.translate(text, {
        sourceLanguage: finalSourceLanguage,
        targetLanguage,
        monitor(m) {
          m.addEventListener('downloadprogress', (event) => {
            const { loaded, total } = event
            if (loaded === total) {
              setTranslation('Translating...')
            } else {
              setTranslation(
                `Downloading model ${(
                  (event.loaded / event.total) *
                  100
                ).toFixed(2)}%...`,
              )
            }
            setSlotStyle({
              color: 'lightblue',
            })
          })
        },
      })
      setLoading(false)
      return result
    } catch (error) {
      catchHandler(error)
    } finally {
      setLoading(false)
    }
  }

  function translate(text: string | null | undefined) {
    if (!text) {
      return
    }
    return translateWithMonitor(text).then(handleTranslateResponse)
  }

  function handleTranslateResponse(response: any) {
    if (!response) {
      return
    }
    setTranslation(response)
  }

  // translate and set tooltip
  async function showFloatButton() {
    const selectionInfo = getSelectionInfo()
    if (!selectionInfo) {
      return
    }
    setSelectedText(selectionInfo.text)
    selectionInfoCache.current = selectionInfo
    const position = await getTooltipPosition(selectionInfo.selection)
    if (position) {
      setRootElementPosition(position)
      setButtonVisible(true)
    }
  }

  async function translateAndShowSlot() {
    if (!selectionInfoCache.current) {
      return
    }
    setButtonVisible(false)
    const { text } = selectionInfoCache.current
    await translate(text)
    setSlotVisible(true)
  }

  return {
    showFloatButton,
    handleTranslateResponse,
    translate,
    translateAndShowSlot,
    selectionInfoCache,
  }
}

export default useTransltor
