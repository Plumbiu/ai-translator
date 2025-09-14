import { memo } from 'react'
import useSpeech from '../hooks/useSpeech'
import { MutedIcon, SoundIcon } from './icons'
import Button from './ui/Button'

interface SpeechButtonProps {
  text: string
  lang: string
}

const SpeechButton = memo(({ text, lang }: SpeechButtonProps) => {
  const state = useSpeech(text, { lang })

  function handleSpeech() {
    if (state.isPlaying) {
      state.stop()
    } else {
      state.speak()
    }
  }

  return (
    <Button onClick={handleSpeech}>
      {state.isPlaying ? <MutedIcon /> : <SoundIcon />}
    </Button>
  )
})

export default SpeechButton
