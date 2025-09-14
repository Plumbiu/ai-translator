import { useCallback, useEffect, useRef, useState } from 'react'

interface SpeechConfig {
  rate?: number
  pitch?: number
  volume?: number
  lang: string
}

interface SpeechState {
  isPlaying: boolean
  speak: () => void
  stop: () => void
}

function useSpeech(
  text: string,
  { rate = 1, pitch = 1, volume = 1, lang }: SpeechConfig,
): SpeechState {
  const [isPlaying, setIsPlaying] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const stopSpeech = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    setIsPlaying(false)
    utteranceRef.current = null
  }, [])

  const createUtterance = useCallback(() => {
    if (!text || !text.trim()) {
      return null
    }

    const utterance = new SpeechSynthesisUtterance(text.trim())

    utterance.rate = Math.max(0.1, Math.min(10, rate))
    utterance.pitch = Math.max(0, Math.min(2, pitch))
    utterance.volume = Math.max(0, Math.min(1, volume))
    utterance.lang = lang || 'en-US'

    utterance.onstart = () => {
      setIsPlaying(true)
    }

    utterance.onend = () => {
      setIsPlaying(false)
      utteranceRef.current = null
    }

    utterance.onerror = () => {
      setIsPlaying(false)
      utteranceRef.current = null
    }

    utterance.onpause = () => {
      setIsPlaying(false)
    }

    utterance.onresume = () => {
      setIsPlaying(true)
    }

    return utterance
  }, [text, rate, pitch, volume, lang])

  const speak = useCallback(() => {
    if (isPlaying || window.speechSynthesis.speaking) {
      stopSpeech()
      setTimeout(() => {
        const newUtterance = createUtterance()
        if (newUtterance) {
          utteranceRef.current = newUtterance
          window.speechSynthesis.speak(newUtterance)
        }
      }, 100)
      return
    }

    const newUtterance = createUtterance()
    if (newUtterance) {
      utteranceRef.current = newUtterance
      try {
        window.speechSynthesis.speak(newUtterance)
      } catch (error) {
        setIsPlaying(false)
        utteranceRef.current = null
      }
    }
  }, [isPlaying, createUtterance, stopSpeech])

  const stop = useCallback(() => {
    stopSpeech()
  }, [stopSpeech])

  useEffect(() => {
    return () => {
      stopSpeech()
    }
  }, [stopSpeech])

  useEffect(() => {
    if (isPlaying) {
      stopSpeech()
    }
  }, [isPlaying, text, rate, pitch, volume, lang, stopSpeech])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying) {
        stopSpeech()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isPlaying, stopSpeech])

  return {
    isPlaying,
    speak,
    stop,
  }
}

export default useSpeech
