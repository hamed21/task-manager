import React, {useState} from 'react';
import Modal from '../Common/Modal';
import Button from '../Common/Button';
import LoadingBox from '../Common/LoadingBox';
import {useGetWorkspaceDataQuery} from '@/services/workSpaceApi';
import {usePathname, useRouter} from 'next/navigation';
import {useDispatch} from 'react-redux';
import {setSelectedBoard} from '@/store/boardSlice';

const WORKSPACE_MOCK_DATA = {
  id: 1,
  name: 'digi next',
  boards: [
    {
      id: 1,
      name: 'board 1'
    },
    {
      id: 2,
      name: 'board 2'
    },
    {
      id: 3,
      name: 'board 3'
    },
    {
      id: 4,
      name: 'board 4'
    },
    {
      id: 5,
      name: 'board 5'
    },
    {
      id: 6,
      name: 'board 6'
    },
    {
      id: 7,
      name: 'board 7'
    },
    {
      id: 8,
      name: 'board 8'
    },
    {
      id: 9,
      name: 'board 9'
    },
    {
      id: 10,
      name: 'board 10'
    }
  ]
};

interface WorkspaceType {
  workspaceId: string;
}

const Workspace: React.FC<WorkspaceType> = ({workspaceId}) => {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();

  const {
    data: workspaceData,
    isLoading: workspaceLoading,
    isError,
    refetch
  } = useGetWorkspaceDataQuery(workspaceId);

  return (
    <LoadingBox loading={workspaceLoading} reload={refetch} error={isError}>
      <div className='px-7 py-5 grid lg:grid-cols-3 md:grid-cols-2 gap-4 overflow-auto'>
        {workspaceData?.boards.map(board => (
          <div
            key={board.id}
            onClick={() => {
              dispatch(setSelectedBoard(board));
              router.push(`${pathName}/${board.id}`);
            }}
            className='h-48 w-full rounded-lg shadow-sm bg-background-normal cursor-pointer p-4'>
            {board.title}
          </div>
        ))}
      </div>
    </LoadingBox>
  );
};

export default Workspace;
