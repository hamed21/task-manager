import {configureStore} from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer
  }
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
