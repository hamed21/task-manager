import {configureStore} from '@reduxjs/toolkit';
import {api} from '../services';
import workspaceReducer from './workspaceSlice';
import boardReducer from './boardSlice';

const store = configureStore({
  reducer: {
    workspace: workspaceReducer,
    board: boardReducer,
    [api.workspaceApi.reducerPath]: api.workspaceApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.workspaceApi.middleware)
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
