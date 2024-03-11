import { useEventCallback } from '@/hooks/useEventCallback'
import { createContextProvider } from '@/lib/createContextProvider'

const [CardVisibleProvider, useCardVisible, useChangeCardVisible] = createContextProvider<boolean>(false)
const useToggle = () => {
  const visible = useCardVisible()
  return useEventCallback(() => !visible)
}
export { CardVisibleProvider, useCardVisible, useChangeCardVisible, useToggle }
