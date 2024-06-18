import { configureStore } from '@reduxjs/toolkit'
import { auroraApi } from './features/auroraApi'

export const makeStore = () => {
  return configureStore({
    reducer: {
      [auroraApi.reducerPath]: auroraApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
      .concat(auroraApi.middleware),
    })
}
