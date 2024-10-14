export interface BoardType {
  id: number;
  title: string;
  dateCreated: string;
  workspace: number;
}

export interface ColumnType {
  id: number;
  title: string;
  boardId?: string;
  position: number;
}
export type TaskType = any;

export interface BoardDataType {
  id: number;
  title: string;
  dateCreated: string;
  workspace: number;
  columns: ColumnType[];
  tasks: TaskType[];
}
