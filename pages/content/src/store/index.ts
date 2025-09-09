import { SelectAutoDetectValue } from '@libs/constants'
import type { CSSProperties } from 'react'
import { create } from 'zustand'

interface TranslationStore {
  buttonVisible: boolean
  setButtonVisible: (visible: boolean) => void
  slotVisible: boolean
  setSlotVisible: (visible: boolean) => void
  loading: boolean
  setLoading: (loading: boolean) => void
  slotStyle: CSSProperties
  setSlotStyle: (slotStyle: CSSProperties) => void
  sourceLanguage: string
  targetLanguage: string
  selectedText: string
  setSelectedText: (selectedText: string) => void
  setSourceLanguage: (sourceLanguage: string | null) => void
  setTargetLanguage: (targetLanguage: string | null) => void
  translation: string
  setTranslation: (translation: string) => void
  detectResult: LanguageDetectionResult[]
  setDetectResult: (detectResult: LanguageDetectionResult[]) => void
}

export const useTranslationStore = create<TranslationStore>((set) => ({
  buttonVisible: false,
  detectResult: [],
  loading: false,
  selectedText: '',
  setButtonVisible: (visible) => set({ buttonVisible: visible }),
  setDetectResult: (detectResult) => set({ detectResult }),
  setLoading: (loading) => set({ loading }),
  setSelectedText: (selectedText) => set({ selectedText }),
  setSlotStyle: (slotStyle) => set({ slotStyle }),
  setSlotVisible: (visible) => set({ slotVisible: visible }),
  setSourceLanguage: (sourceLanguage) =>
    sourceLanguage && set({ sourceLanguage }),
  setTargetLanguage: (targetLanguage) =>
    targetLanguage && set({ targetLanguage }),
  setTranslation: (translation) => set({ translation }),
  slotStyle: {},
  slotVisible: false,
  sourceLanguage: SelectAutoDetectValue,
  targetLanguage: navigator.language,
  translation: '',
}))
