import classNames from 'classnames';
import React, {ReactElement, useState} from 'react';
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
  column: ColumnType;
  deleteColumn: (id: IdType) => void;
  updateColumnName: (id: IdType, title: string) => void;
}

const Column: React.FC<ColumnInterface> = ({
  column,
  deleteColumn,
  updateColumnName
}) => {
  const [titleIsEditing, setTitleIsEditing] = useState(false);

  const {
    isOver,
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    },
    disabled: titleIsEditing
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  const columnContainerClassNames = classNames(
    'bg-background-normal w-[320px] h-full  rounded-lg px-3 py-2 shadow-lg flex flex-col',
    {'opacity-50 border border-2 border-primary-dark': isDragging}
  );

  return (
    <div ref={setNodeRef} className={columnContainerClassNames} style={style}>
      {/* Column title */}
      <div
        className='h-[40px] flex pb-2 border-b border-gray-dark justify-between items-center mb-2  '
        {...attributes}
        {...listeners}>
        {titleIsEditing ? (
          <input
            autoFocus
            className='bg-base-white border border-gray-border rounded-md outline-none px-2 focus:border-primary-normal max-w-[200px] shadow shadow-primary-light'
            value={column.title}
            onChange={e => updateColumnName(column.id, e.target.value)}
            onBlur={() => setTitleIsEditing(false)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                setTitleIsEditing(false);
              }
            }}
          />
        ) : (
          <p className='text-base text-gray-normal'>{column.title}</p>
        )}
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
            onClick={() => setTitleIsEditing(true)}
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
