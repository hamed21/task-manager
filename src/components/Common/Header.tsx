'use client';

import React, {useEffect, useMemo, useState} from 'react';
import DropdownMenu from './DropdownMenu';
import {DropdownMenuOptionType} from '@/types/common.type';
import {useGetAllWorkspacesQuery} from '@/services/workSpaceApi';
import {WorkspaceType} from '@/types/workspace.type';

const Header = () => {
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

  const [selectedWorkspace, setSelectedWorkspace] =
    useState<DropdownMenuOptionType<WorkspaceType> | null>(null);

  useEffect(() => {
    if (normalizedWorkspacesData.length > 0) {
      setSelectedWorkspace(normalizedWorkspacesData[0]);
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
            onChange={setSelectedWorkspace}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
