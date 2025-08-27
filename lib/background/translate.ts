import { TranslateTypeEnum } from '../types'

interface TranslateOptions {
  sourceLanguage: string
  targetLanguage: string
}

const sendDownloadProgress = (progress: string, done: boolean) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: TranslateTypeEnum.Download,
        done,
        progress,
        style: 'color: lightblue;',
      })
    }
  })
}

const monitorEventHandler = (monitor: CreateMonitor) => {
  monitor.addEventListener('downloadprogress', (event) => {
    sendDownloadProgress(
      `Downloading model ${((event.loaded / event.total) * 100).toFixed(
        2,
      )}%...`,
      event.loaded === event.total,
    )
  })
}

export async function translate(
  word: string,
  { sourceLanguage, targetLanguage }: TranslateOptions,
) {
  const translatorCapabilities = await Translator.availability({
    sourceLanguage,
    targetLanguage,
  })

  const isAvailable = translatorCapabilities === 'available'

  if (translatorCapabilities === 'unavailable') {
    throw new Error('Translator API not available')
  }
  if (!isAvailable) {
    sendDownloadProgress('Downloading model 0%...', false)
  }

  const translator = await Translator.create({
    sourceLanguage,
    targetLanguage,
    monitor: isAvailable ? undefined : monitorEventHandler,
  })

  const translatorResult = await translator.translate(word)
  return translatorResult
}

export async function detectLanguage(word: string) {
  const detectorCapabilities = await LanguageDetector.availability()
  if (detectorCapabilities === 'unavailable') {
    throw new Error('LanguageDetector API not available')
  }
  const detector = await LanguageDetector.create()
  const detectorResult = (await detector.detect(word))[0]
  return detectorResult
}
