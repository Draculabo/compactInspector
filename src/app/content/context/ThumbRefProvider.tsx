import { createContextProvider } from '@/lib/createContextProvider'

const [ThumbRefProvider, useThumbRef, useChangeThumbRef] = createContextProvider<HTMLDivElement | null>(null)
export { ThumbRefProvider, useChangeThumbRef, useThumbRef }
