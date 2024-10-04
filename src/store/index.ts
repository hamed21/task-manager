import {configureStore} from '@reduxjs/toolkit';
import {api} from '../services';

const store = configureStore({
  reducer: {
    // tasks: tasksReducer,
    [api.workspaceApi.reducerPath]: api.workspaceApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.workspaceApi.middleware)
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
