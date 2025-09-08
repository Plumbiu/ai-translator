import { useEffect, type CSSProperties } from 'react'
import { TranslationOutlined } from '@ant-design/icons'
import { useTranslationStore } from './store'
import { Button, Card, ConfigProvider, Splitter, theme } from 'antd'
import useTransltor from './hooks/useTransltor'
import useUpdateEffect from './hooks/useUpdateEffect'
import {
  classNameWithPrefix,
  getRootElement,
  isTargetInContainer,
} from './utils/dom'
import useTheme from './hooks/useTheme'
import { RootClassName } from './constants'
import { LeftPanleItem, RightPanleItem } from './components/PanelItem'
import TooltipHeader from './components/TooltipHeader'
import useLatest from './hooks/useLatest'

const SplitterPannelStyle: CSSProperties = {
  height: '100%',
  overflow: 'hidden',
}

const SplitterPannelProps = {
  min: '25%',
  max: '75%',
  defaultSize: '50%',
  style: SplitterPannelStyle,
}

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

  const { isDark, systemTheme } = useTheme()

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
    const rootElement = getRootElement()
    if (rootElement) {
      rootElement.setAttribute('data-theme', systemTheme)
    }
  }, [systemTheme])

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
      prefixCls={RootClassName}
    >
      {buttonVisible ? (
        <Button
          size="small"
          onClick={translateAndShowSlot}
          icon={<TranslationOutlined />}
        />
      ) : null}
      {slotVisible ? (
        <Card
          title={<TooltipHeader />}
          className={classNameWithPrefix('slot_card')}
        >
          <Splitter>
            <Splitter.Panel {...SplitterPannelProps}>
              <LeftPanleItem />
            </Splitter.Panel>
            <Splitter.Panel {...SplitterPannelProps}>
              <RightPanleItem />
            </Splitter.Panel>
          </Splitter>
        </Card>
      ) : null}
    </ConfigProvider>
  )
}

export default App
