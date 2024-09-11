import classNames from 'classnames';
import React, {ReactElement, useMemo, useState} from 'react';
import {
  PlusCircleIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import {Tooltip} from 'react-tooltip';
import TaskCard from './TaskCard';
import {SortableContext, useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {ColumnType, IdType, TaskType} from '@/types/common.type';
import Button from './Button';

interface ColumnInterface {
  column: ColumnType;
  deleteColumn: (id: IdType) => void;
  updateColumnName: (id: IdType, title: string) => void;
  createTask: (columnId: IdType) => void;
  deleteTask: (taskId: IdType) => void;
  tasks: TaskType[];
  updateTaskName: (taskId: IdType, title: string) => void;
}

const Column: React.FC<ColumnInterface> = ({
  column,
  deleteColumn,
  updateColumnName,
  createTask,
  deleteTask,
  tasks,
  updateTaskName
}) => {
  const [titleIsEditing, setTitleIsEditing] = useState(false);

  const taskIds = useMemo(() => tasks.map(task => task.id), [tasks]);

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
    'bg-background-normal w-[320px] h-full  rounded-lg  py-2 shadow-lg flex flex-col',
    {'opacity-50 border border-2 border-primary-dark': isDragging}
  );

  return (
    <div ref={setNodeRef} className={columnContainerClassNames} style={style}>
      {/* Column title */}
      <div
        className='h-[40px] flex pb-2 border-b border-gray-dark justify-between items-center mb-2 mx-3'
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
        className='flex flex-grow flex-col gap-4 overflow-x-hidden overflow-y-auto px-3'
        // style={{backgroundColor: isOver ? 'lightblue' : 'red'}}
      >
        <SortableContext items={taskIds}>
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              taskData={task}
              deleteTask={deleteTask}
              updateTaskName={updateTaskName}
            />
          ))}
        </SortableContext>
      </div>
      {/* column footer */}
      <div className='w-full px-3'>
        <Button classNames='w-full' onClick={() => createTask(column.id)}>
          Add Task
        </Button>
      </div>
    </div>
  );
};

export default Column;
