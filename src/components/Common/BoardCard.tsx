import {setSelectedBoard} from '@/store/boardSlice';
import {BoardType} from '@/types/board.type';
import {displayDate, displayTime} from '@/utils/common.utils';
import {Input} from '@headlessui/react';
import {
  ClockIcon,
  PencilSquareIcon,
  TrashIcon,
  CalendarDaysIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import {usePathname, useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Button from './Button';
import {useEditBoardNameMutation} from '@/services/boardApi';

const BoardCard: React.FC<{boardData: BoardType}> = ({boardData}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();

  const [boardIsEditing, setBoardIsEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(boardData.title);

  const [editBoard, {data}] = useEditBoardNameMutation();

  useEffect(() => {
    if (data?.title) setEditedName(data?.title);
  }, [data]);

  const handleEditBoard = (): void => {
    if (editedName) {
      editBoard({
        editedBoard: {
          title: editedName,
          workspace: boardData.workspace
        },
        boardId: String(boardData.id)
      });
    }
    console.log(data?.title);

    setBoardIsEditing(false);
  };

  const boardCardClasses =
    'h-48 w-full rounded-lg shadow-sm bg-background-normal cursor-pointer p-4 text-base-normalText flex justify-between items-center';

  return (
    <div
      key={boardData.id}
      onClick={() => {
        dispatch(setSelectedBoard(boardData));
        router.push(`${pathName}/${boardData.id}`);
      }}
      className={classNames(boardCardClasses, 'flex-col')}>
      <div className='flex flex-col justify-center items-center'>
        <p>{boardData.title}</p>
        <div className='flex justify-between mt-6 gap-7'>
          <div className='flex text-base-normalText'>
            <CalendarDaysIcon className='size-6 mr-2' />
            <p>{displayDate(boardData.dateCreated)}</p>
          </div>
          <div className='flex text-base-normalText'>
            <ClockIcon className='size-6 mr-2' />
            <p>{displayTime(boardData.dateCreated)}</p>
          </div>
        </div>
      </div>
      {boardIsEditing ? (
        <div className='w-full flex gap-2 justify-end items-center'>
          <Input
            autoFocus
            value={editedName}
            onClick={e => e.stopPropagation()}
            onChange={e => setEditedName(e.target.value)}
            className={classNames(
              ' block w-full rounded-lg border-2 bg-background-normal py-1.5 px-3 text-sm/6 text-base-normalText',
              'focus:outline-none focus:border-primary-light focus:shadow-sm'
            )}
          />
          <Button
            classNames='h-full'
            btnType='primary'
            onClick={e => {
              e.stopPropagation();
              handleEditBoard();
            }}>
            <CheckIcon className='text-base-white size-4 font-bold' />
          </Button>
        </div>
      ) : (
        <div className='w-full flex justify-end'>
          <PencilSquareIcon
            className='size-6 text-primary-dark'
            onClick={e => {
              e.stopPropagation();
              setBoardIsEditing(true);
            }}
          />
          <TrashIcon
            className='size-6 text-error-dark ml-3'
            onClick={e => {
              e.stopPropagation();
            }}
          />
        </div>
      )}
    </div>
  );
};

export {BoardCard};
