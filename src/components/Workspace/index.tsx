import React from 'react';

interface WorkspaceType {
  workspaceId: string;
}

const Workspace: React.FC<WorkspaceType> = ({workspaceId}) => {
  return <div>Workspace</div>;
};

export default Workspace;
