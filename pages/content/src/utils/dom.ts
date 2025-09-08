import type { ComputePositionReturn, FloatingElement } from '@floating-ui/dom'
import { computePosition, inline, offset } from '@floating-ui/dom'
import { getLanguageSelectDom } from '../components/LanguageSelect'
import { QueryRootClassName, RootClassName } from '../constants'

let rootElement: FloatingElement | null = null

export function getRootElement() {
  if (!rootElement) {
    rootElement = document.querySelector(QueryRootClassName) as FloatingElement
  }
  return rootElement
}

export function isTargetInContainer(event: Event) {
  const target = event.target as Element | null
  if (!target) {
    return false
  }

  const rootElement = getRootElement()
  if (!rootElement) {
    return false
  }

  const { sourceLanguageSelectDom, targetLanguageSelectDom } =
    getLanguageSelectDom()

  return (
    rootElement.contains(target) ||
    !!(
      sourceLanguageSelectDom?.contains(target) ||
      targetLanguageSelectDom?.contains(target)
    )
  )
}

export function setRootElementPosition(position: ComputePositionReturn) {
  const rootElement = getRootElement()
  if (!rootElement) {
    return
  }
  rootElement.style.setProperty('top', `${position.y}px`)
  rootElement.style.setProperty('left', `${position.x}px`)
}

export async function getTooltipPosition(selection: Selection) {
  const rootElement = getRootElement()
  if (!selection || selection.rangeCount === 0 || !rootElement) {
    return null
  }

  const range = selection.getRangeAt(0)
  if (!range) {
    return null
  }

  const position = await computePosition(range, rootElement, {
    middleware: [inline(), offset(10)],
    placement: 'bottom',
  })

  return position
}

export function waitNextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve))
}

export function waitForDOMUpdate() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      setTimeout(resolve, 10)
    })
  })
}

export function classNameWithPrefix(className: string) {
  return `${RootClassName}${className}`
}
