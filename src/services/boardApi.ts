import {BoardDataType, BoardType, ColumnType} from '@/types/board.type';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

interface NewBoardBody {
  title: string;
  workspace: number;
}

interface NewBoardResult {
  id: number;
  title: string;
  workspace: number;
}

export const boardApi = createApi({
  reducerPath: 'boardApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
  tagTypes: ['boards', 'boardData'],
  endpoints: builder => ({
    getAllBoards: builder.query<BoardType[], void>({
      query: () => ({url: 'boards', method: 'GET'}),
      providesTags: ['boards']
    }),
    addNewBoard: builder.mutation<NewBoardResult, NewBoardBody>({
      query: newBoard => ({
        url: '/boards',
        method: 'POST',
        body: newBoard
      }),
      invalidatesTags: ['boards']
    }),
    editBoardName: builder.mutation<
      NewBoardResult,
      {editedBoard: NewBoardBody; boardId: string}
    >({
      query: ({editedBoard, boardId}) => ({
        url: `/boards/${boardId}`,
        method: 'PUT',
        body: editedBoard
      }),
      invalidatesTags: ['boards']
    }),
    deleteBoard: builder.mutation<object, string>({
      query: (id: string) => ({
        url: `/boards/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['boards']
    }),
    getBoardData: builder.query<BoardDataType, string>({
      query: (boardId: string) => ({
        url: `/boards/${boardId}`,
        method: 'GET'
      }),
      providesTags: ['boardData']
    }),
    addNewColumn: builder.mutation<
      ColumnType,
      {title: string; position: number; boardId: string}
    >({
      query: ({title, position, boardId}) => ({
        url: `/boards/${boardId}/column`,
        method: 'POST',
        body: {title, position}
      }),
      invalidatesTags: ['boardData']
    }),
    editColumnTitle: builder.mutation<
      {message: string; columnId: number; title: string},
      {title: string; columnId: number; boardId: string}
    >({
      query: ({title, columnId, boardId}) => ({
        url: `/boards/${boardId}/column`,
        method: 'PUT',
        body: {title, columnId}
      }),
      invalidatesTags: ['boardData']
    }),
    deleteColumn: builder.mutation<object, {boardId: string; columnId: string}>(
      {
        query: ({boardId, columnId}) => ({
          url: `/boards/${boardId}/column/${columnId}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['boardData']
      }
    ),
    updateColumnsOrder: builder.mutation<
      object,
      {
        columns: {position: number; id: number; title: string}[];
        boardId: string;
      }
    >({
      query: ({columns, boardId}) => ({
        url: `/boards/${boardId}/columns`,
        method: 'PUT',
        body: {columns}
      }),
      invalidatesTags: ['boardData']
    })
  })
});

export const {
  useGetAllBoardsQuery,
  useAddNewBoardMutation,
  useEditBoardNameMutation,
  useDeleteBoardMutation,
  useGetBoardDataQuery,
  useAddNewColumnMutation,
  useEditColumnTitleMutation,
  useDeleteColumnMutation,
  useUpdateColumnsOrderMutation
} = boardApi;
