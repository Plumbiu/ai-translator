import { create } from 'zustand'
import type { CSSProperties } from 'react'
import { SelectAutoDetectValue } from '@libs/constants'

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
  setButtonVisible: (visible) => set({ buttonVisible: visible }),
  slotVisible: false,
  setSlotVisible: (visible) => set({ slotVisible: visible }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  slotStyle: {},
  setSlotStyle: (slotStyle) => set({ slotStyle }),
  selectedText: '',
  setSelectedText: (selectedText) => set({ selectedText }),
  sourceLanguage: SelectAutoDetectValue,
  targetLanguage: navigator.language,
  setSourceLanguage: (sourceLanguage) =>
    sourceLanguage && set({ sourceLanguage }),
  setTargetLanguage: (targetLanguage) =>
    targetLanguage && set({ targetLanguage }),
  translation: '',
  setTranslation: (translation) => set({ translation }),
  detectResult: [],
  setDetectResult: (detectResult) => set({ detectResult }),
}))
