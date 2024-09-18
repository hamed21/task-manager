import {Dialog, DialogPanel, DialogTitle} from '@headlessui/react';
import {ReactElement, useState} from 'react';
import React from 'react';
import Button from './Button';

interface ModalType {
  title?: string | ReactElement;
  children?: string | ReactElement;
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
  footer?: ReactElement;
}

const Modal: React.FC<ModalType> = ({
  title,
  children,
  open,
  onClose,
  onSave,
  footer
}) => {
  // let [isOpen, setIsOpen] = useState(true);

  // function open() {
  //   setIsOpen(true);
  // }

  // function close() {
  //   setIsOpen(false);
  // }

  return (
    <>
      <Dialog
        open={open}
        as='div'
        className='relative z-10 focus:outline-none'
        onClose={onClose}>
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto bg-slate-700 bg-opacity-25 backdrop-blur-sm'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel
              transition
              className='w-full max-w-md rounded-xl bg-background-main p-6 backdrop-brightness-90 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'>
              <DialogTitle
                as='h3'
                className='text-base/7 font-medium text-base-normalText'>
                {title}
              </DialogTitle>
              {children}
              <div className='mt-4 flex justify-end'>
                {footer || (
                  <>
                    <Button onClick={onSave}>Save</Button>
                    <Button btnType='error' onClick={onClose} classNames='ml-4'>
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
