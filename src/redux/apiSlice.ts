import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: '/api'}),
  endpoints: builder => ({
    getTasks: builder.query({
      query: () => '/tasks'
    }),
    addTask: builder.mutation({
      query: newTask => ({
        url: '/tasks',
        method: 'POST',
        body: newTask
      })
    }),
    changeTaskStatus: builder.mutation({
      query: ({taskId, status}) => ({
        url: `/tasks/${taskId}/status`,
        method: 'PATCH',
        body: {status}
      })
    })
  })
});

export const {useGetTasksQuery} = apiSlice;
