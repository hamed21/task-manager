import {WorkspaceDataType, WorkspaceType} from '@/types/workspace.type';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

interface NewWorkspaceResult {
  id: number;
  title: string;
  owner: number;
}

interface NewWorkspaceBody {
  title: string;
  owner: number;
}

export const workspaceApi = createApi({
  reducerPath: 'workspaceApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://diginext-taskmgr.darkube.app'}),
  tagTypes: ['workspace'],
  endpoints: builder => ({
    getAllWorkspaces: builder.query<WorkspaceType[], void>({
      query: () => ({url: '/workspaces', method: 'GET'}),
      providesTags: ['workspace']
    }),
    getWorkspaceData: builder.query<WorkspaceDataType, string>({
      query: id => ({
        url: `/workspaces/${id}`
      })
    }),
    addWorkspace: builder.mutation<NewWorkspaceResult, NewWorkspaceBody>({
      query: newWorkspace => ({
        url: '/workspaces',
        method: 'POST',
        body: newWorkspace
      }),
      invalidatesTags: ['workspace']
    }),
    deleteWorkspace: builder.mutation<object, string>({
      query: (id: string) => ({
        url: `workspaces/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['workspace']
    }),
    editWorkspace: builder.mutation<
      NewWorkspaceResult,
      {editedWorkspace: NewWorkspaceBody; id: string}
    >({
      query: ({editedWorkspace, id}) => ({
        url: `workspaces/${id}`,
        method: 'PUT',
        body: editedWorkspace
      }),
      invalidatesTags: ['workspace']
    })
  })
});

export const {
  useGetAllWorkspacesQuery,
  useGetWorkspaceDataQuery,
  useAddWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useEditWorkspaceMutation
} = workspaceApi;
