import { memo, type CSSProperties } from 'react'
import { Flex, Space, Tag, Typography } from 'antd'
import SimpleBar from 'simplebar-react'
import { classNameWithPrefix } from '../utils/dom'
import CopyButton from './CopyButton'
import SpeechButton from './SpeechButton'
import { useTranslationStore } from '../store'
import { formatConfidence } from '../utils/format'
import { getLocalName } from '../utils/locale'

const { Text, Paragraph } = Typography

const SimpleBarStyle: CSSProperties = {
  maxHeight: '50vh',
  padding: 12,
  margin: 2,
  minWidth: 36,
  minHeight: 64,
}

const BottomStyle: CSSProperties = {
  padding: '0 10px 12px 10px',
}

const ParagraphStyle: CSSProperties = {
  color: 'white',
}

export const LeftPanleItem = memo(() => {
  const selectedText = useTranslationStore((state) => state.selectedText)
  const sourceLanguage = useTranslationStore((state) => state.sourceLanguage)
  return (
    <Flex vertical justify="space-between" gap={8}>
      <Space direction="vertical">
        <Paragraph
          className={classNameWithPrefix('paragraph')}
          style={ParagraphStyle}
        >
          <SimpleBar style={SimpleBarStyle}>{selectedText}</SimpleBar>
        </Paragraph>
      </Space>
      <Flex vertical justify="space-between" gap={8} style={BottomStyle}>
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
  )
})

export const RightPanleItem = memo(() => {
  const slotStyle = useTranslationStore((state) => state.slotStyle)
  const translation = useTranslationStore((state) => state.translation)
  const targetLanguage = useTranslationStore((state) => state.targetLanguage)
  const detectResult = useTranslationStore((state) => state.detectResult)

  return (
    <Flex vertical justify="space-between" gap={8}>
      <Space direction="vertical">
        <Paragraph
          style={{ ...ParagraphStyle, ...slotStyle }}
          className={classNameWithPrefix('paragraph')}
        >
          <SimpleBar style={SimpleBarStyle}>{translation}</SimpleBar>
        </Paragraph>
      </Space>
      <Space direction="vertical" style={BottomStyle}>
        <Space
          style={{
            justifyContent: 'flex-end',
          }}
        >
          <SpeechButton text={translation} lang={targetLanguage} />
          <CopyButton text={translation} />
        </Space>
        <div>
          <SimpleBar>
            <Flex>
              {detectResult
                .filter((item) => item.confidence && item.detectedLanguage)
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
          </SimpleBar>
        </div>
      </Space>
    </Flex>
  )
})
