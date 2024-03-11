import { useCallback, useEffect, useRef } from 'react'

const useEventCallback = <T extends (...args: any[]) => any>(fn: T) => {
  const fnRef = useRef<T>(fn)
  useEffect(() => {
    fnRef.current = fn
  }, [fn])
  return useCallback<(...args: any[]) => any>((args) => fnRef.current?.(args), [])
}
export { useEventCallback }
