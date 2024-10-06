'use client';

import React, {useState} from 'react';
import classNames from 'classnames';
import {Input, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react';
import {
  ChevronDownIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon
} from '@heroicons/react/16/solid';
import {DropdownMenuOptionType} from '@/types/common.type';
import Modal from './Modal';
import Button from './Button';
import {WorkspaceType} from '@/types/workspace.type';
import {
  useAddWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useEditWorkspaceMutation
} from '@/services/workSpaceApi';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';
import {setSelectedWorkspace} from '@/store/workspaceSlice';

interface DropdownMenuType {
  options: DropdownMenuOptionType<WorkspaceType>[];
  selectedValue: WorkspaceType | null;
}

const DropdownMenu: React.FC<DropdownMenuType> = ({options, selectedValue}) => {
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(
    (state: RootState) => state.workspace.value
  );

  const [openDeleteWorkspaceModal, setOpenDeleteWorkspaceModal] =
    useState<boolean>(false);
  const [openEditWorkspaceModal, setOpenEditWorkspaceModal] =
    useState<boolean>(false);
  const [openAddWorkspaceModal, setOpenAddWorkspaceModal] =
    useState<boolean>(false);
  const [itemToRename, setItemToRename] =
    useState<DropdownMenuOptionType<WorkspaceType> | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [newWorkspaceName, setNewWorkspaceName] = useState<string>('');

  const [deleteWorkspace, result] = useDeleteWorkspaceMutation();
  const [editWorkspace] = useEditWorkspaceMutation();
  const [
    addWorkspace,
    {
      isSuccess: addWorkspaceSuccess,
      isError: addWorkspaceError,
      isLoading: addWorkspaceLoading
    }
  ] = useAddWorkspaceMutation();

  const handleAddWorkspace = async (): Promise<void> => {
    try {
      await addWorkspace({title: newWorkspaceName, owner: 1});
    } catch (error) {
      console.error('Feild to add workspace:', error);
    }
  };

  const iconClasses = (isEditIcon: boolean): string =>
    classNames(
      `size-4 hidden text-xs group-data-[focus]:inline `,
      isEditIcon
        ? 'text-primary-normal hover:text-primary-dark'
        : 'text-error-normal hover:text-error-dark'
    );

  return (
    <>
      {/* Delete modal */}
      <Modal
        open={openDeleteWorkspaceModal}
        onClose={() => setOpenDeleteWorkspaceModal(false)}
        footer={
          <>
            <Button
              btnType='error'
              onClick={() => {
                deleteWorkspace(String(itemToDelete));
                setOpenDeleteWorkspaceModal(false);
              }}
              classNames='mr-4'>
              Delete
            </Button>
            <Button
              btnType='primaryText'
              onClick={() => setOpenDeleteWorkspaceModal(false)}>
              Cancel
            </Button>
          </>
        }>
        Are you sure?
      </Modal>
      {/* Edit modal */}
      <Modal
        open={openEditWorkspaceModal}
        onClose={() => setOpenEditWorkspaceModal(false)}
        onSave={() => {
          if (itemToRename) {
            editWorkspace({
              editedWorkspace: {title: itemToRename?.title, owner: 1},
              id: itemToRename?.id
            });
          }
          setOpenEditWorkspaceModal(false);
        }}
        title={'Edit workspace name'}>
        <Input
          value={itemToRename?.title || ''}
          onChange={(event): void => {
            if (itemToRename) {
              setItemToRename({
                ...itemToRename,
                title: event.target.value
              });
            }
          }}
          className={classNames(
            'mt-3 block w-full rounded-lg border-2 bg-background-normal py-1.5 px-3 text-sm/6 text-base-normalText',
            'focus:outline-none focus:border-primary-light focus:shadow-sm'
          )}
        />
      </Modal>
      {/* add new modal */}
      <Modal
        open={openAddWorkspaceModal}
        onClose={() => setOpenAddWorkspaceModal(false)}
        title={'Add new workspace name'}
        footer={
          <>
            <Button
              btnType='primaryText'
              onClick={() => {
                console.log('add');
                handleAddWorkspace();
                setOpenAddWorkspaceModal(false);
              }}
              classNames='mr-4'>
              Create workspace
            </Button>
            <Button
              btnType='error'
              onClick={() => setOpenAddWorkspaceModal(false)}>
              Cancel
            </Button>
          </>
        }>
        <Input
          value={newWorkspaceName}
          onChange={(event): void => {
            setNewWorkspaceName(event.target.value);
          }}
          className={classNames(
            'mt-3 block w-full rounded-lg border-2 bg-background-normal py-1.5 px-3 text-sm/6 text-base-normalText',
            'focus:outline-none focus:border-primary-light focus:shadow-sm'
          )}
        />
      </Modal>
      <Menu>
        <MenuButton className='inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700'>
          {selectedValue?.title}
          <ChevronDownIcon className='size-4 fill-white/60' />
        </MenuButton>

        <MenuItems
          transition
          anchor='bottom end'
          className='w-64 mt-2 origin-top-right rounded-xl border border-gray-border bg-background-main p-1 text-sm/6 text-base-normalText transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0'>
          {options.map(option => (
            <MenuItem key={option.id}>
              <button
                onClick={() => dispatch(setSelectedWorkspace(option))}
                className={classNames(
                  'group flex justify-between w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-background-subtle',
                  {'bg-background-subtle': selectedValue?.id === option.id}
                )}>
                <p className='block whitespace-nowrap overflow-hidden  align-middle text-ellipsis'>
                  {option.title}
                </p>
                <div className='flex gap-2'>
                  {option.hasEdit && (
                    <PencilSquareIcon
                      className={iconClasses(true)}
                      onClick={e => {
                        e.stopPropagation();
                        setItemToRename(option);
                        setOpenEditWorkspaceModal(true);
                      }}
                    />
                  )}
                  {option.hasDelete && (
                    <TrashIcon
                      className={iconClasses(false)}
                      onClick={e => {
                        e.stopPropagation();
                        setItemToDelete(option.id);
                        setOpenDeleteWorkspaceModal(true);
                      }}
                    />
                  )}
                </div>
              </button>
            </MenuItem>
          ))}
          {/* divider */}
          <div className='my-1 h-px bg-gray-border' />
          <MenuItem>
            <button
              className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-background-subtle'
              onClick={() => setOpenAddWorkspaceModal(true)}>
              <PlusCircleIcon className='size-4 text-primary-normal' />
              Add Workspace
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  );
};

export default DropdownMenu;
