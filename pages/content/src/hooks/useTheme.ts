import { useState, useEffect, useMemo } from 'react'

interface UseThemeReturn {
  isDark: boolean
  systemTheme: ThemeEnum
}

enum ThemeEnum {
  Light = 'light',
  Dark = 'dark',
}

function useTheme(): UseThemeReturn {
  const [systemTheme, setSystemTheme] = useState<ThemeEnum>(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? ThemeEnum.Dark
      : ThemeEnum.Light
  })
  const isDark = useMemo(() => systemTheme === ThemeEnum.Dark, [systemTheme])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? ThemeEnum.Dark : ThemeEnum.Light)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return {
    systemTheme,
    isDark,
  }
}

export default useTheme
