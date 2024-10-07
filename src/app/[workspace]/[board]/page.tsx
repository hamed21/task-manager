'use client';

import React from 'react';
import Board from '@/components/Board';

interface ParamsType {
  params: {
    workspace: string[];
  };
}

const BoardPage: React.FC<ParamsType> = ({params}) => {
  return (
    <Board workspaceId={params.workspace[0]} boardId={params.workspace[1]} />
  );
};

export default BoardPage;
