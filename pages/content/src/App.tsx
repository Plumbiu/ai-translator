import { useEffect, type CSSProperties } from 'react'
import {
  ArrowRightOutlined,
  LoadingOutlined,
  TranslationOutlined,
} from '@ant-design/icons'
import debounce from 'debounce'
import {
  SourceLanguageSelect,
  TargetLanguageSelect,
} from './components/LanguageSelect'
import { useTranslationStore } from './store'
import {
  Button,
  Card,
  ConfigProvider,
  Flex,
  Space,
  Splitter,
  Tag,
  theme,
  Typography,
} from 'antd'
import useTransltor from './hooks/useTransltor'
import useUpdateEffect from './hooks/useUpdateEffect'
import { isTargetInContainer } from './utils/dom'
import { getLocalName } from './utils/locale'
import { formatConfidence } from './utils/format'
import SpeechButton from './components/SpeechButton'
import useTheme from './hooks/useTheme'
import CopyButton from './components/CopyButton'
import { RootClassName } from './constants'

const { Text, Paragraph } = Typography

const SplitterPannelStyle: CSSProperties = {
  padding: 16,
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
    loading,
    slotStyle,
    translation,
    sourceLanguage,
    targetLanguage,
    detectResult,
    selectedText,
  } = useTranslationStore()

  const {
    showFloatButton,
    translateAndShowSlot,
    translate,
    selectionInfoCache,
  } = useTransltor()

  const { isDark } = useTheme()

  useEffect(() => {
    const handleMouseUp = debounce(async (e) => {
      if (isTargetInContainer(e.target)) {
        return
      }
      // button only show when both button and slot are not visible
      if (buttonVisible || slotVisible) {
        return
      }
      showFloatButton()
    }, 200)

    const handleMousedown = debounce((e) => {
      if (isTargetInContainer(e.target)) {
        return
      }
      if (slotVisible) {
        setSlotVisible(false)
      }
      if (buttonVisible) {
        setButtonVisible(false)
      }
    }, 200)

    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mousedown', handleMousedown)

    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mousedown', handleMousedown)
    }
  }, [sourceLanguage, targetLanguage, slotVisible, buttonVisible])

  useUpdateEffect(() => {
    translate(selectionInfoCache.current?.text)
  }, [sourceLanguage, targetLanguage])

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
      prefixCls={RootClassName}
    >
      {buttonVisible ? (
        <Button onClick={translateAndShowSlot} icon={<TranslationOutlined />} />
      ) : null}
      {slotVisible ? (
        <Card
          title={
            <Flex justify="space-between" gap={8}>
              <Space>
                <SourceLanguageSelect />
                <Text type="secondary">
                  <ArrowRightOutlined />
                </Text>
                <TargetLanguageSelect />
              </Space>
              <Space>
                <LoadingOutlined
                  style={{ visibility: loading ? 'visible' : 'hidden' }}
                />
              </Space>
            </Flex>
          }
          className={`${RootClassName}slot_card`}
        >
          <Splitter>
            <Splitter.Panel {...SplitterPannelProps}>
              <Flex vertical justify="space-between" gap={8}>
                <Space direction="vertical">
                  <Paragraph className={`${RootClassName}paragraph`}>
                    {selectedText}
                  </Paragraph>
                </Space>
                <Flex vertical justify="space-between" gap={8}>
                  <Space
                    style={{
                      justifyContent: 'flex-end',
                    }}
                  >
                    <SpeechButton text={selectedText} lang={sourceLanguage} />
                    <CopyButton text={selectedText} />
                  </Space>
                </Flex>
              </Flex>
            </Splitter.Panel>
            <Splitter.Panel {...SplitterPannelProps}>
              <Flex vertical justify="space-between" gap={8}>
                <Space direction="vertical">
                  <Paragraph
                    style={slotStyle}
                    className={`${RootClassName}paragraph`}
                  >
                    {translation}
                  </Paragraph>
                </Space>
                <Space direction="vertical">
                  <Space
                    style={{
                      justifyContent: 'flex-end',
                    }}
                  >
                    <SpeechButton text={translation} lang={targetLanguage} />
                    <CopyButton text={translation} />
                  </Space>
                  <Card
                    size="small"
                    style={{ overflowX: 'auto', overflowY: 'hidden' }}
                  >
                    <Flex>
                      {detectResult
                        .filter(
                          (item) => item.confidence && item.detectedLanguage,
                        )
                        .map((item) => (
                          <Tag
                            key={item.detectedLanguage}
                            icon={
                              <div>
                                {getLocalName(item.detectedLanguage!)}
                                {` (${item.detectedLanguage})`}
                              </div>
                            }
                          >
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {formatConfidence(item.confidence!)}
                            </Text>
                          </Tag>
                        ))}
                    </Flex>
                  </Card>
                </Space>
              </Flex>
            </Splitter.Panel>
          </Splitter>
        </Card>
      ) : null}
    </ConfigProvider>
  )
}

export default App
