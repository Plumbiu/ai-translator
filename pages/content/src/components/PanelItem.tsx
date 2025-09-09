import { Flex, Space, Tag, Typography } from 'antd'
import type { CSSProperties } from 'react'
import { memo } from 'react'
import SimpleBar from 'simplebar-react'
import { useTranslationStore } from '../store'
import { formatConfidence } from '../utils/format'
import { getLocalName } from '../utils/locale'
import CopyButton from './CopyButton'
import SpeechButton from './SpeechButton'
import 'simplebar-react/dist/simplebar.min.css'

const { Text, Paragraph } = Typography

const SimpleBarStyle: CSSProperties = {
  margin: 2,
  maxHeight: '50vh',
  minHeight: 64,
  minWidth: 36,
  padding: 12,
}

const ActionSpaceStyle: CSSProperties = {
  justifyContent: 'flex-end',
}

const BottomStyle: CSSProperties = {
  padding: '0 10px 12px 10px',
}

export const LeftPanleItem = memo(() => {
  const selectedText = useTranslationStore((state) => state.selectedText)
  const sourceLanguage = useTranslationStore((state) => state.sourceLanguage)
  return (
    <Flex gap={8} justify="space-between" vertical>
      <Space direction="vertical">
        <Paragraph className="paragraph">
          <SimpleBar style={SimpleBarStyle}>{selectedText}</SimpleBar>
        </Paragraph>
      </Space>
      <Flex gap={8} justify="space-between" style={BottomStyle} vertical>
        <Space style={ActionSpaceStyle}>
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
        <Paragraph className="paragraph" style={slotStyle}>
          <SimpleBar style={SimpleBarStyle}>{translation}</SimpleBar>
        </Paragraph>
      </Space>
      <Flex gap={8} vertical style={BottomStyle}>
        <Space style={ActionSpaceStyle}>
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
      </Flex>
    </Flex>
  )
})
