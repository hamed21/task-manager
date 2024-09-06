'use client';

import {usePathname, useRouter} from 'next/navigation';
import React, {useEffect} from 'react';
import Workspace from '../../components/Workspace/index';
import Board from '@/components/Board';

interface ParamsType {
  params: {
    workspace: string[];
  };
}

const WorkspacePage: React.FC<ParamsType> = ({params}) => {
  return params.workspace[1] ? (
    <Board workspaceId={params.workspace[0]} boardId={params.workspace[1]} />
  ) : (
    <Workspace workspaceId={params.workspace[0]} />
  );
};

export default WorkspacePage;
