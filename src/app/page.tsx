'use client';

import Button from '@/components/Button';
import {useState} from 'react';

export default function Home() {
  const [add, setAdd] = useState(0);
  return (
    <main className=''>
      <Button
        btnType='success'
        onClick={() => setAdd(prevState => prevState + 1)}>
        add button
      </Button>
    </main>
  );
}
