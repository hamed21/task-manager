export interface BoardType {
  id: number;
  title: string;
  dateCreated: string;
  workspace: number;
}

export type ColumnType = any;
export type TaskType = any;

export interface BoardDataType {
  id: number;
  title: string;
  dateCreated: string;
  workspace: number;
  columns: ColumnType[];
  tasks: TaskType[];
}
