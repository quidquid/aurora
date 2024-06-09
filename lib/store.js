import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
//import { mdnsApi } from './features/mdns'

export const makeStore = () => {
  return configureStore({
    reducer: {
      //[mdnsApi.reducerPath]: mdnsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
      //.concat(mdnsApi.middleware),
    })
}
//setupListeners(store.dispatch)

