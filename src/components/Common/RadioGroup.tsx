import React, {useState} from 'react';
import {RadioButtonOptionType} from '@/types/common.type';
import classNames from "classnames";

interface RadioGroupType {
  options: RadioButtonOptionType[];
  defaultCheckedRadio: RadioButtonOptionType;
  onChange: (value: RadioButtonOptionType) => void;
  layout?: 'horizontal' | 'vertical';
}

const RadioGroup: React.FC<RadioGroupType> = ({
  options,
  defaultCheckedRadio,
  layout = 'horizontal',
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
            className={classNames(
                'w-4 h-4 cursor-pointer border rounded-full mx-2 flex justify-center items-center hover:border-gray-dark relative transition-all duration-200',
                {
                  'border-gray-dark': option.value === checkedValue.value,
                  'border-gray-normal': option.value !== checkedValue.value,
                  'after:bg-primary-normal': option.value === checkedValue.value,
                  'after:bg-transparent': option.value !== checkedValue.value,
                },
                'after:absolute after:rounded-full after:w-2 after:h-2 after:transition-all after:duration-200'
            )}
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
