'use client';

import LoadingBox from '@/components/Common/LoadingBox';
import {useGetAllWorkspacesQuery} from '@/services/workSpaceApi';
import {RootState} from '@/store';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

export default function Home() {
  const router = useRouter();

  const selectedWorkspace = useSelector(
    (state: RootState) => state.workspace.value
  );

  useEffect(() => {
    if (selectedWorkspace) {
      router.push(`/${selectedWorkspace.id}`);
    }
  }, [selectedWorkspace, router]);

  console.log(!selectedWorkspace, 'selectedWorkspace');

  return (
    <LoadingBox loading={!selectedWorkspace}>
      <div className='flex gap-4'></div>
    </LoadingBox>
  );
}
