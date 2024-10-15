import React, {useState} from 'react';
import {useDraggable} from '@dnd-kit/core';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {IdType} from '@/types/common.type';
import {TrashIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import {TaskCardType} from '@/types/task.type';

interface PropsType {
  taskData: TaskCardType;
  deleteTask?: (taskId: IdType) => void;
  updateTaskName?: (taskId: IdType, title: string) => void;
}

const TaskCard: React.FC<PropsType> = ({
  taskData,
  deleteTask,
  updateTaskName
}) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [taskTitleIsEditing, setTaskTitleIsEditing] = useState(false);

  const {
    isOver,
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: taskData.id as number,
    data: {
      type: 'Task',
      taskData
    },
    disabled: taskTitleIsEditing
  });

  const deleteIconClassNames = classNames(
    'size-5 text-base-normalText hover:text-error-normal cursor-pointer absolute right-3 top-5 opacity-0 scale-0 transition-all duration-200 cursor-pointer',
    {
      'opacity-0': !mouseIsOver,
      'opacity-100': mouseIsOver,
      'scale-0': !mouseIsOver,
      'scale-100': mouseIsOver
    }
  );

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  const TaskCardClassNames = classNames(
    'relative w-full min-h-[110px] border border-gray-border bg-base-white rounded-lg px-3 py-2 flex flex-col cursor-grab',
    {
      'opacity-50 border border-2 border-primary-dark': isDragging
    }
  );

  const toggleIsEditing = (): void => {
    setTaskTitleIsEditing(prevState => !prevState);
  };

  console.log(taskData);

  return (
    <div
      className={TaskCardClassNames}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}>
      {taskTitleIsEditing ? (
        <input
          autoFocus
          className='h-[28px] bg-base-white cursor-gra border border-gray-border rounded-md outline-none px-2 focus:border-primary-normal max-w-[200px] shadow shadow-primary-light'
          value={taskData.name}
          // onChange={e => updateTaskName(taskData.id, e.target.value)}
          onBlur={() => setTaskTitleIsEditing(false)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === 'Escape') {
              setTaskTitleIsEditing(false);
            }
          }}
        />
      ) : (
        <p
          className='text-lg h-7 text-base-linkText  cursor-pointer max-w-[220px]'
          onClick={toggleIsEditing}>
          {taskData.name}
        </p>
      )}
      <p className='text-base h-6 text-base-normalText'>
        {taskData.assignees.length > 1 ? taskData.assignees : 'no assignees'}
      </p>
      <div className='flex justify-between items-center h-6 text-sm'>
        <p className='text-gray-normal'>{taskData.dueDate}</p>
        <p className='text-gray-normal'>
          Estimate : {taskData.timeEstimate || '-'}
        </p>
      </div>
      <TrashIcon
        onClick={() => {
          // deleteTask(taskData.id);
        }}
        className={deleteIconClassNames}
      />
    </div>
  );
};

export default TaskCard;
