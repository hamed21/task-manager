import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Task {
  id: string;
  title: string;
  completed?: boolean;
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [] as Task[],
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    removeTast: (state, action: PayloadAction<string>) => {
      return state.filter(task => task.id !== action.payload);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.find(task => task.id === action.payload);
      if (task) task.completed = !task.completed;
    }
  }
});

export const {addTask, removeTast, toggleTask} = taskSlice.actions;
export default taskSlice.reducer;
