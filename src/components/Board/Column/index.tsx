import classNames from 'classnames';
import React, {useMemo, useState} from 'react';
import {
  PlusCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import {Tooltip} from 'react-tooltip';
import TaskCard from '../../Common/TaskCard';
import {SortableContext, useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import Button from '../../Common/Button';
import {ColumnType} from '@/types/board.type';
import {
  useDeleteColumnMutation,
  useEditColumnTitleMutation
} from '@/services/boardApi';
import {useParams} from 'next/navigation';
import {AddTaskModal} from './AddTaskModal';
import {TaskCardType, TaskType} from '@/types/task.type';

interface ColumnInterface {
  column: ColumnType;
  tasks?: TaskCardType[];
  columnToRename: number | null;
  setColumnToRename: (value: any) => void;
}

const Column: React.FC<ColumnInterface> = ({
  column,
  tasks,
  columnToRename,
  setColumnToRename
}) => {
  const params = useParams();

  const [editColumnTitle] = useEditColumnTitleMutation();
  const [deleteColumn] = useDeleteColumnMutation();

  const [editedName, setEditedName] = useState<string>(column.title);
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);

  const taskIds = useMemo(() => {
    if (!!tasks) {
      return tasks?.map(task => task.id);
    } else {
      return [];
    }
  }, [tasks]);

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
    disabled: !!columnToRename
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
    <>
      <AddTaskModal
        openAddTaskModal={openAddTaskModal}
        setOpenAddTaskModal={setOpenAddTaskModal}
        columnId={column.id}
      />
      <div ref={setNodeRef} className={columnContainerClassNames} style={style}>
        {/* Column title */}
        <div
          className='h-[40px] flex pb-2 border-b border-gray-dark justify-between items-center mb-2 mx-3'
          {...attributes}
          {...listeners}>
          {columnToRename === column.id ? (
            <>
              <input
                autoFocus
                className='bg-base-white border border-gray-border rounded-md outline-none px-2 focus:border-primary-normal max-w-[180px] h-full shadow shadow-primary-light'
                value={editedName}
                onChange={e => setEditedName(e.target.value)}
              />
              <Button
                btnType='primary'
                classNames='!px-2'
                onClick={() => {
                  editColumnTitle({
                    title: editedName,
                    columnId: column.id,
                    boardId: params.board as string
                  });
                  setColumnToRename(null);
                }}>
                <CheckIcon className='size-4' />
              </Button>
            </>
          ) : (
            <p className='text-base text-gray-normal'>{column.title}</p>
          )}
          <div className='flex'>
            <PencilSquareIcon
              id='edit-column-name'
              onClick={() => setColumnToRename(column.id)}
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
                deleteColumn({
                  boardId: params.board as string,
                  columnId: String(column.id)
                });
              }}
              className='size-6 text-primary-dark cursor-pointer'
            />
            <Tooltip
              anchorSelect='#delete-column'
              place='bottom'
              delayShow={100}>
              Delete Column
            </Tooltip>
          </div>
        </div>
        {/* column tasks container */}
        <div className='flex flex-grow flex-col gap-4 overflow-x-hidden overflow-y-auto px-3'>
          <SortableContext items={taskIds as number[]}>
            {tasks?.map(task => (
              <TaskCard
                key={task.id}
                taskData={task}
                // deleteTask={deleteTask}
                // updateTaskName={updateTaskName}
              />
            ))}
          </SortableContext>
        </div>
        {/* column footer */}
        <div className='w-full px-3'>
          <Button
            classNames='w-full flex justify-center'
            onClick={() => setOpenAddTaskModal(true)}>
            <>
              Add Task
              <PlusCircleIcon className='size-5 ml-4' />
            </>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Column;
