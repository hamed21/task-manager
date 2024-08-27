'use client';

import Button from '@/components/Common/Button';
import Checkbox from '@/components/Common/Checkbox';
import RadioGroup from '@/components/Common/RadioGroup';
import {RadioButtonOptionType} from '@/types/common.type';
import {useState} from 'react';

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

  return (
    <main className=''>
      <Button btnType='success' onClick={() => console.log('lslslslsl')}>
        asddsa
      </Button>
      <Checkbox
        isChecked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <RadioGroup
        options={x}
        defaultCheckedRadio={item}
        onChange={item => setItem(item)}
        layout={'vertical'}
      />
    </main>
  );
}
