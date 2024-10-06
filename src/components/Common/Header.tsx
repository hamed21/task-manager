'use client';

import React, {useEffect, useMemo, useState} from 'react';
import DropdownMenu from './DropdownMenu';
import {DropdownMenuOptionType} from '@/types/common.type';
import {useGetAllWorkspacesQuery} from '@/services/workSpaceApi';
import {WorkspaceType} from '@/types/workspace.type';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';
import {setSelectedWorkspace} from '@/store/workspaceSlice';

const Header = () => {
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(
    (state: RootState) => state.workspace.value
  );

  const {data: allWorkspaceData, isLoading, error} = useGetAllWorkspacesQuery();

  const normalizedWorkspacesData: DropdownMenuOptionType<WorkspaceType>[] =
    useMemo(() => {
      if (allWorkspaceData) {
        return allWorkspaceData?.map(item => ({
          ...item,
          hasEdit: true,
          hasDelete: true
        }));
      }
      return [];
    }, [allWorkspaceData]);

  useEffect(() => {
    if (normalizedWorkspacesData.length > 0) {
      dispatch(setSelectedWorkspace(normalizedWorkspacesData[0]));
    }
  }, [normalizedWorkspacesData]);

  return (
    <>
      <header className='flex items-center  h-14 w-full bg-background-normal  pl-48'>
        <div className='w-full h-full px-7 flex justify-between items-center'>
          board name
          <DropdownMenu
            selectedValue={selectedWorkspace}
            options={normalizedWorkspacesData}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
