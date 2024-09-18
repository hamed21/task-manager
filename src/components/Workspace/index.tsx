import React, {useState} from 'react';
import Modal from '../Common/Modal';
import Button from '../Common/Button';

interface WorkspaceType {
  workspaceId: string;
}

const Workspace: React.FC<WorkspaceType> = ({workspaceId}) => {
  return <div>workspace</div>;
};

export default Workspace;
