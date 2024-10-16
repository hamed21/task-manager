'use client';

import React from 'react';
import Board from '@/components/Board';

interface ParamsType {
  params: {
    workspace: string[];
  };
}

const BoardPage: React.FC<ParamsType> = ({params}) => {
  return <Board />;
};

export default BoardPage;
