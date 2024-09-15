import React from 'react';
import classNames from 'classnames';
import DropdownMenu from './DropdownMenu';

const Header = () => {
  return (
    <header className='flex items-center  h-14 w-full bg-background-normal  pl-48'>
      <div className='w-full h-full px-7 flex justify-between items-center'>
        board name
        <DropdownMenu />
      </div>
    </header>
  );
};

export default Header;
