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
  return (
    <Modal
      open={openAddTaskModal}
      onClose={() => setOpenAddTaskModal(false)}
      title={'Enter new task name'}
      footer={
        <>
          <Button
            btnType='primaryText'
            onClick={async () => {
              await addNewTask({
                board: Number(params.board),
                column: columnId,
                title: newTaskTitle
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
      <Input
        autoFocus
        value={newTaskTitle}
        onChange={(event): void => {
          setNewTaskTitle(event.target.value);
        }}
        className={classNames(
          'mt-3 block w-full rounded-lg border-2 bg-background-normal py-1.5 px-3 text-sm/6 text-base-normalText',
          'focus:outline-none focus:border-primary-light focus:shadow-sm'
        )}
      />
    </Modal>
  );
};

export {AddTaskModal};
