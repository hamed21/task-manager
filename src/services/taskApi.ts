import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
  tagTypes: ['boards', 'tasks'],
  endpoints: builder => ({
    addNewTask: builder.mutation<TaskType, TaskType>({
      query: newTaskBody => ({
        url: '/tasks',
        method: 'POST',
        body: newTaskBody
      }),
      invalidatesTags: ['boards']
    })
  })
});

export const {useAddNewTaskMutation} = taskApi;
