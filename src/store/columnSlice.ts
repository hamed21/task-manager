import {ColumnType} from '@/types/board.type';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ColumnsState {
  value: ColumnType[];
}

const initialState: any = {
  value: null
};

const ColumnSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<ColumnType[]>) => {
      state.value = action.payload;
    }
  }
});

export const {setColumns} = ColumnSlice.actions;
export default ColumnSlice.reducer;
