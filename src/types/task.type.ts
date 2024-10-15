export interface TaskCardType {
  id: number;
  name: string;
  dueDate: string;
  assignees: any[];
  columnId: number;
  timeEstimate: number;
}

export interface TaskType {
  id?: number;
  columnId?: number;
  title?: string;
  description?: string;
  dueDate?: string;
  priority?: string;
  timeEstimate?: number;
  timeSpent?: number;
  column?: number;
  board: number;
}
