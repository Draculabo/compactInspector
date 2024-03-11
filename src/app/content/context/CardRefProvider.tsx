import { createContextProvider } from '@/lib/createContextProvider'

const [CardRefProvider, useCardRef, useChangeCardRef] = createContextProvider<HTMLDivElement | null>(null)
export { CardRefProvider, useCardRef, useChangeCardRef }
