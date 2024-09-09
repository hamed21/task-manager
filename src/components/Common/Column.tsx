import classNames from 'classnames';
import React, {ReactElement} from 'react';
import {
  PlusCircleIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import {Tooltip} from 'react-tooltip';
import {useDroppable} from '@dnd-kit/core';
import TaskCard from './TaskCard';
import {SortableContext, useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {ColumnType, IdType} from '@/types/common.type';

interface ColumnInterface {
  tasks?: string[];
  columnId?: string;
  title?: string;
  column: ColumnType;
  deleteColumn: (id: IdType) => void;
}

const Column: React.FC<ColumnInterface> = ({
  columnId,
  title,
  tasks,
  column,
  deleteColumn
}) => {
  const {isOver, setNodeRef, attributes, listeners, transform, transition} =
    useSortable({
      id: columnId,
      data: {
        type: 'Column',
        columnId,
        title
      }
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  return (
    <div
      className='bg-background-normal w-[320px]  rounded-lg px-3 py-2 shadow-lg flex flex-col'
      style={style}>
      {/* Column title */}
      <div className='h-[40px] flex pb-2 border-b border-gray-dark justify-between mb-2'>
        <p className='text-base text-gray-normal'>{column.title}</p>
        <div className='flex'>
          <PlusCircleIcon
            id='add-task'
            onClick={() => {
              console.log('sss');
            }}
            className='size-6 text-primary-dark  cursor-pointer'
          />
          <Tooltip anchorSelect='#add-task' place='bottom' delayShow={100}>
            create new task
          </Tooltip>

          <PencilSquareIcon
            id='edit-column-name'
            onClick={() => {
              console.log('sss');
            }}
            className='size-6 text-primary-dark mx-2 cursor-pointer'
          />
          <Tooltip
            anchorSelect='#edit-column-name'
            place='bottom'
            delayShow={100}>
            Rename column
          </Tooltip>

          <TrashIcon
            id='delete-column'
            onClick={() => {
              deleteColumn(column.id);
            }}
            className='size-6 text-primary-dark cursor-pointer'
          />
          <Tooltip anchorSelect='#delete-column' place='bottom' delayShow={100}>
            Delete Column
          </Tooltip>
        </div>
      </div>
      {/* column tasks container */}
      <div
        className='flex flex-grow flex-col gap-4 overflow-x-hidden overflow-y-auto '
        // style={{backgroundColor: isOver ? 'lightblue' : 'red'}}
      >
        {/* <SortableContext items={tasks}>
          {tasks.map(task => (
            <TaskCard key={task} taskId={task} taskTitle={task} />
          ))}
        </SortableContext> */}
      </div>
      {/* column footer */}
      <div>footer</div>
    </div>
  );
};

export default Column;
