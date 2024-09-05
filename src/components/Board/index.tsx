import React from 'react';
import Column from '../Common/Column';

interface BoardType {
  workspaceId: string;
  boardId: string;
}

const Board: React.FC<BoardType> = ({workspaceId, boardId}) => {
  return (
    <div className='flex gap-4'>
      <Column title='todo' columnId='1' />
      <Column title='todo' columnId='1' />
      <Column title='todo' columnId='1' />
      <Column title='todo' columnId='1' />
      <Column title='todo' columnId='1' />
      <Column title='todo' columnId='1' />
      <Column title='todo' columnId='1' />
      <Column title='todo' columnId='1' />
    </div>
  );
};

export default Board;
