interface TaskType {
  id?: number;
  columnId?: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: string;
  timeEstimate?: number;
  timeSpent?: number;
  column?: number;
  board: number;
}
