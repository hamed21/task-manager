import {ColumnType} from '@/types/board.type';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface TaskState {
  value: TaskType[] | null;
}

const initialState: TaskState = {
  value: null
};

const TasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TaskType[]>) => {
      state.value = action.payload;
    }
  }
});

export const {setTasks} = TasksSlice.actions;
export default TasksSlice.reducer;
