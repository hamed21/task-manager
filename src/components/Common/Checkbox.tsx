import React from 'react';
import {Interface} from 'readline';

interface CheckboxType {
  isChecked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxType> = ({isChecked, onChange}) => {
  return (
    <div className='flex items-center space-x-2'>
      <input
        id='styled-checkbox'
        type='checkbox'
        checked={isChecked}
        onChange={onChange}
        className='appearance-auto h-4 w-6  checked:bg-blue-600 checked:border-transparent focus:outline-none focus:ring-offset-1 focus:ring-blue-500 cursor-pointer transition duration-200'
      />
      <label
        htmlFor='styled-checkbox'
        className='text-gray-800 font-medium cursor-pointer select-none'>
        Remember me
      </label>
    </div>
  );
};

export default Checkbox;
