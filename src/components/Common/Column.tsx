import classNames from 'classnames';
import React, {ReactElement} from 'react';
import {PlusCircleIcon, PencilSquareIcon} from '@heroicons/react/24/outline';
import {Tooltip} from 'react-tooltip';
import {useDroppable} from '@dnd-kit/core';
import TaskCard from './TaskCard';

interface ColumnType {
  tasks: string[];
  columnId: string;
  title: string;
}

const Column: React.FC<ColumnType> = ({columnId, title, tasks}) => {
  const {isOver, setNodeRef} = useDroppable({
    id: columnId
  });
  return (
    <div className='bg-background-normal w-72 rounded-lg px-3 py-2 shadow-lg'>
      <div className='flex pb-2 border-b border-gray-dark justify-between mb-2'>
        <p className='text-base text-gray-normal'>title</p>
        <div className='flex'>
          <PencilSquareIcon
            id='edit-column-name'
            onClick={() => {
              console.log('sss');
            }}
            className='size-6 text-primary-dark mr-2 cursor-pointer'
          />
          <Tooltip
            anchorSelect='#edit-column-name'
            place='bottom'
            delayShow={100}>
            Rename column
          </Tooltip>
          <PlusCircleIcon
            id='add-task'
            onClick={() => {
              console.log('sss');
            }}
            className='size-6 text-primary-dark cursor-pointer'
          />
          <Tooltip anchorSelect='#add-task' place='bottom' delayShow={100}>
            create new task
          </Tooltip>
        </div>
      </div>
      <div
        ref={setNodeRef}
        style={{backgroundColor: isOver ? 'lightblue' : 'white'}}>
        {tasks.map(task => (
          <TaskCard key={task} taskId={task} taskTitle={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
