import React, {useState} from 'react';
import {useDraggable} from '@dnd-kit/core';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {IdType, TaskType} from '@/types/common.type';
import {TrashIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';

interface TaskCardType {
  taskData: TaskType;
  deleteTask: (taskId: IdType) => void;
}

const TaskCard: React.FC<TaskCardType> = ({taskData, deleteTask}) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({
      id: taskData.id,
      data: {
        type: 'Task',
        taskData
      }
    });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    padding: 16,
    marginBottom: 8,
    backgroundColor: isDragging ? '#e2e6ea' : '#fff',
    borderRadius: 4,
    boxShadow: isDragging
      ? '0 2px 8px rgba(0, 0, 0, 0.1)'
      : '0 1px 4px rgba(0, 0, 0, 0.1)',
    opacity: isDragging ? 0.6 : 1
  };

  const deleteIconClassNames = classNames(
    'size-5 text-base-normalText hover:text-error-normal cursor-pointer absolute right-3 top-5 opacity-0 scale-0 transition-all duration-200 cursor-pointer',
    {
      'opacity-0': !mouseIsOver,
      'opacity-100': mouseIsOver,
      'scale-0': !mouseIsOver,
      'scale-100': mouseIsOver
    }
  );

  // if (isDragging) {
  //   return (
  //     <div
  //       ref={setNodeRef}
  //       style={style}
  //       className='w-full border min-h-[110px] border-gray-border z-50 bg-base-white rounded-lg px-3 py-2 flex flex-col'
  //     />
  //   );
  // }
  return (
    <div
      className='relative w-full min-h-[110px] border border-gray-border bg-base-white rounded-lg px-3 py-2 flex flex-col cursor-grab'
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}>
      <p className='text-lg h-7 text-base-normalText'> {taskData.title}</p>
      <p className='text-base h-6 text-base-minorText'>Hamed</p>
      <div className='flex justify-between items-center h-6 text-sm'>
        <p className='text-gray-normal'>04/03/2024</p>
        <p className='text-gray-normal'>Estimate : 1d</p>
      </div>
      <TrashIcon
        onClick={() => {
          deleteTask(taskData.id);
        }}
        className={deleteIconClassNames}
      />
    </div>
  );
};

export default TaskCard;
