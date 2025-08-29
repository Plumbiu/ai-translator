import {
  getTranslateWord,
  getLastSelection,
  setTargetLanguage,
  getSourceLanguage,
  getTargetLanguage,
  setSourceLanguage,
  getFloatVisible,
} from '../constans/global-variables'
import { TranslateTypeEnum } from '../types'
import { getLocalName } from '../utils/locale'
import {
  floatButtonDom,
  floatSlotResultDom,
  selectTargetLanguageDom,
  selectSourceLanguageDom,
  floatDom,
} from './init'
import {
  hideFloatButton,
  showFloat,
  hideFloat,
  setFloatPosition,
} from '../utils/dom'

const translateHandler = (response: any) => {
  if (response.type === TranslateTypeEnum.Translate) {
    const translation = response?.translation
    if (response.sourceLanguage) {
      // 元素第一项
      const firstOptionDom = selectSourceLanguageDom.querySelector('option')
      if (firstOptionDom) {
        firstOptionDom.innerText = `Auto ${getLocalName(
          response.sourceLanguage,
        )}(${response.sourceLanguage})`
      }
    }
    if (!translation || translation.length === 0) {
      floatSlotResultDom.innerHTML = `<span style="${response.style}">未找到翻译</span>`
    } else {
      floatSlotResultDom.innerHTML = `<span style="${response.style}">${translation}</span>`
    }
  }
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === TranslateTypeEnum.Download) {
    if (!request.done) {
      floatSlotResultDom.innerHTML = `<span style="${request.style}">${request.progress}</span>`
    }
  }
  return true
})

floatButtonDom.addEventListener('click', () => {
  const word = getTranslateWord()
  if (!word) {
    return
  }
  const targetLanguage = getTargetLanguage()
  hideFloatButton()
  showFloat()
  chrome.runtime.sendMessage(
    { type: TranslateTypeEnum.Translate, word, targetLanguage },
    translateHandler,
  )
})

selectTargetLanguageDom.addEventListener('change', (e) => {
  const word = getLastSelection()?.toString().trim()
  if (!word) {
    return
  }
  const targetLanguage = (e.target as HTMLSelectElement).value
  setTargetLanguage(targetLanguage)
  showFloat()
  const sourceLanguage = getSourceLanguage()
  chrome.runtime.sendMessage(
    { type: TranslateTypeEnum.Translate, word, targetLanguage, sourceLanguage },
    translateHandler,
  )
})

selectSourceLanguageDom.addEventListener('change', (e) => {
  const word = getLastSelection()?.toString().trim()
  if (!word) {
    return
  }
  const targetLanguage = getTargetLanguage()
  const sourceLanguage = (e.target as HTMLSelectElement).value
  setSourceLanguage(sourceLanguage)
  chrome.runtime.sendMessage(
    { type: TranslateTypeEnum.Translate, word, targetLanguage, sourceLanguage },
    translateHandler,
  )
})

document.addEventListener('mousedown', (e) => {
  const target = e.target as Node
  const floatVisible = getFloatVisible()
  if (floatVisible) {
    if (!floatDom.contains(target)) {
      hideFloat()
    }
  } else {
    if (!floatButtonDom.contains(target)) {
      hideFloatButton()
    }
  }
})

document.addEventListener('mouseup', (e) => {
  const target = e.target
  const floatVisible = getFloatVisible()
  if (floatVisible && floatDom.contains(target as Element)) {
    return
  }

  setFloatPosition(e)
})
