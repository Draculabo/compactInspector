import { useEventCallback } from '@/hooks/useEventCallback'
import { createContextProvider } from '@/lib/createContextProvider'

const [ThumbVisibleProvider, useThumbVisible, useChangeThumbVisible] = createContextProvider<boolean>(true)
const useToggle = () => {
  const visible = useThumbVisible()
  return useEventCallback(() => !visible)
}
export { ThumbVisibleProvider, useChangeThumbVisible, useThumbVisible, useToggle }
