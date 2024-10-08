import {ReactElement} from 'react';

export interface RadioButtonOptionType {
  label: string | number;
  value: string | number | boolean;
  description?: string;
}

export type IdType = string | number;

export interface ColumnType {
  id: IdType;
  title: string;
}

export interface TaskType {
  id: IdType;
  columnId: IdType;
  title: string;
}

export type DropdownMenuOptionType<T> = T & {
  hasEdit: boolean;
  hasDelete: boolean;
};
