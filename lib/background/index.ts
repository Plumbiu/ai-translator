import { SelectAutoDetectValue } from '../constans/variables'
import { TranslateTypeEnum } from '../types'
import { detectLanguage, translate } from './translate'

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  const word = request.word?.trim()
  if (request.type === TranslateTypeEnum.Translate) {
    const sourceLanguage = request.sourceLanguage || SelectAutoDetectValue
    const targetLanguage = request.targetLanguage || navigator.language

    const catchHandler = (error: any) => {
      sendResponse({
        type: TranslateTypeEnum.Translate,
        translation: error.message,
        style: 'color: lightred;',
      })
    }

    if (sourceLanguage !== SelectAutoDetectValue) {
      translate(word, {
        sourceLanguage: navigator.language,
        targetLanguage,
      })
        .then((translatorResult) => {
          sendResponse({
            type: TranslateTypeEnum.Translate,
            translation: translatorResult,
          })
        })
        .catch(catchHandler)
    } else {
      detectLanguage(word)
        .then((detectorResult) => {
          if (!detectorResult.detectedLanguage) {
            throw new Error('Unknown language')
          }
          translate(word, {
            sourceLanguage: detectorResult.detectedLanguage,
            targetLanguage,
          })
            .then((translatorResult) => {
              sendResponse({
                type: TranslateTypeEnum.Translate,
                translation: translatorResult,
                sourceLanguage: detectorResult.detectedLanguage,
              })
            })
            .catch(catchHandler)
        })
        .catch(catchHandler)
    }
  }
  return true
})
