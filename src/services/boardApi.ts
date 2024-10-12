import {BoardType} from '@/types/board.type';
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
  tagTypes: ['boards'],
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
    })
  })
});

export const {useGetAllBoardsQuery, useAddNewBoardMutation} = boardApi;
