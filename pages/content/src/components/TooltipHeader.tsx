import { memo } from 'react'
import { ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons'
import { Typography, Flex, Space } from 'antd'
import { SourceLanguageSelect, TargetLanguageSelect } from './LanguageSelect'
import { useTranslationStore } from '../store'

const { Text } = Typography
const TooltipHeader = memo(() => {
  const loading = useTranslationStore((state) => state.loading)
  return (
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
  )
})

export default TooltipHeader
