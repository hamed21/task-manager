export interface RadioButtonOptionType {
  label: string | number;
  value: string | number | boolean;
  description?: string;
}

export type IdType = string | number;

export type ColumnType = {
  id: IdType;
  title: string;
};

export type TaskType = {
  id: IdType;
  columnId: IdType;
  title: string;
};
