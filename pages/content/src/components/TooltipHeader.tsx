import { ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons'
import { Flex, Space, Typography } from 'antd'
import { memo } from 'react'
import { useTranslationStore } from '../store'
import { SourceLanguageSelect, TargetLanguageSelect } from './LanguageSelect'

const { Text } = Typography
const TooltipHeader = memo(() => {
  const loading = useTranslationStore((state) => state.loading)
  return (
    <Flex gap={8} justify="space-between">
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
