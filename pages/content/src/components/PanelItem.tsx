import { Flex, Space, Tag, Typography } from 'antd'
import type { CSSProperties } from 'react'
import { memo } from 'react'
import SimpleBar from 'simplebar-react'
import { useTranslationStore } from '../store'
import { classNameWithPrefix } from '../utils/dom'
import { formatConfidence } from '../utils/format'
import { getLocalName } from '../utils/locale'
import CopyButton from './CopyButton'
import SpeechButton from './SpeechButton'

const { Text, Paragraph } = Typography

const SimpleBarStyle: CSSProperties = {
  margin: 2,
  maxHeight: '50vh',
  minHeight: 64,
  minWidth: 36,
  padding: 12,
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
    <Flex gap={8} justify="space-between" vertical>
      <Space direction="vertical">
        <Paragraph
          className={classNameWithPrefix('paragraph')}
          style={ParagraphStyle}
        >
          <SimpleBar style={SimpleBarStyle}>{selectedText}</SimpleBar>
        </Paragraph>
      </Space>
      <Flex gap={8} justify="space-between" style={BottomStyle} vertical>
        <Space
          style={{
            justifyContent: 'flex-end',
          }}
        >
          <SpeechButton lang={sourceLanguage} text={selectedText} />
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
    <Flex gap={8} justify="space-between" vertical>
      <Space direction="vertical">
        <Paragraph
          className={classNameWithPrefix('paragraph')}
          style={{ ...ParagraphStyle, ...slotStyle }}
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
          <SpeechButton lang={targetLanguage} text={translation} />
          <CopyButton text={translation} />
        </Space>
        <div>
          <SimpleBar>
            <Flex>
              {detectResult
                .filter((item) => item.confidence && item.detectedLanguage)
                .map((item) => (
                  <Tag
                    icon={
                      <div>
                        {getLocalName(item.detectedLanguage!)}
                        {` (${item.detectedLanguage})`}
                      </div>
                    }
                    key={item.detectedLanguage}
                  >
                    <Text style={{ fontSize: 12 }} type="secondary">
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
