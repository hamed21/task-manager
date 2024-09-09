import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

interface TaskCardType {
  taskId: string;
  taskTitle: string;
}

const TaskCard: React.FC<TaskCardType> = ({taskId, taskTitle}) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({
      id: taskId,
      data: {
        type: 'Task',
        taskId,
        taskTitle
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
      className='w-full min-h-[110px] border border-gray-border z-50 bg-base-white rounded-lg px-3 py-2 flex flex-col'
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}>
      <p className='text-lg h-7 text-base-normalText'> {taskTitle}</p>
      <p className='text-base h-6 text-base-minorText'>Hamed</p>
      <div className='flex justify-between items-center h-6 text-sm'>
        <p className='text-gray-normal'>04/03/2024</p>
        <p className='text-gray-normal'>Estimate : 1d</p>
      </div>
    </div>
  );
};

export default TaskCard;
