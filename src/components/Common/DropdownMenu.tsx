'use client';

import React, {useState} from 'react';
import classNames from 'classnames';
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react';
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilSquareIcon,
  Square2StackIcon,
  PlusCircleIcon,
  TrashIcon
} from '@heroicons/react/16/solid';

const DropdownMenu: React.FC<any> = ({
  options,
  selectedValue = 'workspaceName',
  onChange
}) => {
  return (
    <Menu>
      <MenuButton className='inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white'>
        {selectedValue}
        <ChevronDownIcon className='size-4 fill-white/60' />
      </MenuButton>

      <MenuItems
        transition
        anchor='bottom end'
        className='w-64 mt-2 origin-top-right rounded-xl border border-gray-border bg-background-main p-1 text-sm/6 text-base-normalText transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0'>
        <MenuItem>
          <button className='group flex justify-between w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-background-subtle'>
            Workspace name
            <div className='flex gap-2'>
              <PencilSquareIcon className='size-4 hidden text-xs text-primary-normal group-data-[focus]:inline' />
              <TrashIcon className='size-4 hidden text-xs text-error-normal group-data-[focus]:inline' />
            </div>
          </button>
        </MenuItem>
        {/* divider */}
        <div className='my-1 h-px bg-gray-border' />
        <MenuItem>
          <button className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-background-subtle'>
            <PlusCircleIcon className='size-4 text-primary-normal' />
            Add Workspace
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default DropdownMenu;
