'use client';

import Button from '@/components/Button';
import Image from 'next/image';
import {useState} from 'react';

export default function Home() {
  const [add, setAdd] = useState(0);
  return (
    <main className=''>
      <Button
        btnType='primary'
        onClick={() => setAdd(prevState => prevState + 1)}>
        add button
      </Button>
    </main>
  );
}
