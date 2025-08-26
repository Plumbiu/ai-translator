import {
  ArrowRightIconHtml,
  ButtonHtml,
  SelectSourceLanguageHtml,
  SelectTargetLanguageHtml,
} from '../constans/html'

// Element
export const floatDom = document.createElement('div')
export const floatSlotDom = document.createElement('div')
export const floatSlotResultDom = document.createElement('div')
export const floatButtonDom = document.createElement('div')
export const floatSelectContainerDom = document.createElement('div')
export const selectTargetLanguageDom = document.createElement('select')
export const selectArrowRightIconDom = document.createElement('div')
export const selectSourceLanguageDom = document.createElement('select')

floatDom.classList.add('__ai_translator__')
floatSlotDom.classList.add('__ai_translator__slot')
floatSlotResultDom.classList.add('__ai_translator__slot_result')
floatButtonDom.classList.add('__ai_translator__button')
floatSelectContainerDom.classList.add('__ai_translator__select_container')
selectTargetLanguageDom.classList.add('__ai_translator__select')
selectSourceLanguageDom.classList.add('__ai_translator__select')
selectArrowRightIconDom.classList.add('__ai_translator__select_arrow_right')
selectSourceLanguageDom.classList.add('__ai_translator__select_source')

floatButtonDom.innerHTML = ButtonHtml
selectTargetLanguageDom.innerHTML = SelectTargetLanguageHtml
selectSourceLanguageDom.innerHTML = SelectSourceLanguageHtml
selectArrowRightIconDom.innerHTML = ArrowRightIconHtml

floatDom.appendChild(floatButtonDom)
floatDom.appendChild(floatSlotDom)
floatSlotDom.appendChild(floatSelectContainerDom)
floatSelectContainerDom.appendChild(selectSourceLanguageDom)
floatSelectContainerDom.appendChild(selectArrowRightIconDom)
floatSelectContainerDom.appendChild(selectTargetLanguageDom)
floatSlotDom.appendChild(floatSlotResultDom)
document.body.appendChild(floatDom)
