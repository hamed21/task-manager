import React, {useMemo, useState} from 'react';
import Modal from '../Common/Modal';
import Button from '../Common/Button';
import LoadingBox from '../Common/LoadingBox';
import {useParams, usePathname, useRouter} from 'next/navigation';
import {useDispatch} from 'react-redux';
import {setSelectedBoard} from '@/store/boardSlice';
import classNames from 'classnames';
import {
  PlusCircleIcon,
  ClockIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';
import {
  useAddNewBoardMutation,
  useGetAllBoardsQuery
} from '@/services/boardApi';
import {useSelector} from 'react-redux';
import {displayDate, displayTime} from '@/utils/common.utils';
import {Input} from '@headlessui/react';

interface WorkspaceType {
  workspaceId: string;
}

const Workspace: React.FC<WorkspaceType> = ({workspaceId}) => {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();
  const params = useParams();

  const [openAddBoardModal, setOpenAddBoardModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');

  const {
    data: allboardsData,
    isLoading: allBoardsLoading,
    isError,
    refetch
  } = useGetAllBoardsQuery();
  const [addBoard, {isLoading: addBoardIsLoading}] = useAddNewBoardMutation();

  const filteredBoards = useMemo(() => {
    if (allboardsData?.length) {
      return allboardsData.filter(
        board => String(board.workspace) === params.workspace
      );
    }
    return [];
  }, [allboardsData, params]);

  const handleAddBoard = async () => {
    try {
      await addBoard({
        title: newBoardName,
        workspace: Number(params.workspace)
      });
    } catch (error) {
      console.error('Feild to add workspace:', error);
    }
  };

  const boardCardClasses =
    'h-48 w-full rounded-lg shadow-sm bg-background-normal cursor-pointer p-4 text-base-normalText flex justify-center items-center';

  return (
    <>
      {/* add new modal */}
      <Modal
        open={openAddBoardModal}
        onClose={() => setOpenAddBoardModal(false)}
        title={'Add new workspace name'}
        footer={
          <>
            <Button
              btnType='primaryText'
              onClick={() => {
                handleAddBoard();
                setOpenAddBoardModal(false);
              }}
              classNames='mr-4'>
              Create board
            </Button>
            <Button btnType='error' onClick={() => setOpenAddBoardModal(false)}>
              Cancel
            </Button>
          </>
        }>
        <Input
          autoFocus
          value={newBoardName}
          onChange={(event): void => {
            setNewBoardName(event.target.value);
          }}
          className={classNames(
            'mt-3 block w-full rounded-lg border-2 bg-background-normal py-1.5 px-3 text-sm/6 text-base-normalText',
            'focus:outline-none focus:border-primary-light focus:shadow-sm'
          )}
        />
      </Modal>
      <LoadingBox
        loading={allBoardsLoading || addBoardIsLoading}
        reload={refetch}
        error={isError}>
        <div className='px-7 py-5 grid lg:grid-cols-3 md:grid-cols-2 gap-4 overflow-auto'>
          {filteredBoards?.map(board => (
            <div
              key={board.id}
              onClick={() => {
                dispatch(setSelectedBoard(board));
                router.push(`${pathName}/${board.id}`);
              }}
              className={classNames(boardCardClasses, 'flex-col')}>
              <p>{board.title}</p>
              <div className='flex justify-between mt-6 gap-7'>
                <div className='flex text-base-normalText'>
                  <CalendarDaysIcon className='size-6 mr-2' />
                  <p>{displayDate(board.dateCreated)}</p>
                </div>
                <div className='flex text-base-normalText'>
                  <ClockIcon className='size-6 mr-2' />
                  <p>{displayTime(board.dateCreated)}</p>
                </div>
              </div>
            </div>
          ))}
          <div
            onClick={() => setOpenAddBoardModal(true)}
            className={classNames(boardCardClasses, ' text-base-minorText')}>
            Add new board
            <PlusCircleIcon className='size-6 text-base-minorText cursor-pointer ml-3' />
          </div>
        </div>
      </LoadingBox>
    </>
  );
};

export default Workspace;
