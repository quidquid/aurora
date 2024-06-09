import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import mdns from 'mdns'

const browser = mdns.createBrowser(mdns.tcp('wled'))


export const mdnsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Message'],
  endpoints: (build) => ({
    getServices: build.query({
      // The query is not relevant here as the data will be provided via streaming updates.
      // A queryFn returning an empty array is used, with contents being populated via
      // streaming updates below as they are received.
      queryFn: () => ({ data: [] }),
      onCacheEntryAdded(arg, { updateCachedData, cacheEntryRemoved }) {

        /*zeroconf.on('start', () => {
          console.log('[Start]')
        })
        zeroconf.on('stop', () => {
          console.log('[Stop]')
        })
        zeroconf.on('error', err => {
          console.log('[Error]', err)
        })*/
        browser.on('serviceUp', service => {
          console.log('[Service up]', JSON.stringify(service, null, 2))
          updateCachedData((draft) => {
            draft.push(service)
          })
        })
        browser.on('serviceDown', service => {
          console.log('[Service down]', JSON.stringify(service, null, 2))
          /*updateCachedData((draft) => {
            draft.push(service)
          })*/
        })

        browser.start();

        setTimeout(() => {
          browser.stop()
        }, 10000)
      },
    }),
  }),
})
console.log(Object.keys(bonjourApi))

export const { useGetServicesQuery } = mdnsApi

