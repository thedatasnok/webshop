import { Dialog, Transition } from '@headlessui/react';
import Button from '../input/Button';
import { Fragment } from 'react';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  action: () => void;
}

const DialogPrompt: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  message,
  action,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-[#000]/40' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='border-primary-600 bg-base-900 flex max-w-md flex-col rounded-sm border p-6'>
                <Dialog.Title
                  as='h3'
                  className='font-title text-xl font-semibold uppercase'
                >
                  {title}
                </Dialog.Title>
                <div className='mt-2'>
                  <p className='text-sm'>{message}</p>
                </div>

                <div className='flex flex-row justify-between gap-2 pt-4'>
                  <Button onClick={action}>{title}</Button>

                  <Button onClick={onClose}>cancel</Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogPrompt;
