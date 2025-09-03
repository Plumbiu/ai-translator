import {
  useRef,
  useEffect,
  type DependencyList,
  type EffectCallback,
} from 'react'

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
    if (!isMounted.current) {
      isMounted.current = true
    } else {
      return effect()
    }
  }, deps)
}

export default useUpdateEffect
