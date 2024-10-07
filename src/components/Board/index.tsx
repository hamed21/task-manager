import React, {useEffect, useMemo, useState} from 'react';
import Column from '../Common/Column';
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
import {ColumnType, IdType, TaskType} from '@/types/common.type';
import {generateId} from '@/utils/common.utils';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';

interface BoardType {
  workspaceId: string;
  boardId: string;
}

const Board: React.FC<BoardType> = ({workspaceId, boardId}) => {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const [isClient, setIsClient] = useState(false);

  // const selectedBoard = useSelector((state: RootState) => state.board.value);
  // console.log(selectedBoard);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
  );

  const columnIds = useMemo(() => columns.map(column => column.id), [columns]);

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

  const onDragOver = (event: DragOverEvent) => {
    const {active, over} = event;

    if (!over) return;
    if (active.id === over.id) return;

    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';

    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(task => task.id === active.id);
        const overIndex = tasks.findIndex(task => task.id === over.id);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverColumn = over.data.current?.type === 'Column';

    if (isActiveTask && isOverColumn) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(task => task.id === active.id);

        tasks[activeIndex].columnId = over.id;
        return arrayMove(tasks, activeIndex, activeIndex);
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

    setColumns(columns => {
      const activeColumnIndex = columns.findIndex(
        column => column.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        column => column.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  const createNewColumn = (): void => {
    const columnToAdd: ColumnType = {
      id: generateId(),
      title: `Column ${columns.length + 1}`
    };

    setColumns([...columns, columnToAdd]);
  };

  const deleteColumn = (columnId: IdType): void => {
    const filteredColumns = columns.filter(column => column.id !== columnId);

    setColumns(filteredColumns);

    const filteredTasks = tasks.filter(task => task.columnId !== columnId);
    setTasks(filteredTasks);
  };

  const updateColumnName = (columnId: IdType, title: string): void => {
    const newColumns = columns.map(column => {
      if (column.id !== columnId) return column;
      return {...column, title};
    });

    setColumns(newColumns);
  };

  const createTask = (columnId: IdType): void => {
    const newTask: TaskType = {
      id: generateId(),
      columnId,
      title: `Task ${tasks.length + 1}`
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId: IdType): void => {
    const filteredTasks = tasks.filter(task => task.id !== taskId);

    setTasks(filteredTasks);
  };

  const updateTaskName = (taskId: IdType, title: string): void => {
    const updatedTasks = tasks.map(task => {
      if (task.id !== taskId) return task;
      return {...task, title};
    });

    setTasks(updatedTasks);
  };

  return (
    <div
      className='
        flex 
        min-h-full 
        w-full 
        items-center
        overflow-x-auto
        overflow-y-hidden'>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}>
        <div
          className='
          flex 
          gap-4
          h-full
          py-5'>
          <div className='flex gap-4'>
            <SortableContext items={columnIds}>
              {columns.map(column => (
                <Column
                  key={column.id}
                  column={column}
                  deleteColumn={deleteColumn}
                  updateColumnName={updateColumnName}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  tasks={tasks.filter(task => task.columnId === column.id)}
                  updateTaskName={updateTaskName}
                />
              ))}
            </SortableContext>
          </div>
          <Button classNames='min-w-[150px]' onClick={createNewColumn}>
            Add Column
          </Button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <Column
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumnName={updateColumnName}
                createTask={createTask}
                deleteTask={deleteTask}
                tasks={tasks.filter(task => task.columnId === activeColumn.id)}
                updateTaskName={updateTaskName}
              />
            )}
            {activeTask && (
              <TaskCard
                taskData={activeTask}
                deleteTask={deleteTask}
                updateTaskName={updateTaskName}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default Board;
