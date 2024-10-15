import {TaskType} from '@/types/task.type';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://diginext-taskmgr.darkube.app'}),
  tagTypes: ['task'],
  endpoints: builder => ({
    addNewTask: builder.mutation<TaskType, TaskType>({
      query: newTaskBody => ({
        url: '/tasks',
        method: 'POST',
        body: newTaskBody
      })
    }),
    editTask: builder.mutation<TaskType, {taskBody: TaskType; taskId: string}>({
      query: ({taskBody, taskId}) => ({
        url: `/tasks/${taskId}`,
        method: 'PUT',
        body: taskBody
      })
    }),
    getTaskData: builder.query<TaskType, string>({
      query: taskId => ({
        url: `/tasks/${taskId}`,
        method: 'GET'
      })
    }),
    deleteTask: builder.mutation<object, string>({
      query: taskId => ({
        url: `/tasks/${taskId}`,
        method: 'DELETE'
      })
    })
  })
});

export const {
  useAddNewTaskMutation,
  useEditTaskMutation,
  useGetTaskDataQuery,
  useDeleteTaskMutation
} = taskApi;
