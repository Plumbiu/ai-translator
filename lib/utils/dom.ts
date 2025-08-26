import {
  getLastSelection,
  setFloatVisible,
  setLastSelection,
  setTranslateWord,
} from '../constans/global-variables'
import {
  floatDom,
  floatButtonDom,
  floatSlotDom,
  floatSlotResultDom,
} from '../dom/init'
import { ButtonHtml, LoadingHtml } from '../constans/html'

export function setFloatPosition() {
  const selection = getLastSelection() ?? window.getSelection()
  if (!selection) {
    return
  }
  setLastSelection(selection)
  try {
    const text = selection.toString().trim()
    const range = selection.getRangeAt(0)
    if (text && range) {
      const rect = range.getBoundingClientRect()
      setTranslateWord(text)
      floatDom.style.display = 'block'
      floatDom.style.top = `${rect.top + rect.height + 4}px`
      floatDom.style.left = `${rect.left + rect.width / 2}px`
      showFloatButton()
    }
  } catch (error) {
  }
}

export function hideFloat() {
  setFloatVisible(false)
  floatDom.style.display = 'none'
  floatSlotDom.style.display = 'none'
  floatSlotResultDom.innerText = ''
}

export function showFloat() {
  setFloatVisible(true)
  hideFloatButton()
  floatSlotDom.style.display = 'block'
  floatDom.style.display = 'block'
  floatSlotResultDom.innerHTML = LoadingHtml
}

export function hideFloatButton() {
  floatButtonDom.style.display = 'none'
  floatButtonDom.innerHTML = ButtonHtml
}

export function showFloatButton() {
  floatButtonDom.style.display = 'flex'
}
