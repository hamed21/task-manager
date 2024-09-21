import React from 'react';
import {SkeletonTheme} from 'react-loading-skeleton';
import Skeleton, {SkeletonProps} from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

type SkeletonType = {
  type?: 'table' | 'card' | 'box' | 'brand';
};

const TableSkeleton: React.FC = () => {
  const lines = new Array(10).fill(0).map((item, index) => index);
  return (
    <div className='p-3'>
      {lines.map(item => (
        <div className='mt-6' key={item}>
          <Skeleton height={16} />
        </div>
      ))}
    </div>
  );
};

const CardSkeleton: React.FC = () => {
  const lines = new Array(4).fill(0).map((item, index) => index);
  return (
    <div className='p-3'>
      <Skeleton height={95} className='mb-4' />

      {lines.map(item => (
        <Skeleton key={item} height={40} className='mb-4' />
      ))}
    </div>
  );
};

const BoxSkeleton: React.FC = () => (
  <div className='p-3'>
    <div className='flex mb-4'>
      <div>
        <Skeleton circle className='w-10 h-10 mr-4' />
      </div>
      <div className='w-full mt-2 mr-2'>
        <Skeleton width='25%' height={12} />
        <Skeleton width='60%' height={6} />
      </div>
      <div
        className='w-full mt-2'
        // direction='rtl'
      >
        <Skeleton className='w-1/4 h-8' />
        <Skeleton className='w-1/6 h-3' />
      </div>
    </div>

    <Skeleton height={148} />
    <div className='flex gap-2'>
      <Skeleton width='50%' height={90} />
      <Skeleton width='50%' height={90} />
    </div>
  </div>
);

const BrandSkeleton: React.FC = () => (
  <div className='p-3'>
    <div className='flex justify-center mb-4'>
      <Skeleton circle width={60} height={60} className='mr-4' />
    </div>

    <Skeleton height={148} className='mb-4' />

    <Skeleton height={30} className='mb-4' />
    <Skeleton height={30} />
  </div>
);

const skeletonTypes = {
  table: <TableSkeleton />,
  box: <BoxSkeleton />,
  card: <CardSkeleton />,
  brand: <BrandSkeleton />
};
const CustomSkeleton: React.FC<SkeletonType & SkeletonProps> = ({type}) => {
  return (
    <SkeletonTheme
    // baseColor={theme.colors.displayBg}
    // highlightColor={theme.colors.secondaryBackground}
    >
      {skeletonTypes[type || 'table']}
    </SkeletonTheme>
  );
};

export default CustomSkeleton;
