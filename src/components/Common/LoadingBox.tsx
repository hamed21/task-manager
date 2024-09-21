import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from './Skeleton';
import Button from './Button';
import Fade from './Fade';

type LoadingType = {
  loading: boolean;
  error?: boolean;
  children: React.ReactNode;
  reload?: () => void;
  skeletonType?: 'table' | 'card' | 'box' | 'brand';
};
const LoadingBox: React.FC<LoadingType> = ({
  loading = true,
  reload,
  error,
  skeletonType = 'card',
  children
}) => {
  return loading ? (
    <div>
      <Skeleton type={skeletonType} />
    </div>
  ) : error ? (
    <div className='flex m-auto justify-center p-4'>
      <Button onClick={reload}>Try again</Button>
    </div>
  ) : (
    <Fade> {children} </Fade>
  );
};

export default LoadingBox;
