import React, {useEffect, useMemo, useState} from 'react';
import Column from './Column';
import TaskCard from '../Common/TaskCard';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {arrayMove, SortableContext} from '@dnd-kit/sortable';
import Button from '../Common/Button';
import {createPortal} from 'react-dom';
import {
  useGetBoardDataQuery,
  useUpdateColumnsOrderMutation
} from '@/services/boardApi';
import {useParams} from 'next/navigation';
import {useDispatch} from 'react-redux';
import {setSelectedBoard} from '@/store/boardSlice';
import {PlusCircleIcon} from '@heroicons/react/24/outline';
import {AddColumnModal} from './AddColumnModal';
import {ColumnType} from '@/types/board.type';
import {setColumns} from '@/store/columnSlice';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';
import {setTasks} from '@/store/taskSlice';
import {TaskCardType} from '@/types/task.type';
import {useEditTaskMutation} from '@/services/taskApi';

const Board: React.FC = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const columns = useSelector((state: RootState) => state.columns.value);
  const tasks = useSelector((state: RootState) => state.tasks.value);

  const [editTask] = useEditTaskMutation();

  const [openAddColumnModal, setOpenAddColumnModal] = useState<boolean>(false);
  const [columnToRename, setColumnToRename] = useState(null);
  const [activeColumn, setActiveColumn] = useState<any | null>(null);
  const [activeTask, setActiveTask] = useState<TaskCardType | null>(null);
  const [isClient, setIsClient] = useState(false);

  const {data: boardData, isLoading: boardIsLoading} = useGetBoardDataQuery(
    params.board as string
  );

  const [updateColumnsOrder] = useUpdateColumnsOrderMutation();

  useEffect(() => {
    if (boardData) {
      dispatch(setSelectedBoard(boardData));
      dispatch(setColumns(boardData?.columns));
      dispatch(setTasks(boardData?.tasks));
    }
  }, [boardData]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
  );

  const columnIds = useMemo(() => {
    if (boardData) {
      return boardData?.columns.map(column => column.id);
    } else {
      return [];
    }
  }, [boardData]);

  useEffect(() => {
    // Check if we are in the browser environment
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return null or a loading state during SSR
    return null;
  }

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current?.column);
    }
    if (event.active.data.current?.type === 'Task')
      setActiveTask(event.active.data.current?.taskData);
  };

  console.log(activeTask);

  const onDragOver = (event: DragOverEvent) => {
    const {active, over} = event;

    if (!over) return;
    if (active.id === over.id) return;

    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';

    if (!isActiveTask) return;

    const isOverColumn = over.data.current?.type === 'Column';

    if (isActiveTask && isOverColumn) {
      const activeIndex = tasks?.findIndex(task => task.id === active.id);

      const movedTask = tasks?.map(task => {
        if (task.id === tasks[activeIndex as number].id) {
          return {...task, columnId: over.id};
        }
        return task;
      });
      const updatedTasks = arrayMove(
        movedTask as TaskCardType[],
        activeIndex as number,
        activeIndex as number
      );
      dispatch(setTasks(updatedTasks));
      editTask({
        taskBody: {
          board: Number(params.board),
          column: Number(over.id)
        },
        taskId: String(tasks?.[activeIndex as number].id)
      });
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const {active, over} = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    const activeColumnIndex = boardData?.columns.findIndex(
      column => column.id === activeColumnId
    );
    const overColumnIndex = boardData?.columns.findIndex(
      column => column.id === overColumnId
    );

    if (activeColumn) {
      const updatedColumns = arrayMove(
        boardData?.columns as ColumnType[],
        activeColumnIndex as number,
        overColumnIndex as number
      );

      dispatch(setColumns(updatedColumns));

      updateColumnsOrder({
        columns: updatedColumns.map((column, index) => {
          const {boardId, ...rest} = column;
          return {...rest, position: index + 1};
        }),
        boardId: params.board as string
      });
    }
  };

  return (
    <>
      {/* add new column modal */}
      <AddColumnModal
        columnsCount={boardData?.columns.length || 0}
        openAddColumnModal={openAddColumnModal}
        setOpenAddColumnModal={setOpenAddColumnModal}
      />
      <div className='flex min-h-full w-full items-center overflow-x-auto overflow-y-hidden'>
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}>
          <div className='flex gap-4 h-full py-5'>
            <div className='flex gap-4'>
              <SortableContext items={columnIds}>
                {columns?.map((column: ColumnType) => (
                  <Column
                    key={column.id}
                    column={column}
                    columnToRename={columnToRename}
                    setColumnToRename={setColumnToRename}
                    // createTask={createTask}
                    // deleteTask={deleteTask}
                    tasks={tasks?.filter(task => task.columnId === column.id)}
                    // updateTaskName={updateTaskName}
                  />
                ))}
              </SortableContext>
            </div>
            <Button
              classNames='min-w-[160px]'
              onClick={() => setOpenAddColumnModal(true)}>
              <>
                Add Column
                <PlusCircleIcon className='size-5 ml-2' />
              </>
            </Button>
          </div>
          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <Column
                  column={activeColumn}
                  columnToRename={columnToRename}
                  setColumnToRename={setColumnToRename}
                  // createTask={createTask}
                  // deleteTask={deleteTask}
                  tasks={tasks?.filter(
                    task => task.columnId === activeColumn.id
                  )}
                  // // updateTaskName={updateTaskName}
                />
              )}
              {activeTask && (
                <TaskCard
                  taskData={activeTask}
                  // deleteTask={deleteTask}
                  // updateTaskName={updateTaskName}
                />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </>
  );
};

export default Board;
