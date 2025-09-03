export class TranslatorApi {
  static async translate(
    word: string,
    { sourceLanguage, targetLanguage, monitor }: TranslatorCreateOptions,
  ) {
    const abortController = new AbortController()
    try {
      const translatorCapabilities = await Translator.availability({
        sourceLanguage,
        targetLanguage,
      })

      const isAvailable = translatorCapabilities === 'available'

      if (translatorCapabilities === 'unavailable') {
        throw new Error('Translator API not available')
      }

      const translator = await Translator.create({
        sourceLanguage,
        targetLanguage,
        monitor: isAvailable ? undefined : monitor,
        signal: abortController.signal,
      })

      const translatorResult = await translator.translate(word, {
        signal: abortController.signal,
      })
      return translatorResult
    } catch (error) {
      abortController.abort()
      throw error
    }
  }

  static async detectLanguage(word: string) {
    const abortController = new AbortController()

    try {
      const detectorCapabilities = await LanguageDetector.availability()
      if (detectorCapabilities === 'unavailable') {
        throw new Error('LanguageDetector API not available')
      }
      const detector = await LanguageDetector.create()
      const detectorResult = await detector.detect(word)
      return detectorResult
    } catch (error) {
      abortController.abort()
      throw error
    }
  }
}
