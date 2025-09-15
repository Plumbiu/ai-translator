import { useEffect, useRef } from 'react'
import barStyle from 'simplebar-react/dist/simplebar.min.css'
import { TranslateIcon } from './components/icons'
import { LeftPanleItem, RightPanleItem } from './components/PanelItem'
import TooltipHeader from './components/TooltipHeader'
import Button from './components/ui/Button'
import useLatest from './hooks/useLatest'
import useTheme from './hooks/useTheme'
import useTransltor from './hooks/useTransltor'
import useUpdateEffect from './hooks/useUpdateEffect'
import { useTranslationStore } from './store'
import tailwindcssStyle from './tailwind.css'
import { isTargetInContainer } from './utils/dom'

function App() {
  const {
    buttonVisible,
    setButtonVisible,
    slotVisible,
    setSlotVisible,
    sourceLanguage,
    targetLanguage,
  } = useTranslationStore()

  const latestButtonVisible = useLatest(buttonVisible)
  const latestSlotVisible = useLatest(slotVisible)

  const {
    showFloatButton,
    translateAndShowSlot,
    translate,
    selectionInfoCache,
  } = useTransltor()

  const { systemTheme } = useTheme()

  const wrapperDomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseUp = async (e: Event) => {
      // button only show when both button and slot are not visible
      if (latestButtonVisible.current || latestSlotVisible.current) {
        return
      }
      if (isTargetInContainer(e)) {
        return
      }

      showFloatButton()
    }

    const handleMousedown = (e: Event) => {
      if (!(latestButtonVisible.current || latestSlotVisible.current)) {
        return
      }
      if (isTargetInContainer(e)) {
        return
      }
      if (latestSlotVisible.current) {
        setSlotVisible(false)
      }
      if (latestButtonVisible.current) {
        setButtonVisible(false)
      }
    }

    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mousedown', handleMousedown)

    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mousedown', handleMousedown)
    }
  }, [])

  useUpdateEffect(() => {
    translate(selectionInfoCache.current?.text)
  }, [sourceLanguage, targetLanguage])

  useEffect(() => {
    const rootElement = wrapperDomRef.current
    if (rootElement) {
      rootElement.setAttribute('data-theme', systemTheme)
    }
  }, [systemTheme])

  return (
    <>
      <style>{barStyle}</style>
      <style>{tailwindcssStyle}</style>
      <div ref={wrapperDomRef}>
        {buttonVisible ? (
          <Button className="btn-circle btn-xs" onClick={translateAndShowSlot}>
            <TranslateIcon />
          </Button>
        ) : null}
        {slotVisible ? (
          <div className="flex flex-col gap-4 rounded-lg bg-base-100 p-4 text-base-content">
            <TooltipHeader />
            <div className="flex text-sm">
              <LeftPanleItem />
              <RightPanleItem />
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default App
