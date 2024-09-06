import React, {useState} from 'react';
import Column from '../Common/Column';
import TaskCard from '../Common/TaskCard';
import {DndContext, DragEndEvent} from '@dnd-kit/core';
import {arrayMove, SortableContext} from '@dnd-kit/sortable';

// Define the types for the tasks and columns
interface ColumnsType {
  [key: string]: string[];
}

// Sample initial data
const initialColumns: ColumnsType = {
  column1: ['Task 1', 'Task 2', 'Task 3'],
  column2: ['Task 4', 'Task 5'],
  column3: ['Task 6', 'Task 7']
};

interface BoardType {
  workspaceId: string;
  boardId: string;
}

const Board: React.FC<BoardType> = ({workspaceId, boardId}) => {
  const [columns, setColumns] = useState<ColumnsType>(initialColumns);

  console.log(columns);

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;

    if (!over || active.id === over.id) {
      return;
    }

    const activeColumn = findColumnByTask(String(active.id));
    const overColumn = findColumnByTask(String(over.id));

    if (activeColumn && overColumn) {
      if (activeColumn === overColumn) {
        // Reordering within the same column
        const updatedTasks = arrayMove(
          columns[activeColumn],
          columns[activeColumn].indexOf(String(active.id)),
          columns[activeColumn].indexOf(String(over.id))
        );

        setColumns({
          ...columns,
          [activeColumn]: updatedTasks
        });
      } else {
        // Moving between columns
        const updatedActiveTasks = [...columns[activeColumn]];
        const updatedOverTasks = [...columns[overColumn]];

        updatedActiveTasks.splice(
          updatedActiveTasks.indexOf(String(active.id)),
          1
        );
        updatedOverTasks.splice(
          updatedOverTasks.indexOf(String(over.id)),
          0,
          String(active.id)
        );

        setColumns({
          ...columns,
          [activeColumn]: updatedActiveTasks,
          [overColumn]: updatedOverTasks
        });
      }
    }
  };

  const findColumnByTask = (taskId: string): string | undefined => {
    return Object.keys(columns).find(column =>
      columns[column].includes(taskId)
    );
  };
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='flex gap-4'>
        {Object.entries(columns).map(([column, tasks], index) => (
          <SortableContext key={column} items={tasks}>
            <Column columnId={column} title={column} tasks={tasks} />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
};

export default Board;
