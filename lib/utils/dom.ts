import { setFloatVisible, setTranslateWord } from '../constans/global-variables'
import {
  floatDom,
  floatButtonDom,
  floatSlotDom,
  floatSlotResultDom,
} from '../dom/init'
import { ButtonHtml, LoadingHtml } from '../constans/html'

export function setFloatPosition(e: MouseEvent) {
  const selection = window.getSelection()
  console.log({ selection })
  if (!selection) {
    return
  }
  try {
    const text = selection.toString().trim()
    const range = selection.getRangeAt(0)
    if (text && range) {
      setTranslateWord(text)
      floatDom.style.display = 'block'
      // 获取鼠标位置
      const mousePosition = {
        x: e.clientX,
        y: e.clientY,
      }
      floatDom.style.top = `${mousePosition.y + 6}px`
      floatDom.style.left = `${mousePosition.x}px`
      showFloatButton()
    }
  } catch (error) {}
}

export function hideFloat() {
  setFloatVisible(false)
  floatDom.style.display = 'none'
  floatSlotDom.style.display = 'none'
  floatSlotResultDom.innerText = ''
}

export function showFloat() {
  hideFloatButton()
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
