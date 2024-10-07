export interface WorkspaceType {
  id: string;
  title: string;
  dateCreated: string;
  owner: number;
}

export interface WorkspaceDataType {
  workspace: {
    id: number;
    title: string;
    dateCreated: string;
    owner: number;
  };
  boards: {id: number; title: string}[];
}
