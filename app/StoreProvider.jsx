'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '../lib/store'
import { setupListeners } from '@reduxjs/toolkit/query'

export default function StoreProvider({ children }) {
  const storeRef = useRef()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    const store = makeStore()
    storeRef.current = store
    setupListeners(store.dispatch)
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}