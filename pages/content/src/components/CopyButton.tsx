import { memo, useCallback, useState } from 'react'
import { CheckIcon, CopyIcon } from './icons'
import Button from './ui/Button'

interface CopyButtonProps {
  text: string
}
const CopyButton = memo(({ text }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }, [text])
  return (
    <Button onClick={handleCopy}>
      {isCopied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  )
})

export default CopyButton
