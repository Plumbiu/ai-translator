import { CopyOutlined, CheckOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useCallback, useState } from 'react'

interface CopyButtonProps {
  text: string
}
function CopyButton({ text }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }, [text])
  return (
    <Button
      icon={isCopied ? <CheckOutlined /> : <CopyOutlined />}
      onClick={handleCopy}
    />
  )
}

export default CopyButton
