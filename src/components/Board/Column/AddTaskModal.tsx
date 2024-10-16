import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import {useGetBoardDataQuery} from '@/services/boardApi';
import {useAddNewTaskMutation} from '@/services/taskApi';
import {Input} from '@headlessui/react';
import classNames from 'classnames';
import {useParams} from 'next/navigation';
import React, {useState} from 'react';

interface PropsType {
  openAddTaskModal: boolean;
  setOpenAddTaskModal: (value: boolean) => void;
  columnId: number;
}

const AddTaskModal: React.FC<PropsType> = ({
  openAddTaskModal,
  setOpenAddTaskModal,
  columnId
}) => {
  const params = useParams();

  const [addNewTask] = useAddNewTaskMutation();
  const {refetch} = useGetBoardDataQuery(params.board as string);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  return (
    <Modal
      open={openAddTaskModal}
      onClose={() => setOpenAddTaskModal(false)}
      title={'Enter new task data'}
      footer={
        <>
          <Button
            btnType='primaryText'
            onClick={async () => {
              await addNewTask({
                board: Number(params.board),
                column: columnId,
                title: newTaskTitle,
                description: newTaskDescription,
                timeEstimate: Number(timeEstimate),
                timeSpent: Number(timeSpent),
                dueDate: new Date().toLocaleString()
              });
              refetch();
              setOpenAddTaskModal(false);
            }}
            classNames='mr-4'>
            Create task
          </Button>
          <Button btnType='error' onClick={() => setOpenAddTaskModal(false)}>
            Cancel
          </Button>
        </>
      }>
      <div className='mt-4'>
        <label htmlFor='task-name'>Task name</label>
        <Input
          id='task-name'
          autoFocus
          value={newTaskTitle}
          onChange={(event): void => {
            setNewTaskTitle(event.target.value);
          }}
          className={classNames(
            'mt-3 mb-3 block w-full rounded-lg border-2 bg-background-normal py-1.5 px-3 text-sm/6 text-base-normalText',
            'focus:outline-none focus:border-primary-light focus:shadow-sm'
          )}
        />

        <label htmlFor='description'>Description</label>
        <Input
          id='description'
          value={newTaskDescription}
          onChange={(event): void => {
            setNewTaskDescription(event.target.value);
          }}
          className={classNames(
            'mt-3 mb-3 block w-full rounded-lg border-2 bg-background-normal py-1.5 px-3 text-sm/6 text-base-normalText',
            'focus:outline-none focus:border-primary-light focus:shadow-sm'
          )}
        />

        <div className='flex gap-4'>
          <div>
            <label htmlFor='time-estimate'>Time estimate</label>
            <div className='flex items-center'>
              <Input
                id='time-estimate'
                value={timeEstimate}
                onChange={(event): void => {
                  setTimeEstimate(event.target.value);
                }}
                className={classNames(
                  'mt-3 block w-full rounded-lg border-2 bg-background-normal py-1.5 px-3 text-sm/6 text-base-normalText',
                  'focus:outline-none focus:border-primary-light focus:shadow-sm'
                )}
              />
              <p className='mt-1 ml-3'>h</p>
            </div>
          </div>
          <div>
            <label htmlFor='time-spent'>Time spent</label>
            <div className='flex items-center'>
              <Input
                id='time-spent'
                value={timeSpent}
                onChange={(event): void => {
                  setTimeSpent(event.target.value);
                }}
                className={classNames(
                  'mt-3 block w-full rounded-lg border-2 bg-background-normal py-1.5 px-3 text-sm/6 text-base-normalText',
                  'focus:outline-none focus:border-primary-light focus:shadow-sm'
                )}
              />
              <p className='mt-1 ml-3'>h</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export {AddTaskModal};
