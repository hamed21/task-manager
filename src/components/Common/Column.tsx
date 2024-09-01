import classNames from 'classnames';
import React from 'react';

interface ColumnType {
  columnId: string;
  title: string;
}

const Column: React.FC<ColumnType> = ({columnId, title}) => {
  return <div className={classNames('bg-error-light w-60 ')}>Column</div>;
  // return (
  //   <div className='columns-4'>
  //     <div>sssl</div>
  //     <div>sssl</div>
  //     <div>sssl</div>
  //   </div>
  // );
};

export default Column;
