import React from 'react';

const TaskCard = () => {
  return (
    <div className='w-full border border-gray-border rounded-lg px-3 py-2 flex flex-col'>
      <p className='text-lg h-7 text-base-normalText'> title</p>
      <p className='text-base h-6 text-base-minorText'>Hamed</p>
      <div className='flex justify-between items-center h-6 text-sm'>
        <p className='text-gray-normal'>04/03/2024</p>
        <p className='text-gray-normal'>Estimate : 1d</p>
      </div>
    </div>
  );
};

export default TaskCard;
