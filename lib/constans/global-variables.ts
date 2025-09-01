let translateWord: string
let floatVisible = false
let sourceLanguage: string
let targetLanguage = navigator.language

// 设置需要翻译的单词
export const setTranslateWord = (w: string) => {
  translateWord = w
}
// 获取需要翻译的单词
export const getTranslateWord = () => {
  return translateWord
}

export const setFloatVisible = (v: boolean) => {
  floatVisible = v
}

export const getFloatVisible = () => {
  return floatVisible
}

export const setSourceLanguage = (l: string) => {
  sourceLanguage = l
}

export const getSourceLanguage = () => {
  return sourceLanguage
}

export const setTargetLanguage = (l: string) => {
  targetLanguage = l
}

export const getTargetLanguage = () => {
  return targetLanguage
}
