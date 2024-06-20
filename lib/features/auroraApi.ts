// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const auroraApi = createApi({
  reducerPath: 'nodesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    discover: builder.query({
      query: () => 'wled/discover',
    }),
    getNodes: builder.query({
      query: () => 'nodes',
    }),
    getNodeById: builder.query({
      query: (id) => `nodes/${id}`,
    }),

    getLights: builder.query({
      query: () => 'lights',
    }),
    createLight: builder.mutation({
      query: (attrs) => ({
        url: 'lights',
        method: 'POST',
        body: attrs,
      }),
    }),
    updateLight: builder.mutation({
      query: ({ id, ...attrs }) => ({
        url: `lights/${id}`,
        method: 'PUT',
        body: attrs,
      }),
    }),

    getSites: builder.query({
      query: () => 'sites',
    }),
    createSite: builder.mutation({
      query: (attrs) => ({
        url: 'sites',
        method: 'POST',
        body: attrs,
      }),
    }),
    updateSite: builder.mutation({
      query: ({ id, ...attrs }) => ({
        url: `sites/${id}`,
        method: 'PUT',
        body: attrs,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useDiscoverQuery,
  useGetNodesQuery,
  useGetNodeByIdQuery,

  useGetLightsQuery,
  useCreateLightMutation,
  useUpdateLightMutation,

  useGetSitesQuery,
  useCreateSiteMutation,
  useUpdateSiteMutation,
} = auroraApi