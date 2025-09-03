import { MutedOutlined, SoundOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import useSpeech from '../hooks/useSpeech'

interface SpeechButtonProps {
  text: string
  lang: string
}

function SpeechButton({ text, lang }: SpeechButtonProps) {
  const state = useSpeech(text, { lang })

  function handleSpeech() {
    if (state.isPlaying) {
      state.stop()
    } else {
      state.speak()
    }
  }

  return (
    <Button
      icon={state.isPlaying ? <MutedOutlined /> : <SoundOutlined />}
      onClick={handleSpeech}
    />
  )
}

export default SpeechButton
