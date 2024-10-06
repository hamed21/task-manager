import {WorkspaceType} from '@/types/workspace.type';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface WorkspaceState {
  value: WorkspaceType | null;
}

const initialState: WorkspaceState = {
  value: null
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setSelectedWorkspace: (state, action: PayloadAction<WorkspaceType>) => {
      state.value = action.payload;
    }
  }
});

export const {setSelectedWorkspace} = workspaceSlice.actions;
export default workspaceSlice.reducer;
