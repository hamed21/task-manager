import React, {useMemo, useState} from 'react';
import Column from '../Common/Column';
import TaskCard from '../Common/TaskCard';
import {
  DndContext,
  DragEndEvent,
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

// Define the types for the tasks and columns
// interface ColumnsType {
//   [key: string]: string[];
// }

// Sample initial data
// const initialColumns: ColumnsType = {
//   column1: ['Task 1', 'Task 2', 'Task 3'],
//   column2: ['Task 4', 'Task 5'],
//   column3: ['Task 6', 'Task 7'],
//   column4: ['Task 8', 'Task 9']
// };

interface BoardType {
  workspaceId: string;
  boardId: string;
}

const Board: React.FC<BoardType> = ({workspaceId, boardId}) => {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
  );

  // // console.log(columns);

  const columnIds = useMemo(() => columns.map(column => column.id), [columns]);

  // const handleDragEnd = (event: DragEndEvent) => {
  //   const {active, over} = event;

  //   if (!over || active.id === over.id) {
  //     return;
  //   }

  //   const activeColumn = findColumnByTask(String(active.id));
  //   const overColumn = findColumnByTask(String(over.id));

  //   // console.log({overColumn, overId: over?.Id});

  //   if (activeColumn && overColumn) {
  //     if (activeColumn === overColumn) {
  //       // Reordering within the same column
  //       const updatedTasks = arrayMove(
  //         columns[activeColumn],
  //         columns[activeColumn].indexOf(String(active.id)),
  //         columns[activeColumn].indexOf(String(over.id))
  //       );

  //       setColumns({
  //         ...columns,
  //         [activeColumn]: updatedTasks
  //       });
  //     } else {
  //       // Moving between columns
  //       const updatedActiveTasks = [...columns[activeColumn]];
  //       const updatedOverTasks = [...columns[overColumn]];

  //       updatedActiveTasks.splice(
  //         updatedActiveTasks.indexOf(String(active.id)),
  //         1
  //       );
  //       updatedOverTasks.splice(
  //         updatedOverTasks.indexOf(String(over.id)),
  //         0,
  //         String(active.id)
  //       );

  //       setColumns({
  //         ...columns,
  //         [activeColumn]: updatedActiveTasks,
  //         [overColumn]: updatedOverTasks
  //       });
  //     }
  //   }
  // };

  const onDragEnd = (event: DragEndEvent) => {
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

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current?.column);
    }
    // console.log('sssss', event);
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

  return (
    // <div>
    //   <DndContext
    //     onDragOver={handleDragEnd}
    //     onDragStart={onDragStart}
    //     onDragEnd={onDragEnd}>
    //     <div className=' flex gap-4'>
    //       <div className='flex gap-4'>
    //         {/* <SortableContext items={columnIds}> */}
    //         {Object.entries(columns).map(([column, tasks], index) => (
    //           <Column
    //             key={column}
    //             columnId={column}
    //             title={column}
    //             tasks={tasks}
    //           />
    //         ))}
    //         {/* </SortableContext> */}
    //       </div>
    // <Button
    //   onClick={() => {
    //     console.log('add new column');
    //   }}>
    //   add column
    // </Button>
    //     </div>
    //   </DndContext>
    //   {createPortal(
    //     <DragOverlay>
    //       {activeTask && (
    //         // <TaskCard taskId={activeTask} taskTitle={activeTask} />
    //         <div>adsl;asd'asl;</div>
    //       )}
    //     </DragOverlay>,
    //     document.body
    //   )}
    // </div>
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
        onDragEnd={onDragEnd}>
        <div
          className='
          flex 
          gap-4
          h-full
          p-5'>
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
                />
              ))}
            </SortableContext>
          </div>
          <Button onClick={createNewColumn}>Add Column</Button>
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
