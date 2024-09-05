'use client';

import Button from '@/components/Common/Button';
import Checkbox from '@/components/Common/Checkbox';
import Column from '@/components/Common/Column';
import RadioGroup from '@/components/Common/RadioGroup';
import {RootState} from '@/redux/store';
import {addTask} from '@/redux/tasksSlice';
import {RadioButtonOptionType} from '@/types/common.type';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const x = [
  {label: 'aaa', value: 1, description: 'kakakak'},
  {label: 'bbb', value: 2, description: 'kakakak'},
  {label: 'ccc', value: 3},
  {label: 'ddd', value: 4}
];

export default function Home() {
  const [add, setAdd] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [item, setItem] = useState<RadioButtonOptionType>({
    label: 'ccc',
    value: 3
  });

  console.log(item);
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  console.log(tasks, 'sssssss');

  return <div className='flex gap-4'></div>;
}
