import {ReactElement} from 'react';

export interface RadioButtonOptionType {
  label: string | number;
  value: string | number | boolean;
  description?: string;
}

export type IdType = string | number;

export type DropdownMenuOptionType<T> = T & {
  hasEdit: boolean;
  hasDelete: boolean;
};
