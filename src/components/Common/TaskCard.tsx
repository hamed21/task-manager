import React, {useState} from 'react';
import {useDraggable} from '@dnd-kit/core';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {IdType} from '@/types/common.type';
import {TrashIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import {TaskCardType} from '@/types/task.type';
import {useDeleteTaskMutation, useEditTaskMutation} from '@/services/taskApi';
import {useParams} from 'next/navigation';
import {useGetBoardDataQuery} from '@/services/boardApi';

interface PropsType {
  taskData: TaskCardType;
}

const TaskCard: React.FC<PropsType> = ({taskData}) => {
  const params = useParams();

  const [editTask] = useEditTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const {refetch} = useGetBoardDataQuery(params.board as string);

  const [taskTitleIsEditing, setTaskTitleIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(taskData.name);

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
    'size-5 text-base-normalText hover:text-error-normal cursor-pointer absolute right-3 top-5 transition-all duration-200 cursor-pointer'
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

  return (
    <div
      className={TaskCardClassNames}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}>
      {taskTitleIsEditing ? (
        <input
          autoFocus
          className='h-[28px] bg-base-white cursor-gra border border-gray-border rounded-md outline-none px-2 focus:border-primary-normal max-w-[200px] shadow shadow-primary-light'
          value={editedTaskName}
          onChange={e => setEditedTaskName(e.target.value)}
          onBlur={() => setTaskTitleIsEditing(false)}
          onKeyDown={async e => {
            if (e.key === 'Enter' || e.key === 'Escape') {
              await editTask({
                taskBody: {
                  column: taskData.columnId,
                  title: editedTaskName,
                  board: Number(params.board)
                },
                taskId: String(taskData.id)
              });
              refetch();
              setTaskTitleIsEditing(false);
            }
          }}
        />
      ) : (
        <p
          className='text-lg h-7 text-base-linkText  cursor-pointer max-w-[220px]'
          onClick={() => {
            setTaskTitleIsEditing(true);
          }}>
          {taskData.name}
        </p>
      )}
      <p className='text-base h-6 text-base-normalText'>
        {taskData.assignees.length > 1 ? taskData.assignees : 'no assignees'}
      </p>
      <div className='flex justify-between items-center h-6 text-sm'>
        <p className='text-gray-normal'>{taskData.dueDate}</p>
        <p className='text-gray-normal'>
          Estimate :{' '}
          {taskData.timeEstimate ? `${taskData.timeEstimate} h` : '-'}
        </p>
      </div>
      <TrashIcon
        onClick={async () => {
          await deleteTask(String(taskData.id));
          refetch();
        }}
        className={deleteIconClassNames}
      />
    </div>
  );
};

export default TaskCard;
