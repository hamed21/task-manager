'use client';

import {useParams} from 'next/navigation';
import React from 'react';
import Workspace from '../../components/Workspace/index';

const WorkspacePage: React.FC = () => {
  const params: Record<string, string> = useParams();

  return <Workspace workspaceId={params.workspace} />;
};

export default WorkspacePage;
