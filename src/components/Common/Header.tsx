'use client';

import React, {useMemo, useState} from 'react';
import classNames from 'classnames';
import DropdownMenu from './DropdownMenu';
import {DropdownMenuOptionType} from '@/types/common.type';

const MOCK_WORKSPACES = [
  {workspaceId: '1', workspaceName: 'Digi next'},
  {workspaceId: '2', workspaceName: 'personal workspace'},
  {workspaceId: '3', workspaceName: 'smartX'},
  {
    workspaceId: '4',
    workspaceName: 'This is my personal workspace'
  }
];

const Header = () => {
  const normalizedWorkspacesData = useMemo(
    () =>
      MOCK_WORKSPACES.map(item => ({
        id: item.workspaceId,
        title: item.workspaceName,
        hasEdit: true,
        hasDelete: true
      })),
    []
  );

  const [selectedWorkspace, setSelectedWorkspace] =
    useState<DropdownMenuOptionType>(normalizedWorkspacesData[0]);

  return (
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
  );
};

export default Header;
