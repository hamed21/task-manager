import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import {useAddNewColumnMutation} from '@/services/boardApi';
import {Input} from '@headlessui/react';
import classNames from 'classnames';
import {useParams} from 'next/navigation';
import React, {useState} from 'react';

interface PropsType {
  columnsCount: number;
  openAddColumnModal: boolean;
  setOpenAddColumnModal: (value: boolean) => void;
}

const AddColumnModal: React.FC<PropsType> = ({
  columnsCount,
  openAddColumnModal,
  setOpenAddColumnModal
}) => {
  const [addNewColumn, {data}] = useAddNewColumnMutation();
  const params = useParams();

  const [newColumnTitle, setNewColumnTitle] = useState<string>('');

  const createNewColumn = (title: string): void => {
    addNewColumn({
      title,
      position: !!columnsCount ? columnsCount + 1 : 1,
      boardId: params.board as string
    });
  };
  return (
    <Modal
      open={openAddColumnModal}
      onClose={() => setOpenAddColumnModal(false)}
      title={'Add new column name'}
      footer={
        <>
          <Button
            btnType='primaryText'
            onClick={() => {
              createNewColumn(newColumnTitle);
              setOpenAddColumnModal(false);
            }}
            classNames='mr-4'>
            Create column
          </Button>
          <Button btnType='error' onClick={() => setOpenAddColumnModal(false)}>
            Cancel
          </Button>
        </>
      }>
      <Input
        autoFocus
        value={newColumnTitle}
        onChange={(event): void => {
          setNewColumnTitle(event.target.value);
        }}
        className={classNames(
          'mt-3 block w-full rounded-lg border-2 bg-background-normal py-1.5 px-3 text-sm/6 text-base-normalText',
          'focus:outline-none focus:border-primary-light focus:shadow-sm'
        )}
      />
    </Modal>
  );
};

export {AddColumnModal};
