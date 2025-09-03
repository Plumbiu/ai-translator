export function getSelectionInfo() {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) {
    return null
  }
  const text = selection.toString().trim()
  if (!text) {
    return null
  }
  return { selection, text }
}
