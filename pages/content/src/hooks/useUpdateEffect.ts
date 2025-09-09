import type { DependencyList, EffectCallback } from 'react'
import { useEffect, useRef } from 'react'

export const useUpdateEffect = (
  effect: EffectCallback,
  deps: DependencyList | undefined,
) => {
  const isMounted = useRef(false)

  // for react-refresh
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (isMounted.current) {
      return effect()
    }
    isMounted.current = true
  }, deps)
}

export default useUpdateEffect
