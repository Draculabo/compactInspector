import React, { createContext, useContext } from 'react'

export function createSafeContext<ContextValue>() {
  const Context = createContext<ContextValue>({} as ContextValue)

  const useSafeContext = () => {
    const ctx = useContext(Context)

    if (ctx === null) {
      throw new Error('useSafeContext must be used within a Provider')
    }

    return ctx
  }

  const Provider = ({ children, value }: { value: ContextValue; children: React.ReactNode }) => (
    <Context.Provider value={value}>{children}</Context.Provider>
  )

  return [Provider, useSafeContext] as const
}
