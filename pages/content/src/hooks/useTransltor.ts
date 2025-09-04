import { getSelectionInfo } from '../utils/selection'
import { useTranslationStore } from '../store'
import {
  getRootElement,
  getTooltipPosition,
  waitNextFrame,
  waitForDOMUpdate,
} from '../utils/dom'
import { setRootElementPosition } from '../utils/dom'
import { useRef } from 'react'
import { TranslatorApi } from '../utils/translator'
import { SelectAutoDetectValue } from '@libs/constants'
import type { ComputePositionReturn } from '@floating-ui/dom'

function useTransltor() {
  const sourceLanguage = useTranslationStore((state) => state.sourceLanguage)
  const targetLanguage = useTranslationStore((state) => state.targetLanguage)
  const setButtonVisible = useTranslationStore(
    (state) => state.setButtonVisible,
  )
  const slotVisible = useTranslationStore((state) => state.slotVisible)
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

  const positionCache = useRef<ComputePositionReturn | null>(null)

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
      setSlotStyle({})
      setLoading(false)
      return result
    } catch (error) {
      catchHandler(error)
    } finally {
      setLoading(false)
    }
  }

  async function translate(text: string | null | undefined) {
    if (!text) {
      return
    }
    await translateWithMonitor(text).then(handleTranslateResponse)

    // if the translation card is visible, wait for the DOM update and adjust the position
    if (slotVisible) {
      await waitForDOMUpdate()
      adjustTooltipPosition()
    }
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
      positionCache.current = position
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

    await waitNextFrame()
    adjustTooltipPosition()
  }

  function adjustTooltipPosition() {
    const position = positionCache.current
    if (!position) return

    const rootElement = getRootElement()
    if (!rootElement) return

    const rect = rootElement.getBoundingClientRect()
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    let needsUpdate = false

    // right overflow - use rect.right instead of position.x + rect.width
    if (rect.right > windowWidth) {
      position.x = windowWidth - rect.width - 24
      needsUpdate = true
    }

    // left overflow - use rect.left instead of position.x
    if (rect.left < 24) {
      position.x = 24
      needsUpdate = true
    }
    console.log(rect, windowHeight, windowWidth)

    // bottom overflow - use rect.bottom instead of position.y + rect.height
    if (rect.bottom > windowHeight) {
      const newY = windowHeight - rect.height - 24
      position.y = Math.max(24, newY)
      needsUpdate = true
    }

    // top overflow - use rect.top instead of position.y
    if (rect.top < 24) {
      position.y = 24
      needsUpdate = true
    }

    if (needsUpdate) {
      setRootElementPosition(position)
    }
  }

  return {
    showFloatButton,
    handleTranslateResponse,
    translate,
    translateAndShowSlot,
    selectionInfoCache,
    adjustTooltipPosition,
  }
}

export default useTransltor
