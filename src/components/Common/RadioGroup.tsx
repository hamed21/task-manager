import React, {useState} from 'react';
import {RadioButtonOptionType} from '@/types/common.type';

interface RadioGroupType {
  options: RadioButtonOptionType[];
  defaultCheckedRadio: RadioButtonOptionType;
  onChange: (value: RadioButtonOptionType) => void;
  layout?: 'horizontal' | 'vertical';
  // disabled?: boolean;
}

const RadioGroup: React.FC<RadioGroupType> = ({
  options,
  defaultCheckedRadio,
  layout = 'horizontal',
  // disabled,
  onChange
}) => {
  const [checkedValue, setCheckedValue] = useState(defaultCheckedRadio);

  const toggleRadioHandler = (value: RadioButtonOptionType) => {
    setCheckedValue(value);
    onChange(value);
  };

  return (
    <>
      {options.map(option => (
        <label
          className={`
            ${layout === 'horizontal' ? 'inline-flex' : 'flex'}
            items-center
        `}>
          <div
            className={`
              w-4 h-4 
              cursor-pointer
              border 
              ${option.value === checkedValue.value ? 'border-gray-dark' : 'border-gray-normal'} 
              rounded-full
              mx-2
              flex
              justify-center
              items-center
              hover:border-gray-dark 
              after:absolute
              after:contents[""]
              after:rounded-full
              after:w-2
              after:h-2
              after:${option.value === checkedValue.value ? 'bg-primary-normal' : 'bg-transparent'}
              after:transition-all
              after:duration-200
              transition-all
              duration-200
              `}
          />
          <input
            className='relative hidden'
            type='radio'
            // disabled={disabled}
            checked={option.value === checkedValue.value}
            onChange={() => toggleRadioHandler(option)}
          />
          <p className='text-gray-dark'>{option.label}</p>
        </label>
      ))}
    </>
  );
};

export default RadioGroup;
