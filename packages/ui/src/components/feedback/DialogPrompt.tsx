import { Dialog, Transition } from '@headlessui/react';
import Button from '../input/Button';

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
  function closeModal() {
    onClose();
  }

  return (
    <Transition appear show={isOpen}>
      <Dialog
        as='div'
        className='bg-base-900/90 fixed top-0 flex h-full w-full justify-center pt-24'
        onClose={closeModal}
      >
        <Transition.Child
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <div className='border-primary-600 bg-base-900 flex max-w-md flex-col rounded-sm border p-6'>
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

              <Button onClick={closeModal}>cancel</Button>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default DialogPrompt;
