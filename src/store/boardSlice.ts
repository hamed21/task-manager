import {BoardType} from '@/types/board.type';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface BoardState {
  value: BoardType | null;
}

const initialState: BoardState = {
  value: null
};

const BoardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setSelectedBoard: (state, action: PayloadAction<BoardType>) => {
      state.value = action.payload;
    }
  }
});

export const {setSelectedBoard} = BoardSlice.actions;
export default BoardSlice.reducer;
